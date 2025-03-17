import { useEffect, useState } from "react";

import SunscreenCalculator from "./components/SunscreenCalculator";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import UltraVioletPage from "./pages/UltraVioletPage";
import SplashScreen from "./pages/SplashScreen";
import UltraVoiletImpactPage from "./pages/UltraVioletImpactPage";
import NotReadytPage from "./pages/NotReadytPage";

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
          <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/uv-page/" element={<UltraVioletPage/>} />
                <Route path="/sunscreen" element={<SunscreenCalculator/>} />
                <Route path="/uv-impact" element={<UltraVoiletImpactPage/>} />
                <Route path="/not-ready" element={<NotReadytPage/>} />
            </Routes>
            <BottomNavigation />
          </div>
        )
      }
    </>
  );
}

export default App;
