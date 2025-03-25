<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoDetail extends Model
{
    use HasFactory;

    protected $tale = "crypto_details";
    protected $fildTable = ['crypto_id','price','percentage_change','volume','create_date'];

    public function coins() {
        return $this->belongsTo(CryptoCoin::class, 'crypto_id');
    }

}
