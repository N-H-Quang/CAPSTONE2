import { RootState } from "@/store";
import { clearAuthFromLSWithoutEvent, LocalStorageEventTarget } from "@/utils/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Logout() {
    useEffect(() => {
        clearAuthFromLSWithoutEvent();
        const clearLSEvent = new Event("clearLS");
        LocalStorageEventTarget.dispatchEvent(clearLSEvent);
    }, []);
    return <></>;
}

export default Logout