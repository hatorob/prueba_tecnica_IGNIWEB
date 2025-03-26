<?php

namespace App\Http\Controllers;

use App\Models\CryptoCoin;
use App\Models\CryptoDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class CryptoController extends Controller
{
    //
    public function getCryptoCoins() {
        //key_coinmarket
        $key = config('app.key_coinmarket');
        $url = config('app.url_coinmarket');
        $url_dbg = config('app.url_coinmarket_dbg');


        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'X-CMC_PRO_API_KEY' => $key,
        ])->get($url . "/v1/cryptocurrency/listings/latest");
        $data = $response->json();

        if (isset($data['data']) && is_array($data['data'])) {
            foreach ($data['data'] as $crypto) {

                $cryptoCoin = CryptoCoin::updateOrCreate(
                    ['name' => $crypto['name']],
                    [
                        'symbol' => $crypto['symbol'],
                        'name' => $crypto['name'],
                    ]
                );

                $createDetail = CryptoDetail::create([
                    "crypto_id" => $cryptoCoin->id,
                    "price" => $crypto['quote']['USD']['price'],
                    "percentage_change" => $crypto['quote']['USD']['percent_change_24h'] || 0,
                    "volume" => $crypto['quote']['USD']['market_cap'],
                    "last_update" => Carbon::parse($crypto['quote']['USD']['last_updated'])->setTimezone('America/Bogota')->toDateTimeString(),
                ]);

            }
        }

        $cryptos = CryptoCoin::all();
        return response()->json($cryptos);
    }


    public function getCryptoDetails(Request $request) {
        $idCryptoCoin = $request->input('id');

        $cryptoDetail = CryptoDetail::where('crypto_id', $idCryptoCoin)
        ->orderBy('last_update', 'asc')
        ->get();

        return response()->json($cryptoDetail);
    }

}
