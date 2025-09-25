<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            'Web Development',
            'Mobile App Development',
            'UI/UX Design',
            'Graphic Design',
            'SEO Optimization',
            'Content Writing',
            'Digital Marketing',
            'Data Analysis',
            'Project Management',
            'Machine Learning',
        ];

        foreach ($skills as $skill) {
            DB::table('skills')->insert([
                'name' => $skill,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
