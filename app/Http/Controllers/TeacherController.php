<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function create()
    {
        $classrooms = Classroom::all(['id', 'name']);

        return Inertia::render('Teachers/Create', [
            'classrooms' => $classrooms
        ]);
    }

    public function store(Request $request)
    {
        $teacher = Teacher::create([
            'name' => $request->name,
            'email' => $request->email,
            'gender' => $request->gender,
            'subject' => $request->subject,
            'classroom_id' => $request->classroom_id,
        ]);

        $teacher->classrooms()->sync($request->classrooms);

        return redirect()->route('dashboard');
    }

    public function edit($id)
    {
        $classrooms = Classroom::all(['id', 'name']);
        $teacher = Teacher::findOrFail($id);

        return Inertia::render('Teachers/Edit', [
            'teacher' => $teacher->load('classrooms'),
            'classrooms' => $classrooms
        ]);
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);

        $teacher->update($request->all());

        $teacher->classrooms()->sync($request->classrooms);

        return redirect()->route('dashboard');
    }

    public function delete($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return redirect()->route('dashboard')->with('success', 'Teacher deleted successfully!');
    }
}
