<?php

namespace App\Services\Profile\Creators;

use App\Models\User;
use App\Services\Profile\Contracts\ProfileCreator;

class FreelancerProfileCreator implements ProfileCreator
{

    public function create(User $user): void
    {
        $user->freelancerProfile()->create();
    }
}
