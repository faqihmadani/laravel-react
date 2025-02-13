import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

const Create = ({ classrooms }) => {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        gender: 'male',
        birthdate: '',
        classroom_id: '1',
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('student.store'), {
            onSuccess: () => {
                setTimeout(() => {
                    toast.success("Student added successfully");
                }, 500);
            },
            onError: () => {
                toast.error("Failed to add student. Please try again.");
            },
        });
    };

    // toast("Hello World")

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Student
                </h2>
            }
        >
            <Head title="Add Student" />

            <div className="py-12">
                <div className="mx-auto flex flex-col gap-5 max-w-7xl sm:px-6 lg:px-60">
                    <label
                        className="relative block overflow-hidden rounded-md border bg-white border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            onChange={(e) => handleChange(e)}
                            type="string"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                            Name
                        </span>
                    </label>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <label
                        htmlFor="UserEmail"
                        className="relative block overflow-hidden rounded-md border bg-white border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            onChange={(e) => handleChange(e)}
                            type="email"
                            name='email'
                            id="UserEmail"
                            placeholder="Email"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                        >
                            Email
                        </span>
                    </label>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <fieldset className="grid grid-cols-2 gap-4">
                        <legend className="sr-only">Gender</legend>

                        <div>
                            <label
                                className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                            >
                                <div>
                                    <p className="text-gray-700">Gender</p>
                                    <p className="mt-1 text-gray-900">Male</p>
                                </div>

                                <input
                                    type="radio"
                                    className="size-5 border-gray-300 text-blue-500"
                                    name="gender"
                                    value="male"
                                    checked={data.gender === "male"}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label
                                htmlFor="DeliveryPriority"
                                className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                            >
                                <div>
                                    <p className="text-gray-700">Gender</p>

                                    <p className="mt-1 text-gray-900">Female</p>
                                </div>

                                <input
                                    type="radio"
                                    className="size-5 border-gray-300 text-blue-500"
                                    name="gender"
                                    value="female"
                                    checked={data.gender === "female"}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </fieldset>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

                    <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Birthdate </label>
                    <input onChange={handleChange} name="birthdate" className="border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200" type="date" id="" />
                    {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate}</p>}

                    <div>
                        <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900"> Classroom </label>

                        <select
                            name="classroom_id"
                            onChange={handleChange}
                            id="HeadlineAct"
                            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        >
                            {classrooms.map((classroom) => (
                                <option key={classroom.id} value={classroom.id}>{classroom.name}</option>
                            ))}

                        </select>
                        {errors.classroom_id && <p className="text-red-500 text-sm">{errors.classroom_id}</p>}
                    </div>
                    <Button onClick={handleSubmit}
                        className="inline-block rounded text-center border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        href="#"
                    >
                        Add Student
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
