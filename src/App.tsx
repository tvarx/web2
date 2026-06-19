import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { VipBetaModal } from "./components/VipBetaModal";

function AppLayout() {
  const [isVipOpen, setIsVipOpen] = useState(false);
  const location = useLocation();
  const currentLang: "fa" | "en" = location.pathname.startsWith("/en") ? "en" : "fa";

  useEffect(() => {
    const handler = () => setIsVipOpen(true);
    window.addEventListener("open-vip-modal", handler);
    return () => {
      window.removeEventListener("open-vip-modal", handler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans antialiased relative selection:bg-[#7C3AED] selection:text-white">
      {/* Structural Glowing background accents */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#7C3AED]/3 blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#A855F7]/3 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[75%] left-[5%] w-[400px] h-[400px] rounded-full bg-fuchsia-900/3 blur-[130px] pointer-events-none -z-10" />

      {/* Shared fixed header navigation across all routes */}
      <Navbar />

      {/* Dynamic route Outlet insertion */}
      <main className="flex-grow">
        <Outlet />
      </main>



      {/* Shared Global VIP Beta Access/Downloads Modal */}
      <VipBetaModal isOpen={isVipOpen} onClose={() => setIsVipOpen(false)} lang={currentLang} />

      {/* Shared footer section */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Absolute root path defaults to Persian /fa layout */}
        <Route path="/" element={<Navigate to="/fa" replace />} />

        {/* Setup layout router shell */}
        <Route element={<AppLayout />}>
          {/* Persian/RTL route targets */}
          <Route path="/fa" element={<Home />} />
          <Route path="/fa/about" element={<About />} />
          <Route path="/fa/privacy" element={<Privacy />} />
          <Route path="/fa/terms" element={<Terms />} />

          {/* English/LTR route targets */}
          <Route path="/en" element={<Home />} />
          <Route path="/en/about" element={<About />} />
          <Route path="/en/privacy" element={<Privacy />} />
          <Route path="/en/terms" element={<Terms />} />

          {/* Fallback routing: unrecognized addresses redirect back to /fa default */}
          <Route path="*" element={<Navigate to="/fa" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
