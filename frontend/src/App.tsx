import { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UltraVioletPage from './pages/UltraVioletPage';
import SplashScreen from './pages/SplashScreen';

function App() {

  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  })
  return (
    <>
      {showSplashScreen ?
        (<SplashScreen/> ) :
        (
          <div data-theme="synthwave">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/uv-page/" element={<UltraVioletPage/>} />
            </Routes>
          </div>
        )
      }
      
    </>
  )
}

export default App
