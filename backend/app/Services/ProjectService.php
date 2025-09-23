<?php

namespace App\Services;

use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectService
{

    public function getAllProjects(array $filters = [])
    {
        return Project::with(['clientProfile.user', 'skills'])
            ->where('status', \App\Enums\ProjectStatus::Open->value)
            ->filter($filters)
            ->latest()
            ->paginate(10);
    }


    public function loadRelations(Project $project)
    {
        return $project->load([
            'clientProfile.user',
            'freelancerProfile.user',
            'skills',
            'review'
        ]);
    }

    public function createProject(User $user, array $data): Project
    {
        return DB::transaction(function () use ($user, $data) {
            $project = $user->clientProfile->projects()->create($data);


            $project->skills()->sync($data['skills'] ?? []);

            return $project->load('skills', 'clientProfile');
        });
    }


    public function updateProject(Project $project, array $data): Project
    {
        return DB::transaction(function () use ($project, $data) {
            $project->update($data);
            if (isset($data['skills'])) {
                $project->skills()->sync($data['skills']);
            }
            return $this->loadRelations($project);
        });
    }


    public function deleteProject(Project $project): void
    {
        $project->delete();
    }
}
