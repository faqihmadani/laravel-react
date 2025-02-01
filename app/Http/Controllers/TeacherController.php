<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function view()
    {
        return Inertia::render('Teachers/View', [
            'teachers' => Teacher::with('classrooms')->get(),
            'classrooms' => Classroom::all(['id', 'name']),
        ]);
    }

    public function create()
    {
        $classrooms = Classroom::all(['id', 'name']);

        return Inertia::render('Teachers/Create', [
            'classrooms' => $classrooms
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'gender' => 'required',
            'subject' => 'required',
            'classrooms' => 'required'
        ]);

        $teacher = Teacher::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'gender' => $validated['gender'],
            'subject' => $validated['subject'],
        ]);

        $teacher->classrooms()->sync($validated['classrooms']);

        return redirect()->route('teacher.view');
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

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'gender' => 'required',
            'subject' => 'required',
            'classrooms' => 'required',
        ]);

        $teacher->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'gender' => $validated['gender'],
            'subject' => $validated['subject'],
        ]);

        $teacher->classrooms()->sync($validated['classrooms']);

        return redirect()->route('teacher.view');
    }

    public function delete($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return back()->with('success', 'Teacher deleted successfully!');
    }
}
