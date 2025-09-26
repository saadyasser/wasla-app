<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Review;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\StoreReviewRequest;
use App\Http\Requests\API\V1\UpdateReviewRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ReviewController extends Controller
{
    use ApiResponse, AuthorizesRequests;
    public function store(StoreReviewRequest $request, Project $project)
    {


        $this->authorize('create', [Review::class, $project]);

        $validated = $request->validated();

        $reviewData = array_merge($validated, [
            'client_profile_id'     => $project->client_profile_id,
            'freelancer_profile_id' => $project->freelancer_profile_id,
        ]);


        $review = $project->review()->create($reviewData);


        return $this->successResponse($review, 'Review created successfully.', 201);
    }

    public function update(UpdateReviewRequest $request, Review $review)
    {
        $this->authorize('update', $review);

        $validated = $request->validated();

        $review->update($validated);

        return $this->successResponse($review, 'Review updated successfully.', 200);
    }
}
