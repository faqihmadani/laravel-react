import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ students, teachers, classrooms }) {
    // Student
    const [isOpenStudentModal, setIsOpenStudentModal] = useState(false)
    const [idDeletedStudent, setIdDeletedStudent] = useState(null)
    const handleStudentDelete = () => {
        router.delete(route("student.delete", idDeletedStudent))
        setIsOpenStudentModal(false)
        setIdDeletedStudent(null)
    }

    const [studentSelectedClassroom, setStudentSelectedClassroom] = useState("All")
    const filteredStudents = studentSelectedClassroom === "All" ? students : students.filter((student) => student.classroom.name === studentSelectedClassroom);

    // Teacher
    const [isOpenTeacherModal, setIsOpenTeacherModal] = useState(false)
    const [idDeletedTeacher, setIdDeletedTeacher] = useState(null)
    const handleTeacherDelete = () => {
        router.delete(route("teacher.delete", idDeletedTeacher))
        setIsOpenTeacherModal(false)
        setIdDeletedTeacher(null)
    }

    const [teacherSelectedClassroom, setTeacherSelectedClassroom] = useState("All")
    const filteredTeachers = teacherSelectedClassroom === "All" ? teachers : teachers.filter((teacher) => teacher.classrooms.some((classroom) => classroom.name === teacherSelectedClassroom));

    //Classroom
    const [isOpenClassroomModal, setIsOpenClassroomModal] = useState(false)
    const [idDeletedClassroom, setIdDeletedClassroom] = useState(null)
    const handleClassroomDelete = () => {
        router.delete(route("classroom.delete", idDeletedClassroom))
        setIsOpenClassroomModal(false)
        setIdDeletedClassroom(null)
    }







    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />


            {/* Warning Modal */}
            <div className={isOpenStudentModal ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" : "fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-20 hidden"}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold">Warning</h2>
                    <p className="mt-2 text-gray-600">Are you sure to delete this data?</p>
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleStudentDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        <button onClick={() => {
                            setIsOpenStudentModal(false)
                            setIdDeletedStudent(null)
                        }} className="px-4 py-2 bg-white border-2 border-gray-500 text-slate-800 rounded">Cancel</button>
                    </div>
                </div>
            </div>

            <div className={isOpenTeacherModal ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" : "fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-20 hidden"}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold">Warning</h2>
                    <p className="mt-2 text-gray-600">Are you sure to delete this data?</p>
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleTeacherDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        <button onClick={() => {
                            setIsOpenTeacherModal(false)
                            setIdDeletedTeacher(null)
                        }} className="px-4 py-2 bg-white border-2 border-gray-500 text-slate-800 rounded">Cancel</button>
                    </div>
                </div>
            </div>

            <div className={isOpenClassroomModal ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" : "fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-20 hidden"}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold">Warning</h2>
                    <p className="mt-2 text-gray-600">Are you sure to delete this data?</p>
                    <div className="mt-4 flex justify-between">
                        <button onClick={handleClassroomDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                        <button onClick={() => {
                            setIsOpenClassroomModal(false)
                            setIdDeletedClassroom(null)
                        }} className="px-4 py-2 bg-white border-2 border-gray-500 text-slate-800 rounded">Cancel</button>
                    </div>
                </div>
            </div>


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Students */}
                    <div className='flex items-center justify-between'>
                        <h1 className='my-5 text-2xl font-bold'>Students</h1>

                        <Link
                            className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                            href={route('student.create')}
                        >
                            Add Student
                        </Link>
                    </div>
                    <div>
                        <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Classroom Filter </label>

                        <select
                            name="student_classroom"
                            id="HeadlineAct"
                            className="mt-1.5 mb-5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                            onChange={(e) => { setStudentSelectedClassroom(e.target.value) }}
                        >
                            <option value="All">All</option>
                            {classrooms.map((classroom) => (
                                <option key={classroom.id} value={classroom.name}>{classroom.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gender</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Birthdate</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Classroom</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className='text-center'>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{student.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{student.email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{student.gender}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{student.birthdate}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{student.classroom.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <Link
                                                className="inline-block rounded border border-yellow-600 px-5 py-1 text-sm font-medium text-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring active:bg-yellow-500"
                                                href={route('student.edit', student.id)}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="inline-block ml-3 rounded border border-red-600 px-5 py-1 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
                                                onClick={() => {
                                                    setIsOpenStudentModal(true)
                                                    setIdDeletedStudent(student.id)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* Teachers */}
                    <div className='flex items-center justify-between mt-20'>
                        <h1 className='my-5 text-2xl font-bold'>Teachers</h1>

                        <Link
                            className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                            href={route('teacher.create')}
                        >
                            Add Teachers
                        </Link>
                    </div>
                    <div>
                        <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Classroom Filter </label>

                        <select
                            name="teacher_classroom"
                            id="HeadlineAct"
                            className="mt-1.5 mb-5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                            onChange={(e) => { setTeacherSelectedClassroom(e.target.value) }}
                        >
                            <option value="All">All</option>
                            {classrooms.map((classroom) => (
                                <option key={classroom.id} value={classroom.name}>{classroom.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gender</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Subject</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Classroom</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher.id} className='text-center'>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teacher.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{teacher.email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{teacher.gender}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{teacher.subject}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{teacher.classrooms.map((classroom) => classroom.name).join(', ')}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <Link
                                                className="inline-block rounded border border-yellow-600 px-5 py-1 text-sm font-medium text-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring active:bg-yellow-500"
                                                href={route('teacher.edit', teacher.id)}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="inline-block ml-3 rounded border border-red-600 px-5 py-1 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
                                                onClick={() => {
                                                    setIsOpenTeacherModal(true)
                                                    setIdDeletedTeacher(teacher.id)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* Classrooms */}
                    <div className='flex items-center justify-between mt-20'>
                        <h1 className='my-5 text-2xl font-bold'>Classrooms</h1>

                        <Link
                            className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                            href={route('classroom.create')}
                        >
                            Add Classroom
                        </Link>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {classrooms.map((classroom) => (
                                    <tr key={classroom.id} className='text-center'>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{classroom.name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <Link
                                                className="inline-block rounded border border-yellow-600 px-5 py-1 text-sm font-medium text-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring active:bg-yellow-500"
                                                href={route('classroom.edit', classroom.id)}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="inline-block ml-3 rounded border border-red-600 px-5 py-1 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
                                                onClick={() => {
                                                    setIsOpenClassroomModal(true)
                                                    setIdDeletedClassroom(classroom.id)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
