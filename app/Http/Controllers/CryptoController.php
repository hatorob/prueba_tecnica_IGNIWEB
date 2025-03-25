<?php

namespace App\Http\Controllers;

use App\Models\CryptoCoin;
use Illuminate\Http\Request;

class CryptoController extends Controller
{
    //

    public function getCryptoCoins() {
        $cryptos = CryptoCoin::all();
        return response()->json($cryptos);
    }

}
