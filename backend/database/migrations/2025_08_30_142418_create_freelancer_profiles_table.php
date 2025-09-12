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
        Schema::create('freelancer_profiles', function (Blueprint $table) {
            $table->id();
             $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title')->default('No headline yet');
            $table->text('bio')->nullable();;
            $table->string('location')->nullable();
            $table->string('profile_image_path')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('website')->nullable();
            $table->boolean('available')->default(true);
            $table->decimal('hourly_rate', 8, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancer_profiles');
    }
};
