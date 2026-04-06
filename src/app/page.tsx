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
  // Testimonials Carousel State
  const testiScrollRef = useRef<HTMLDivElement>(null);
  const [isTestiDragging, setIsTestiDragging] = useState(false);
  const [testiStartX, setTestiStartX] = useState(0);
  const [testiScrollLeft, setTestiScrollLeft] = useState(0);

  const handleTestiMouseDown = (e: React.MouseEvent) => {
    setIsTestiDragging(true);
    setTestiStartX(e.pageX - (testiScrollRef.current?.offsetLeft || 0));
    setTestiScrollLeft(testiScrollRef.current?.scrollLeft || 0);
  };

  const handleTestiMouseMove = (e: React.MouseEvent) => {
    if (!isTestiDragging) return;
    e.preventDefault();
    const x = e.pageX - (testiScrollRef.current?.offsetLeft || 0);
    const walk = (x - testiStartX) * 2;
    if (testiScrollRef.current) {
      testiScrollRef.current.scrollLeft = testiScrollLeft - walk;
    }
  };

  const stopTestiDragging = () => setIsTestiDragging(false);

  // Quote Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    number: "",
    email: "",
    company: ""
  });
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteSubmitStatus, setQuoteSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    setQuoteSubmitStatus("idle");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteFormData),
      });

      if (response.ok) {
        setQuoteSubmitStatus("success");
        setTimeout(() => {
          setIsQuoteModalOpen(false);
          setQuoteFormData({ name: "", number: "", email: "", company: "" });
          setQuoteSubmitStatus("idle");
        }, 2000);
      } else {
        setQuoteSubmitStatus("error");
      }
    } catch (error) {
      setQuoteSubmitStatus("error");
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  // Auto-shuffle Testimonials
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isTestiDragging) {
      interval = setInterval(() => {
        if (testiScrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = testiScrollRef.current;
          // If at the end (or near), go back to start, else scroll one card width
          if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
            testiScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            testiScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
          }
        }
      }, 5000); // Shuffle every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isTestiDragging]);

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
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="group relative isolate flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] px-6 py-2.5 text-[14px] font-bold text-white shadow-[0_3px_0_#3469b6] transition-all duration-200 active:translate-y-[3px] active:shadow-none hover:shadow-[0_5px_0_#9ec0ee] hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Request Quote
            </span>
          </button>
          <Link
            href="https://console.officink.com"
            target="_blank"
            className="group relative isolate flex items-center justify-center gap-2 rounded-full bg-[#0B0F1A] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_3px_0_#1a1f2e] transition-all duration-200 active:translate-y-[3px] active:shadow-none hover:shadow-[0_5px_0_#D1D5DB] hover:-translate-y-1 border-t border-white/10 overflow-hidden no-underline"
          >
            <span className="relative z-10 flex items-center gap-2">
              Login
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 max-w-7xl mx-auto pt-[130px] pb-40 relative overflow-hidden ">
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
                href="https://calendly.com/officink-support/30min"
                target="_blank"
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
      <section className="pb-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-[6vw]">
          <div className="text-center mb-12">
            <h3 className="text-md font-semibold text-gray-900 tracking-tight">
              Trusted by 50+ Companies
            </h3>
            <p className="text-gray-500 text-xs font-normal">
              From startups to enterprises
            </p>
          </div>
          
          <div className="relative flex overflow-hidden group">
            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] items-center">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center min-w-max">
                  {[
                    "absolute-factor-logo.png",
                    "accessible-minds.png",
                    "centriik-logo-new.png",
                    "great-water.png",
                    "himalyan-agro.png",
                    "indian-vastu-experts-logo-gold.png",
                    "transverse-solutions-logo.png",
                    "cinemac-logo.jpg",
                    "dalxes.jpeg"
                  ].map((logo, idx) => (
                    <div key={idx} className="flex items-center justify-center px-12 py-2 opacity-30 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110">
                      <img 
                        src={`/partner/${logo}`} 
                        alt="Partner Logo" 
                        className="h-12 w-auto max-w-[160px] object-contain"
                      />
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

      {/* OPERATIONAL CHALLENGES SECTION */}
      <section id="operational-challenges" className="bg-[#050511] py-[120px] px-[6vw] relative overflow-hidden m-1 rounded-[3rem]">
        {/* Decorative Background Text */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03]">
          <span className="font-display font-black text-[clamp(6rem,15vw,10rem)] text-white uppercase tracking-tighter">
            GAPS
          </span>
        </div>

        {/* Dynamic Glows */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#5384CD]/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-[#3AC6F5]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm mb-6">
              <span className="text-[#3AC6F5] text-[10px] font-bold uppercase tracking-[0.2em]">The Silent Problem</span>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white leading-[1.1] mb-6 tracking-tight max-w-4xl mx-auto">
              Most operational problems don’t start with <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">big failures.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              They start with small gaps no one can clearly track.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Manual record keeping errors",
                desc: "Paper chains and local spreadsheets lead to data loss and unreliable metrics.",
                color: "from-[#10B981] to-[#059669]",
                shadow: "shadow-emerald-500/20",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              },
              {
                title: "Inefficient quotation & billing",
                desc: "Delayed invoices and manual quotations slow down your entire cash flow cycle.",
                color: "from-[#84CC16] to-[#65A30D]",
                shadow: "shadow-lime-500/20",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              },
              {
                title: "Inaccurate attendance tracking",
                desc: "Proxy attendance and time theft result in massive payroll leakage every year.",
                color: "from-[#0EA5E9] to-[#0284C7]",
                shadow: "shadow-sky-500/20",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              {
                title: "Security risks from access",
                desc: "Unverified access to office resources creates hidden vulnerabilities in your operations.",
                color: "from-[#8B5CF6] to-[#7C3AED]",
                shadow: "shadow-purple-500/20",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: "Inventory loss & theft",
                desc: "Unmanaged stock levels and missing assets strain finances and disrupt daily flow.",
                color: "from-[#F59E0B] to-[#D97706]",
                shadow: "shadow-amber-500/20",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              {
                title: "Slow & complicated reporting",
                desc: "Waiting days for reports means you're always making decisions on old data.",
                color: "from-[#F43F5E] to-[#E11D48]",
                shadow: "shadow-rose-500/20",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              }
            ].map((gap, i) => (
              <Reveal key={i} className="group relative">
                <div className={`h-full p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.05] flex flex-col`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gap.color} flex items-center justify-center text-white mb-8 shadow-lg ${gap.shadow} group-hover:scale-110 transition-transform duration-500`}>
                    {gap.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight">
                    {gap.title}
                  </h3>
                  <p className="text-gray-400 text-[0.95rem] leading-relaxed font-medium">
                    {gap.desc}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div className={`mt-auto pt-6`}>
                    <div className={`h-1 w-0 group-hover:w-16 bg-gradient-to-r ${gap.color} rounded-full transition-all duration-500`}></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS CAROUSEL SECTION */}
      <section 
        id="solutions" 
        className="bg-[#FAFBFD] pt-[120px] pb-[20px] relative overflow-hidden" 
      >

        <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8 px-6 lg:px-0 md:px-20">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,3.5rem)] font-bold text-[#101828] leading-[1.1] tracking-tighter">
              Office Automation<br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">You Can Trust</span>
            </h2>
          </Reveal>
          <Reveal className="md:w-1/3 text-right">
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              We provide a wide range of office tools. Covering all of your operational needs.
            </p>
          </Reveal>
        </div>

        {/* Solutions Grid - Bento Layout */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
          >
            {[
              {
                title: "Attendance Tracking & Verification",
                label: "Attendance",
                desc: "Achieve 100% staff accountability with high-precision GPS-fencing and secure selfie verification at every check-in. Eliminate proxy attendance completely and track field staff movement in real-time. Automatically generate precise clock-in/out logs that sync directly with your monthly payroll for zero-error salary processing.",
                color: "from-blue-50 to-white",
                accent: "text-blue-500",
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                span: "lg:col-span-2 md:col-span-2"
              },
              {
                title: "Automated Payroll",
                label: "Calculations",
                desc: "Zero-effort salary processing that syncs attendance, overtime, and leaves automatically.",
                color: "from-emerald-50 to-white",
                accent: "text-emerald-500",
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                span: "lg:col-span-1 md:col-span-1"
              },
              {
                title: "GST Smart Billing",
                label: "Invoicing",
                desc: "Generate professional pro-invoices and quotations in under 30 seconds with GST compliance.",
                color: "from-slate-100 to-white",
                accent: "text-slate-600",
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                span: "lg:col-span-1 md:col-span-1"
              },
              {
                title: "Expense Management",
                label: "Finance",
                desc: "Complete financial transparency with digital receipt recording and real-time expense analytics.",
                color: "from-amber-50 to-white",
                accent: "text-amber-500",
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                span: "lg:col-span-1 md:col-span-1"
              },
              {
                title: "Smart Leave Flow",
                label: "Management",
                desc: "Mobile-first leave requests and admin approvals for a faster, paperless office culture.",
                color: "from-purple-50 to-white",
                accent: "text-purple-500",
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                span: "lg:col-span-1 md:col-span-1"
              },
              {
                title: "Unified Administration Console",
                label: "Command Center",
                desc: "A centralized command center that consolidates data across HR, Finance, and Operations. Get real-time cross-module analytics, role-based access controls, and automated reporting systems in one premium high-performance dashboard.",
                color: "from-sky-50 to-white",
                accent: "text-[#3AC6F5]",
                icon: (
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                span: "lg:col-span-3 md:col-span-2",
                visual: (
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {[
                      { l: 'Revenue', v: '₹12.4L', c: 'text-emerald-600' },
                      { l: 'Staff', v: '432', c: 'text-blue-600' },
                      { l: 'Leaves', v: '12', c: 'text-amber-600' },
                      { l: 'Tickets', v: '4', c: 'text-rose-600' }
                    ].map((m, idx) => (
                      <div key={idx} className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-sky-100 shadow-sm">
                        <div className="text-[9px] font-bold text-gray-400 uppercase">{m.l}</div>
                        <div className={`text-sm font-black ${m.c}`}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                )
              }
            ].map((sol, i) => (
              <div key={i} className={`${sol.span}`}>
                <div className={`group relative h-full rounded-[35px] p-6 md:p-8 bg-gradient-to-br ${sol.color} border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col min-h-[280px]`}>
                  <div className="flex flex-col lg:flex-row gap-8 h-full">
                    {/* Left: Content */}
                    <div className={`${sol.visual ? 'lg:w-[70%]' : 'w-full'} flex flex-col`}>
                      {/* Top Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl bg-white shadow-md border border-gray-50 transition-transform group-hover:scale-110 duration-500 ${sol.accent}`}>
                          <div className="w-7 h-7">
                            {sol.icon}
                          </div>
                        </div>
                        <div className="px-4 py-1.5 rounded-xl bg-white shadow-sm border border-gray-50 text-[9px] font-bold text-gray-400 uppercase tracking-widest backdrop-blur-md">
                          {sol.label}
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="mt-auto">
                        <h3 className="text-xl md:text-2xl font-bold text-[#101828] mb-3 tracking-tight leading-tight">
                          {sol.title}
                        </h3>
                        <p className="text-gray-500 text-sm md:text-[0.95rem] leading-relaxed font-medium transition-colors max-w-[95%]">
                          {sol.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right: Visual Graphics (Only for wide cards) */}
                    {sol.visual && (
                      <div className="lg:w-[20%] flex items-center justify-center pt-6 lg:pt-0">
                        {sol.visual}
                      </div>
                    )}
                  </div>

                  {/* Soft Background Accent */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 blur-[50px] rounded-full pointer-events-none group-hover:bg-white transition-colors duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            <span className="text-[#5384CD] text-[10px] font-bold uppercase tracking-[0.2em]">Core Features</span>
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,3.5rem)] font-bold text-[#101828] leading-[1.1] mb-6 tracking-tighter max-w-4xl mx-auto">
            Built for How <br />
            <span className="italic font-serif mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] pr-2">
              Real Businesses Operate
            </span>
          </h2>
          
          <p className="text-gray-500 text-lg md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Powerful features designed for every role in your organization, simplified into one high-performance interface.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
            {/* Large Dark Featured Card - GPS & Selfie */}
            <div className="lg:col-span-2 group">
              <div className="relative h-[400px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0D1B2A] via-[#132A45] to-[#0D1B2A] shadow-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-white/10">
                {/* Accent glow */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#E91E63]/15 blur-[80px] rounded-full opacity-50"></div>

                {/* Content */}
                <div className="relative z-10 p-10 h-full flex items-stretch">
                  {/* Left side - Text content */}
                  <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col justify-center">
                    {/* Pink accent circle - Next to title */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[24px] flex items-center justify-center shadow-lg border-4 border-white/10 mb-8 transition-transform group-hover:scale-110 duration-500">
                      <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    <h3 className="font-display text-[2rem] font-bold text-white leading-tight">Verified Attendance</h3>

                    <p className="text-slate-300 text-[1rem] leading-[1.8] font-medium max-w-[95%]">
                      Location and identity-based check-ins ensure real presence not manual entries.<br />
                      Zero proxy attendance. Total staff accountability.
                    </p>
                  </div>

                  {/* Right side - Phone Mockup */}
                  <div className="lg:w-1/2 md:w-1/2 w-full md:flex items-center justify-end relative hidden">
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

            {/* Real Inventory Tracking Card - Light */}
            <div className="group">
              <div className="relative h-[400px] overflow-hidden rounded-[32px] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                {/* Premium Icon Box */}
                <div className="absolute top-8 right-8 w-14 h-14 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[22px] flex items-center justify-center shadow-lg border-4 border-white z-20 transition-transform group-hover:rotate-12 duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-[1.8rem] font-bold max-w-[90%] mb-4 text-gray-900">Real Inventory Tracking</h3>
                    <p className="text-gray-600 text-[1rem] leading-[1.7] font-medium max-w-[90%]">Track actual stock movement across locations in real time. Know what’s available. Always.</p>
                  </div>

                  {/* Visual mockup space */}
                  <div className="space-y-3 bg-gray-50 rounded-2xl p-6 border border-gray-200 mt-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-400 text-xs">SKU-4829</span>
                      <span className="text-emerald-500 text-xs font-bold">In Stock</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm font-medium">Warehouse A</span>
                      <span className="text-gray-900 font-bold">142 Units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm font-medium">Main Store</span>
                      <span className="text-gray-900 font-bold">58 Units</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order to Invoice Flow - Light */}
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
                    <h3 className="font-display text-[1.25rem] font-bold text-gray-900 mb-2.5">Order to Invoice Flow</h3>
                    <p className="text-gray-600 text-[0.85rem] leading-relaxed">Orders, invoices, and collections connected in one system. No more fragmented records.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Visibility - Light */}
            <div className="group">
              <div className="relative h-[220px] overflow-hidden rounded-[28px] shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[18px] flex items-center justify-center shadow-md border-4 border-white transition-transform group-hover:scale-110 duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-bold text-gray-900 mb-2.5">Payment Visibility</h3>
                    <p className="text-gray-600 text-[0.85rem] leading-relaxed">See what’s billed, collected, pending, and overdue instantly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Clarity - Light */}
            <div className="group">
              <div className="relative h-[220px] overflow-hidden rounded-[28px] shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5384CD] to-[#3AC6F5] rounded-[18px] flex items-center justify-center shadow-md border-4 border-white transition-transform group-hover:scale-110 duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-bold text-gray-900 mb-2.5">Operational Clarity</h3>
                    <p className="text-gray-600 text-[0.85rem] leading-relaxed">Make decisions using real activity data instead of assumptions.</p>
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
                  {["face-1.png", "face-2.png", "face-3.png"].map((img, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050511] bg-gray-600 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-lg">
                      <img src={`/face/${img}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Trusted by 50+ Teams</div>
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
      <section id="testimonials" className="bg-[#FFFFFF] py-[120px] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-0">
          {/* Header Area with Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <Reveal className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-100 bg-gray-50 text-[#5384CD] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                User Feedback
              </div>
              <h2 className="font-display text-[clamp(2.5rem,4.5vw,3rem)] font-bold text-[#101828] leading-[1.1] tracking-tighter">
                What our <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]">Users</span> say<br />
              who have used it.
              </h2>
            </Reveal>
            
            {/* Navigation Arrows */}
            <div className="flex gap-4 mb-4">
              <button 
                onClick={() => {
                  if (testiScrollRef.current) {
                    testiScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
                className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors group/nav active:scale-95 transition-transform"
              >
                <svg className="w-6 h-6 transform group-hover/nav:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => {
                  if (testiScrollRef.current) {
                    testiScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
                className="w-12 h-12 rounded-full bg-[#101828] flex items-center justify-center text-white hover:bg-black transition-colors shadow-lg group/nav active:scale-95 transition-transform"
              >
                <svg className="w-6 h-6 transform group-hover/nav:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container - Aligned dynamic with Solutions section */}
        <div className="pl-6 md:pl-[max(1.5rem,calc((100vw-1280px)/2))] relative">
          {/* Testimonial Cards */}
          <div 
            ref={testiScrollRef}
            onMouseDown={handleTestiMouseDown}
            onMouseMove={handleTestiMouseMove}
            onMouseUp={stopTestiDragging}
            onMouseLeave={stopTestiDragging}
            className={`flex gap-8 overflow-x-auto snap-x snap-mandatory pt-4 pb-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isTestiDragging ? 'cursor-grabbing select-none scroll-auto !snap-none' : 'cursor-grab scroll-smooth'}`}
            style={{ 
              scrollSnapType: isTestiDragging ? 'none' : 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {[
              {
                name: "Rahul Mehta",
                role: "Operations head",
                img: "/face/face-6.png",
                quote: "Managing 400+ field staff was a nightmare before Officink. Now I have real-time visibility into every check-in with 100% location accuracy."
              },
              {
                name: "Amit Sharma",
                role: "COO",
                img: "/face/face-3.png",
                quote: "The depth of reporting in the console is exactly what we needed to scale. Our operational costs dropped by 15% in the first quarter."
              },
              {
                name: "Priya Nair",
                role: "HR head",
                img: "/face/face-2.png",
                quote: "Payroll used to take four days. With automated attendance sync, we process salaries for our entire workforce in under an hour."
              },
              {
                name: "Daniel Carter",
                role: "Regional Operations Manager",
                img: "/face/face-4.png",
                quote: "Integrating our regional logistics gave us the transparency we lacked. The mobile-first approach is perfect for our distributed team."
              },
              {
                name: "Emily Watson",
                role: "VP",
                img: "/face/face-8.png",
                quote: "The unified visibility into billing and collections has secured our cash flow. We now make decisions based on real-time activity data."
              }
            ].map((testi, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[395px] snap-start">
                <div className="h-full p-8 rounded-[32px] bg-[#F9FAFB] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-[#5384CD]/5 transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform group-hover:scale-105 duration-500">
                      <img src={testi.img} alt={testi.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 leading-tight group-hover:text-[#101828] transition-colors">{testi.name}</div>
                      <div className="text-[10px] text-[#5384CD] font-bold uppercase tracking-wider mt-0.5">{testi.role}</div>
                      {/* Stars */}
                      <div className="flex gap-0.5 text-yellow-400 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-[0.95rem] leading-relaxed font-medium transition-colors group-hover:text-gray-900 italic">
                    "{testi.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-0">
          {/* Compact Mission/Quote */}
          <Reveal className="mt-12 text-center px-4 max-w-3xl mx-auto border-t border-gray-100 pt-10">
            <p className="font-display text-[1.2rem] md:text-[1.35rem] font-bold text-[#101828] leading-tight italic tracking-tight mb-3">
              "Helping growing businesses regain control through real-time data and complete transparency."
            </p>
            <div className="text-[9px] font-bold text-[#5384CD] uppercase tracking-[0.4em] opacity-80">
              — OFFICINK VISION
            </div>
          </Reveal>
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
                href="https://calendly.com/officink-support/30min"
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
              <ul className="space-y-5 text-[14px] font-medium text-[#a1a1aa]">
                <li>
                  <div className="space-y-3">
                    <a href="tel:+918368198551" className="flex items-center gap-2 hover:text-white transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5384CD]"></span>
                      +91 8368198551
                    </a>
                    <a href="tel:+917289920660" className="flex items-center gap-2 hover:text-white transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3AC6F5]"></span>
                      +91 7289920660
                    </a>
                    <a href="mailto:support@officink.com" className="flex items-center gap-2 hover:text-white transition-colors group">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      support@officink.com
                    </a>
                  </div>
                </li>
                <li>
                  <div className="text-[#a1a1aa] text-xs mt-4 pl-3 border-l border-white/10 max-w-[300px] leading-relaxed">
                    <strong className="text-white block mb-1 tracking-wider">HQ · Noida</strong>
                    Sector 63, Noida, Uttar Pradesh
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* GIANT TEXT (Consistent with ROLES/FEATURES labels) */}
        <div className="mt-6 pb-2 w-full flex justify-center overflow-hidden select-none pointer-events-none opacity-[0.04]">
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
      {/* QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsQuoteModalOpen(false)}
          />
          <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg p-10 md:p-12 overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#5384CD]/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="font-display text-[2.2rem] font-bold text-gray-900 leading-tight">Request Quote</h2>
                  <p className="text-gray-500 font-medium mt-2">Grow your business with smart automation.</p>
                </div>
                <button 
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Ayush Sharma"
                      value={quoteFormData.name}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-[#5384CD] outline-none transition-all placeholder:text-gray-300 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={quoteFormData.number}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, number: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-[#5384CD] outline-none transition-all placeholder:text-gray-300 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="ayush@company.com"
                    value={quoteFormData.email}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-[#5384CD] outline-none transition-all placeholder:text-gray-300 font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Company Name</label>
                  <input
                    required
                    type="text"
                    placeholder="The Gold Technologies"
                    value={quoteFormData.company}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, company: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-[#5384CD] outline-none transition-all placeholder:text-gray-300 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingQuote || quoteSubmitStatus === "success"}
                  className={`w-full group relative isolate flex items-center justify-center gap-3 rounded-2xl py-5 font-bold text-white shadow-xl transition-all duration-300 overflow-hidden ${
                    quoteSubmitStatus === "success" 
                    ? "bg-emerald-500 shadow-emerald-200" 
                    : "bg-gradient-to-r from-gray-900 to-black hover:shadow-gray-200 active:translate-y-1"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3 text-lg">
                    {isSubmittingQuote ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : quoteSubmitStatus === "success" ? (
                      <>
                        Request Sent!
                        <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Submit Request
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
                
                {quoteSubmitStatus === "error" && (
                  <p className="text-center text-rose-500 text-sm font-bold animate-shake">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
