<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    public function create()
    {
        return Inertia::render('Classrooms/Create');
    }

    public function store(Request $request)
    {
        Classroom::create([
            'name' => $request->name,
        ]);

        return redirect()->route('dashboard');
    }
}
