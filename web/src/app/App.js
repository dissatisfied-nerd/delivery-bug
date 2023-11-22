import { Navbar } from "widgets/Navbar";
import { RouterProvider } from "./provider/RouterProvider/RouterProvider";

function App() {
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
