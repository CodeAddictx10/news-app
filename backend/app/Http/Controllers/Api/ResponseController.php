<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ResponseController extends Controller
{
    /**
     * API response format
     * @param string $message
     * @param mixed|null $data
     * @param int|string $code
     * @return JsonResponse
     */
    public static function response(string $message, int|string $code, mixed $data = null): JsonResponse
    {
        $status = self::getStatusMessage((int) $code);
        if ($data) {
            return response()->json([
                "status" => $status,
                'message' => $message,
                'data' => $data,
            ], (array_key_exists($code, Response::$statusTexts)) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return response()->json([
            "status" => $status,
            'message' => $message,
        ], (array_key_exists($code, Response::$statusTexts)) ? $code : Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public static function getStatusMessage(int $code): string
    {
        if(in_array($code, haystack: self::$success)) {
            return 'success';
        }
        if(in_array($code, haystack: self::$error)) {
            return 'error';
        }
        return 'failed';
    }

    public static $success = [
        100 ,
        101,
        102,            // RFC2518
        103 ,
        200,
        201 ,
        202,
        203,
        204 ,
        205 ,
        206 ,
        207 ,
        208 ,
        226
    ];

    // list all error http codes in an array
    public static $error = [
        400 ,
        401 ,
        402 ,
        403 ,
        404 ,
        405 ,
        406 ,
        407 ,
        408 ,
        409 ,
        410 ,
        411 ,
        412 ,
        413 ,
        414 ,
        415 ,
        416 ,
        417 ,
        418 ,
        421 ,
        422 ,
        423 ,
        424 ,
        425 ,
        426 ,
        428 ,
        429 ,
        431 ,
        451 ,
        500 ,
        501 ,
        502 ,
        503 ,
        504 ,
        505 ,
        506 ,
        507 ,
        508 ,
        510 ,
        511
    ];

}
