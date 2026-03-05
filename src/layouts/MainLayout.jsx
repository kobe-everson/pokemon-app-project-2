import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div>
      <header>
        <div className="navbar bg-[#ff6c6c] shadow-sm grid grid-cols-1 border-b-2 pt-4 text-red-950">
          <h1 className="text-5xl font-semibold text-center">Pokémon App</h1>
          <nav className="flex justify-between px-60 py-4 text-xl italic font-light">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/browse" className="hover:underline">
              Browse
            </Link>
            <Link to="/team" className="hover:underline">
              My Team
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
      <main className="py-4">{children}</main>
    </div>
  );
}
