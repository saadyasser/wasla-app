<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // استرجاع جميع العملاء
        $clientIds = DB::table('client_profiles')->pluck('id')->toArray();

        // استرجاع جميع المهارات
        $skillIds = DB::table('skills')->pluck('id')->toArray();

        $projectsData = [
            [
                'title' => 'E-commerce Website Development',
                'description' => 'Build a responsive e-commerce website with payment integration and admin panel.',
                'budget' => 2500.00,
                'deadline' => '2025-10-15',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'Mobile App for Food Delivery',
                'description' => 'Create a mobile app for food delivery with GPS tracking and push notifications.',
                'budget' => 4000.00,
                'deadline' => '2025-11-01',
                'experience_level' => 'expert',
            ],
            [
                'title' => 'Logo and Branding Design',
                'description' => 'Design a professional logo and branding kit for a new startup.',
                'budget' => 800.00,
                'deadline' => '2025-09-30',
                'experience_level' => 'entry',
            ],
            [
                'title' => 'SEO Optimization for Blog',
                'description' => 'Optimize blog content for SEO and improve Google search ranking.',
                'budget' => 600.00,
                'deadline' => '2025-10-10',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'Social Media Marketing Campaign',
                'description' => 'Plan and execute a social media marketing campaign for 3 months.',
                'budget' => 1500.00,
                'deadline' => '2025-11-20',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'Data Analysis for Sales',
                'description' => 'Analyze sales data and provide actionable insights and dashboards.',
                'budget' => 2000.00,
                'deadline' => '2025-10-25',
                'experience_level' => 'expert',
            ],
            [
                'title' => 'Website Redesign',
                'description' => 'Redesign an existing corporate website with modern UI/UX standards.',
                'budget' => 3000.00,
                'deadline' => '2025-11-05',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'Machine Learning Model',
                'description' => 'Develop a predictive machine learning model for customer churn analysis.',
                'budget' => 5000.00,
                'deadline' => '2025-12-01',
                'experience_level' => 'expert',
            ],
            [
                'title' => 'Content Writing for Website',
                'description' => 'Write high-quality content for website pages and blog posts.',
                'budget' => 700.00,
                'deadline' => '2025-10-05',
                'experience_level' => 'entry',
            ],
            [
                'title' => 'Mobile Game Development',
                'description' => 'Develop a 2D mobile game for Android and iOS platforms.',
                'budget' => 3500.00,
                'deadline' => '2025-12-10',
                'experience_level' => 'expert',
            ],
            [
                'title' => 'Corporate Video Editing',
                'description' => 'Edit promotional videos for corporate branding and marketing campaigns.',
                'budget' => 1200.00,
                'deadline' => '2025-10-20',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'UI/UX Design for App',
                'description' => 'Design UI/UX for a mobile application with multiple screens and flows.',
                'budget' => 1800.00,
                'deadline' => '2025-10-18',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'Email Marketing Automation',
                'description' => 'Set up automated email marketing sequences and templates.',
                'budget' => 900.00,
                'deadline' => '2025-10-12',
                'experience_level' => 'entry',
            ],
            [
                'title' => 'Corporate Branding Strategy',
                'description' => 'Develop a complete branding strategy for a startup company.',
                'budget' => 2200.00,
                'deadline' => '2025-11-15',
                'experience_level' => 'expert',
            ],
            [
                'title' => 'Mobile App Bug Fixing',
                'description' => 'Fix bugs and optimize performance for an existing mobile application.',
                'budget' => 1200.00,
                'deadline' => '2025-09-28',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'Landing Page Design',
                'description' => 'Design a high-converting landing page for a product launch.',
                'budget' => 600.00,
                'deadline' => '2025-10-02',
                'experience_level' => 'entry',
            ],
            [
                'title' => 'Analytics Dashboard Development',
                'description' => 'Create a dashboard for visualizing key business metrics.',
                'budget' => 2500.00,
                'deadline' => '2025-11-10',
                'experience_level' => 'expert',
            ],
            [
                'title' => 'Social Media Graphics',
                'description' => 'Design graphics for social media posts and campaigns.',
                'budget' => 500.00,
                'deadline' => '2025-10-08',
                'experience_level' => 'entry',
            ],
            [
                'title' => 'WordPress Website Setup',
                'description' => 'Set up a WordPress website with plugins and custom theme configuration.',
                'budget' => 1500.00,
                'deadline' => '2025-10-22',
                'experience_level' => 'intermediate',
            ],
            [
                'title' => 'AI Chatbot Development',
                'description' => 'Develop an AI-powered chatbot for customer support integration.',
                'budget' => 4000.00,
                'deadline' => '2025-11-30',
                'experience_level' => 'expert',
            ],
        ];

        foreach ($projectsData as $project) {
            // اختيار عشوائي للعميل
            $clientId = $clientIds[array_rand($clientIds)];

            // إدراج المشروع
            $projectId = DB::table('projects')->insertGetId([
                'client_profile_id' => $clientId,
                'title' => $project['title'],
                'description' => $project['description'],
                'budget' => $project['budget'],
                'deadline' => $project['deadline'],
                'status' => 'open', // كل المشاريع Open
                'experience_level' => $project['experience_level'],
                'freelancer_profile_id' => null, // لم يتم اختيار فريلانسر بعد
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // ربط المشروع بمجموعة مهارات عشوائية (2-4 مهارات)
            shuffle($skillIds);
            $selectedSkills = array_slice($skillIds, 0, rand(2, 4));

            foreach ($selectedSkills as $skillId) {
                DB::table('project_skills')->insert([
                    'project_id' => $projectId,
                    'skill_id' => $skillId,

                ]);
            }
        }
    }
}
