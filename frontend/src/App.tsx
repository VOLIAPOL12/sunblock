import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UltraVioletPage from "./pages/UltraVioletPage";
import SplashScreen from "./pages/SplashScreen";
import SunscreenCalculator from "./components/SunscreenCalculator";

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  }, []); // 

  return (
    <>
      {showSplashScreen ? (
        <SplashScreen />
      ) : (
        <div data-theme="synthwave">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/uvpage" element={<UltraVioletPage />} />
            <Route path="/sunscreen" element={<SunscreenCalculator />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
