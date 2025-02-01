import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";
import React from 'react';

const View = ({ students, teachers, classrooms }) => {
    const [studentSelectedClassroom, setStudentSelectedClassroom] = useState("All")
    const filteredStudents = studentSelectedClassroom === "All" ? students : students.filter((student) => student.classroom.name === studentSelectedClassroom);

    console.log(filteredStudents);

    // Teacher
    const [teacherSelectedClassroom, setTeacherSelectedClassroom] = useState("All")
    const filteredTeachers = teacherSelectedClassroom === "All" ? teachers : teachers.filter((teacher) => teacher.classrooms.some((classroom) => classroom.name === teacherSelectedClassroom));
    console.log(filteredTeachers);

    const groupedData = {}
    filteredStudents.forEach((s) => {
        const className = s.classroom.name;
        if (!groupedData[className]) {
            groupedData[className] = { students: [], teachers: [] };
        }
        groupedData[className].students.push(s.name);
    });

    filteredTeachers.forEach((t) => {
        t.classrooms.forEach((classroom) => {
            const className = classroom.name;
            if (!groupedData[className]) {
                groupedData[className] = { students: [], teachers: [] };
            }
            groupedData[className].teachers.push(t.name);
        });
    });

    console.log(groupedData);

    //Classroom
    const [isOpenClassroomModal, setIsOpenClassroomModal] = useState(false)
    const [idDeletedClassroom, setIdDeletedClassroom] = useState(null)
    const handleClassroomDelete = () => {
        router.delete(route("classroom.delete", idDeletedClassroom))
        setIsOpenClassroomModal(false)
        setIdDeletedClassroom(null)

        toast.success("Classroom deleted successfully")
    }

    return (<>
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    All Data
                </h2>
            }
        >
            <Head title="All Data" />

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
                        <h1 className='my-5 text-2xl font-bold'>All Data</h1>


                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Classroom</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Students Name</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Teachers Name</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Object.keys(groupedData).map((className) => {
                                    const { students, teachers } = groupedData[className];

                                    return (
                                        <tr className="text-center" key={className}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{className}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{students.join(', ')}</td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{teachers.join(', ')}</td>
                                        </tr>
                                    );
                                })}
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
    </>);
}

export default View; <>
</>
