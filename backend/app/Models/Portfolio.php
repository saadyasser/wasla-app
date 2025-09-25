<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'freelancer_profile_id',
        'title',
        'url',
        'description',
    ];
    public function freelancerProfile()
    {
        return $this->belongsTo(FreelancerProfile::class);
    }
}
