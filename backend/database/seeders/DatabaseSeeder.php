<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Template;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'contact@example.invalid',
        // ]);

        Template::insert([
            [
                'name' => 'Business Template',
                'preview_image' => 'https://via.placeholder.com/300x200?text=Business',
                'content' => json_encode(["title" => "Business Website", "sections" => ["About Us", "Services", "Contact"]]),
            ],
            [
                'name' => 'Portfolio Template',
                'preview_image' => 'https://via.placeholder.com/300x200?text=Portfolio',
                'content' => json_encode(["title" => "Portfolio Website", "sections" => ["Projects", "Skills", "Contact"]]),
            ],
        ]);
    }
}
