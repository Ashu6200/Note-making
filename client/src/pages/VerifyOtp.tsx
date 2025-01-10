
import { useForm } from 'react-hook-form'
import { useVerfiyOTPServiceMutation } from '../context/usersfeatures/userService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAppSelector } from '../context/store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const VerifyOtp = () => {
    const user = useAppSelector((state) => state.user)
    const navigate = useNavigate();
    const [verfiyOTPService, { data: responcedata, error, isSuccess, isLoading }] = useVerfiyOTPServiceMutation()
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = handleSubmit(async (data) => {
        const body = {
            email: user.email,
            otp: data.otp
        }
        await verfiyOTPService(body)
    })
    useEffect(() => {
        if (isSuccess) {
            const message = responcedata?.message;
            toast.success(message);
            navigate("/")
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
    }, [error, isSuccess, navigate, responcedata?.message])

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
                                    id='otp'
                                    {...register("otp", { required: "OTPs is required" })}
                                    aria-invalid={errors.otp ? "true" : "false"}
                                    className='min-w-[320px] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    placeholder=' '
                                />
                                <label
                                    htmlFor='floating_outlined'
                                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-10 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'                            >
                                    OTP
                                </label>
                            </div>
                            {errors.otp?.type === "required" && (
                                <p role="alert" className="font-normal text-xs text-red-500 ">Otp is required</p>
                            )}
                        </div>

                        <button disabled={isLoading} className='min-w-[320px] block px-2.5 pb-2.5 pt-2.5 w-full text-white bg-blue-600 rounded-lg border-1 border-gray-300 appearance-none font-semibold text-base'>
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default VerifyOtp