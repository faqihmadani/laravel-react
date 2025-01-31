<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Classroom::create(['name' => 'Class A']);
        Classroom::create(['name' => 'Class B']);
        Classroom::create(['name' => 'Class C']);
    }
}
