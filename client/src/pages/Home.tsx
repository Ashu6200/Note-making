import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Navbar from "../components/Navbar"
import { useDeleteNoteServiceMutation, useGetAllNoteServiceQuery } from "../context/noteFeatures/noteservice"
import { useAppSelector } from "../context/store"
import { useEffect } from "react";
import toast from "react-hot-toast";
import CreateNote from "../components/CreateNOte";


type INote = {
    _id: string;
    title: string;
    content: string;
}
const Home = () => {
    const user = useAppSelector((state) => state.user)
    const { data: notedata, isLoading } = useGetAllNoteServiceQuery()
    const [deleteNoteService, { data: deletedata, error, isSuccess, isLoading: isDeleteLoading }] = useDeleteNoteServiceMutation()
    const deleteNoteHandler = async (id: string) => {
        await deleteNoteService({ _id: id });
    };
    useEffect(() => {
        if (isSuccess) {
            const message = deletedata?.message;
            toast.success(message);
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
    }, [deletedata?.message, error, isSuccess,]);

    return (
        <section className="w-full h-full relative">
            <Navbar />
            <section className="">
                <div className="min-h-[#130px] shadowBox py-6 px-4 rounded-xl m-4">
                    <div className="flex flex-col items-start gap-4">
                        <p className="text-2xl font-bold">Welcome {user.name || ""}</p>
                        <p className="text-base font-normal">Email: {user.email || ""}</p>
                    </div>
                </div>
                <div className="w-auto m-4">
                    <CreateNote />
                    {/* <button className="w-full p-4 bg-[#367AFF] text-white font-semibold text-base rounded-xl">
                        Create Note
                    </button> */}
                </div>
                <div className="m-4">
                    <p className="text-lg font-normal">Notes</p>
                    {isLoading ? (
                        <p className="text-lg font-normal">Loading...</p>
                    ) : (
                        <div className="">
                            {Array.isArray(notedata?.data) && notedata.data.map((note: INote) => {
                                return (
                                    <div key={note._id} className="flex items-center justify-between p-4 mb-2 shadowBoxNote rounded-xl">
                                        <div className="text-wrap max-w-[80%]">
                                            <p className="text-base font-normal"> {note.title}</p>
                                        </div>
                                        <button disabled={isDeleteLoading} onClick={() => deleteNoteHandler(note._id)}>
                                            <img src="/images/delete.png" alt="" />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                </div>

            </section>
        </section>
    )
}

export default Home


