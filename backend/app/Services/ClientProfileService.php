<?php

namespace App\Services;

use Exception;
use App\Models\User;
use App\Enums\ProjectStatus;
use Illuminate\Support\Facades\DB;

class ClientProfileService
{
    /**
     * تحميل بروفايل العميل مع المشاريع والإحصائيات.
     *
     * @param User $user
     * @return \App\Models\ClientProfile
     */
    public function loadProfileWithRelations(User $user)
    {
        $clientProfile = $user->clientProfile;

        if (!$clientProfile) {
            throw new \Exception("Client profile not found.");
        }

        // تحميل العلاقات المهمة لتجنب مشكلة N+1
        $this->loadRelations($clientProfile);

        // حساب إحصائيات المشاريع
        $this->loadProjectStats($clientProfile);

        return $clientProfile;
    }


    protected function loadRelations($clientProfile): void
    {
        $clientProfile->loadMissing([
            'user',
            'projects.skills',
            'projects.review',
            'projects.clientProfile.user',
        ]);
    }


    /**
     * حساب إحصائيات المشاريع المختلفة.
     */
    protected function loadProjectStats($clientProfile): void
    {
        $statusMap = [
            'open_projects_count' => ProjectStatus::Open->value,
            'completed_projects_count' => ProjectStatus::Completed->value,
            'in_progress_projects_count' => ProjectStatus::InProgress->value,
        ];

        $counts = [
            'projects as total_projects_count', // كل المشاريع
        ];

        // إضافة كل إحصائية حسب الحالة
        foreach ($statusMap as $alias => $status) {
            $counts["projects as $alias"] = fn($query) => $query->where('status', $status);
        }

        $clientProfile->loadCount($counts);
    }
    /**
     * تحديث بيانات العميل وبيانات المستخدم.
     *
     * @param User $user
     * @param array $userData
     * @param array $clientData
     * @return \App\Models\ClientProfile
     */
    public function updateProfile(User $user, array $userData, array $clientData)
    {
        if (!empty($userData)) $user->update($userData);
        if (!empty($clientData)) $user->clientProfile->update($clientData);

        return $user->clientProfile;
    }

    /**
     * حذف حساب العميل والمشاريع الغير مهمة فقط.
     * يمنع الحذف إذا كان العميل مرتبطًا بمشاريع in-progress أو completed.
     *
     * @param User $user
     * @throws Exception
     */
    // public function deleteClientAccount(User $user): void
    // {
    //     $clientProfile = $user->clientProfile;

    //     if (!$clientProfile) {
    //         throw new Exception("Client profile not found.");
    //     }

    //     // تحقق المشاريع المهمة
    //     $importantProjectsCount = $clientProfile->projects()
    //         ->whereIn('status', [
    //             ProjectStatus::InProgress->value,
    //             ProjectStatus::Completed->value
    //         ])
    //         ->count();

    //     if ($importantProjectsCount > 0) {
    //         throw new Exception("Cannot delete client: associated with active or completed projects.");
    //     }

    //     // حذف المشاريع الغير مهمة مع العميل
    //     DB::transaction(function () use ($clientProfile, $user) {
    //         $clientProfile->projects()
    //             ->whereIn('status', [
    //                 ProjectStatus::Open->value,
    //                 ProjectStatus::Canceled->value
    //             ])
    //             ->delete();

    //         $clientProfile->delete();
    //         $user->delete();
    //     });
    // }
}
