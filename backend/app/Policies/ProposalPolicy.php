<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Proposal;
use App\Enums\ProjectStatus;

class ProposalPolicy
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
    public function view(User $user, Proposal $proposal): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models (apply to a project).
     */
    public function create(User $user, $project)
    {
        // تحقق إذا للمستخدم ملف Freelancer
        if ($user->freelancerProfile === null) {
            abort(response()->json([
                'code' => 403,
                'message' => 'You need a freelancer profile to apply.',
                'data' => null,
            ], 403));
        }

        // تحقق إذا المشروع مفتوح
        if ($project->status->value !== ProjectStatus::Open->value) {
            abort(response()->json([
                'code' => 403,
                'message' => 'You can only apply to open projects.',
                'data' => null,
            ], 403));
        }

        // تحقق إذا المستخدم قدم عرض سابق
        if ($project->proposals()->where('freelancer_profile_id', $user->freelancerProfile->id)->exists()) {
            abort(response()->json([
                'code' => 409,
                'message' => 'You have already applied to this project.',
                'data' => null,
            ], 409));
        }

        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Proposal $proposal): bool
    {
        $isOwner = $user->freelancerProfile->id === $proposal->freelancer_profile_id;
        $isOpen = $proposal->project->status->value === ProjectStatus::Open->value;

        return $isOwner && $isOpen;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Proposal $proposal): bool
    {
        return $user->freelancerProfile->id === $proposal->freelancer_profile_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Proposal $proposal): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Proposal $proposal): bool
    {
        return false;
    }

    /**
     * Determine whether the user can accept the proposal.
     */
    public function accept(User $user, Proposal $proposal)
    {
        return $user->clientProfile->id === $proposal->project->client_profile_id;
    }
}
