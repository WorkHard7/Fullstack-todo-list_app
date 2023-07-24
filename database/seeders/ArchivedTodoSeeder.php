<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArchivedTodoSeeder extends Seeder
{
    public function run(): void
    {
        $userIds = DB::table('users')->pluck('id');
        $archived_todos = [];

        foreach ($userIds as $userId) {
            $userArchivedTodos = [
                [
                    'title' => 'play piano',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'archived_at' => Carbon::now()->format('Y-m-d'),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ],
                [
                    'title' => 'go shopping online',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'archived_at' => Carbon::now()->format('Y-m-d'),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ],
                [
                    'title' => 'eat a delicious pie',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'archived_at' => Carbon::now()->format('Y-m-d'),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ],
                [
                    'title' => 'interview at 14:00 - laravel developer',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'archived_at' => Carbon::now()->format('Y-m-d'),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ],
                [
                    'title' => 'watch a funny video',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'archived_at' => Carbon::now()->format('Y-m-d'),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ],
                [
                    'title' => 'listen a nice song',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'archived_at' => Carbon::now()->format('Y-m-d'),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ],
                [
                    'title' => 'learn a new Bible text',
                    'user_id' => $userId,
                    'uuid' => Str::uuid(),
                    'archived_at' => Carbon::now()->format('Y-m-d'),
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                ]
            ];
            $archived_todos = array_merge($archived_todos, $userArchivedTodos);
        }

        DB::table('archived_todos')->insert($archived_todos);
    }
}
