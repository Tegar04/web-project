<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('nama_mobil'); // Nama mobil
            $table->text('description'); // Deskripsi mobil
            $table->integer('harga'); // Harga mobil
            $table->string('boking'); // Informasi boking
            $table->string('image')->nullable(); // Path untuk gambar
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
