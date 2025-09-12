<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{HasMany, BelongsTo, BelongsToMany};

class FreelancerProfile extends Model
{


    protected $fillable = [
        'user_id',
        'title',
        'bio',
        'location',
        'profile_image_path',
        'phone_number',
        'website',
        'available',
        'hourly_rate'
    ];

    protected $casts = [
        'available' => 'boolean',
        'is_complete' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(
            Skill::class,
            'freelancer_skills',
            'freelancer_profile_id',
            'skill_id'
        );
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function socialLinks(): HasMany
    {
        return $this->hasMany(SocialLink::class);
    }

    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class);
    }

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class);
    }


    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class);
    }

    public function getIsCompleteAttribute(): bool
    {
        return !empty($this->title)
            && !empty($this->bio)
            && $this->skills()->exists()
            && $this->portfolios()->exists();
    }

    public function getTotalEarningsAttribute(): float
    {
        return $this->projects()->where('status', ProjectStatus::Completed->value)->sum('budget');
    }

    public function getCompletedProjectsCountAttribute()
    {
        return $this->projects()->where('status', ProjectStatus::Completed->value)->count();
    }


    public function getAverageRatingAttribute(): ?float
    {
        return $this->reviews()->avg('rating');
    }

    public function getReviewsCountAttribute(): int
    {
        return $this->reviews()->count();
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'freelancer_profile_id');
    }


    public function getProfileImageUrlAttribute(): string
    {
        if ($this->profile_image_path) {
            return asset('images/freelancerProfiles/' . $this->profile_image_path);
        }
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->user->name) . '&background=random&color=fff';
    }
}
