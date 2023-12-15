import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { Navbar } from "widgets/Navbar";
import { RouterProvider } from "./provider/RouterProvider/RouterProvider";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { authActions } from "features/Auth";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const profile = JSON.parse(
            localStorage.getItem(PROFILE_LOCALSTORAGE_KEY)
        );

        if (profile?.type) {
            dispatch(authActions.setType(profile.type));
        }

        if (profile?.login) {
            const { type, [`${type}_id`]: id, ...data } = profile;
            dispatch(authActions.initAuthData({ ...data, type }));
            if (profile?.type === "client") {
                dispatch(
                    clientActions.setClientData({ client_id: id, ...data })
                );
            } else if (profile?.type === "courier") {
                dispatch(
                    courierActions.setCourierData({ courier_id: id, ...data })
                );
            }
        }
    }, [dispatch]);

    return (
        <div className="app">
            <Navbar />
            <div className="content-page">
                <RouterProvider />
            </div>
        </div>
    );
}

export default App;
