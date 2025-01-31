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

    public function edit($id)
    {
        $classroom = Classroom::findOrFail($id);

        return Inertia::render('Classrooms/Edit', [
            'classroom' => $classroom,
        ]);
    }

    public function update(Request $request, $id)
    {
        $classroom = Classroom::findOrFail($id);

        $classroom->update($request->all());

        return redirect()->route('dashboard');
    }

    public function delete($id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->delete();

        return redirect()->route('dashboard')->with('success', 'Classroom deleted successfully!');
    }
}
