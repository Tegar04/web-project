<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class admins extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_mobil',
        'description',
        'harga',
        'boking',
        'image',
    ];
}
