<?php

namespace App\Services\Freelancer;

use App\Models\FreelancerProfile;
use App\Models\Skill;

class SkillService
{
    public function addSkillToFreelancer(FreelancerProfile $freelancer, ?int $skill_Id, ?string $skillName): Skill
    {
        if ($skill_Id) {
            $skill = Skill::findOrFail($skill_Id);
        } else {
            $skill = Skill::firstOrCreate(['name' => ucfirst(trim($skillName))]);
        }

        $freelancer->skills()->syncWithoutDetaching([$skill->id]);

        return $skill;
    }
}
