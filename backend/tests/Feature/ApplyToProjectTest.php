<?php

namespace Tests\Feature;

use App\Enums\ProjectStatus;
use Tests\TestCase;
use App\Models\User;
use App\Models\Project;
use App\Models\Proposal;
use Laravel\Sanctum\Sanctum;
use App\Models\FreelancerProfile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ApplyToProjectTest extends TestCase
{
    /** @test */
    public function test_apply_to_non_existing_project_returns_404()
    {

        $user = User::factory()->create();
        Sanctum::actingAs($user);


        $response = $this->postJson('/api/v1/projects/99999/apply', [
            'cover_letter' => 'Test cover letter',
            'budget'       => 500,
            'timeline'     => '2 weeks',
        ]);


        $response->assertStatus(404)
                 ->assertJson([
                     'code' => 404,
                     'message' => 'Project not found',
                     'data' => null,
                 ]);
    }



      /** @test */
    public function test_cannot_apply_twice_to_same_project()
    {
        $user = User::factory()->create();
        $freelancerProfile = FreelancerProfile::factory()->create(['user_id' => $user->id]);
        Sanctum::actingAs($user);

        $project = Project::factory()->create(['status' => 'open']);

        Proposal::factory()->create([
            'project_id' => $project->id,
            'freelancer_profile_id' => $freelancerProfile->id,
        ]);

        $response = $this->postJson("/api/v1/projects/{$project->id}/apply", [
            'cover_letter' => 'Test',
            'budget' => 100,
            'timeline' => '1 week',
        ]);

        $response->assertStatus(409)
                 ->assertJson([
                     'code' => 409,
                     'message' => 'You have already applied to this project.',
                     'data' => null,
                 ]);
    }


     /** @test */
    public function test_successful_proposal_submission_with_attachment()
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $freelancerProfile = FreelancerProfile::factory()->create(['user_id' => $user->id]);
        Sanctum::actingAs($user);

        $project = Project::factory()->create(['status' => 'open']);

        $file = UploadedFile::fake()->create('attachment.pdf', 100);

        $response = $this->postJson("/api/v1/projects/{$project->id}/apply", [
            'cover_letter' => 'Test cover letter',
            'budget' => 500,
            'timeline' => '2 weeks',
            'attachment' => $file,
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'message' => 'Proposal submitted successfully',
                 ]);

        $responseData = $response->json('data');
        $this->assertNotNull($responseData['attachment']);

        Storage::disk('public')->assertExists($responseData['attachment']);
    }


     /** @test */
    public function test_cannot_apply_to_project_if_status_not_open()
    {
        $user = User::factory()->create();
        $freelancerProfile = FreelancerProfile::factory()->create(['user_id' => $user->id]);
        Sanctum::actingAs($user);

        $project = Project::factory()->create(["status"=>ProjectStatus::Completed->value]);
        $response = $this->postJson("/api/v1/projects/{$project->id}/apply", [
            'cover_letter' => 'Test',
            'budget' => 100,
            'timeline' => '1 week',
        ]);

        $response->assertStatus(403)
                 ->assertJson([
                     'code' => 403,
                     'message' => 'You can only apply to open projects.',
                     'data' => null,
                 ]);
    }

}
