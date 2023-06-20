<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\ResponseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NewsAuthorController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return ResponseController::response(message: "News Authors", code: Response::HTTP_OK, data: cache()->get('news_authors') ?? []);
    }
}
