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
        Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
            'classroom_id' => $request->classroom_id,
        ]);

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
        $student = Student::findOrFail($id);

        $student->update($request->all());

        return redirect()->route('dashboard');
    }

    public function delete($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return redirect()->route('dashboard')->with('success', 'Student deleted successfully!');
    }
}
