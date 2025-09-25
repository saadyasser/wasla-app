<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientProfile extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'company_name',
        'website',
        'company_info',
        'location'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
