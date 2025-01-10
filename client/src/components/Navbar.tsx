import { useNavigate } from "react-router"
import { useAppDispatch } from "../context/store"
import { signOut } from "../context/usersfeatures/userSlice"

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(signOut())
        navigate("/signin")
    }
    return (
        <nav className="w-full sticky top-0 bg-white">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <img src="/images/logo.png" alt="" />
                    <p className="text-[#232323] text-xl font-semibold">Dashboard</p>
                </div>
                <div>
                    <p className="text-[#367AFF] text-sm underline font-semibold cursor-pointer" onClick={logoutHandler}>
                        Signout
                    </p>
                </div>
            </div>
        </nav>

    )
}

export default Navbar