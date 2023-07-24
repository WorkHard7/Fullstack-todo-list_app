<?php

namespace App\Http\Controllers;

use App\Models\ArchivedTodo;
use App\Models\Todo;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArchivedTodoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(): JsonResponse
    {
        $user = auth()->user(); // Get the currently authenticated user

        $archivedTodos = $user->archivedTodo()->orderBy('archived_at', 'asc')->get();

        return response()->json($archivedTodos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created todo in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    public function restore(ArchivedTodo $todo): JsonResponse
    {
        try {
            //      checks either the todo exists already in todos table
            $existingTodo = Todo::query()
                ->where('user_id', auth()->id())
                ->where('title', $todo['title'])
                ->first();

            if ($existingTodo) {
                return response()->json([
                    'message' => 'Todo already exists!',
                    'todo' => $existingTodo
                ], 422);
            }

            $restoredTodo = Todo::query()->create([
                'uuid' => $todo['uuid'],
                'user_id' => $todo['user_id'],
                'title' => $todo['title'],
                'completed' => false
            ]);

            ArchivedTodo::query()->where('uuid', $todo['uuid'])->delete();

            return response()->json([
                'message' => 'Todo restored successfully!',
                'todo' => $restoredTodo
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401); // Unauthorized
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        //
    }

    public function destroy(ArchivedTodo $todo): JsonResponse
    {
        try {
            //    checks if todo exists in archived todos table
            $archivedTodoExists = ArchivedTodo::query()->where('uuid', $todo['uuid'])->exists();

            if (!$archivedTodoExists) {
                return response()->json([
                    'message' => 'Todo not found!',
                ], 404);
            }

            $todo->delete();
            return response()->json([
                'message' => 'Archived todo deleted successfully',
                'todo' => $todo
            ]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401); // Unauthorized
        }
    }
}
