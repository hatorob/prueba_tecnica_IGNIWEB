<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoCoin extends Model
{
    use HasFactory;
    protected $table = "crypto_coins";
    protected $fillable = ['symbol', 'name', 'create_date'];
    public $timestamps = false;

    public function details() {
        return $this->hasMany(CryptoDetail::class, 'crypto_id');
    }

}
