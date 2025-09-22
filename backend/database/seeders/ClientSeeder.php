<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\ClientProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clientsData = [
            [
                'user_name' => 'Ahmed Ahmed',
                'company_name' => 'TechNova Solutions LLC',
                'company_info' => 'We provide innovative tech solutions for small and medium businesses across the US.',
                'website' => 'https://www.technova.com',
                'location' => 'New York, USA',
            ],
            [
                'user_name' => 'Sarah Johnson',
                'company_name' => 'Global Retail Inc.',
                'company_info' => 'A nationwide retail chain specializing in electronics and home goods.',
                'website' => 'https://www.globalretail.com',
                'location' => 'San Francisco, USA',
            ],
            [
                'user_name' => 'Michael Smith',
                'company_name' => 'ContentBoost Agency LLC',
                'company_info' => 'Digital marketing agency focusing on SEO, content marketing, and social media campaigns.',
                'website' => 'https://www.contentboost.com',
                'location' => 'Chicago, USA',
            ],
            [
                'user_name' => 'Emily Davis',
                'company_name' => 'GreenTech Media Ltd.',
                'company_info' => 'Media company focused on sustainable technologies and eco-friendly initiatives.',
                'website' => 'https://www.greentechmedia.com',
                'location' => 'Austin, USA',
            ],
            [
                'user_name' => 'John Williams',
                'company_name' => 'FreshStart Ventures LLC',
                'company_info' => 'Startup incubator and venture capital company supporting early-stage tech startups.',
                'website' => 'https://www.freshstartventures.com',
                'location' => 'Boston, USA',
            ],
            [
                'user_name' => 'Olivia Brown',
                'company_name' => 'NextGen Marketing Ltd.',
                'company_info' => 'Marketing and branding solutions for tech companies looking to expand globally.',
                'website' => 'https://www.nextgenmarketing.com',
                'location' => 'Los Angeles, USA',
            ],
            [
                'user_name' => 'David Wilson',
                'company_name' => 'BrightWave Solutions LLC',
                'company_info' => 'IT consulting and software development company specializing in web and mobile apps.',
                'website' => 'https://www.brightwave.com',
                'location' => 'Seattle, USA',
            ],
            [
                'user_name' => 'Sophia Martinez',
                'company_name' => 'UrbanTech Co. Ltd.',
                'company_info' => 'Smart city technology solutions provider for urban infrastructure and IoT.',
                'website' => 'https://www.urbantech.com',
                'location' => 'Miami, USA',
            ],
            [
                'user_name' => 'James Anderson',
                'company_name' => 'Visionary Labs LLC',
                'company_info' => 'Research and development lab for AI and machine learning applications.',
                'website' => 'https://www.visionarylabs.com',
                'location' => 'Denver, USA',
            ],
            [
                'user_name' => 'Isabella Thomas',
                'company_name' => 'AlphaTech Solutions Ltd.',
                'company_info' => 'Software solutions company delivering enterprise-level applications and services.',
                'website' => 'https://www.alphatech.com',
                'location' => 'Houston, USA',
            ],
        ];

        foreach ($clientsData as $client) {

            $user = User::create([
                'name' => $client['user_name'],
                'email' => strtolower(str_replace(' ', '', $client['user_name'])) . '@example.com',
                'email_verified_at' => now(),
                'password' => 'password123',  // يتم تشفيرها تلقائيًا بواسطة mutator
                'remember_token' => Str::random(10),
                'role' => UserRole::Client->value,
            ]);


            ClientProfile::create([
                'user_id' => $user->id,
                'company_name' => $client['company_name'],
                'company_info' => $client['company_info'],
                'website' => $client['website'],
                'location' => $client['location'],
            ]);
        }
    }
}
