import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import VerifyOtp from "./pages/VerifyOtp"
import { Toaster } from "react-hot-toast"
import { useAppSelector } from "./context/store"

function App() {
  const user = useAppSelector((state) => state.user)
  return (
    <main className="w-full h-full">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user.token != null ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={user.token == null && <SignIn />} />
          <Route path="/signup" element={user.token == null && <SignUp />} />
          <Route path="/verfiyotp" element={user.email != null && <VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
