import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div>
      <header>
        <div>
          <h1 className="bg-red-500 text-white shadow">Pokémon App</h1>
          <nav className="flex justify-between px-60 py-4">
            <Link to="/">Home</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/team">My Team</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
