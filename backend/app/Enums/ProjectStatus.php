<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Open = 'open';
    case InProgress = 'in-progress';
    case Completed = 'completed';
    case Canceled = 'canceled';
}
