<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Proposal;
use App\Models\FreelancerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proposal>
 */
class ProposalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   protected $model = Proposal::class;

    public function definition()
    {
        return [
            'project_id' => Project::factory(),
            'freelancer_profile_id' => FreelancerProfile::factory(),
            'cover_letter' => $this->faker->paragraph(),
            'attachment' => null,
            'budget' => $this->faker->randomFloat(2, 100, 10000),
            'timeline' => $this->faker->randomElement(['1 week', '2 weeks', '1 month']),
        ];
    }
}
