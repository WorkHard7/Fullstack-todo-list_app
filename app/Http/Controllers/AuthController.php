<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function signup(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|min:3|unique:users',
                'email' => 'required|email|unique:users',
                'password' => ['required', 'min: 6', 'regex:/[a-z]/', 'regex:/[A-Z]/', 'regex:/[0-9]/',
                    'regex:/[@$!%*#?&]/', 'confirmed'],
                'password_confirmation' => 'required|min:6|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/'
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password'])
            ]);

            $token = JWTAuth::fromUser($user); // generate token

            return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        } catch (Exception $e) {
            return response()->json(
                ['status' => 'error', 'message' => $e->getMessage()],
                500);
        }
    }

    public function login(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

//        $user = User::where('email', $validatedData['email'])->first();
        $credentials = $request->only('email', 'password');
        $token = JWTAuth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout(): JsonResponse
    {
        Auth::logout();

        $forever = true;
        JWTAuth::getToken();
        JWTAuth::invalidate($forever);

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function verifyTokenAndAuthenticateUser()
    {
        try {
            $token = JWTAuth::parseToken(); // Parse the token from the request

            if (!$token->check()) {
                throw new Exception('Invalid token'); // Token is invalid
            }

            $user = $token->authenticate(); // Retrieve the authenticated user

            if (!$user) {
                throw new Exception('User not found'); // User not found
            }

            return $user;
        } catch (Exception $e) {
            throw new Exception('Unauthorized'); // Unauthorized
        }
    }
}
