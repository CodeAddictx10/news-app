<?php

namespace App\Services;

use App\Services\NewsApiService;
use App\Services\NYTimesService;
use App\Services\GuardianNewsService;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Auth\Authenticatable;
use App\Models\User;

class NewsService
{
    public function __construct(private readonly NewsApiService $newApiService, private readonly NYTimesService $nyTimesService, private readonly GuardianNewsService $guardianNewsService)
    {

    }

    /**
     * Get sources from news provider
     * @return array
     */
    public function getNewsSources(): array
    {
        if (cache()->has('news_sources')) {
            return cache()->get('news_sources');
        }
        $newsApi = $this->newApiService->getSources();
        $nyTimes = $this->nyTimesService->getSources();
        $guardian = $this->guardianNewsService->getSources();
        $sources = collect(array_merge($newsApi, $nyTimes, $guardian));
        $sources = $sources->sortBy('id')->values()->toArray();
        cache()->put('news_sources', $sources, 60 * 60 * 24 * 30);
        return $sources;
    }

    /**
     * Get sources from news provider
     * @return array
     */
    public function getNewsCategories(): array
    {
        $newsApi = $this->newApiService->getCategories();
        $nyTimes = $this->nyTimesService->getCategories();
        $guardian = $this->guardianNewsService->getCategories();
        $categories = collect(array_merge($newsApi, $nyTimes, $guardian));
        $categories = $categories->sortBy('id')->values()->unique('id')->values()->toArray();
        return $categories;
    }

    /**
     * Get Top Headline from news provider
     * @return Collection
     */
    public function getTopHeadline(): Collection
    {

        $newsApi = $this->newApiService->topHeadline();
        $nyTimes = $this->nyTimesService->topHeadline();
        $guardian = $this->guardianNewsService->topHeadline();
        $topHeadline = collect(array_merge($newsApi, $guardian, $nyTimes));
        $topHeadline = $topHeadline->sortBy('title')->groupBy('provider');
        return $topHeadline;

    }

    /**
     * Get personalized News
     * @return Collection
     */
    public function getPersonalizedNews(User|Authenticatable|null $user): Collection
    {
        if(!$user) {
            return collect();
        }
        // return collect($user);
        $newsApi =$this->newApiService->getNews([]);
        $nyTimes = $this->nyTimesService->getNews([]);
        $guardian = $this->guardianNewsService->getNews([]);
        $news = collect(array_merge($newsApi, $guardian, $nyTimes));
        $authorFilter = $news->map(function ($item) {
            $item['author'] = is_array(optional($item['author'])) ? collect(optional($item['author']))->flatten() : $item['author'];
            return $item;
        })->when($user->settings["authors"], fn ($news) => $news->whereIn('author', $user->settings["authors"]));
        $categoryFilter = $news->when($user->settings["categories"], fn ($news) => $news->whereIn('category', $user->settings["categories"]));
        $sourceFilter = $news->when($user->settings["sources"], fn ($news) => $news->whereIn('source', $user->settings["sources"]));
        // return $news->sortBy('publishedAt')->groupBy('category');
        //merge $authorFilter, $categoryFilter and $sourceFilter
        $news = $authorFilter->merge($categoryFilter)->merge($sourceFilter)->sortBy('publishedAt')->unique('title')->groupBy('category');
        return $news;
    }

    /**
     * Get news from news providers
     * @return Collection
     */
    public function getNews(Collection $query): Collection
    {
        $newsApi =$this->newApiService->getNews(array());
        $nyTimes = $this->nyTimesService->getNews($this->queryBuilder($query, 'NYTimes'));
        $guardian = $this->guardianNewsService->getNews($this->queryBuilder($query, 'GuardianNews'));
        $news = collect(array_merge($newsApi, $guardian, $nyTimes));

        //cache news authors for 24 hours
        if (!cache()->has('news_authors')) {
            $authors = $news->pluck('author')->unique()->values()->flatten()->filter(fn ($item) => $item != "")->toArray();

            cache()->put('news_authors', $authors, 60 * 60 * 24);
        }

        $news = $news->sortBy('publishedAt')->groupBy('category');
        return $news;
    }


    //News Query Builder
    public function queryBuilder(Collection $filterBy, String $provider): array
    {
        if($filterBy->isEmpty()) {
            return [];
        }
        $query = [];
        if($provider == 'GuardianNews') {
            $filterBy->when($filterBy->has('category'), function ($collection) use (&$query) {
                $query['section'] = $collection->get('category');
            })
            ->when($filterBy->has('from'), function ($collection) use (&$query) {
                $query['from-date'] = Carbon::parse($collection->get('from'))->format('Y-m-d');
            })
            ->when($filterBy->has('to'), function ($collection) use (&$query) {
                $query['to-date'] = Carbon::parse($collection->get('to'))->format('Y-m-d');
            })
            ->when($filterBy->has('query'), function ($collection) use (&$query) {
                $query['q'] = $collection->get('query');
                $query['query-fields'] = "body";
            })
            ->when($filterBy->has('ids'), function ($collection) use (&$query) {
                $query['ids'] = $collection->get('ids');
            });
        }

        if($provider == 'NYTimes') {
            $filterBy->when($filterBy->has('from'), function ($collection) use (&$query) {
                $query['begin_date'] = Carbon::parse($collection->get('from'))->format('Ymd');
            })
            ->when($filterBy->has('to'), function ($collection) use (&$query) {
                $query['end_date'] = Carbon::parse($collection->get('to'))->format('Ymd');
            })
            ->when($filterBy->has('query'), function ($collection) use (&$query) {
                $query['q'] = $collection->get('query');
            });
            $query['facet'] = true;
            $query['facet_filter'] = true;
            $query['facet_fields'] = "section_name,source,subsection_name";
        }

        if($provider == 'NewsAPI') {
            $filterBy->when($filterBy->has('sources'), function ($collection) use (&$query) {
                $query['sources'] = $collection->get('sources');
            })
            ->when($filterBy->has('from'), function ($collection) use (&$query) {
                $query['from'] = Carbon::parse($collection->get('from'))->format('Y-m-d');
            })
            ->when($filterBy->has('to'), function ($collection) use (&$query) {
                $query['to'] = Carbon::parse($collection->get('to'))->format('Ymd');
            })
            ->when($filterBy->has('query'), function ($collection) use (&$query) {
                $query['q'] = $collection->get('query');
            });
            $query['searchIn'] = "title,description";
        }

        return $query;
    }

}
