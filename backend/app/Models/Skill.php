<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    public function projects(){
        return $this->belongsToMany(Project::class,'project_skills');
    }

    public function users(){
        return $this->belongsToMany(User::class,'user_skills');
    }
}
