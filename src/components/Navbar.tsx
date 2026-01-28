import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Web4 Social Media</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hi, {user.displayName}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/signin" className="bg-white text-blue-600 px-4 py-2 rounded">
            Sign In
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
