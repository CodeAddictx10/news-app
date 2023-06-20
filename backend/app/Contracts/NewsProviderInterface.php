<?php

namespace App\Contracts;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Collection;

interface NewsProviderInterface
{
    /**
     * all post request to the api
     */
    public function get(string $url, array $payload): Response;

    /**
     * Get breaking news from provider
     * @return array
     */
    public function topHeadline(): array;

    /**
     * Get news from provider
     * @return array<string, mixed>
     */
    public function getNews(array $filterBy): array;

    /**
     * Get all sources from news provider
     * @return array
     */
    public function getSources(): array;

    /**
     * Get all categories from news provider
     * @return array
     */
    public function getCategories(): array;



}
