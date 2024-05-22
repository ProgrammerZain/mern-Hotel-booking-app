import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-blue-800 py-10">
      <a
        href="#header"
        className="bg-blue-500 px-3 py-2 md:p-2 fixed bottom-10 right-8 text=3xl text-white font-bold "
      >
        ^
      </a>
      <div className="p-2 mx-auto md:flex justify-between items-center gap-6 lg:container">
        <span className="text-xl md:text-3xl text-white font-bold tracking-tighter break-words">
          MernHolidays.com
        </span>
        <ul className="mt-24 mb-24  sm:mt-0 sm:mb-0">
          <li>
            <Link className="text-sm text-white font-bold" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="text-sm text-white font-bold" to={"/my-bookings"}>
              My-Bookings
            </Link>
          </li>
        </ul>
        <span className="text-white font-bold tracking-tighter lg:flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Services</p>
        </span>
      </div>
    </div>
  );
}

export default Footer;
