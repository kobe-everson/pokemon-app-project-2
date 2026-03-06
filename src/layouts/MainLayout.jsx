import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <header>
        <div className="navbar bg-[#ff6c6c] shadow-xl grid grid-cols-1 border-b-2 pt-4 text-red-950">
          <div className="flex justify-end gap-2 px-6 text-xl font-light italic">
            {user ? (
              <button
                onClick={handleLogout}
                className="hover:underline cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-xl hover:underline">
                  Login
                </Link>
                <span className="text-xl not-italic">|</span>
                <Link to="/signup" className="text-xl hover:underline">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <h1 className="text-5xl font-semibold text-center">Pokémon App</h1>
          <nav className="flex justify-center gap-12 py-4 text-xl italic font-light">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/browse" className="hover:underline">
              Browse
            </Link>
            <Link to="/team" className="hover:underline">
              Team
            </Link>
          </nav>
        </div>
      </header>
      <main className="px-4 py-4">{children}</main>
    </div>
  );
}
