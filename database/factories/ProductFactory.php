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
        return [
            'name' => $this->faker->word(),
            'category' => $this->faker->word(),
            'price' => $this->faker->randomFloat(2, 1, 100),
            'description' => $this->faker->sentence(),
            'created_at' => $this->faker->dateTimeThisYear()
        ];
    }
}