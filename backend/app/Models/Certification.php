<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'freelancer_profile_id',
        'certification_name',
        'certification_url',
        'description',
        'issuer',
        'date_obtained',
        'expiry_date'
    ];

    public function freelancerProfile()
    {
        return $this->belongsTo(FreelancerProfile::class);
    }
}
