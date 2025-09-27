<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\ClientProfile;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clientsData = [
            [
                'user_name' => 'Ahmed Al Ali',
                'company_name' => 'ArabTech Solutions',
                'company_info' => 'A technology company specialized in developing websites and mobile apps for startups across the Middle East.',
                'website' => 'https://www.arabtechsolutions.com',
                'location' => 'Riyadh, Saudi Arabia',
            ],
            [
                'user_name' => 'Sara Mahmoud',
                'company_name' => 'E-Home Marketing Agency',
                'company_info' => 'A digital marketing agency offering social media management and SEO services to Arab companies.',
                'website' => 'https://www.ehome-marketing.com',
                'location' => 'Dubai, UAE',
            ],
            [
                'user_name' => 'Mohammed Abdullah',
                'company_name' => 'Creative Content Agency',
                'company_info' => 'An agency specializing in Arabic content writing and content marketing across the web.',
                'website' => 'https://www.creativecontentarabia.com',
                'location' => 'Cairo, Egypt',
            ],
            [
                'user_name' => 'Layla Hussein',
                'company_name' => 'GreenTech Middle East',
                'company_info' => 'A media company focusing on sustainable technologies and eco-friendly initiatives in the Arab world.',
                'website' => 'https://www.greentechme.com',
                'location' => 'Beirut, Lebanon',
            ],
            [
                'user_name' => 'Khaled Youssef',
                'company_name' => 'StartUp Arabia Ventures',
                'company_info' => 'Startup incubator and venture capital firm supporting early-stage tech startups in the Arab region.',
                'website' => 'https://www.startuparabia.com',
                'location' => 'Doha, Qatar',
            ],
            [
                'user_name' => 'Noor Al Hadi',
                'company_name' => 'NextGen Marketing Arabia',
                'company_info' => 'Marketing and branding solutions for tech companies looking to expand in the Middle East.',
                'website' => 'https://www.nextgenarabia.com',
                'location' => 'Manama, Bahrain',
            ],
            [
                'user_name' => 'Abdulrahman Ali',
                'company_name' => 'BrightWave Arabia Solutions',
                'company_info' => 'IT consulting and software development company specializing in web and mobile apps.',
                'website' => 'https://www.brightwavearabia.com',
                'location' => 'Muscat, Oman',
            ],
            [
                'user_name' => 'Safaa Murad',
                'company_name' => 'OmranTech Smart Cities',
                'company_info' => 'Smart city technology solutions provider for urban infrastructure and IoT in the Arab region.',
                'website' => 'https://www.omrantech.com',
                'location' => 'Amman, Jordan',
            ],
            [
                'user_name' => 'Jamal Al Hassan',
                'company_name' => 'Arab Vision Labs',
                'company_info' => 'Research and development lab for AI and machine learning applications in the Arab world.',
                'website' => 'https://www.arabvisionlabs.com',
                'location' => 'Algiers, Algeria',
            ],
            [
                'user_name' => 'Esraa Tawfiq',
                'company_name' => 'AlphaTech Arabia Solutions',
                'company_info' => 'Software solutions company delivering enterprise-level applications and services across the Middle East.',
                'website' => 'https://www.alphatecharabia.com',
                'location' => 'Tunis, Tunisia',
            ],
        ];

        foreach ($clientsData as $client) {
            $user = User::create([
                'name' => $client['user_name'],
                'email' => strtolower(Str::slug($client['user_name'])) . '@example.com',
                'email_verified_at' => now(),
                'password' => 'password123', // will be hashed by mutator
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
