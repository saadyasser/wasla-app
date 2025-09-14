<?php

use App\Enums\ProjectStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_profile_id')->constrained('client_profiles')->onDelete('cascade');
             $table->foreignId('freelancer_profile_id')->nullable()->constrained('freelancer_profiles')->onDelete('set null');
            $table->string('title');
            $table->text('description');
            $table->decimal('budget', 10, 2);
            $table->date('deadline');
            $table->timestamp('completed_at')->nullable();
            $table->enum('status', array_column(ProjectStatus::cases(), 'value'))->default(ProjectStatus::Open->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
