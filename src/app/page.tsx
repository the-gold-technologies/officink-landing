"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const Reveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const { ref, isVisible } = useReveal();
  return (
    <div
      ref={ref as any}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } ${className}`}
    >
      {children}
    </div>
  );
};

const ModuleCard = ({ module, index, total }: { module: any; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-[6vw] py-20 overflow-hidden"
      style={{
        zIndex: index,
        marginTop: index === 0 ? 0 : -200,
      }}
    >
      <div
        className={`${module.bg} rounded-[30px] w-full max-w-6xl p-12 md:p-16 shadow-2xl transition-all duration-1000 transform ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
          }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${module.color} text-white text-[12px] font-bold uppercase tracking-wider mb-8`}>
              Feature {index + 1}
            </div>
            <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold mb-6 text-gray-900">
              {module.title}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {module.desc}
            </p>
            <button className="group relative isolate flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gray-900 to-black px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_0_rgba(0,0,0,0.3)] transition-all duration-200 active:translate-y-[4px] active:shadow-none hover:shadow-[0_6px_0_rgba(59,198,245,0.6)] hover:-translate-y-1 overflow-hidden no-underline">
              <span className="relative z-10 flex items-center gap-2">
                Learn More
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className={`w-[200px] h-[200px] rounded-full bg-gradient-to-br ${module.color} opacity-20 blur-3xl`}></div>
            <div className="absolute text-[120px] drop-shadow-lg opacity-80">{module.icon}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {

  return (
    <main className="min-h-screen font-body selection:bg-brand-teal selection:text-white ">
      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between h-[100px] bg-transparent max-w-7xl mx-auto">
        <Link href="#" className="flex items-center gap-2 no-underline">
          <img src="/fulllogo_transparent.png" alt="Officink Logo" className="h-[40px] w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-10 font-medium">
          <Link href="#solutions" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Solutions</Link>
          <Link href="#features" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Features</Link>
          <Link href="#roles" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Roles</Link>
          <Link href="#cta" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Get Started</Link>
        </div>
        <div className="hidden sm:block">
          <Link
            href="#cta"
            className="group relative isolate flex items-center justify-center gap-2 rounded-full bg-[#0B0F1A] px-5 py-2 text-[14px] font-semibold text-white shadow-[0_3px_0_#1a1f2e] transition-all duration-200 active:translate-y-[3px] active:shadow-none hover:shadow-[0_5px_0_#D1D5DB] hover:-translate-y-1 border-t border-white/10 overflow-hidden no-underline"
          >
            <span className="relative z-10 flex items-center gap-2">
              Login
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 max-w-7xl mx-auto pt-[150px] pb-40 relative overflow-hidden ">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] rounded-full"></div>
            <span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text font-bold text-[12px] uppercase tracking-[2.5px]">All-in-One Office Automation</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,13vw,4.2rem)] font-bold leading-[1.05] tracking-tight mb-6 text-gray-900">
            Attendance, Salary,  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#2DC1E4] italic font-serif">Billing & Expenses</span><br />
            One Dashboard.
          </h1>

          <p className="text-gray-500 text-[1.125rem] leading-[1.6] max-w-[550px] mb-10 font-medium">
            Track attendance with selfies, automate payroll, generate GST invoices, and manage expenses accurately and transparently.
          </p>

          <div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#cta"
                className="group relative isolate flex items-center justify-center gap-2 rounded-full bg-[#0B0F1A] py-3.5 font-semibold text-white shadow-[0_4px_0_#1a1f2e] transition-all duration-200 active:translate-y-[4px] active:shadow-none hover:shadow-[0_6px_0_#D1D5DB] hover:-translate-y-1 border-t border-white/10 overflow-hidden w-[180px] no-underline"
              >
                <span className="relative z-10 flex items-center gap-2 tracking-wide text-[16px]">
                  Request Demo
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Right Visuals - Smallest and perfectly centered in column */}
        <div className="hidden lg:block relative z-10 w-full h-[480px]">
          <div className="absolute inset-0 flex items-center justify-center">

            {/* Premium Background Shape */}
            <div className="absolute top-[10px] right-2 w-[520px] h-[450px] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-[80px] rotate-[5deg] opacity-70"></div>

            {/* Phone 1 (Smaller, Background - Right) */}
            <div className="absolute top-[75px] rotate-[5deg] right-[80px] w-[220px] h-[440px] bg-white rounded-[32px] border-[6px] border-gray-900 shadow-2xl overflow-hidden z-20 flex flex-col scale-90 origin-bottom-right">
              {/* Dynamic Island */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-16 h-4.5 bg-black rounded-full z-[60]"></div>
              
              <div className="p-3.5 pt-9 bg-white flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">←</div>
                  <div className="text-[11px] font-bold text-gray-800">Stats</div>
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">••</div>
                </div>

                <div className="mb-2.5">
                  <div className="text-[16px] font-extrabold text-gray-900">94.2%</div>
                  <div className="text-[8px] text-emerald-500 font-bold">+12%</div>
                </div>

                <div className="w-full h-[100px] relative mb-3">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#4ADE80', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#4ADE80', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    <path d="M0,45 C10,40 20,48 30,42 C40,35 50,55 60,38 C70,25 80,45 90,30 C95,25 100,28 100,28 L100,60 L0,60 Z" fill="url(#grad1)" />
                    <path d="M0,45 C10,40 20,48 30,42 C40,35 50,55 60,38 C70,25 80,45 90,30 C95,25 100,28 100,28" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="text-[10px] font-bold text-gray-900 mb-2">Employees</div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} className="w-4.5 h-4.5 rounded-full" alt="" />
                        <span className="text-[8.5px] font-bold text-gray-700">User {i}</span>
                      </div>
                      <span className="text-[8px] font-bold text-emerald-500">16{i}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone 2 (Larger, Foreground - Left) */}
            <div className="absolute top-[30px] right-[220px] rotate-[-4deg] w-[235px] h-[460px] bg-white rounded-[36px] border-[6px] border-gray-900 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden z-30 flex flex-col">
              {/* Dynamic Island */}
              <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-[60]"></div>
              
              <div className="p-4 pt-10 bg-white flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/100?img=12" alt="user" className="w-8 h-8 rounded-full border border-gray-100" />
                    <div>
                      <div className="text-[8px] text-gray-400 font-medium">Hello Admin,</div>
                      <div className="text-[12px] font-bold text-gray-900 leading-none">Welcome Back!</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 shadow-sm text-xs">🔔</div>
                </div>

                {/* Card */}
                <div className="w-full bg-gradient-to-br from-[#4ADE80] to-[#22C55E] rounded-[20px] p-3.5 text-white mb-4 relative overflow-hidden shadow-lg shadow-emerald-500/10">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2.5">
                      <div className="bg-black/15 backdrop-blur-md px-2 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-wider">Payments</div>
                      <div className="text-[8px] text-white/70">Mar 26</div>
                    </div>
                    <div className="text-[8px] text-white/80 font-medium">Total Pending</div>
                    <div className="font-exrabold text-[22px] mb-2 leading-tight">₹5.29L</div>
                    
                    <div className="w-full bg-black/10 h-1 rounded-full overflow-hidden mb-1.5 flex transition-all duration-1000">
                       <div className="bg-white h-full w-[65%] animate-[barUp_1s_ease]" />
                    </div>
                    <div className="flex justify-between text-[7px] font-bold text-white/90">
                      <span>65% Paid</span>
                      <span>₹8.15L Total</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3 flex justify-between items-center">
                  <div className="text-[11px] font-bold text-gray-900">Active Staff</div>
                  <div className="text-[8px] text-emerald-500 font-bold">View All</div>
                </div>

                <div className="flex justify-between mb-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8.5 h-8.5 rounded-full border border-emerald-50 p-0.5">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8.5 h-8.5 rounded-full bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-400">+5</div>
                </div>

                <div className="text-[11px] font-bold text-gray-900 mb-2">Activities</div>
                <div className="flex-1 space-y-2 overflow-y-auto pr-0.5">
                  {[
                    { title: "Salary Processed", time: "2m ago", icon: '💰' },
                    { title: "Invoice Issued", time: "1h ago", icon: '📄' },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50/50">
                      <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-[10px] shadow-sm">{act.icon}</div>
                      <div className="flex-1">
                        <div className="text-[8.5px] font-bold text-gray-800 leading-tight">{act.title}</div>
                        <div className="text-[7.5px] text-gray-400">{act.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>



      </section>

      {/* INTEGRATIONS MARQUEE */}
      <section className="pb-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-[6vw]">
          <p className="text-center uppercase tracking-[0.2em] text-[11px] font-bold text-gray-400 mb-12">
            Systems we connect with
          </p>
          
          <div className="relative flex overflow-hidden group">
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center min-w-max">
                  {[
                    { name: "HubSpot", color: "#FF7A59", icon: "●" },
                    { name: "zapier", color: "#FF4F00", icon: "⬡" },
                    { name: "quickbooks", color: "#2CA01C", icon: "■" },
                    { name: "xero", color: "#00B7E5", icon: "○" },
                    { name: "Slack", color: "#4A154B", icon: "✦" },
                    { name: "Zoom", color: "#2D8CFF", icon: "⬢" },
                  ].map((brand, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-12 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                      <span className="text-3xl" style={{ color: brand.color }}>{brand.icon}</span>
                      <span className="text-2xl font-bold tracking-tight text-gray-900">{brand.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Gradient Fades for Smooth Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </section>

      {/* REDESIGNED CHALLENGES SECTION (Direct Match to Image) */}
      <section id="challenges" className="relative min-h-[850px] mx-2 w-auto rounded-[3rem] overflow-hidden flex flex-col justify-center px-[6vw] py-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=100" 
            alt="Office Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
        </div>

        <Reveal className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full text-center lg:text-left">
          <div className="mb-16 md:mb-20">
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,3.5rem)] font-bold text-white leading-[1.1] mb-5 tracking-tight">
              Scale faster, and finally<br/>
              automate your <span className="text-transparent italic font-serif bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">office operations</span>
            </h2>
            <p className="text-white/80 text-[1rem] font-medium tracking-wide">What makes us special:</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-end mt-auto">
            {/* Main Specialty Card (Now matches Blue/Teal Theme) */}
            <div className="lg:col-span-4 group">
              <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-[48px] p-10 h-[340px] flex flex-col justify-between shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[22px] flex items-center justify-center shadow-lg">
                  <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#101828] text-[2.25rem] font-bold leading-[1.1] mb-10 tracking-tight">
                    Works on<br/>GPS tracking system
                  </h3>
                  <button className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-white px-9 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
                    Try It Now
                  </button>
                </div>
              </div>
            </div>

            {/* Compliance Card (White with Blue Tint) */}
            <div className="lg:col-span-3 group">
              <div className="bg-white rounded-[40px] p-10 h-[260px] flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 border border-blue-50/50">
                {/* Background Pattern - Soft Sky Circle */}
                <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-[#F0F9FF] rounded-full opacity-60 pointer-events-none" />
                
                <div className="w-14 h-14 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[20px] flex items-center justify-center relative z-10 shadow-sm border-4 border-white">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-[#101828] text-[1.5rem] font-bold leading-[1.2] relative z-10 tracking-tight">
                  100% compliant<br/>with all regulations
                </h3>
              </div>
            </div>

            {/* Setup Card (White with Blue Tint) */}
            <div className="lg:col-span-3 group">
              <div className="bg-white rounded-[40px] p-10 h-[260px] flex flex-col justify-between relative overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 border border-blue-50/50">
                {/* Background Pattern - Soft Indigo Circle */}
                <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-[#EEF2FF] rounded-full opacity-80 pointer-events-none" />

                <div className="w-14 h-14 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[20px] flex items-center justify-center relative z-10 shadow-sm border-4 border-white">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-[#101828] text-[1.5rem] font-bold leading-[1.2] relative z-10 tracking-tight">
                  Done-for-you<br/>setup
                </h3>
              </div>
            </div>

          </div>


        </Reveal>
      </section>



      {/* FEATURES DEEP DIVE (Bento Grid) */}
      <section id="features" className="bg-gradient-to-b from-white to-gray-50 py-[100px] px-[6vw] relative overflow-hidden">
        {/* Decorative Background Text (More Subtle) */}
        <div className="absolute top-[50px] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-20">
          <span className="font-display font-black text-[clamp(6rem,12vw,10rem)] text-gray-200 uppercase tracking-tighter">
            FEATURES
          </span>
        </div>

        <Reveal className="max-w-7xl mx-auto text-center relative z-10 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3AC6F5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5384CD]"></span>
            </span>
            <span className="text-[#5384CD] text-[10px] font-bold uppercase tracking-[0.2em]">Platform Capabilities</span>
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,3.5rem)] font-bold text-[#101828] leading-[1.1] mb-6 tracking-tighter max-w-4xl mx-auto">
            Everything you need,<br />
            <span className="italic font-serif mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] pr-2">
              Nothing you don't.
            </span>
          </h2>
          
          <p className="text-gray-500 text-lg md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Powerful features designed for every role in your organization, simplified into one high-performance interface.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {/* Large Dark Featured Card - GPS & Selfie */}
            <div className="lg:col-span-2 group">
              <div className="relative h-[400px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0D1B2A] via-[#132A45] to-[#0D1B2A] shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-white/10">
                {/* Accent glow */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#E91E63]/15 blur-[80px] rounded-full opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 p-10 h-full flex items-stretch">
                  {/* Left side - Text content */}
                  <div className="w-1/2 flex flex-col justify-center">
                    {/* Pink accent circle - Next to title */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[24px] flex items-center justify-center shadow-lg border-4 border-white/10 mb-8 transition-transform group-hover:scale-110 duration-500">
                      <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    <h3 className="font-display text-[2rem] font-bold text-white leading-tight">GPS & Selfie Attendance</h3>

                    <p className="text-slate-300 text-[1rem] leading-[1.8] font-medium max-w-[90%]">Eliminate time theft. Employees must be at the office location to check in. Selfie verification adds an extra layer of security.</p>
                  </div>

                  {/* Right side - Phone Mockup */}
                  <div className="w-1/2 flex items-center justify-end relative">
                    <div className="relative w-[280px] h-[340px]">
                      {/* Phone Frame */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a80] to-[#2c3e50] rounded-[32px] shadow-2xl border-[6px] border-[#546e7a] p-3">
                        {/* Screen */}
                        <div className="w-full h-full bg-gradient-to-b from-[#1a3a52] to-[#0f1f2e] rounded-[24px] overflow-hidden flex flex-col">
                          {/* Status bar */}
                          <div className="h-10 bg-[#0f1f2e] flex items-center justify-between px-5 text-white text-xs border-b border-white/10">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-slate-400"></div>
                              <div className="w-14 h-2 bg-slate-500 rounded"></div>
                            </div>
                            <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/40 text-emerald-300">On-Time</span>
                          </div>

                          {/* Map area */}
                          <div className="flex-1 bg-gradient-to-b from-[#1a3a52] to-[#0f1f2e] flex items-center justify-center relative">
                            <svg className="w-24 h-24 text-slate-600 opacity-50" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                              <circle cx="50" cy="50" r="35" strokeWidth="0.5" />
                              <path d="M50 20L50 80M20 50L80 50" strokeWidth="0.5" />
                            </svg>
                            <span className="text-slate-500 text-xs absolute bottom-6 font-medium">Map View</span>
                          </div>

                          {/* Camera circle - Bottom */}
                          <div className="h-24 flex items-center justify-center bg-[#0f1f2e]">
                            <div className="w-16 h-16 rounded-full border-[3px] border-emerald-400 flex items-center justify-center bg-emerald-500/10 shadow-lg">
                              <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="3.5" />
                                <path d="M12 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Payroll Card - Light */}
            <div className="group">
              <div className="relative h-[400px] overflow-hidden rounded-[32px] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                {/* Premium Icon Box */}
                <div className="absolute top-8 right-8 w-14 h-14 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[22px] flex items-center justify-center shadow-lg border-4 border-white z-20 transition-transform group-hover:rotate-12 duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-[1.8rem] font-bold mb-4 text-gray-900">Auto Payroll</h3>
                    <p className="text-gray-600 text-[1rem] leading-[1.7] font-medium">Zero manual calculation. Attendance + Overtime + Leaves = Final Salary.</p>
                  </div>

                  {/* Breakdown section */}
                  <div className="space-y-4 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Payroll Breakdown</div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Basic Salary</span>
                        <span className="font-bold text-gray-900">₹25,000</span>
                      </div>
                      <div className="flex justify-between items-center text-emerald-600">
                        <span>+ Overtime (4h)</span>
                        <span className="font-bold">₹1,200</span>
                      </div>
                      <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total Payout</span>
                        <span className="font-bold text-gray-900 text-base">₹26,200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Cards - Bottom Row */}
            {/* Smart Leaves */}
            <div className="group">
              <div className="relative h-[220px] overflow-hidden rounded-[28px] shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[18px] flex items-center justify-center shadow-md border-4 border-white transition-transform group-hover:scale-110 duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-bold text-gray-900 mb-2.5">Smart Leaves</h3>
                    <p className="text-gray-600 text-[0.92rem] leading-relaxed">App-based requests with real-time notifications for admins. Simplify your entire leave approval workflow instantly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GST Billing */}
            <div className="group">
              <div className="relative h-[220px] overflow-hidden rounded-[28px] shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[18px] flex items-center justify-center shadow-md border-4 border-white transition-transform group-hover:scale-110 duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-bold text-gray-900 mb-2.5">GST Billing</h3>
                    <p className="text-gray-600 text-[0.92rem] leading-relaxed">Generate pro GST-compliant invoices in under 30 seconds. Manage client billing, taxes, and status in one place.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expenses */}
            <div className="group">
              <div className="relative h-[220px] overflow-hidden rounded-[28px] shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[18px] flex items-center justify-center shadow-md border-4 border-white transition-transform group-hover:scale-110 duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-bold text-gray-900 mb-2.5">Expenses</h3>
                    <p className="text-gray-600 text-[0.92rem] leading-relaxed">Track every rupee spent on office needs and maintenance. Complete transparency with digital receipts and analytics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ROLE-BASED ACCESS */}
      {/* ONE TOOL, THREE ROLES SECTION */}
      <section id="roles" className="bg-white py-[120px] px-[6vw] relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03]">
          <span className="font-display font-black text-[clamp(6rem,15vw,12rem)] text-gray-900 uppercase tracking-tighter">
            ROLES
          </span>
        </div>

        <Reveal className="max-w-7xl mx-auto text-center relative z-10 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm mb-6">
            <span className="text-[#5384CD] text-[10px] font-bold uppercase tracking-[0.2em]">Multi-User Ecosystem</span>
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,3.5rem)] font-bold text-[#101828] leading-[1.1] mb-6 tracking-tighter max-w-4xl mx-auto">
            One Tool, <br />
            <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">
              Three Diverse Roles.
            </span>
          </h2>
          
          <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Separate views for Admin, HR, and Accounts to keep work focused, secure, and highly efficient.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
          {/* Admin Role */}
          <Reveal className="bg-white p-10 rounded-[40px] border border-blue-100/50 shadow-xl shadow-blue-500/5 transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[20px] flex items-center justify-center shadow-lg border-4 border-white mb-8 transition-transform group-hover:rotate-6">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold mb-4 text-[#101828]">Admin Access</h3>
            <p className="text-[0.95rem] text-gray-500 leading-relaxed font-medium mb-8">Full visibility. Manage staff, oversee billing, approve decisions, and access every operational report.</p>
            <ul className="space-y-4">
              {["Centralized Dashboard", "Attendance Oversight", "Invoice Management", "Strategic Reports"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] font-bold text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3AC6F5]"></span> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* HR Role */}
          <Reveal className="bg-white p-10 rounded-[40px] border border-blue-100/50 shadow-xl shadow-blue-500/5 transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[20px] flex items-center justify-center shadow-lg border-4 border-white mb-8 transition-transform group-hover:rotate-6">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold mb-4 text-[#101828]">HR Access</h3>
            <p className="text-[0.95rem] text-gray-500 leading-relaxed font-medium mb-8">Manage attendance, process employee leaves, calculate complex salaries, and access records.</p>
            <ul className="space-y-4">
              {["Attendance Tracking", "Leave Approvals", "Salary Payroll", "Employee Records"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] font-bold text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3AC6F5]"></span> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Accounts Role */}
          <Reveal className="bg-white p-10 rounded-[40px] border border-blue-100/50 shadow-xl shadow-blue-500/5 transition-all duration-500 hover:-translate-y-2 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[20px] flex items-center justify-center shadow-lg border-4 border-white mb-8 transition-transform group-hover:rotate-6">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 01-2 2v14a2 2 0 012 2z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold mb-4 text-[#101828]">Accounts Access</h3>
            <p className="text-[0.95rem] text-gray-500 leading-relaxed font-medium mb-8">Handle all financial operations — invoices, quotations, expense records, and client billing.</p>
            <ul className="space-y-4">
              {["Invoice Generation", "Payment Tracking", "Expense Recording", "Billing Analytics"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] font-bold text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3AC6F5]"></span> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION (Modernized) */}
      <section id="why-choose" className="bg-[#050511] py-[130px] px-[6vw] relative overflow-hidden m-1 rounded-[3rem]">
        {/* Decorative Background Text */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.05]">
          <span className="font-display font-black text-[clamp(6rem,15vw,12rem)] text-white uppercase tracking-tighter">
            TRUST
          </span>
        </div>

        {/* Dynamic Glows */}
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#5384CD]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#3AC6F5]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-20 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:w-[45%] text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm mb-8">
                <span className="text-[#3AC6F5] text-[10px] font-bold uppercase tracking-[0.2em]">Our Commitment</span>
              </div>
              
              <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-white leading-[1.1] mb-8 tracking-tight flex flex-col items-start gap-2">
                <span>Why <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">Choose</span></span>
                <img src="/fulllogo_transparent.png" alt="Officink Logo" className="h-[1.5em] -ml-5 w-auto object-contain" />
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed font-medium mb-10 max-w-md">
                When you partner with Officink, you gain more than a product you gain a committed technology partner dedicated to your growth.
              </p>

              <div className="flex items-center gap-4 py-6 border-t border-white/10">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050511] bg-gray-600 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Trusted by 500+ Teams</div>
                  <div className="text-gray-500 text-xs">Industry-standard security & support</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Cards (Grid) */}
          <div className="lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                id: "01",
                title: "Customized Integration",
                desc: "Custom-built solutions meticulously tailored to your unique operational DNA.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                )
              },
              {
                id: "02",
                title: "Expert Insight",
                desc: "Experienced professionals with deep industry insights ensuring best-practice workflows.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                id: "03",
                title: "Reliable Support",
                desc: "24/7 technical support and white-glove implementation for smooth adoption.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              },
              {
                id: "04",
                title: "Proven Metrics",
                desc: "A track record of success with clients across dozens of competitive sectors.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              }
            ].map((card, i) => (
              <Reveal key={i} className={`p-8 rounded-[32px] border border-white/5 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-500 ${i === 1 || i === 3 ? 'sm:mt-8' : ''}`}>
                <div className="absolute top-0 right-0 p-6 text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  {card.id}
                </div>
                
                <div className="w-12 h-12 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[18px] flex items-center justify-center shadow-lg border-2 border-white/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                
                <h3 className="text-white text-xl font-bold mb-3 tracking-tight">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">{card.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="bg-white py-[120px] px-[6vw] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header Area with Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <Reveal className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-100 bg-gray-50 text-[#5384CD] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                User Feedback
              </div>
              <h2 className="font-display text-[clamp(2.5rem,4.5vw,3rem)] font-bold text-[#101828] leading-[1.1] tracking-tighter">
                What our <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">Users</span> who<br />
                have used it say
              </h2>
            </Reveal>
            
            {/* Navigation Arrows (Mock) */}
            <div className="flex gap-4 mb-4">
              <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors group/nav">
                <svg className="w-6 h-6 transform group-hover/nav:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center text-white hover:bg-black transition-colors shadow-lg group/nav">
                <svg className="w-6 h-6 transform group-hover/nav:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ramuel Smith",
                img: "11",
                quote: "Officink transformed our attendance tracking. The GPS verification is foolproof and our payroll is now 100% accurate every single month."
              },
              {
                name: "Queenita Warless",
                img: "32",
                quote: "The mobile app is a total game changer for our field staff. They love the simple interface and I love the real-time reporting from the console."
              },
              {
                name: "Wizzard Yanto",
                img: "44",
                quote: "Best investment for our growing office. The GST billing and expense tracking have saved my team hours of manual data entry weekly."
              }
            ].map((testi, i) => (
              <Reveal key={i} className="p-8 rounded-[32px] bg-gray-50/50 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={`https://i.pravatar.cc/150?img=${testi.img}`} alt={testi.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testi.name}</div>
                    {/* Dynamic Stars */}
                    <div className="flex gap-0.5 text-yellow-400 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-[0.95rem] leading-relaxed font-medium">"{testi.quote}"</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPACT WIDE-SCREEN CTA SECTION */}
      <section id="cta" className="bg-white py-[80px] px-[6vw] relative overflow-hidden">
        {/* Subtle Decorative Background Text */}
        <div className="absolute top-[40px] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03]">
          <span className="font-display font-black text-[clamp(6rem,15vw,10rem)] text-gray-900 uppercase tracking-tighter">
            START
          </span>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-gray-50 text-[#5384CD] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
              </svg>
              Get Started In Seconds
            </div>
            
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#101828] leading-[1] mb-6 tracking-tighter lg:max-w-none max-w-2xl mx-auto">
              Ready to <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">Automate</span> your business?
            </h2>

            <p className="text-gray-500 text-lg sm:text-lg font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the power of the all-in-one platform built for accuracy and growth. Join 100+ high-performance teams.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <Link
                href="https://console.officink.com"
                target="_blank"
                className="group relative isolate flex items-center justify-center gap-2 rounded-full bg-[#0B0F1A] py-4 px-10 font-semibold text-white shadow-[0_4px_0_#1a1f2e] transition-all duration-200 active:translate-y-[4px] active:shadow-none hover:shadow-[0_6px_0_#D1D5DB] hover:-translate-y-1 border-t border-white/10 overflow-hidden no-underline"
              >
                <span className="relative z-10 flex items-center gap-2 tracking-wide text-[16px]">
                  Request Demo
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              </Link>

              <Link
                href="https://console.officink.com"
                target="_blank"
                className="group relative isolate flex items-center justify-center gap-2 rounded-full border border-gray-200 py-4 px-10 font-semibold text-gray-900 bg-white hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2 tracking-wide text-[16px]">
                  Explore Console
                </span>
              </Link>
            </div>

           
            
            <p className="mt-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">No signup required · Zero setup time</p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      {/* FOOTER SECTION (Modernized) */}
      <footer className="bg-[#050511] text-white pt-24 pb-8 m-1 rounded-[3rem] flex flex-col relative overflow-hidden">
        {/* Dynamic Glows (Mirrored from Why Choose) */}
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#5384CD]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-[#3AC6F5]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 relative z-10 px-[6vw]">

          {/* Left Section - Brand & Mission */}
          <div className="max-w-md">
          
            <p className="text-[#a1a1aa] text-lg sm:text-xl max-w-sm font-medium leading-relaxed mb-4">
              An all-in-one office <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">automation</span> platform by <a href="https://thegoldtechnologies.com/" target="_blank" className="hover:text-white transition-colors">The Gold Technologies</a>.
            </p>
            <p className="text-[#71717a] text-sm leading-relaxed max-w-xs">
              Centralizing attendance, payroll, billing, and expense tracking for high-performance growing teams.
            </p>
          </div>

          {/* Right Section / Links */}
          <div className="flex flex-wrap lg:flex-nowrap gap-12 sm:gap-20 lg:gap-24">
            {/* NAVIGATE */}
            <div>
              <h4 className="text-[11px] font-bold text-white/40 tracking-widest uppercase mb-8 font-mono">Navigate</h4>
              <ul className="space-y-4 text-[15px] font-medium text-[#a1a1aa]">
                <li><Link href="#hero" className="hover:text-[#5384CD] transition-colors">Home</Link></li>
                <li><Link href="#solutions" className="hover:text-[#5384CD] transition-colors">Solutions</Link></li>
                <li><Link href="#features" className="hover:text-[#5384CD] transition-colors">Features</Link></li>
                <li><Link href="#cta" className="hover:text-[#3AC6F5] transition-colors">Get Started</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-[11px] font-bold text-white/40 tracking-widest uppercase mb-8 font-mono">Legal</h4>
              <ul className="space-y-4 text-[15px] font-medium text-[#a1a1aa]">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* CONNECT */}
            <div>
              <h4 className="text-[11px] font-bold text-white/40 tracking-widest uppercase mb-8 font-mono">Connect</h4>
              <ul className="space-y-5 text-[15px] font-medium text-[#a1a1aa]">
                <li>
                  <a href="tel:+918368198551" className="flex items-center gap-2 hover:text-white transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5384CD]"></span>
                    +91 8368198551
                  </a>
                </li>
                <li>
                  <a href="mailto:info@thegoldtechnologies.com" className="flex items-center gap-2 hover:text-white transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3AC6F5]"></span>
                    Email Admin
                  </a>
                </li>
                <li>
                  <div className="text-[#a1a1aa] text-xs mt-4 pl-3 border-l border-white/10 max-w-[200px] leading-relaxed">
                    <strong className="text-white block mb-1">HQ · India</strong>
                    SD-369, D block, Shastri Nagar, Ghaziabad, UP
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* GIANT TEXT (Consistent with ROLES/FEATURES labels) */}
        <div className="mt-10 pb-2 w-full flex justify-center overflow-hidden select-none pointer-events-none opacity-[0.04]">
          <h1 className="text-[19vw] font-black text-white leading-[0.8] m-0 p-0 tracking-tighter mix-blend-color-dodge font-sans">
            OFFICINK
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1400px] w-full mx-auto mt-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-[#555] relative z-20 px-[6vw]">
          <p>© 2026 <a href="https://thegoldtechnologies.com/" target="_blank" className="hover:text-white transition-colors">The Gold Technologies</a>. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Attendance · Salary · Billing · Expenses</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
