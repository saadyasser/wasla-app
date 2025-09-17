<?php

namespace App\Services\Freelancer;

use App\Models\User;
use App\Models\FreelancerProfile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class FreelancerProfileService
{
    /**
     * تحميل بيانات بروفايل الفريلانسر مع العلاقات.
     */
    public function loadProfileWithRelations(User $user): FreelancerProfile
    {
        $freelancerProfile = $user->freelancerProfile;

        $freelancerProfile->loadMissing([
            'user',
            'skills',
            'portfolios',
            'socialLinks',
            'certifications',
            'educations',
            'projects' => function ($query) {
                $query->active()->with([
                    'skills:id,name',
                    'clientProfile:id,user_id,company_name',
                    'review',
                ]);
            },
            'projects.clientProfile.user',
        ]);

        $freelancerProfile->loadCount([
            'projects as completed_projects_count' => fn($query) =>
            $query->where('status', \App\Enums\ProjectStatus::Completed->value),
            'reviews as reviews_count',
        ]);

        $freelancerProfile->append([
            'average_rating',
            'total_earnings',
        ]);

        return $freelancerProfile;
    }

    /**
     * تحديث صورة البروفايل.
     */
    public function updateProfileImage(FreelancerProfile $freelancer, $file): FreelancerProfile
    {
        // حذف الصورة القديمة
        if ($freelancer->profile_image_path) {
            Storage::disk('public')->delete('freelancerProfiles/' . $freelancer->profile_image_path);
        }

        // رفع الصورة الجديدة
        $fileName = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('freelancerProfiles', $fileName, 'public');

        $freelancer->profile_image_path = basename($path);
        $freelancer->save();

        return $freelancer;
    }

    /**
     * تحديث بيانات الفريلانسر + بيانات المستخدم.
     */
    public function updateProfile(User $user, array $userData, array $freelancerData): FreelancerProfile
    {
        $freelancer = $user->freelancerProfile;

        // تحديث بيانات المستخدم
        $user->update($userData);

        // تحديث بيانات الفريلانسر
        $freelancer->update($freelancerData);

        return $freelancer;
    }

    /**
     * حذف حساب الفريلانسر + المستخدم.
     */
    public function deleteFreelancerAccount(User $user): void
    {
        DB::transaction(function () use ($user) {
            $freelancer = $user->freelancerProfile;

            if ($freelancer) {
                if ($freelancer->profile_image_path) {
                    Storage::disk('public')->delete('freelancerProfiles/' . $freelancer->profile_image_path);
                }
                $freelancer->delete();
            }

            $user->delete();
        });
    }
}
