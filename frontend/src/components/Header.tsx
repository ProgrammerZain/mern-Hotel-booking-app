import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6" id="header">
      <div className="ml-5 md:m-5 lg:container  mx-auto flex flex-wrap justify-between">
        <span className="text-xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex flex-wrap space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-2 font-bold hover:bg-blue-600"
                to={"/my-bookings"}
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-2 font-bold hover:bg-blue-600"
                to={"/my-hotels"}
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-2 font-bold hover:bg-gray-100 "
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
