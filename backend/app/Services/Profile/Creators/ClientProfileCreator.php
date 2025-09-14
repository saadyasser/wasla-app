<?php

namespace App\Services\Profile\Creators;

use App\Models\ClientProfile;
use App\Models\User;
use App\Services\Profile\Contracts\ProfileCreator;


class ClientProfileCreator implements ProfileCreator
{
   public function create(User $user): ClientProfile
   {
       return  $user->clientProfile()->create();
   }
}
