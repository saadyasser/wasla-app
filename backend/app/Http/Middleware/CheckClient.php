<?php

namespace App\Http\Middleware;

use App\Http\Traits\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckClient
{
    use ApiResponse;
    public function handle(Request $request, Closure $next): Response
    {
       $user = Auth::user();

        // تحقق إذا المستخدم مسجل ومدى توفر معلومة أنه عميل (يمكن تغيير الشرط حسب سير العمل الخاص بك)
        if (!$user || !$user->clientProfile) {
            return $this->errorResponse('User is not a client or client profile not found.', 403); // 403 Forbidden لأن المستخدم غير مخول الدخول كعميل
        }

        return $next($request);
    }
}
