import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

const Edit = ({ classroom }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: classroom.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('classroom.update', classroom.id), {
            onSuccess: () => {
                setTimeout(() => {
                    toast.success("Classroom updated successfully");
                }, 500);
            },
            onError: () => {
                toast.error("Failed to update Classroom. Please try again.");
            },
        });
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Classroom
                </h2>
            }
        >
            <Head title="Add Classroom" />

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
                            value={data.name}
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


                    <Button onClick={handleSubmit}
                        className="inline-block rounded text-center border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        href="#"
                    >
                        Update Classroom
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Edit;
