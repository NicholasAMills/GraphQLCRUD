import './App.css'
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { Home } from './pages';
import { GetPage } from './pages';
import { CreatePage } from './pages'
import { UpdatePage } from './pages'

if (process.env.NODE_ENV !== "production") {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-left items-center bg-white sm:px-8 px-4 py-4 border-b
      border-b-[#e6ebf4] gap-2">
        <Link to="/"
          className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'
        >
          Get
        </Link>

        <Link to="/create-page"
          className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'
        >
          Create
        </Link>

        <Link to="/update-page"
          className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'
        >
          Edit Recipe
        </Link>
      
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/update-page" element={<UpdatePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
