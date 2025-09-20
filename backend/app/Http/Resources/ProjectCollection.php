<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\Freelancer\ProjectResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProjectCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public    $collects=ProjectResource::class;
    public function toArray(Request $request): array
    {

         if ($this->resource instanceof LengthAwarePaginator) {
            return [
                'data' => $this->collection,
                'links' => [
                    'first' => $this->resource->url(1),
                    'last' => $this->resource->url($this->resource->lastPage()),
                    'prev' => $this->resource->previousPageUrl(),
                    'next' => $this->resource->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $this->resource->currentPage(),
                    'per_page' => $this->resource->perPage(),
                    'total' => $this->resource->total(),
                    'last_page' => $this->resource->lastPage(),
                ]
            ];
        }

        // في حالة عدم استخدام pagination
        return parent::toArray($request);
    }
    }

