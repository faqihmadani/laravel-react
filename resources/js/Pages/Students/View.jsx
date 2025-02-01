import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

const View = ({ students, classrooms }) => {
    // Student
    const [isOpenStudentModal, setIsOpenStudentModal] = useState(false)
    const [idDeletedStudent, setIdDeletedStudent] = useState(null)
    const handleStudentDelete = () => {
        router.delete(route("student.delete", idDeletedStudent))
        setIsOpenStudentModal(false)
        setIdDeletedStudent(null)

        toast.success("Student deleted successfully");
    }

    const [studentSelectedClassroom, setStudentSelectedClassroom] = useState("All")
    const filteredStudents = studentSelectedClassroom === "All" ? students : students.filter((student) => student.classroom.name === studentSelectedClassroom);

    const groupedStudents = filteredStudents.reduce((acc, item) => {
        const classroomId = item.classroom_id;

        if (!acc[classroomId]) {
            acc[classroomId] = [];
        }

        acc[classroomId].push(item);

        return acc;
    }, {});

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Students
                </h2>
            }
        >
            <Head title="All Students" />

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


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Students */}
                    <div className='flex items-center justify-between'>

                        <Link
                            className="inline-block rounded ml-auto border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
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
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Classroom</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gender</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Birthdate</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {/* {filteredStudents.map((student) => (
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
                                ))} */}

                                {Object.keys(groupedStudents).map((classroom) => (
                                    groupedStudents[classroom].map((student, index) => (
                                        <tr className="text-center" key={student.id}>
                                            {index === 0 && (
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700" rowSpan={groupedStudents[classroom].length}>{student.classroom.name}</td>
                                            )}
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{student.name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{student.email}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{student.gender}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{student.birthdate}</td>
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
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}

export default View;
