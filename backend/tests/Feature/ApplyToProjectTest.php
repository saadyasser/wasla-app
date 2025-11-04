<?php

use App\Enums\ProjectStatus;
use App\Models\User;
use App\Models\Project;
use App\Models\Proposal;
use App\Models\FreelancerProfile;
use Laravel\Sanctum\Sanctum;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('apply to non existing project returns 404', function () {
    $user = User::factory()->create();
    FreelancerProfile::factory()->create(['user_id' => $user->id]);
    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/projects/122/apply', [
        'cover_letter' => 'Test cover letter',
        'budget' => 500,
        'estimated_duration' => '2 weeks',
    ]);

    $response->assertStatus(404)
        ->assertJson([
            'code' => 404,
            'message' => 'Project not found',
            'data' => null,
        ]);
});

test('cannot apply twice to same project', function () {
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
        'estimated_duration' => '1 week',
    ]);

    $response->assertStatus(409)
        ->assertJson([
            'code' => 409,
            'message' => 'You have already applied to this project.',
            'data' => null,
        ]);
});

test('successful proposal submission with attachment', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    FreelancerProfile::factory()->create(['user_id' => $user->id]);
    Sanctum::actingAs($user);

    $project = Project::factory()->create(['status' => 'open']);
    $file = UploadedFile::fake()->create('attachment.pdf', 100);

    $response = $this->postJson("/api/v1/projects/{$project->id}/apply", [
        'cover_letter' => 'Test cover letter',
        'budget' => 500,
        'estimated_duration' => '2 weeks',
        'attachment' => $file,
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'message' => 'Proposal submitted successfully',
        ]);

    $responseData = $response->json('data');
    expect($responseData['attachment_url'])->not->toBeNull();

    $path = str_replace(url('/storage') . '/', '', $responseData['attachment_url']);
    Storage::disk('public')->assertExists($path);
});

test('cannot apply to project if status not open', function () {
    $user = User::factory()->create();
    FreelancerProfile::factory()->create(['user_id' => $user->id]);
    Sanctum::actingAs($user);

    $project = Project::factory()->create(["status" => ProjectStatus::Completed->value]);

    $response = $this->postJson("/api/v1/projects/{$project->id}/apply", [
        'cover_letter' => 'Test',
        'budget' => 100,
        'estimated_duration' => '1 week',
    ]);

    $response->assertStatus(403)
        ->assertJson([
            'code' => 403,
            'message' => 'You can only apply to open projects.',
            'data' => null,
        ]);
});
