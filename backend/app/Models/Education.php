<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'freelancer_profile_id',
        'university',
        'degree',
        'field',
        'from',
        'to'
    ];
    protected $table = 'educations';

    public function freelancerProfile()
    {
        return $this->belongsTo(FreelancerProfile::class);
    }
}
