<?php

namespace App\Http\Controllers;

use App\Models\ArchivedTodo;
use App\Models\Todo;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TodoController extends Controller
{
    public function __construct(AuthController $authController)
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of todos
     * @throws Exception
     */
    public function index(): JsonResponse
    {
        $user = auth()->user(); // Get the currently authenticated user

        // User is authenticated, fetch the todos
        $todos = $user->todos()->orderBy('created_at', 'asc')->get();

        return response()->json($todos);
    }

    /**
     * @throws Exception
     */
    public function create(Request $request): JsonResponse
    {
        try {
            $validateData = $request->validate([
                'title' => ['required', 'min: 1'],
            ]);

            $user = auth()->user();  // Get the currently authenticated user

            //    checks if todo exists in todos table by user id
            $todoExists = Todo::query()
                ->where('user_id', auth()->id())
                ->where('title', $validateData['title'])->exists();

            if ($todoExists) {
                return response()->json(['message' => 'todo already exists'], 409); // conflict
            }

            $uuid = Str::uuid();

            $todo = $user->todos()->create([
                'title' => $validateData['title'],
                'uuid' => $uuid
            ]);

            return response()->json([
                'message' => 'Todo successfully created!',
                'todo' => $todo
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401); // Unauthorized
        }
    }

    /**
     * Store a newly created todo in storage
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified todo
     */
    public function show(string $id)
    {
        //
    }

    public function edit(Todo $id)
    {

    }

    /**
     * Update the specified todo in storage
     * @throws Exception
     */
    public function update(Request $request, Todo $todo): JsonResponse
    {
        try {
            $validateTodo = $request->validate([
                'title' => ['required', 'min: 1']
            ]);

            //            checks if todo exists in todos table
            $todoExists = Todo::query()->where('uuid', $todo['uuid'])->first();

            if (!$todoExists) {
                return response()->json([
                    'message' => 'Todo not found!',
                ], 404);
            }

            $todo->update($validateTodo);
            return response()->json([
                'message' => 'Todo updated successfully!',
                'todo' => $todo,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401); // Unauthorized
        }
    }

    /**
     * @throws Exception
     */
    public function updateStatus(Request $request, Todo $todo): JsonResponse
    {
        try {
            //      checks if todo exists in todos table
            $todoExists = Todo::query()->where('uuid', $todo['uuid'])->first();

            if (!$todoExists) {
                return response()->json([
                    'message' => 'Todo not found!',
                ], 404);
            }

            $validateTodo = $request->validate([
                'completed' => ['required', 'boolean']
            ]);

            $todo->update(['completed' => $validateTodo['completed']]);

            return response()->json([
                'message' => 'Todo status updated successfully!',
                'todo' => $todo,
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401); // Unauthorized
        }
    }

    /**
     * Remove the specified todo from storage
     * @throws Exception
     */
    public function destroy(Todo $todo): JsonResponse
    {
        try {
            //    checks if todo exists in todos table
            $todoExists = Todo::query()->where('uuid', $todo['uuid'])->exists();

            if (!$todoExists) {
                return response()->json([
                    'message' => 'Todo not found!',
                ], 404);
            }

            //      checks if todo exists already in archived todos table, create if not found
            $existsInArchivedTodos = ArchivedTodo::query()
                ->where('user_id', auth()->id())
                ->where('title', $todo['title'])->first();

            if ($existsInArchivedTodos) {
                $todo->delete();

                return response()->json([
                    'message' => 'Todo already exists in archived todos! It was deleted!'
                ]);
            }

            $archivedTodo = ArchivedTodo::query()->create([
                'uuid' => $todo['uuid'],
                'user_id' => $todo['user_id'],
                'title' => $todo['title'],
                'archived_at' => Carbon::now()
            ]);

            $todo->delete();
            return response()->json([
                'message' => 'Todo archived successfully!',
                'todo' => $todo
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401); // Unauthorized
        }
    }
}
