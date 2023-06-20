<?php

namespace App\Services;

use App\Contracts\NewsProviderInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Carbon;

class NYTimesService implements NewsProviderInterface
{
    public function get(string $url, array $payload = []): Response
    {
        return Http::acceptJson()->get(config('app.ny_times.url') . $url, array_merge($payload, ["api-key" => config('app.ny_times.api_key')]));
    }

    /**
     * Get breaking news from provider
     * @return array
     */
    public function topHeadline(): array
    {
        try {
            $response = $this->get("/svc/topstories/v2/home.json");

            if($response->successful()) {
                $data = collect($response->json()['results']);
                return $data->take(2)->map(function ($item) {
                    return [
                        "id" => $item['title'],
                        "author" => str_replace("By ", "", $item['byline']),
                        "title" => $item['title'],
                        "source" => "New York Times",
                        "publishedAt" => $item['published_date'],
                        "publishedAtFormatted" => Carbon::parse($item['published_date'])->diffForHumans(),
                        "description" => $item['abstract'],
                        "category" => $item['section'],
                        "url" => $item['url'],
                        "images" => [
                          "url" => collect($item['multimedia'])->first()['url']
                        ],
                        "provider" => "NYTimes",
                    ];
                })->toArray();
            }
            return [];
        } catch (\Throwable $th) {
            return [
              ["error" => "An error occurred while fetching top headline", "provider" => "NYTimes", "message" => $th->getMessage()]
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
            $response = $this->get("/svc/search/v2/articlesearch.json", $query);

            if($response->successful()) {
                $data = collect($response->json()['response']['docs']);
                return $data->map(function ($item) {
                    return [
                        "id" => $item['headline']['main'],
                        "author" => str_replace("By ", "", $item['byline']['original']),
                        "title" => $item['headline']['main'],
                        "source" => "NYTimes",
                        "publishedAt" => $item['pub_date'],
                        "publishedAtFormatted" => Carbon::parse($item['pub_date'])->diffForHumans(),
                        "description" => $item['lead_paragraph'],
                        "category" => $item['section_name'],
                        "url" => $item['web_url'],
                        "images" => [
                          "url" => optional(collect($item['multimedia'])->first())['url']
                        ],
                        "provider" => "NYTimes",
                    ];
                })->toArray();
            }
            return $response->json();
        } catch (\Throwable $th) {
            return [
              ["error" => "An error occurred while fetching news", "provider" => "NYTimes", "message" => $th->getMessage()]
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
              "id" => "nytimes",
              "name" => "NYTimes",
              "provider" => "NYTimes",
          ]
        ];
    }

    /**
     * Get all categories from news provider
     * @return array
     */
    public function getCategories(): array
    {
        return   [
          [
          "id" => "arts",
          "name" => "Arts",
          "provider" => "NYTimes"
        ],
        [
          "id" => "automobiles",
          "name" => "Automobiles",
          "provider" => "NYTimes"
        ],
        [
          "id" => "books/review",
          "name" => "Books/Review",
          "provider" => "NYTimes"
        ],
        [
          "id" => "business",
          "name" => "Business",
          "provider" => "NYTimes"
        ],
        [
          "id" => "fashion",
          "name" => "Fashion",
          "provider" => "NYTimes"
        ],
        [
          "id" => "food",
          "name" => "Food",
          "provider" => "NYTimes"
        ],
        [
          "id" => "health",
          "name" => "Health",
          "provider" => "NYTimes"
        ],
        [
          "id" => "home",
          "name" => "Home",
          "provider" => "NYTimes"],
        [
          "id" => "insider",
          "name" => "Insider",
          "provider" => "NYTimes"
        ],
        [
          "id" => "magazine",
          "name" => "Magazine",
          "provider" => "NYTimes"
        ],
        [
          "id" => "movies",
          "name" => "Movies",
          "provider" => "NYTimes"
        ],
        [
          "id" => "nyregion",
          "name" => "NYRegion",
          "provider" => "NYTimes"
        ],
        [
          "id" => "obituaries",
          "name" => "Obituaries",
          "provider" => "NYTimes"
        ],
        [
          "id" => "opinion",
          "name" => "Opinion",
          "provider" => "NYTimes"
        ],
        [
          "id" => "politics",
          "name" => "Politics",
          "provider" => "NYTimes"
        ],
        [
          "id" => "realestate",
          "name" => "Real Estate",
          "provider" => "NYTimes"
        ],
        [
        "id" => "science",
        "name" => "Science",
        "provider" => "NYTimes"
      ],
      [
        "id" => "sports",
        "name" => "Sports",
        "provider" => "NYTimes"
      ],
      [
        "id" => "sundayreview",
        "name" => "Sunday Review",
        "provider" => "NYTimes"
      ],
      [
        "id" => "technology",
        "name" => "Technology",
        "provider" => "NYTimes"
      ],
      [
        "id" => "theater",
        "name" => "Theater",
        "provider" => "NYTimes"
      ],
      [
        "id" => "t-magazine",
        "name" => "T-Magazine",
        "provider" => "NYTimes"
      ],
      [
        "id" => "travel",
        "name" => "Travel",
        "provider" => "NYTimes"
      ],
      [
        "id" => "upshot",
        "name" => "Upshot",
        "provider" => "NYTimes"
      ],
      [
        "id" => "us",
        "name" => "US",
        "provider" => "NYTimes"
      ],
      [
        "id" => "world",
        "name" => "World",
        "provider" => "NYTimes"
      ],
    ];
    }

}
