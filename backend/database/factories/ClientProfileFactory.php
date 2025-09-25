<?php

namespace Database\Factories;

use App\Models\ClientProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientProfileFactory extends Factory
{
    protected $model = ClientProfile::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // ينشئ مستخدم جديد مرتبط بالبروفايل
            'company_name' => $this->faker->company(),
            'company_info' => $this->faker->paragraph(),
            'website' => $this->faker->url(),
        ];
    }
}
