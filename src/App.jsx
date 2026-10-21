import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import SubmissionResult from "./pages/SubmissionResult";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DSAPatterns from "./pages/DSAPatterns";
import Solution from "./pages/Solution";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/problems" element={<Problems />} />

                <Route path="/problem/:id" element={<Problem />} />

                <Route
                    path="/submission"
                    element={<SubmissionResult />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/roadmap"
                    element={<DSAPatterns />}
                />

                {/* Only opened after successful submission */}
                <Route
                    path="/solution/:id"
                    element={<Solution />}
                />
            </Routes>
        </BrowserRouter>
    );
}