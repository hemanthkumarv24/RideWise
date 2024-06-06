import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import './index.css'


import Home from './pages/Home'

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      children: [
        { path: "/", element: <Home /> },
     
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App