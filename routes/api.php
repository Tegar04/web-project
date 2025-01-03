<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::middleware([EnsureFrontendRequestsAreStateful::class, 'auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/admin', App\Http\Controllers\AdminsController::class);
Route::apiResource('aboutus', App\Http\Controllers\AboutUsController::class);

// customer routes
// Routes for customers
Route::apiResource('customers', CustomerController::class);

// Add a separate login route
Route::post('customers/login', [CustomerController::class, 'login']);

//invoice
Route::apiResource('invoice', App\Http\Controllers\InvoiceController::class);