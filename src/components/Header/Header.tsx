import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const auth= useSelector((state: RootState) => state.auth); 
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
     const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed w-full z-20 top-0 start-0">
      <nav className={`border-black px-4 lg:px-6 py-2.5 relative ${isScrolled ? "bg-black" : "bg-black/70"} transition-colors duration-300`}>
        <div className="flex flex-wrap justify-between items-center container">
          <a href="/" className="flex items-center flex-shrink-0">
            <img
              src="https://media.lottecinemavn.com/Media/WebAdmin/7e94a15f40ad4fd8b14d1b5ae62b3c15.png"
              className="h-8 sm:h-10 w-auto object-contain max-w-[120px] sm:max-w-[150px]"
              alt="Lotte Cinema Logo"
            />
          </a>

          <div className="flex items-center lg:order-2">
            <Link
              to={auth.isAuthenticated ? "/profile" : "/auth/login"}
              className="text-white hover:bg-black/70/80 focus:ring-4 focus:ring-black/50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none transition-colors duration-200 cursor-pointer bg-black/50"
            >
              {auth.isAuthenticated ? "Profile" : "Login / Register"}
            </Link>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg lg:hidden hover:bg-black/70/80 focus:outline-none focus:ring-2 focus:ring-black/50 transition-colors duration-200"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-black/70 lg:bg-transparent lg:text-white lg:p-0 hover:bg-black/70/80 lg:hover:bg-transparent lg:hover:text-white transition-colors duration-200 uppercase after:content-[''] after:block after:h-[2px] 
after:mt-2 mb-4 after:w-0 hover:after:w-full hover:after:bg-white after:transition-all after:duration-300"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-black/70 lg:bg-transparent lg:text-white lg:p-0 hover:bg-black/70/80 lg:hover:bg-transparent lg:hover:text-white transition-colors duration-200 uppercase after:content-[''] after:block after:h-[2px] 
after:mt-2 mb-4 after:w-0 hover:after:w-full hover:after:bg-white after:transition-all after:duration-300"
                >
                  Showing Movies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-black/70 lg:bg-transparent lg:text-white lg:p-0 hover:bg-black/70/80 lg:hover:bg-transparent lg:hover:text-white transition-colors duration-200 uppercase after:content-[''] after:block after:h-[2px] 
after:mt-2 mb-4 after:w-0 hover:after:w-full hover:after:bg-white after:transition-all after:duration-300"
                >
                  Coming Movies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="absolute -bottom-[20px] left-0 w-full h-[20px] bg-gradient-to-b from-black/70 to-transparent pointer-events-none"></div>
      </nav>
    </header>
  );
}

export default Header;
