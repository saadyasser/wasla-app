<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\FreelancerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FreelancerProfile>
 */
class FreelancerProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     protected $model = FreelancerProfile::class;
    public function definition(): array
    {
        $filename = 'profile_images/' . $this->faker->uuid() . '.jpg';
         return [
            'user_id' => User::factory(), // ينشئ مستخدم جديد مرتبط بالبروفايل
            'title' => $this->faker->jobTitle(),
            'bio' => $this->faker->sentence(10),
            'location' => $this->faker->city(),
            'profile_image_path' => $filename, // ممكن تضيف صورة وهمية باستخدام fake Storage لو حاب
            'phone_number' => $this->faker->phoneNumber(),
            'website' => $this->faker->url(),
            'available' => $this->faker->boolean(80), // 80% متاح
            'hourly_rate' => $this->faker->randomFloat(2, 10, 100), // من 10 إلى 100 ريال أو دولار
        ];
    }
}
