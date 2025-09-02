<?php

namespace App\Enums;

enum UserRole: string
{
    case Freelancer = 'freelancer';
    case Client = 'client';
    case Support = 'support';
}
