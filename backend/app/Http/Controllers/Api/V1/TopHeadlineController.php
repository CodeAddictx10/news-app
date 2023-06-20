<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\NewsService;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ResponseController;
use Illuminate\Http\Response;

class TopHeadlineController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(NewsService $newsService)
    {
        return ResponseController::response(message: "Top Headline News", code: Response::HTTP_OK, data: $newsService->getTopHeadline());
    }
}
