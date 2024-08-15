<?php
use App\Http\Controllers\api\v1\AuthController;
// use App\Http\Controllers\api\v1\ImageUploadController;
use App\Http\Controllers\api\v1\ProductsController;
use App\Http\Controllers\api\v1\ProjectsController;
use App\Http\Controllers\api\v1\CustomersController;
use App\Http\Controllers\api\v1\UsersController;
use App\Http\Controllers\api\v1\VerifyController;
use App\Http\Middleware\JWTFromCookie;

/*
|--------------------------------------------------------------------------
| API v1 Routes
|--------------------------------------------------------------------------
|
| This file contains all of the v1 routes.
| This file is loaded and the routes are pre-pended automatically 
| by App\Providers\RouteServiceProvider->boot()
|
*/

// Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->withoutMiddleware([
    JWTFromCookie::class
]);

// PRODUCT ENDPOINT
Route::post('/products', [ProductsController::class, 'create']);
Route::get('/products', [ProductsController::class, 'read']);
Route::get('/products/{status}', [ProductsController::class, 'read']);
Route::post('/products/{id}', [ProductsController::class, 'update']);
Route::delete('/products/{id}', [ProductsController::class, 'delete']);
Route::get('/products/detail/{id}', [ProductsController::class, 'detail']);
Route::post('/products/update/{id}', [ProductsController::class, 'activate']);


// PROJECT ENDPOINT
Route::post('/projects', [ProjectsController::class, 'create']);
Route::get('/projects', [ProjectsController::class, 'read']);
Route::post('/projects/{id}', [ProjectsController::class, 'update']);


// CUSTOMER ENDPOINT
Route::post('/customers', [CustomersController::class, 'create']);
Route::get('/customers', [CustomersController::class, 'read']);
Route::get('/customers/{status}', [CustomersController::class, 'read']);
Route::post('/customers/{id}', [CustomersController::class, 'update']);
Route::delete('/customers/{id}', [CustomersController::class, 'delete']);
Route::get('/customers/detail/{id}', [CustomersController::class, 'detail']);
Route::post('/customers/update/{id}', [CustomersController::class, 'activate']);


Route::get('/verify', [VerifyController::class, 'get']);
Route::get('/logout', [AuthController::class, 'logout']);