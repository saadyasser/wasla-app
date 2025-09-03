<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{

    public function freelancerProfile(){
        return $this->belongsTo(FreelancerProfile::class,'freelancer_id');
    }

}
