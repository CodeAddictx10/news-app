<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class UserService
{
    /**
     * Create a new user
     * @param array<string, mixed> $payload
     * @return User
     */
    public function create(array $payload): User
    {
        $payload["settings"] = [
            "categories" => [],
            "authors" => [],
            "sources" => [],
        ];
        return  User::create($payload);
    }

    /**
     * Update  user
     * @param array<string, mixed> $payload
     * @return User
     */
    public function update(User|Authenticatable|null $user, array $payload): bool
    {
        if(!$user) {
            return false;
        }
        return  $user->update($payload);
    }
}
