function Footer() {
  return (
    <div className="bg-blue-800 py-10">
      <div className="ml-5 md:container mx-auto md:flex justify-between items-center">
        <span className="text-xl md:text-3xl text-white font-bold tracking-tighter break-words">
          MernHolidays.com
        </span>
        <span className="text-white font-bold tracking-tighter lg:flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Services</p>
        </span>
      </div>
    </div>
  );
}

export default Footer;
