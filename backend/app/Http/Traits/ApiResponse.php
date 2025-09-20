<?php

namespace App\Http\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Pagination\LengthAwarePaginator;

trait ApiResponse
{
    /**
     * Return a consistent success JSON response.
     *
     * @param mixed $data
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */

    protected function successResponse($data, string $message = 'Success', int $code = Response::HTTP_OK): JsonResponse
    {


        if ($data instanceof LengthAwarePaginator || $data->resource instanceof LengthAwarePaginator) {
            $meta = [
                'current_page' => $data->currentPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'last_page' => $data->lastPage(),
            ];

            return response()->json([
                'code' => $code,
                'message' => $message,
                'data' => $data->items(),
                'meta' => $meta,
            ], $code);
        }

        return response()->json([
            'code' => $code,
            'message' => $message,
            'data' => $data,
            'meta' => null,
        ], $code);
    }

    /**
     * Return a consistent error JSON response.
     *
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected function errorResponse(string $message = 'An error occurred', int $code = Response::HTTP_INTERNAL_SERVER_ERROR): JsonResponse
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
            'data' => null, // Or an empty array, depends on preference
        ], $code);
    }
}
