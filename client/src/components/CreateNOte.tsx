import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Note, useCreateNoteServiceMutation, } from "../context/noteFeatures/noteservice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
const CreateNote = () => {
    const [openModal, setOpenModal] = useState(false);
    // const { refetch } = useGetAllNoteServiceQuery({});
    const [
        createNoteService,
        { data: responcedata, error, isLoading, isSuccess },
    ] = useCreateNoteServiceMutation();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = handleSubmit(async data => {
        const body: Partial<Note> = {
            title: data.title,
            content: data.content,
        };
        await createNoteService(body);
    });
    useEffect(() => {
        if (isSuccess) {
            const message = responcedata?.message;
            toast.success(message);
            setOpenModal(false);
        }
        if (error) {
            if ("data" in error) {
                const message = (error as FetchBaseQueryError).data;
                if (message && typeof message === "object" && "message" in message) {
                    toast.error((message as { message: string }).message);
                }
            } else {
                toast.error("An error occurred");
            }
        }
    }, [error, isSuccess, responcedata, responcedata?.message]);
    return (
        <>
            <Button
                onClick={() => setOpenModal(true)}
                className='w-full p-4 bg-[#367AFF] text-white font-semibold text-base rounded-xl hover:bg-[#367AFF] enabled:hover:bg-[#367AFF]'
            >
                Create Note
            </Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Create Note</Modal.Header>
                <Modal.Body>
                    <div className='space-y-6'>
                        <form
                            className='flex flex-col gap-3 mt-4 max-w-[343px]'
                            onSubmit={onSubmit}
                        >
                            <div>
                                <div className='relative'>
                                    <input
                                        type='text'
                                        id='title'
                                        {...register("title", { required: "Title is required" })}
                                        aria-invalid={errors.title ? "true" : "false"}
                                        className='min-w-[320px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                    />
                                    <label
                                        htmlFor='floating_outlined'
                                        className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-10 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                                    >
                                        Title
                                    </label>
                                </div>
                                {errors.title?.type === "required" && (
                                    <p role='alert' className='font-normal text-xs text-red-500 '>
                                        Title is required
                                    </p>
                                )}
                            </div>
                            <div>
                                <div className='relative'>
                                    <input
                                        type='text'
                                        id='content'
                                        {...register("content", {
                                            required: "Content Address is required",
                                        })}
                                        aria-invalid={errors.content ? "true" : "false"}
                                        className='min-w-[320px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                    />
                                    <label
                                        htmlFor='floating_outlined'
                                        className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-10 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                                    >
                                        content
                                    </label>
                                </div>
                                {errors.content?.type === "required" && (
                                    <p role='alert' className='font-normal text-xs text-red-500 '>
                                        Content is required
                                    </p>
                                )}
                            </div>
                            <button
                                disabled={isLoading}
                                className='min-w-[320px] block px-2.5 pb-2.5 pt-2.5 w-full text-white bg-blue-600 rounded-lg border-1 border-gray-300 appearance-none font-semibold text-base'
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
};

export default CreateNote;
