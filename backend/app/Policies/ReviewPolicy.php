<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Review;
use App\Models\Project;
use App\Enums\ProjectStatus;
use Illuminate\Auth\Access\Response;

class ReviewPolicy
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
    public function view(User $user, Review $review): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Project $project): bool
    {
        return $user->clientProfile
            && $project->client_profile_id === $user->clientProfile->id
            && $project->status->value === ProjectStatus::Completed->value
            && $project->freelancer_profile_id
            && !$project->review()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Review $review): bool
    {
        // العميل فقط يمكنه تعديل تقييمه
        // وفقط إذا هو مالك الـ Review
        //  فترة السماح للتعديل (مثلاً 24 ساعة)
        $allowedPeriod = now()->subHours(24); // 24 ساعة

        return $user->clientProfile
            && $review->client_profile_id === $user->clientProfile->id
            && $review->created_at >= $allowedPeriod;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Review $review): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Review $review): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Review $review): bool
    {
        return false;
    }
}
