function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="h-12 w-auto object-contain"
            src="https://media.lottecinemavn.com/Media/WebAdmin/7e94a15f40ad4fd8b14d1b5ae62b3c15.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            {children}
        </div>
      </div>
    </section>
  );
}

export const WithAuthLayout = (Component: React.ComponentType) => {
  const newComponent = (props: {
    [key: string]: any;
  }) =>(<AuthLayout><Component {...props} /></AuthLayout>);
  return newComponent;
};

export default AuthLayout;
