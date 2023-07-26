<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function signup(Request $request): JsonResponse
    {
        $nameExists = User::query()->where('name', $request['name'])->exists();
        $emailExists = User::query()->where('email', $request['email'])->exists();

        if ($nameExists) {
            return response()->json(['message' => 'name already exists'], 409);
        }

        if ($emailExists) {
            return response()->json(['message' => 'email already exists'], 409);
        }

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
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

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
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
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

    /**
     * @throws Exception
     */
    public function getUserProfile(): JsonResponse
    {
        $user = $this->verifyTokenAndAuthenticateUser();

        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }

    /**
     * @throws Exception
     */
    public function changeName(Request $request): JsonResponse
    {
        try {
            $user = $this->verifyTokenAndAuthenticateUser();

            $validatedData = $request->validate([
                'name' => 'required|min:3|unique:users,name,' . $user->id,
            ]);

            $user->update([
                'name' => $validatedData['name'],
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Name updated successfully.',
                'user' => $user,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * @throws Exception
     */
    public function changeEmail(Request $request): JsonResponse
    {
        try {
            $user = $this->verifyTokenAndAuthenticateUser();

            $validatedData = $request->validate([
                'email' => 'required|email|unique:users,email,' . $user->id,
            ]);

            $user->update([
                'email' => $validatedData['email'],
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Email updated successfully.',
                'user' => $user,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    /**
     * @throws Exception
     */
    public function changePassword(Request $request): JsonResponse
    {
        try {
            $user = $this->verifyTokenAndAuthenticateUser();

            $validatedData = $request->validate([
                'password' => 'required',
                'new_password' => [
                    'required',
                    'min:6',
                    'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/'
                ],
                'new_password_confirmation' => 'required|same:new_password'
            ]);

            if (!(Hash::check($request->input('password'), $user->password))) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Old password does not match.',
                ], 422);
            }

            $user->update([
                'password' => bcrypt($validatedData['new_password'])
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Password updated successfully.',
                'user' => $user,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
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
