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

        $projects = [
            [
                'title' => 'Arabic-English Translation for Educational Content',
                'budget' => 800,
                'deadline' => '2025-11-20',
                'experience_level' => 'intermediate',
                'description' => "We need a skilled translator to translate educational materials from Arabic to English.
Focus: Palestinian history and culture.
Requirements:
- Native fluency in Arabic and English
- Experience with educational content translation
- Understanding of Palestinian culture and history
- Attention to detail and cultural sensitivity
- Ability to maintain the educational tone and accuracy",
            ],
            [
                'title' => 'Multi-Vendor E-commerce Platform Development',
                'budget' => 9500,
                'deadline' => '2025-12-15',
                'experience_level' => 'expert',
                'description' => "Build a multi-vendor e-commerce platform with:
- Vendor dashboards
- Product management
- Integrated payment gateways (Stripe, PayPal, local)
- Shipping modules
- Analytics dashboards
- Arabic/English support
Requirements:
- Strong experience with Laravel or Node.js frameworks
- Multi-language and multi-vendor support
- Integration with Stripe, PayPal, and local payment gateways
- Advanced analytics dashboard and reporting
- Clean, maintainable, and scalable codebase",
            ],
            [
                'title' => 'Mobile App for Food Delivery',
                'budget' => 4000,
                'deadline' => '2025-11-01',
                'experience_level' => 'expert',
                'description' => "Create a mobile app for food delivery with:
- GPS tracking
- Push notifications
- Multiple payment methods
Requirements:
- Experience with Flutter or React Native
- Strong backend integration skills (Laravel/Node)
- Ability to handle large number of simultaneous orders
- UI/UX experience for customer apps",
            ],
            [
                'title' => 'Corporate Branding Strategy',
                'budget' => 2200,
                'deadline' => '2025-11-15',
                'experience_level' => 'expert',
                'description' => "Develop a complete branding strategy for a startup company.
Requirements:
- Brand positioning and market research experience
- Develop logo, typography, color palette
- Competitor analysis
- Brand tone and messaging guide
- Creative direction for campaigns",
            ],
            [
                'title' => 'Data Analysis for Sales',
                'budget' => 2000,
                'deadline' => '2025-10-25',
                'experience_level' => 'expert',
                'description' => "Analyze sales data and provide actionable insights and dashboards.
Requirements:
- Strong experience with SQL and BI tools
- Ability to build dashboards (Tableau/PowerBI)
- Data cleaning and visualization
- Predictive analysis",
            ],
            [
                'title' => 'SEO Optimization for Blog',
                'budget' => 600,
                'deadline' => '2025-10-10',
                'experience_level' => 'intermediate',
                'description' => "Optimize blog content for SEO and improve Google search ranking.
Requirements:
- Keyword research and SEO tools experience
- On-page & off-page optimization
- Technical SEO audits
- Backlink strategy",
            ],
            [
                'title' => 'Landing Page Design',
                'budget' => 600,
                'deadline' => '2025-10-02',
                'experience_level' => 'entry',
                'description' => "Design a high-converting landing page for a product launch.
Requirements:
- UX/UI design experience
- A/B testing knowledge
- Integration with marketing tools (Mailchimp/Hubspot)",
            ],
            [
                'title' => 'Machine Learning Model Development',
                'budget' => 5000,
                'deadline' => '2025-12-01',
                'experience_level' => 'expert',
                'description' => "Develop a predictive machine learning model for customer churn analysis.
Requirements:
- Python & scikit-learn expertise
- Data preprocessing and feature engineering
- Model evaluation and optimization
- Deployment of ML models",
            ],
            [
                'title' => 'WordPress Website Setup',
                'budget' => 1500,
                'deadline' => '2025-10-22',
                'experience_level' => 'intermediate',
                'description' => "Set up a WordPress website with plugins and custom theme configuration.
Requirements:
- WordPress theme customization
- Plugin configuration and security
- SEO-friendly structure",
            ],
            [
                'title' => 'Social Media Marketing Campaign',
                'budget' => 1500,
                'deadline' => '2025-11-20',
                'experience_level' => 'intermediate',
                'description' => "Plan and execute a social media marketing campaign for 3 months.
Requirements:
- Experience in creating content calendars
- Paid ad campaign management
- Analytics tracking and reporting
- Creative ad copywriting",
            ],
        ];

        foreach ($projects as $project) {

            $clientId = $clientIds[array_rand($clientIds)];


            $projectId = DB::table('projects')->insertGetId([
                'client_profile_id' => $clientId,
                'freelancer_profile_id' => null,
                'title' => $project['title'],
                'description' => $project['description'],
                'budget' => $project['budget'],
                'deadline' => $project['deadline'],
                'status' => 'open',
                'experience_level' => $project['experience_level'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // ربط المشروع بمهارات عشوائية (2-4 مهارات)
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
