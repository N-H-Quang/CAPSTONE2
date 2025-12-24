import useRouteElements from "./useRouteElements";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getProfileFromLS, LocalStorageEventTarget } from "./utils/auth";
import { clearCredentials, setCredentials, setAuthLoaded } from "./pages/Auth/slice";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    initFlowbite();
    const profile = getProfileFromLS();
    
    if (profile) {
      dispatch(setCredentials({ user: profile }));
    } else {
      dispatch(setAuthLoaded());
    }

    const reset = () => {
      dispatch(clearCredentials());
    };
    LocalStorageEventTarget.addEventListener("clearLS", reset);

    return () => {
      LocalStorageEventTarget.removeEventListener("clearLS", reset);
    };
  }, [dispatch]);

  const routeElements = useRouteElements();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        {routeElements}
      </QueryClientProvider>
    </>
  );
}

export default App;
