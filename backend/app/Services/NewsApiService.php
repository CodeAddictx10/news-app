<?php

namespace App\Services;

use App\Contracts\NewsProviderInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Carbon;

class NewsApiService implements NewsProviderInterface
{
    public function get(string $url, array $payload = []): Response
    {
        return Http::withHeaders(
            ["X-Api-Key" => config('app.news_org.api_key')]
        )->acceptJson()->get(config('app.news_org.url') . $url, $payload);
    }

    /**
     * Get breaking news from provider
     * @return array
     */
    public function topHeadline(): array
    {
        try {
            $response = $this->get("/v2/top-headlines", [
              "country" => "us",
            ]);

            if($response->successful()) {
                $data = collect($response->json()['articles']);
                return $data->take(2)->map(function ($item) {
                    return [
                        "id" => $item['title'],
                        "author" => [$item['author']],
                        "title" => $item['title'],
                        "source" => $item['source']['name'],
                        "publishedAt" => $item['publishedAt'],
                        "publishedAtFormatted" => Carbon::parse($item['publishedAt'])->diffForHumans(),
                        "description" => $item['description'],
                        "category" => "general",
                        "url" => $item['url'],
                        "images" => [
                          "url" => $item['urlToImage']
                        ],
                        "provider" => "NewsAPI",
                    ];
                })->toArray();
            }
            return [];
        } catch (\Throwable $th) {
            return [
              ["error" => "An error occurred while fetching top headline", "provider" => "NewsAPI", "message" => $th->getMessage()]
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
            $response = $this->get(
                "/v2/everything",
                array_merge([
              "language" => "en",
              "sources" => collect($this->getSources())->pluck('name')->random(30)->implode(','),
            ], $query)
            );

            if($response->successful()) {
                $data = collect($response->json()['articles']);
                return $data->map(function ($item) {
                    return [
                        "id" => $item['title'],
                        "author" => [$item['author']],
                        "title" => $item['title'],
                        "source" => $item['source']['name'],
                        "publishedAt" => $item['publishedAt'],
                        "publishedAtFormatted" => Carbon::parse($item['publishedAt'])->diffForHumans(),
                        "description" => $item['description'],
                        "category" => "general",
                        "url" => $item['url'],
                        "images" => [
                          "url" => $item['urlToImage']
                        ],
                        "provider" => "NewsAPI",
                    ];
                })->toArray();
            }
            return [];
        } catch (\Throwable $th) {
            return [
              ["error" => "An error occurred while fetching news", "provider" => "NewsAPI", "message" => $th->getMessage()]
            ];
        }

    }

    /**
     * Get all sources from news provider
     * @return array
     */
    public function getSources(): array
    {
        try {
            if (cache()->has('news_sources')) {
                return cache()->get('news_sources');
            }
            $response = $this->get("/v2/top-headlines/sources");

            if($response->successful()) {
                $data = collect($response->json()['sources']);
                $transformedData = $data->map(function ($source) {
                    return [
                        "id" => $source['id'],
                        "name" => $source['name'],
                        "provider" => "NewsAPI",
                    ];
                })->toArray();
                cache()->put('NewsAPI_sources', $transformedData, 60 * 60 * 24 * 30);
                return  $transformedData;
            }
            return [];
        } catch (\Throwable $th) {
            return [["error" => "An error occurred while fetching sources", "provider" => "NewsAPI"]];
        }

    }

    /**
     * Get all categories from news provider
     * @return array
     */
    public function getCategories(): array
    {
        return [
            [
              "id" => "business",
              "name" => "Business",
              "provider" => "NewsAAPI",
            ],
            [
              "id" => "entertainment",
              "name" => "Entertainment",
              "provider" => "NewsAAPI",
            ],
            [
              "id" => "general",
              "name" => "General",
              "provider" => "NewsAAPI",
            ],
            [
              "id" => "health",
              "name" => "Health",
              "provider" => "NewsAAPI",
            ],
            [
              "id" => "science",
              "name" => "Science",
              "provider" => "NewsAAPI",
            ],
            [
              "id" => "sports",
              "name" => "Sports",
              "provider" => "NewsAAPI",
            ],
            [
              "id" => "technology",
              "name" => "Technology",
              "provider" => "NewsAAPI",
            ]
        ];
    }

}
