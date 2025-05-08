<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained('hotels');
            $table->enum('room_type', ['Estándar', 'Junior', 'Suite']);
            $table->enum('accommodation', ['Sencilla', 'Doble', 'Triple', 'Cuádruple']);
            $table->integer('quantity');
            $table->timestamps();

            $table->unique(['hotel_id', 'room_type', 'accommodation']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('rooms');
    }
}
