<?php

use App\Http\Controllers\ArchivedTodoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/users/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/users/login', [AuthController::class, 'login'])->name('login');
Route::post('/token/check', [AuthController::class, 'tokenValidation'])->name('tokenValidation');

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::get('/users/profile', [AuthController::class, 'getUserProfile'])->name('getUserProfile');

    Route::group(['prefix' => '/users/profile/edit'], function () {
        Route::patch('name', [AuthController::class, 'changeName'])->name('changeName');
        Route::patch('email', [AuthController::class, 'changeEmail'])->name('changeEmail');
        Route::patch('password', [AuthController::class, 'changePassword'])->name('changePassword');
    });
});

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::post('/users/logout', [AuthController::class, 'logout'])->name('logout');

    Route::group(['prefix' => '/todos'], function () {
        Route::get('/', [TodoController::class, 'index'])->middleware('auth:api');
        Route::post('/create', [TodoController::class, 'create']);
        Route::put('/update/{todo}', [TodoController::class, 'update']);

        Route::put('/update/status/{todo}', [TodoController::class, 'updateStatus']);
        Route::delete('/delete/{todo}', [TodoController::class, 'destroy']);

        Route::group(['prefix' => 'archived'], function () {
            Route::get('/', [ArchivedTodoController::class, 'index']);
            Route::post('/restore/{todo}', [ArchivedTodoController::class, 'restore']);
            Route::delete('/delete/{todo}', [ArchivedTodoController::class, 'destroy']);
        });
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::middleware('auth:api')->get('/todos', [TodoController::class, 'index']);
