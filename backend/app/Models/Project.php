<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use App\Enums\ExperienceLevel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{

    use HasFactory;
    protected $fillable = [
        'client_profile_id',
        'title',
        'description',
        'budget',
        'deadline',
        'status',
        'freelancer_profile_id',
        'experience_level',
        'completed_at'
    ];

    protected $casts = [
        'status' => ProjectStatus::class,
        'budget' => 'decimal:2',
        'deadline' => 'date',
        'experience_level' => ExperienceLevel::class,
    ];

    protected $attributes = [
        'status' => ProjectStatus::Open->value,
    ];

    protected $dates = ['deadline', 'completed_at'];

    public static function boot()
    {
        parent::boot();

        static::updating(function ($project) {
            if ($project->isDirty('status') && $project->status === ProjectStatus::Completed->value) {
                $project->completed_at = now();
            }
        });
    }
    public function freelancerProfile(): BelongsTo
    {
        return $this->belongsTo(FreelancerProfile::class, 'freelancer_profile_id');
    }

    public function clientProfile(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class, 'client_profile_id');
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class)->latest();
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'project_skills');
    }


    public function scopeActive($query)
    {
        return $query->whereIn('status', [ProjectStatus::Completed->value, ProjectStatus::InProgress->value]);
    }


    // duration weeks
    public function getDurationAttribute(): ?string
    {
        if (!$this->created_at || (!$this->completed_at && !$this->deadline)) {
            return null;
        }

        if ($this->status === ProjectStatus::Completed->value) {
            $endDate = $this->completed_at ?? $this->deadline;
        } else {
            $endDate = $this->deadline ?? now();
        }

        $days = $this->created_at->diffInDays($endDate);
        $weeks = ceil($days / 7);

        return $weeks > 0 ? "{$weeks} weeks" : null;
    }

    public function getCompletedAtAttribute($value): ?string
    {
        return $value ? \Carbon\Carbon::parse($value)->toDateString() : null;
    }



    public function getRatingAttribute()
    {
        return $this->review ? number_format($this->review->rating, 1) : null;
    }

    public function scopeFilter($query, $filters)
    {
        // Search text (case-insensitive)
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhereHas('skills', function ($q2) use ($search) {
                        $q2->where('name', 'LIKE', "%{$search}%");
                    });
            });
        }

        // Budget range
        if (!empty($filters['budget_min']) && !empty($filters['budget_max'])) {
            $query->whereBetween('budget', [$filters['budget_min'], $filters['budget_max']]);
        } elseif (!empty($filters['budget_max'])) {
            $query->where('budget', '<=', $filters['budget_max']);
        } elseif (!empty($filters['budget_min'])) {
            $query->where('budget', '>=', $filters['budget_min']);
        }


        // Experience level
        if (!empty($filters['experience_level'])) {
            $query->where('experience_level', $filters['experience_level']);
        }

        // Skills filter (accepts string "1,2,3" or array [1,2,3])
        if (!empty($filters['skills'])) {
            $skills = is_array($filters['skills']) ? $filters['skills'] : explode(',', $filters['skills']);
            $query->whereHas('skills', function ($q) use ($skills) {
                $q->whereIn('skills.id', $skills);
            });
        }

        return $query;
    }
}
