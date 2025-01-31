<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function create()
    {
        $classrooms = Classroom::all(['id', 'name']);

        return Inertia::render('Students/Create', [
            'classrooms' => $classrooms
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'gender' => 'required',
            'birthdate' => 'required',
            'classroom_id' => 'required',
        ]);

        Student::create($validated);

        return redirect()->route('dashboard');
    }

    public function edit($id)
    {
        $classrooms = Classroom::all(['id', 'name']);
        $student = Student::findOrFail($id);

        return Inertia::render('Students/Edit', [
            'student' => $student,
            'classrooms' => $classrooms
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'gender' => 'required',
            'birthdate' => 'required',
            'classroom_id' => 'required',
        ]);

        $student = Student::findOrFail($id);

        $student->update($validated);

        return redirect()->route('dashboard');
    }

    public function delete($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return redirect()->route('dashboard')->with('success', 'Student deleted successfully!');
    }
}
