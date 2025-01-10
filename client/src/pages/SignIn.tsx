import { Link, useNavigate } from "react-router";
import { useSignupServiceMutation } from "../context/usersfeatures/userService";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { signin } from "../context/usersfeatures/userSlice";
import { useAppDispatch } from "../context/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [signupService, { data: responcedata, error, isLoading, isSuccess }] = useSignupServiceMutation()
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = handleSubmit(async (data) => {
        dispatch(signin({ email: data.email }))
        const body = {
            email: data.email,
            page: "signin",
        }
        await signupService(body)
    })
    useEffect(() => {
        if (isSuccess) {
            const message = responcedata?.message;
            toast.success(message);
            navigate("/verfiyotp")
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
    }, [error, isSuccess, navigate, responcedata, responcedata?.message]);

    return (
        <section className='w-full mt-4 pl-4'>
            <div className="w-full flex flex-col items-center justify-center tablet:items-start tablet:justify-start">
                <div className='p-4 grid items-center'>
                    <div className='flex flex-col items-center mt-8 gap-2 tablet:items-start tablet:justify-start'>
                        <img src='/images/Mainlogo.png' alt='' />
                        <p className='text-4xl font-bold'>Sign in</p>
                        <p className='text-[#969696] font-normal text-base'>
                            Sign in to enjoy the feature of HD
                        </p>
                    </div>
                    <form className='flex flex-col gap-3 mt-4 max-w-[343px]' onSubmit={onSubmit}>
                        <div>
                            <div className='relative'>
                                <input
                                    type='text'
                                    id='email'
                                    {...register("email", { required: "Email Address is required" })}
                                    aria-invalid={errors.mail ? "true" : "false"}
                                    className='min-w-[320px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    placeholder=' '
                                />
                                <label
                                    htmlFor='floating_outlined'
                                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-10 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'                            >
                                    Email
                                </label>
                            </div>
                            {errors.email?.type === "required" && (
                                <p role="alert" className="font-normal text-xs text-red-500 ">Email is required</p>
                            )}
                        </div>
                        {/* <div className='relative'>
                            <input
                                type='text'
                                id='otp'
                                className='min-w-[320px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                placeholder=' '
                            />
                            <label
                                htmlFor='otp'
                                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-10 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'                            >
                                OTP
                            </label>
                        </div> */}
                        <div className="w-[343px]"><span className="text-[#6c6c6c] text-sm font-normal leading-[21px]"> </span><span className="text-[#357aff] text-sm font-semibold underline leading-[21px]">Forgot Password ?</span></div>
                        <div className="h-6 justify-start items-center gap-2.5 inline-flex">
                            <input type="checkbox" className="w-4 h-4 relative overflow-hidden rounded"></input>
                            <div className="text-[#232323] text-sm font-medium leading-[21px]">Keep me logged in</div>
                        </div>

                        <button className='min-w-[320px] block px-2.5 pb-2.5 pt-2.5 w-full text-white bg-blue-600 rounded-lg border-1 border-gray-300 appearance-none font-semibold text-base' disabled={isLoading} >
                            signin
                        </button>
                    </form>
                    <div className='m-4'>
                        <p className='text-[#969696] font-normal text-base'>or</p>
                    </div>
                    <div className='min-w-[320px] px-2.5 pb-2.5 pt-2.5 text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none text-center font-semibold flex items-center justify-center'>
                        Continue with Google <img src='/images/goole.png' alt='' />
                    </div>

                    <div className="mt-8">
                        <p className='text-[#969696] font-normal text-sm'>Don't have an account?? <Link to={'/signup'} className="text-[#367AFF] text-sm underline font-semibold">Sign up
                        </Link> </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
