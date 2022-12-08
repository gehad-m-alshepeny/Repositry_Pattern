<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
   
Route::group(["middleware" => ["auth"]], function () {

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::post('products/all', [ProductController::class, 'all'])->name('products.all');
//Route::get("products/create", [ProductController::class, 'create'])->name("products.create");
//Route::post("products/store", [ProductController::class, 'store'])->name("products.store");

Route::resource('products', ProductController::class)->except(['show']);

Route::post('categories/all', [CategoryController::class, 'all'])->name('categories.all');
Route::resource('categories', CategoryController::class)->except(['create', 'show']);



});
