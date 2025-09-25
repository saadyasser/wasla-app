<?php

namespace App\Services\Profile\Creators;

use App\Models\User;
use App\Models\FreelancerProfile;
use App\Services\Profile\Contracts\ProfileCreator;

class FreelancerProfileCreator implements ProfileCreator
{
    public function create(User $user): FreelancerProfile
    {
        return $user->freelancerProfile()->create([
            'bio' => 'No description yet',
        ]);
    }
}
