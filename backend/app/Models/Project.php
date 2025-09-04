<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function client(){
        return $this->belongsTo(User::class);
    }

    public function applications(){
        return $this->hasMany(Application::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function skills(){
        return $this->belongsToMany(Skill::class,'project_skills');
    }
}
