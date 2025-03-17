import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; // ⬅ 只导入 Routes 和 Route

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
      {showSplashScreen ? (
        <SplashScreen />
      ) : (
        <div data-theme="synthwave">
          <Navbar />
          <Routes> {/* ✅ 这里的 Routes 仍然保留 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/uvpage" element={<UltraVioletPage />} />
          </Routes>
          <BottomNavigation />
        </div>
      )}
    </>
  );
}

export default App;
