"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3
} from "lucide-react";

export default function LandingPage() {
  // --- 3D Card Rotation Logic ---
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // --- Smart Navbar Scroll Logic ---
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const maxRotation = 10;
    const rotateX = (mouseY / height - 0.5) * maxRotation;
    const rotateY = -(mouseX / width - 0.5) * maxRotation;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          @keyframes pan-grid {
            0% { background-position: 0 0; }
            100% { background-position: 80px 80px; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }
          .animate-grid { animation: pan-grid 20s linear infinite; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          
          /* Hard Crayon / Hand-drawn Style */
          .crayon-box {
            border: 4px solid #000000;
            border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
            box-shadow: 6px 6px 0px 0px #000000;
          }
          .crayon-icon-wrap {
            border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
          }
        `}
      </style>

      <div 
        className="min-h-screen w-full font-sans text-black overflow-x-hidden relative"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: `
            radial-gradient(circle at right, #FFFFFF 0%, transparent 80%),
            repeating-linear-gradient(0deg, transparent, transparent 77px, rgba(0,0,0,0.08) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 77px, rgba(0,0,0,0.08) 80px)
          `,
          backgroundAttachment: "fixed",
        }}
      >
        {/* --- Smart Floating Navbar --- */}
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
          <nav 
            className={`pointer-events-auto w-full max-w-6xl flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-xl border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isNavVisible ? 'translate-y-0' : '-translate-y-[150%]'
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 bg-[#FFD500] border-2 border-black rounded-full flex items-center justify-center text-black font-black text-lg">F</div>
              <span className="text-lg font-black uppercase tracking-tighter">FinanceBase</span>
            </div>

            {/* Desktop Center Links */}
            <div className="hidden md:flex items-center gap-8 font-black uppercase text-xs tracking-widest text-[#333]">
              <a href="#features" className="hover:text-[#FFD500] hover:drop-shadow-[2px_2px_0_#000] transition-all">Features</a>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pr-1">
              <Link to="/login" className="hidden sm:block text-xs font-black uppercase tracking-widest hover:text-[#FFD500] hover:drop-shadow-[2px_2px_0_#000] transition-all">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2.5 bg-[#FFD500] border-[3px] border-black rounded-full text-xs font-black text-black uppercase tracking-widest hover:bg-black hover:text-[#FFD500] transition-colors">
                Join Now
              </Link>
            </div>
          </nav>
        </div>

        {/* --- Hero Section --- */}
        <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-32 pb-24 px-6 z-10">
          
          {/* Left Side: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10">
            <div className="crayon-box inline-block bg-white px-4 py-1 mb-8 text-xs font-black text-black uppercase">
              Financial Intelligence v2.0
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter leading-[0.95] uppercase">
              Because your <br /> data is a{" "}
              <span className="inline-block crayon-box bg-black text-[#FFD500] px-4 py-1 transform rotate-2 shadow-[6px_6px_0px_#FFD500] mt-2">
                Strategy.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-black font-bold max-w-xl mb-10 leading-relaxed border-l-[4px] border-[#FFD500] pl-6 border-dashed">
              FinanceBase turns complex transactions into clear, actionable revenue signals. Stop accounting and start growing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <button className="crayon-box group relative px-8 py-4 bg-[#FFD500] text-black font-black text-lg flex items-center hover:bg-black hover:text-[#FFD500] hover:shadow-[6px_6px_0px_#FFD500] transition-all">
                  <span className="mr-3 uppercase tracking-tighter">Start Free Trial</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: Interactive 3D Card Overlay */}
          <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full max-w-md bg-white border-[4px] border-black rounded-none overflow-hidden transition-transform duration-200 ease-out cursor-default shadow-[15px_15px_0_0_#000]"
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
              }}
            >
              {/* Fake Window Header */}
              <div className="h-10 bg-zinc-100 border-b-[4px] border-black flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-white border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-white border-2 border-black"></div>
                <div className="w-3 h-3 rounded-full bg-white border-2 border-black"></div>
                <span className="flex-1 text-center text-[10px] font-black uppercase tracking-widest text-black opacity-50">System_Status.exe</span>
              </div>

              {/* Fake Dashboard Content */}
              <div className="p-6 bg-white space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-2 w-20 bg-black opacity-20"></div>
                    <div className="h-6 w-32 bg-black"></div>
                  </div>
                  <div className="w-12 h-12 bg-[#FFD500] border-[3px] border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center crayon-icon-wrap">
                     <BarChart3 className="text-black w-6 h-6" strokeWidth={3} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="crayon-box p-4 bg-white shadow-[4px_4px_0_0_#000]">
                    <div className="h-2 w-10 bg-black/40 mb-2"></div>
                    <div className="h-4 w-16 bg-black"></div>
                  </div>
                  <div className="crayon-box p-4 bg-black shadow-[4px_4px_0_0_#FFD500]">
                    <div className="h-2 w-10 bg-white/40 mb-2"></div>
                    <div className="h-4 w-16 bg-[#FFD500]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-white border-[3px] border-black"></div>
                    <div className="h-2 flex-1 bg-zinc-200 border-2 border-black"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#FFD500] border-[3px] border-black"></div>
                    <div className="h-2 flex-1 bg-zinc-200 border-2 border-black"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Blob for 3D depth (Cyber Yellow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFD500]/30 rounded-full blur-[100px] -z-10 animate-float"></div>
          </div>
        </main>

        {/* --- Crayon Style Features Grid --- */}
        <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
          <div className="mb-16 text-center lg:text-left">
             <h2 className="text-4xl font-black uppercase italic tracking-tighter">Tools for Growth</h2>
             <div className="h-2 w-24 bg-[#FFD500] border-[3px] border-black mt-3 crayon-box"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Ironclad Security", desc: "Military-grade encryption for every ledger and transaction entry.", color: "#FFD500" },
              { icon: Zap, title: "Lightning Velocity", desc: "Global infrastructure ensures your dashboard updates in sub-milliseconds.", color: "#FFD500" },
              { icon: Globe, title: "Global Sync", desc: "Manage multi-currency entities across any border with automatic compliance.", color: "#FFD500" }
            ].map((feature, i) => (
              <div key={i} className="crayon-box bg-white p-8">
                <div className="crayon-icon-wrap w-14 h-14 mb-6 flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0_0_#000]" style={{ backgroundColor: feature.color }}>
                  <feature.icon className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 tracking-tighter">{feature.title}</h3>
                <p className="text-sm font-bold text-[#444] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Footer / CTA --- */}
        <footer className="relative z-10 max-w-7xl mx-auto px-6 pb-20 mt-10">
          <div className="crayon-box bg-black text-white p-12 lg:p-20 shadow-[12px_12px_0_0_#FFD500] text-center relative overflow-hidden">
            {/* Background elements for footer */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD500] rotate-45 translate-x-16 -translate-y-16 border-[4px] border-black opacity-90 crayon-box"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter mb-10 leading-none">
                Ready to drop <br /> the spreadsheets?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/register">
                  <button className="crayon-box w-full sm:w-auto px-10 py-4 bg-[#FFD500] text-black font-black uppercase hover:bg-white transition-colors">
                    Get Started Free
                  </button>
                </Link>
                <Link to="/login">
                  <button className="crayon-box w-full sm:w-auto px-10 py-4 bg-transparent border-[4px] border-white text-white font-black uppercase shadow-none hover:bg-white hover:text-black transition-colors">
                    Existing User Login
                  </button>
                </Link>
              </div>
              <p className="mt-14 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                © 2026 FinanceBase — All Systems Operational
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}