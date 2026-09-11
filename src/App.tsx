import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Game from "./pages/Game";

export default function App() {
    const browserRouter = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route index element={<Game/>}/>
            </Route>
        )
    );

    return (
        <RouterProvider router={browserRouter}/>
    );
}