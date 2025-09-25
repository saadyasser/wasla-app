<?php

namespace App\Policies;

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project): bool
    {
        return $project->status === ProjectStatus::Open->value || $user->id === $project->clientProfile->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->clientProfile !== null;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project): bool
    {
        // الشرط الأول: لازم يكون المستخدم هو صاحب المشروع
        $isOwner = $user->id === $project->clientProfile->user_id;

        // الشرط الثاني: المشروع لازم يكون مفتوح فقط للتعديل
        $isOpen = $project->status->value === \App\Enums\ProjectStatus::Open->value;

        return $isOwner && $isOpen;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project): bool
    {
        // شرط أن يكون صاحب المشروع
        $isOwner = $user->id === $project->clientProfile->user_id;

        // شرط أن المشروع لسه مفتوح ولم يتم التعاقد مع فريلانسر
        $isOpen = $project->status->value === \App\Enums\ProjectStatus::Open->value
            && is_null($project->freelancer_profile_id);

        return $isOwner && $isOpen;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Project $project): bool
    {
        return false;
    }
}
