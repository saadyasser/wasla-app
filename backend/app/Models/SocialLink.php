<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
     protected $fillable = [
        'freelancer_profile_id',
        'platform_name',
        'url',
    ];

    public function freelancerProfile()
    {
        return $this->belongsTo(FreelancerProfile::class);
    }
}
