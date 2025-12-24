function Footer() {
  return (
    <footer
      className="bg-black bg-[url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover relative z-0"
    >
      <div className="absolute inset-0 z-10 bg-black opacity-80" />
      <div className="container py-12 relative z-20 text-white flex flex-col md:flex-row md:justify-between gap-8">
        <div className="md:max-w-md">
          <a href="https://flowbite.com" className="flex items-center block">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9 dark:invert"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Flowbite
            </span>
          </a>

          <p className="mt-4 max-w-md text-gray-400">
            Flowbite helps you connect with friends and the world around you.
            Learn more about our mission, values, and history.
          </p>

          <p className="mt-4 text-gray-400">
            Call us at: <span className="text-white">(123) 456-7890</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 w-full md:w-2/5">
          <div className="flex-1">
            <h3 className="mb-4 text-normal font-bold">Chính Sách</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:underline hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-4 text-normal font-bold">Company</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:underline hover:text-white">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">
                  Watch List
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-white">
                  User Guide
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-black border-t border-gray-800 py-4 relative z-20">
        <p className="text-center text-gray-400">© 2024 Flowbite. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
