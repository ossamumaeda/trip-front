import {CreateTripPage} from "./pages/create-trip"
import { TripDetailsPage } from "./pages/trip-details";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage/>,
  },
  {
    path: "/details/:trip_id",
    element: <TripDetailsPage/>,
  },
]);

export function App() {
  return <RouterProvider router={router} />
}

