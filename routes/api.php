<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/admin', App\Http\Controllers\AdminsController::class);
Route::apiResource('aboutus', App\Http\Controllers\AboutUsController::class);
