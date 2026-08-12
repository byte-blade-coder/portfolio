import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import ThemeCustomizer from "./components/ThemeCustomizer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { AppReadyContext } from "./context/AppReadyContext";

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Tiny delay ensures GSAP and DOM are ready before becoming visible, preventing flash/glitch
    const timer = requestAnimationFrame(() => {
      setTimeout(() => setAppReady(true), 50);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <BrowserRouter>
      <AppReadyContext.Provider value={appReady}>
        <div 
          className="relative w-full bg-slate-50 dark:bg-[#030712]"
          style={{
            opacity: appReady ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: appReady ? 'auto' : 'none',
          }}
        >
          <Navbar />
          <AppRoutes />
          <ThemeCustomizer />
          <WhatsAppWidget />
          <Analytics />
        </div>
      </AppReadyContext.Provider>
    </BrowserRouter>
  );
}

export default App;