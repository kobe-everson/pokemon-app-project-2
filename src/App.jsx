import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import PokemonDetail from "./pages/PokemonDetail";
import TeamBuilder from "./pages/TeamBuilder";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/team" element={<TeamBuilder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </MainLayout>
  );
}
