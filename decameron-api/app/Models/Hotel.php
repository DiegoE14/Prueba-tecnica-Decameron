<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $table = 'hotels';

    protected $fillable = [
        'name',
        'address',
        'city',
        'nit',
        'room_limit'
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
