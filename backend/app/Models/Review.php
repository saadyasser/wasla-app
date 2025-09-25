<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $fillable = [
        'freelancer_profile_id',
        'project_id',
        'client_profile_id',
        'rating',
        'comment',
    ];

    public function freelancerProfile(): BelongsTo
    {
        return $this->belongsTo(FreelancerProfile::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function clientProfile(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class, 'client_profile_id');
    }
}
