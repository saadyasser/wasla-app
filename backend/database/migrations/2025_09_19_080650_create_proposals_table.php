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
        Schema::create('proposals', function (Blueprint $table) {
        $table->id();
        $table->foreignId('project_id')->constrained()->onDelete('cascade');
        $table->foreignId('freelancer_profile_id')->constrained()->onDelete('cascade');
        $table->text('cover_letter');
        $table->string('attachment')->nullable();
        $table->decimal('budget', 10, 2);
        $table->string('timeline');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
