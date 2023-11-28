import { profileActions } from "entities/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navbar } from "widgets/Navbar";
import { RouterProvider } from "./provider/RouterProvider/RouterProvider";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(profileActions.initProfileData());
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
