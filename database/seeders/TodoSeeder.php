<?php

namespace Database\Seeders;

use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get user IDs
        $userIds = DB::table('users')->pluck('id');
        $todos = [];

        foreach ($userIds as $userId) {
            $userTodos = [
                [
                    'title' => 'call my mum',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'title' => 'go shopping malldova',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'title' => 'eat a juicy icecream',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'title' => 'interview at 14:00 - laravel developer',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'title' => 'watch a funny cartoon',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'title' => 'write a letter to my friend',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'title' => 'cook my favourite dish',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'title' => 'delete old pictures from my phone',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'completed' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]
            ];
            $todos = array_merge($todos, $userTodos);
        }

        DB::table('todos')->insert($todos);
    }
}
