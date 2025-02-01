<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function view()
    {
        return Inertia::render('Students/View', [
            'students' => Student::with('classroom')->get(),
            'classrooms' => Classroom::all(['id', 'name']),
        ]);
    }

    public function create()
    {
        $classrooms = Classroom::all(['id', 'name']);

        return Inertia::render('Students/Create', [
            'classrooms' => $classrooms,
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


        return redirect()->route('student.view');
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

        return redirect()->route('student.view');
    }

    public function delete($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return back()->with('success', 'Student deleted successfully!');
    }
}
