<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Category::class;
    public function definition()
    {
            return [
                'parent_name' => $this->faker->sentence($nbWords = 2, $variableNbWords = true),
                'name' => $this->faker->sentence($nbWords = 2, $variableNbWords = true),
            ];
      
    }
}
