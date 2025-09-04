<?php

namespace App\Services\Profile;

use App\Models\User;
use App\Enums\UserRole;
use App\Exceptions\UnsupportedRoleException;
use App\Services\Profile\Contracts\ProfileCreator;
use App\Services\Profile\Creators\ClientProfileCreator;
use App\Services\Profile\Creators\FreelancerProfileCreator;

class ProfileFactory
{
       public static function make(User $user): ProfileCreator
    {
        return match ($user->role) {
            UserRole::Freelancer => new FreelancerProfileCreator(),
            UserRole::Client => new ClientProfileCreator(),
            default => throw new UnsupportedRoleException("The provided user role '{$user->role->value}' is not supported."),


        };
    }

}
