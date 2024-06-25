import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Home2 from "./pages/Home2/Home2";
import About from "./pages/About/About";
import ComparePage from "./pages/Compare/Compare";
import MapPage from "./pages/MapPage"; // Adjust the path as per your project structure

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      children: [
        { path: "/", element: <Home /> },
        { path: "/Login", element: <Login /> },
        { path: "/Home2", element: <Home2 /> },
        { path: "/About", element: <About /> },
        { path: "/Compare", element: <ComparePage /> },
        { path: "/map", element: <MapPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
