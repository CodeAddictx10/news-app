<?php

namespace App\Services;

use App\Contracts\NewsProviderInterface;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;

class GuardianNewsService implements NewsProviderInterface
{
    public function get(string $url, array $payload = []): Response
    {
        return Http::acceptJson()->get(config('app.guardian.url') . $url, array_merge($payload, ["api-key" => config('app.guardian.api_key')]));
    }

    /**
     * Get breaking news from provider
     * @return array
     */
    public function topHeadline(): array
    {
        try {
            $response = $this->get("/search", [
                "page-size" => 10,
                "format" => "json",
                "show-tags" => "contributor",
                "show-fields" => "thumbnail,trailText",
              ]);

            if($response->successful()) {
                $data = collect($response->json()['response']['results']);
                return $data->take(2)->map(function ($item) {
                    return [
                        "id" => $item['id'],
                        "author" => collect($item['tags'])->map(function ($tag) {
                            return $tag['webTitle'];
                        })->toArray(),
                        "title" => $item['webTitle'],
                        "source" => "The Guardian",
                        "publishedAt" => $item['webPublicationDate'],
                        "publishedAtFormatted" => Carbon::parse($item['webPublicationDate'])->diffForHumans(),
                        "description" => $item['fields']['trailText'],
                        "category" => $item['sectionName'],
                        "url" => $item['webUrl'],
                        "images" => [
                          "url" => $item['fields']['thumbnail']
                        ],
                        "provider" => "GuardianNews",
                    ];
                })->toArray();
            }
            return [];
        } catch (\Throwable $th) {
            return [
              ["error" => "An error occurred while fetching top headline", "provider" => "GuardianNews", "message" => $th->getMessage()]
            ];
        }

    }

    /**
     * Get news from provider
     * @return array<string, mixed>
     */
    public function getNews(array $query): array
    {
        try {
            $response = $this->get("/search", array_merge([
                "format" => "json",
                "show-tags" => "contributor",
                "show-fields" => "thumbnail,trailText",
              ], $query));

            if($response->successful()) {
                $data = collect($response->json()['response']['results']);
                return $data->map(function ($item) {
                    return [
                        "id" => $item['id'],
                        //split array
                        "author" => collect($item['tags'])->map(function ($tag) {
                            return $tag['webTitle'];
                        })->toArray(),
                        "title" => $item['webTitle'],
                        "source" => "guardian-news",
                        "publishedAt" => $item['webPublicationDate'],
                        "publishedAtFormatted" => Carbon::parse($item['webPublicationDate'])->diffForHumans(),
                        "description" => $item['fields']['trailText'],
                        "category" => $item['sectionName'],
                        "url" => $item['apiUrl'],
                        "images" => [
                          "url" => optional($item['fields'])['thumbnail']
                        ],
                        "provider" => "GuardianNews",
                    ];
                })->toArray();
            }
            return [];
        } catch (\Throwable $th) {
            return [
              ["error" => "An error occurred while fetching top headline", "provider" => "GuardianNews", "message" => $th->getMessage()]
            ];
        }

    }

    /**
     * Get all sources from news provider
     * @return array
     */
    public function getSources(): array
    {
        return [
            [
              "id" => "guardian-news",
              "name" => "The Guardian News",
              "provider" => "GuardianNews",
          ]
        ];
    }

    /**
     * Get all categories from news provider
     * @return array
     */
    public function getCategories(): array
    {
        try {

            if (cache()->has('GuardianNews_Sources')) {
                return cache()->get('GuardianNews_Sources');
            }

            $response = $this->get("/sections", []);

            if($response->successful()) {
                $data = collect($response->json()['response']['results']);
                $transformedData = $data->map(function ($source) {
                    return [
                        "id" => $source['id'],
                        "name" => $source['webTitle'],
                        "provider" => "GuardianNews",
                    ];
                })->toArray();
                cache()->put('GuardianNews_Sources', $transformedData, 60 * 60 * 24 * 30);
                return $transformedData;
            }
            return [];
        } catch (\Throwable $th) {
            return [
              ["error" => "An error occurred while fetching categories", "provider" => "GuardianNews", "message" => $th->getMessage()]
            ];
        }

    }

}
