<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
        protected $fillable = [
        'freelancer_profile_id',
        'certification_name',
        'certification_url',
    ];

    public function freelancerProfile()
    {
        return $this->belongsTo(FreelancerProfile::class);
    }
}
