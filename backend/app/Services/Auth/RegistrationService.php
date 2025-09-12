<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Services\Profile\ProfileFactory;

class RegistrationService
{
    protected ProfileFactory $profileFactory;

    public function __construct(ProfileFactory $profileFactory)
    {
        $this->profileFactory = $profileFactory;
    }

    public function registerUser(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create($data);

            // Create the appropriate profile based on the user's role
            $creator = $this->profileFactory->make($user);
            $creator->create($user);

            return $user;
        });
    }
}
