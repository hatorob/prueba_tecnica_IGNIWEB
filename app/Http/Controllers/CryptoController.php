<?php

namespace App\Http\Controllers;

use App\Models\CryptoCoin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CryptoController extends Controller
{
    //
    public function getCryptoCoins() {
        //key_coinmarket
        $key = config('app.key_coinmarket');
        $url = config('app.url_coinmarket');
        $url_dbg = config('app.url_coinmarket_dbg');

        if(CryptoCoin::count() > 0) {
            $cryptos = CryptoCoin::all();
            return response()->json($cryptos);
        } else {

            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'X-CMC_PRO_API_KEY' => $key,
            ])->get($url_dbg . "/v1/cryptocurrency/listings/latest");
            $data = $response->json();

            if (isset($data['data']) && is_array($data['data'])) {
                foreach ($data['data'] as $crypto) {
                    CryptoCoin::updateOrCreate(
                        ['name' => $crypto['name']],
                        [
                            'name' => $crypto['name'],
                            'symbol' => $crypto['symbol'],
                        ]
                    );
                }
            }

            /* $crypto = CryptoCoin::create([
                'name' => 'Bitcoin Test',
                'symbol' => 'BTC-TEST',
            ]); */
            //var_dump("cryptos ",$cryptos); exit;
            //return response()->json(["message" => "No hay criptomonedas en la base de datos"], 404);
            return response()->json($data);
            //return $url_dbg;
        }
    }

}
