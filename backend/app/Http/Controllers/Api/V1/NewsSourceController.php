<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\NewsService;
use App\Http\Controllers\Api\ResponseController;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class NewsSourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(NewsService $newsService): JsonResponse
    {
        return ResponseController::response(message: "News Sources", code: Response::HTTP_OK, data: $newsService->getNewsSources());
    }
}
