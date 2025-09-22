<?php

namespace App\Http\Middleware;

use App\Http\Traits\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckFreelancer
{
    use ApiResponse;
    public function handle(Request $request, Closure $next): Response
    {
       $user = Auth::user();

        if (!$user || !$user->freelancerProfile) {
            return $this->errorResponse('User is not a freelancer or freelancer profile not found.', 403); // 403 Forbidden لأن المستخدم غير مخول الدخول كعميل
        }

        return $next($request);
    }
}
