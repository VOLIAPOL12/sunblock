import { useEffect, useState } from "react";

import SunscreenCalculator from "./components/SunscreenCalculator";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import UltraVioletPage from "./pages/UltraVioletPage";
import SplashScreen from "./pages/SplashScreen";

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  }, []);

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
            <BottomNavigation />
          </div>
        )
      }
    </>
  );
}

export default App;
