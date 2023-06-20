<?php

use App\Http\Controllers\Api\V1\AuthenticateUserController;
use App\Http\Controllers\Api\V1\NewsAuthorController;
use App\Http\Controllers\Api\V1\NewsCategoryController;
use App\Http\Controllers\Api\V1\NewsController;
use App\Http\Controllers\Api\V1\NewsSearchController;
use App\Http\Controllers\Api\V1\PersonalizedNewsFeedController;
use App\Http\Controllers\Api\V1\TopHeadlineController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\NewsSourceController;

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


Route::get("/", fn () => json_encode([
            "categories" => [],
            "authors" => [],
            "sources" => [],
        ]));
Route::post("login", [AuthenticateUserController::class, "store"]);
Route::post("logout", [AuthenticateUserController::class, "destroy"])->middleware('auth:api');

Route::post("auth", [UserController::class, "update"])->name('auth.update');

Route::apiResource("users", UserController::class)->only(["index","store"]);

Route::get("sources", NewsSourceController::class);
Route::get("authors", NewsAuthorController::class);
Route::get("categories", NewsCategoryController::class);
Route::get("top-headlines", TopHeadlineController::class);
Route::get("news", NewsController::class);
Route::get("search", NewsSearchController::class);
Route::get("personalized-feeds", PersonalizedNewsFeedController::class)->middleware('auth:api');
