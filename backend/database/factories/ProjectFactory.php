<?php

namespace Database\Factories;

use App\Models\Project;
use App\Enums\ProjectStatus;
use App\Models\ClientProfile;
use App\Enums\ExperienceLevel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     protected $model = Project::class;

    public function definition()
    {
        return [
            'client_profile_id' => ClientProfile::factory(),
            'freelancer_profile_id' => null, // أو FreelancerProfile::factory() حسب حاجتك
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'budget' => $this->faker->randomFloat(2, 100, 10000),
            'deadline' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'completed_at' => null,
            'status' => $this->faker->randomElement(array_column(ProjectStatus::cases(), 'value')),
            'experience_level' => $this->faker->randomElement(array_column(ExperienceLevel::cases(), 'value')),
        ];
    }
}
