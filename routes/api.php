<?php

use App\Http\Controllers\CryptoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::get('/crypto-coins', [CryptoController::class, 'getCryptoCoins']);
Route::get('/crypto-coin-details', [CryptoController::class, 'getCryptoDetails']);
