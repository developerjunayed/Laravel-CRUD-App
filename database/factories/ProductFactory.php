<?php
namespace Database\Factories;

use App\Models\Product; // Add this import
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    // Optional but safer: explicitly tell Laravel which model this is for
    protected $model = Product::class;

    public function definition(): array
    {
        // Use the global fake() helper directly
        return [
            'name'        => fake()->words(3, true),
            'category'    => fake()->randomElement(['Category 1', 'Category 2', 'Category 3']),
            'price'       => fake()->randomFloat(2, 10, 500),
            'description' => fake()->paragraph(),
            'created_at'  => fake()->dateTimeThisYear(),
        ];
    }
}