<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Proposal extends Model
{
    use HasFactory;
      protected $fillable = [
        'project_id',
        'freelancer_profile_id',
        'cover_letter',
        'attachment',
        'budget',
        'timeline',
    ];

    protected $appends = ['attachment_url'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function freelancerProfile()
    {
        return $this->belongsTo(FreelancerProfile::class);
    }

    public function getAttachmentUrlAttribute()
    {
        return $this->attachment
            ? asset('storage/' . $this->attachment)
            : null;
    }
}
