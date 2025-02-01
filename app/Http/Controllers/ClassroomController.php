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
        $validated = $request->validate([
            'name' => 'required|string'
        ]);

        Classroom::create($validated);

        return redirect()->route('alldata.view');
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

        $validated = $request->validate([
            'name' => 'required|string'
        ]);

        $classroom->update($validated);

        return redirect()->route('alldata.view');
    }

    public function delete($id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->delete();

        return back()->with('success', 'Classroom deleted successfully!');
    }
}
