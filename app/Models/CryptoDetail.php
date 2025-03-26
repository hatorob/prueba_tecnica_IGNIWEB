<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoDetail extends Model
{
    use HasFactory;

    protected $tale = "crypto_details";
    protected $fillable = ['crypto_id','price','percentage_change','volume','create_date','last_update'];
    public $timestamps = false;

    public function coins() {
        return $this->belongsTo(CryptoCoin::class, 'crypto_id');
    }

}
