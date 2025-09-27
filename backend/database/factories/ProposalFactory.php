<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Proposal;
use App\Models\FreelancerProfile;
use App\Enums\ProposalStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proposal>
 */
class ProposalFactory extends Factory
{
    protected $model = Proposal::class;

    public function definition()
    {
        return [
            'project_id' => Project::factory(),
            'freelancer_profile_id' => FreelancerProfile::factory(),
            'cover_letter' => $this->faker->paragraph(),
            'attachment' => null,
            'budget' => $this->faker->randomFloat(2, 100, 10000),
            'estimated_duration' => $this->faker->randomElement(['1 week', '2 weeks', '1 month']),
            'status' => $this->faker->randomElement(array_column(ProposalStatus::cases(), 'value')),
        ];
    }
}
