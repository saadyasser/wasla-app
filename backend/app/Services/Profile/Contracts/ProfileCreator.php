<?php

namespace App\Services\Profile\Contracts;

use App\Models\User;

interface ProfileCreator
{
    public function create(User $user): void;

}
