<?php

use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\RoomController;
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

Route::get('hotels', [HotelController::class, 'index']);
Route::post('hotels', [HotelController::class, 'store']);
Route::get('hotels/{id}', [HotelController::class, 'show']);
Route::put('hotels/{id}', [HotelController::class, 'update']);
Route::delete('hotels/{id}', [HotelController::class, 'destroy']);

Route::get('rooms', [RoomController::class, 'index']);
Route::post('rooms', [RoomController::class, 'store']);
Route::get('rooms/{id}', [RoomController::class, 'show']);
Route::put('rooms/{id}', [RoomController::class, 'update']);
Route::delete('rooms/{id}', [RoomController::class, 'destroy']);

