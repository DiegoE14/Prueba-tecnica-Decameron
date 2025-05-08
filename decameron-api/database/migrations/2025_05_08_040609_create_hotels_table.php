<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelsTable extends Migration
{
    public function up()
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('city');
            $table->string('nit')->unique();
            $table->integer('room_limit');
            $table->timestamps();
            
            $table->unique('name');
        });
    }

    public function down()
    {
        Schema::dropIfExists('hotels');
    }
}
