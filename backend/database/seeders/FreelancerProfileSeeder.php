<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Skill;
use App\Models\Review;
use App\Enums\UserRole;
use App\Models\Project;
use App\Models\Education;
use App\Models\Portfolio;
use App\Models\SocialLink;
use App\Enums\ProjectStatus;
use App\Models\Certification;
use App\Models\FreelancerProfile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\Profile\ProfileFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FreelancerProfileSeeder extends Seeder
{
    public function run()
    {
        try {
            DB::transaction(function () {
                // إنشاء مستخدم Client
                $client = User::create([
                    'name' => 'Test Client',
                    'email' => 'client@example.com',
                    'password' => '12345678',
                    'role' => UserRole::Client->value,
                ]);

                // إنشاء ClientProfile واستخدام القيمة المرجعة مباشرة
                $clientProfile = ProfileFactory::make($client)->create($client);

                // إنشاء فريلانسر أول
                $freelancerUser1 = User::create([
                    'name' => 'Test Freelancer 1',
                    'email' => 'freelancer1@example.com',
                    'password' =>'12345678',
                    'role' => UserRole::Freelancer->value,
                ]);

                $freelancer1 = ProfileFactory::make($freelancerUser1)->create($freelancerUser1);
                $freelancer1->update([
                    'title' => 'Web Developer',
                    'bio' => 'Experienced developer',
                    'location' => 'Cairo',
                    'phone_number' => '123456789',
                    'website' => 'https://example.com',
                    'available' => true,
                    'hourly_rate' => 50,
                ]);

                // إنشاء مهارات لفريلانسر 1
                $skill1 = Skill::create(['name' => 'PHP']);
                $skill2 = Skill::create(['name' => 'Laravel']);
                $freelancer1->skills()->attach([$skill1->id, $skill2->id]);

                $project1 = Project::withoutTimestamps(function () use ($clientProfile) {
                    return Project::create([
                        'client_profile_id' => $clientProfile->id,
                        'title' => 'Project 1',
                        'description' => 'First project',
                        'budget' => 500,
                        'deadline' => now()->addDays(10),
                        'status' => ProjectStatus::Completed->value,
                        'completed_at' => now()->addDays(10),

                        'created_at' => now(),
                        'updated_at' => now()->addDays(10),
                    ]);
                });

                $project2 = Project::create([
                    'client_profile_id' => $clientProfile->id,
                    'title' => 'Project 2',
                    'description' => 'Second project',
                    'budget' => 1000,
                    'deadline' => now()->addDays(20),
                    'status' => ProjectStatus::InProgress->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                // بعد إنشاء المشروع وربطه بالـ freelancer
                $project1->skills()->attach([$skill1->id, $skill2->id]); // المهارات المطلوبة للمشروع


                $project1->update(['freelancer_profile_id' => $freelancer1->id]);
                $project2->update(['freelancer_profile_id' => $freelancer1->id]);




                // إنشاء تقييمات لفريلانسر 1
                Review::insert([
                    [
                        'freelancer_profile_id' => $freelancer1->id,
                        'project_id' => $project1->id,
                        'client_profile_id' => $clientProfile->id,
                        'rating' => 4,
                        'comment' => 'Great work!',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'freelancer_profile_id' => $freelancer1->id,
                        'project_id' => $project2->id,
                        'client_profile_id' => $clientProfile->id,
                        'rating' => 5,
                        'comment' => 'Excellent!',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ]);

                // إنشاء فريلانسر ثاني
                $freelancerUser2 = User::create([
                    'name' => 'Test Freelancer 2',
                    'email' => 'freelancer2@example.com',
                    'password' =>'12345678',
                    'role' => UserRole::Freelancer->value,
                ]);

                $freelancer2 = ProfileFactory::make($freelancerUser2)->create($freelancerUser2);
                $freelancer2->update([
                    'title' => 'Mobile Developer',
                    'bio' => 'Expert in mobile apps',
                    'location' => 'Alexandria',
                    'phone_number' => '987654321',
                    'website' => 'https://mobiledev.com',
                    'available' => true,
                    'hourly_rate' => 60,
                ]);

                // إنشاء مهارات لفريلانسر 2
                $skill3 = Skill::create(['name' => 'Flutter']);
                $skill4 = Skill::create(['name' => 'Dart']);
                $freelancer2->skills()->attach([$skill3->id, $skill4->id]);

                // إنشاء مشاريع لفريلانسر 2
                $project3 = Project::create([
                    'client_profile_id' => $clientProfile->id,
                    'title' => 'Project 3',
                    'description' => 'Mobile app project',
                    'budget' => 800,
                    'deadline' => now()->addDays(15),
                    'status' => ProjectStatus::Completed->value,
                    'created_at' => now(),
                    'updated_at' => now()->addDays(15),
                ]);

                $project4 = Project::create([
                    'client_profile_id' => $clientProfile->id,
                    'title' => 'Project 4',
                    'description' => 'Another mobile project',
                    'budget' => 1200,
                    'deadline' => now()->addDays(25),
                    'status' => ProjectStatus::InProgress->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $project3->update(['freelancer_profile_id' => $freelancer2->id]);
                $project4->update(['freelancer_profile_id' => $freelancer2->id]);
                // إنشاء تقييمات لفريلانسر 2
                Review::insert([
                    [
                        'freelancer_profile_id' => $freelancer2->id,
                        'project_id' => $project3->id,
                        'client_profile_id' => $clientProfile->id,
                        'rating' => 4.5,
                        'comment' => 'Good job!',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'freelancer_profile_id' => $freelancer2->id,
                        'project_id' => $project4->id,
                        'client_profile_id' => $clientProfile->id,
                        'rating' => 4.8,
                        'comment' => 'Very good!',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ]);

                // إنشاء portfolios لفريلانسر 1
                $freelancer1->portfolios()->createMany([
                    [
                        'title' => 'Portfolio 1',
                        'url' => 'https://portfolio1.com',
                        'description' => 'Sample portfolio',
                    ],
                ]);

                // إنشاء social links لفريلانسر 1
                $freelancer1->socialLinks()->createMany([
                    [
                        'platform_name' => 'LinkedIn',
                        'url' => 'https://linkedin.com/in/test1',
                    ],
                ]);

                // إنشاء certifications لفريلانسر 1
                $freelancer1->certifications()->createMany([
                    [
                        'certification_name' => 'Laravel Certification',
                        'certification_url' => 'https://certification.com',
                    ],
                ]);

                // إنشاء educations لفريلانسر 1
                $freelancer1->educations()->createMany([
                    [
                        'university' => 'Cairo University',
                        'degree' => 'BSc',
                        'field' => 'Computer Science',
                        'from' => 2015,
                        'to' => 2019,
                    ],
                ]);

                // إنشاء portfolios لفريلانسر 2
                $freelancer2->portfolios()->createMany([
                    [
                        'title' => 'Portfolio 2',
                        'url' => 'https://portfolio2.com',
                        'description' => 'Mobile app portfolio',
                    ],
                ]);

                // إنشاء social links لفريلانسر 2
                $freelancer2->socialLinks()->createMany([
                    [
                        'platform_name' => 'LinkedIn',
                        'url' => 'https://linkedin.com/in/test2',
                    ],
                ]);

                // إنشاء certifications لفريلانسر 2
                $freelancer2->certifications()->createMany([
                    [
                        'certification_name' => 'Flutter Certification',
                        'certification_url' => 'https://fluttercert.com',
                    ],
                ]);

                // إنشاء educations لفريلانسر 2
                $freelancer2->educations()->createMany([
                    [
                        'university' => 'Alexandria University',
                        'degree' => 'BSc',
                        'field' => 'Mobile Development',
                        'from' => 2016,
                        'to' => 2020,
                    ],
                ]);
            });
        } catch (\Exception $e) {
            Log::error('Error in FreelancerProfileSeeder: ' . $e->getMessage());
            throw $e;
        }
    }
}
