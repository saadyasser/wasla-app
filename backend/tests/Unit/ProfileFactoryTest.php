<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Enums\UserRole;
use App\Services\Profile\ProfileFactory;
use App\Services\Profile\Creators\ClientProfileCreator;
use App\Services\Profile\Creators\FreelancerProfileCreator;

class ProfileFactoryTest extends TestCase
{
    public function test_it_creates_client_profile_creator_for_client_role()
    {
        // إنشاء مستخدم بدور Client
        $user = User::factory()->create(['role' => UserRole::Client]);

        // استدعاء ProfileFactory
        $creator = ProfileFactory::make($user);

        // التحقق من أن الكائن الناتج هو ClientProfileCreator
        $this->assertInstanceOf(ClientProfileCreator::class, $creator);
    }

    public function test_it_creates_freelancer_profile_creator_for_freelancer_role()
    {
        // إنشاء مستخدم بدور Freelancer
        $user = User::factory()->create(['role' => UserRole::Freelancer]);

        // استدعاء ProfileFactory
        $creator = ProfileFactory::make($user);

        // التحقق من أن الكائن الناتج هو FreelancerProfileCreator
        $this->assertInstanceOf(FreelancerProfileCreator::class, $creator);
    }

}
