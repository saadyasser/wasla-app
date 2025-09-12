<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['name'];

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_skills');
    }



   public function freelancers() {
    return $this->belongsToMany(
        FreelancerProfile::class,
        'freelancer_skills',
        'skill_id',
        'freelancer_profile_id'
    );
}
}
