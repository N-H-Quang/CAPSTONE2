import { menuItems } from "@/utils/contant";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar({ children }: { children?: React.ReactNode }) {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(dropdownId)
        ? prev.filter((id) => id !== dropdownId)
        : [...prev, dropdownId]
    );
  };

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden z-30"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            d="M5 7h14M5 12h14M5 17h10"
          />
        </svg>
      </button>
      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 backdrop-blur-lg"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
          <a
            href="https://flowbite.com/"
            className="flex items-center ps-2.5 mb-5"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-lg text-heading font-semibold whitespace-nowrap">
              Flowbite
            </span>
          </a>

          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              if (item.childs && item.childs.length > 0) {
                const dropdownId = `dropdown-${item.title.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                  <li className="hover-pointer" key={item.url}>
                    <button
                      type="button"
                      className="flex items-center w-full justify-between px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                      aria-controls={dropdownId}
                      onClick={() => toggleDropdown(dropdownId)}
                    >
                      <span className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <item.icon className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" />
                          {!item.onlyIcon && (
                            <span className="ms-3">{item.title}</span>
                          )}
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            openDropdowns.includes(dropdownId) ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 9-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>
                    <ul
                      id={dropdownId}
                      className={`py-2 space-y-2 ${
                        openDropdowns.includes(dropdownId) ? "" : "hidden"
                      }`}
                    >
                      {item.childs.map((child) => (
                        <li key={child.url}>
                          <Link
                            to={child.url}
                            className="pl-10 flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                          >
                            <child.icon className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" />
                            {!child.onlyIcon && (
                              <span className="ms-3">{child.title}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li key={item.url} className="hover-pointer">
                    <Link
                      to={item.url}
                      className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
                    >
                      <item.icon className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" />
                      {!item.onlyIcon && (
                        <span className="ms-3">{item.title}</span>
                      )}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{children}</div>
    </>
  );
}

export default Sidebar;
