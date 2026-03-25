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
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="min-h-screen font-body selection:bg-brand-teal selection:text-white">
      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-[6vw] h-[80px] bg-transparent">
        <Link href="#" className="flex items-center gap-2 no-underline">
          <img src="/fulllogo_transparent.png" alt="Patungans Logo" className="h-[100px] w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link href="#service" className="text-gray-500 text-[15px] hover:text-gray-900 transition-colors">Service</Link>
          <Link href="#product" className="text-gray-500 text-[15px] hover:text-gray-900 transition-colors">Product</Link>
          <Link href="#blog" className="text-gray-500 text-[15px] hover:text-gray-900 transition-colors">Blog</Link>
          <Link href="#about" className="text-gray-500 text-[15px] hover:text-gray-900 transition-colors">About Us</Link>
        </div>
        <div className="hidden sm:block">
          <Link href="#cta" className="bg-[#1f2229] text-white font-medium text-[14px] py-3 px-6 rounded-xl hover:bg-black transition-all">
            Get a Demo
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-[6vw] pt-[130px] pb-50 relative overflow-hidden bg-[#F5F7F8]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] rounded-full"></div>
            <span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text font-bold text-[12px] uppercase tracking-[2.5px]">All-in-One Office Automation</span>
          </div>
          
          <h1 className="font-display text-[clamp(3rem,10vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-6 text-gray-900">
            Attendance, Salary,  <span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text">Billing & Expenses</span><br />
             One Dashboard.
          </h1>

          <p className="text-gray-500 text-[1.125rem] leading-[1.6] max-w-[550px] mb-10 font-medium">
            Track attendance with selfies, automate payroll, generate GST invoices, and manage expenses accurately and transparently.
          </p>

          {/* <Link href="#cta" className="flex items-center gap-4 mb-14 cursor-pointer group w-max no-underline">
            <div className="w-[50px] h-[50px] rounded-full bg-[#EAF3FF] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-[#5384CD] border-b-[7px] border-b-transparent ml-1"></div>
            </div>
            <span className="text-gray-900 font-semibold text-[16px] group-hover:bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text transition-colors">Try It Free</span>
          </Link> */}

          <div>
            <p className="text-[13px] font-semibold text-gray-900 mb-4 ml-1 uppercase tracking-wide">Available for download :</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#242730] text-white rounded-2xl p-[12px_24px] flex items-center gap-3 hover:bg-black transition-colors w-[180px]">
                <svg className="w-[22px] h-[22px] fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.86 3.59-.76 1.54.12 2.65.65 3.32 1.6-3.13 1.87-2.6 5.96.48 7.34-.78 1.93-1.63 3.19-2.47 3.99zm-3.22-14.3c-.06-1.57.85-2.97 1.87-3.79-.82-1.41-2.64-1.68-3.23-1.68-1.59.08-3.02 1.15-3.08 2.76 0 1.63.92 2.94 2.1 3.73.66.45 1.56.78 2.37.76.01-.58-.03-1.19-.03-1.78z" /></svg>
                <div className="text-left">
                  <div className="text-[10px] text-white/70 leading-none mb-1">App Store</div>
                  <div className="text-[12px] font-semibold leading-none">For iOS & MacOS</div>
                </div>
              </button>
              
              <button className="bg-[#3A3D46] text-white rounded-2xl p-[12px_24px] flex items-center gap-3 hover:bg-[#2A2D36] transition-colors w-[180px]">
                <svg className="w-[20px] h-[20px] fill-current" viewBox="0 0 24 24"><path d="M3 22.073c-.022 0-.045.003-.067.003a.545.545 0 01-.137-.017C2.269 21.844 2 21.365 2 20.655V3.344C2 2.65 2.259 2.164 2.776 1.95a.653.653 0 01.196-.032C3.045 1.918 3.12 1.921 3 1.928l13.12 10.07L3 22.073zM16.897 11.23L4.985 2.13l11.912 9.1zM4.985 21.87l11.912-9.1-11.912 9.1zm12.983-9.917l2.87-2.193a.9.9 0 011.025.105c.294.257.34.693.109.972l-2.812 3.42-1.192-2.304z" /></svg>
                <div className="text-left">
                  <div className="text-[10px] text-white/70 leading-none mb-1">Play Store</div>
                  <div className="text-[12px] font-semibold leading-none">For Android 4.0</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Right Visuals */}
        <div className="hidden lg:block relative z-10 w-full h-full min-h-[400px]">
          <div className="absolute  right-0 w-[420px] h-full flex justify-center">
             
             {/* Background Shape */}
             <div className="absolute top-[10px] right-[60px] w-[550px] h-[550px] bg-[#e5f7e4] rounded-[40px] rotate-[8deg]"></div>
             
            

             {/* Phone 1 (Back) */}
             <div className="absolute top-[60px] right-[150px] w-[260px] h-[480px] bg-white rounded-[35px] border-[8px] border-gray-900 shadow-2xl overflow-hidden z-10 flex flex-col">
                <div className="p-5 pt-8 bg-white border-b border-gray-100 flex-1">
                  <div className="w-full h-[80px] rounded-xl bg-gray-50 mb-3 p-3">
                    <div className="text-[10px] text-gray-400">Statistics</div>
                    <div className="text-[18px] font-bold text-gray-900 mt-1">$125,73</div>
                  </div>
                  <div className="w-full h-[120px] rounded-xl bg-gradient-to-t from-[#E0F8F5] to-transparent relative mb-3">
                    <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none"><path d="M0,50 L0,30 Q25,10 50,25 T100,10 L100,50 Z" fill="#A8EBE0" opacity="0.5"/><path d="M0,50 L0,40 Q25,20 50,35 T100,20 L100,50 Z" fill="#5CE0CC"/></svg>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-[60px] bg-gray-50 rounded-xl"></div>
                    <div className="flex-1 h-[60px] bg-gray-50 rounded-xl"></div>
                  </div>
                </div>
             </div>

             {/* Phone 2 (Front) */}
             <div className="absolute top-[20px] left-[-100px] w-[260px] h-[490px] bg-white rounded-[35px] border-[8px] border-gray-900 shadow-2xl overflow-hidden z-20 flex flex-col">
                <div className="p-5 pt-8 bg-white flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=4" alt="user" className="w-full h-full object-cover"/></div>
                    <div>
                      <div className="text-[10px] text-gray-400">Hello,</div>
                      <div className="text-[13px] font-bold text-gray-900">Welcome Back!</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-[#33D4B6] rounded-2xl p-4 text-white mb-5 relative overflow-hidden">
                    <div className="absolute -right-[20px] -top-[20px] w-[100px] h-[100px] bg-white/10 rounded-full blur-xl"></div>
                    <div className="text-[10px] text-white/80 mb-1">Accumulated Balance</div>
                    <div className="font-bold text-[22px] mb-3">$529,73</div>
                    <div className="flex justify-between text-[10px] text-white/90">
                      <span>50%</span>
                      <span>$529,73 / $1250.00</span>
                    </div>
                  </div>

                  <div className="mb-2 flex justify-between items-center">
                    <div className="text-[12px] font-bold text-gray-900">Your Friends</div>
                    <div className="text-[10px] text-gray-400">See All</div>
                  </div>
                  
                  <div className="flex justify-between mb-5">
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" alt="user" className="w-full h-full object-cover"/></div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=6" alt="user" className="w-full h-full object-cover"/></div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=7" alt="user" className="w-full h-full object-cover"/></div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=8" alt="user" className="w-full h-full object-cover"/></div>
                  </div>
                  
                  <div className="text-[12px] font-bold text-gray-900 mb-2">Recent Activity</div>
                  <div className="flex-1 bg-gray-50 rounded-xl"></div>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* KEY SOLUTIONS */}
      <section id="solutions" className="bg-white border-y border-gray-100 py-[110px] px-[6vw] max-sm:py-[70px]">
        <div className="inline-flex items-center gap-[7px] bg-[#EAF3FF] border border-[#5384CD]/20 text-[#5384CD] text-[11px] font-bold tracking-[2px] uppercase py-1.5 px-3.5 rounded-full mb-5">
          <span className="w-[5px] h-[5px] bg-[#5384CD] rounded-full animate-blink"></span>Key Solutions
        </div>
        <Reveal>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-bold tracking-[-1px] mb-12 text-gray-900">
            Everything Your Office Runs On,<br/><span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text">Centralized.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[1px] bg-gray-100 border border-gray-100 rounded-[20px] overflow-hidden shadow-sm">
            {[
              { icon: "🖥️", title: "Centralized Dashboard", desc: "Manage all office operations — attendance, payroll, billing, and expenses — from one unified admin panel." },
              { icon: "📍", title: "Attendance Tracking", desc: "Location-verified selfie capture with login and logout timestamps. Tamper-proof and accurate every shift." },
              { icon: "💰", title: "Automated Salary Calculation", desc: "Salary auto-computed from attendance records, overtime hours, and approved leaves. Zero manual errors." },
              { icon: "🗓️", title: "Leave Management", desc: "Employees request leaves via app. Managers approve instantly. Full history and holiday calendar included." },
              { icon: "📋", title: "Quotation Creation", desc: "Generate customizable quotations with GST support in seconds. Professional formats ready to send." },
              { icon: "🧾", title: "Invoice Generation", desc: "Create GST-compliant invoices and track payment status — paid, pending, or overdue — at a glance." },
              { icon: "💳", title: "Expense Recording", desc: "Log travel, office, utility, and miscellaneous expenses with category tags. Real-time budget tracking." },
              { icon: "📊", title: "Employee-wise Reports", desc: "Downloadable reports per employee for attendance, salary, and expenses. Ready for audits and compliance." },
              { icon: "🔐", title: "Role-Based Access", desc: "Separate access for Admin, HR, and Accounts. Each role sees exactly what they need — nothing more." },
            ].map((sol, i) => (
              <div key={i} className="bg-white p-[32px_28px] relative group hover:bg-gray-50 transition-colors duration-250">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] opacity-0 group-hover:opacity-100 transition-opacity duration-250"></div>
                <div className="w-[44px] h-[44px] rounded-xl bg-[#EAF3FF] border border-[#5384CD]/20 flex items-center justify-center text-xl mb-3.5 shadow-sm">
                  {sol.icon}
                </div>
                <h4 className="font-display text-[0.95rem] font-bold mb-2 leading-snug text-gray-900">{sol.title}</h4>
                <p className="text-[0.825rem] text-gray-500 leading-[1.65] font-medium">{sol.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FEATURES DEEP DIVE */}
      <section id="features" className="bg-[#F8F9FB] py-[110px] px-[6vw] max-sm:py-[70px]">
        <div className="inline-flex items-center gap-[7px] bg-[#EAF3FF] border border-[#5384CD]/20 text-[#5384CD] text-[11px] font-bold tracking-[2px] uppercase py-1.5 px-3.5 rounded-full mb-5">
          <span className="w-[5px] h-[5px] bg-[#5384CD] rounded-full animate-blink"></span>Feature Details
        </div>
        <Reveal>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-bold tracking-[-1px] text-gray-900">
            Built for Every Corner of<br/><span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text">Your Office</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start mt-[60px]">
          {/* Tabs */}
          <Reveal className="flex lg:flex-col flex-row flex-wrap gap-2">
            {[
              { icon: "📍", label: "Attendance Tracking" },
              { icon: "💰", label: "Salary & Payroll" },
              { icon: "🗓️", label: "Leave Management" },
              { icon: "🧾", label: "Billing & Invoicing" },
              { icon: "💳", label: "Expense Recording" },
            ].map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-3.5 p-[16px_20px] max-lg:p-[10px_14px] rounded-xl cursor-pointer border transition-all text-left font-body shadow-sm hover:shadow-md ${
                  activeTab === idx ? 'bg-white border-[#5384CD]/30 ring-1 ring-[#5384CD]/20' : 'bg-white border-gray-100 hover:bg-gray-50'
                }`}
              >
                <div className={`w-[38px] h-[38px] rounded-[10px] shrink-0 flex items-center justify-center text-[17px] border transition-all ${
                  activeTab === idx ? 'bg-[#EAF3FF] border-[#5384CD]/20 text-[#5384CD]' : 'bg-gray-50 border-gray-100 text-gray-400'
                }`}>
                  {tab.icon}
                </div>
                <span className={`text-sm max-lg:text-xs font-semibold transition-colors ${
                  activeTab === idx ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </Reveal>

          {/* Panels */}
          <div className="relative">
            {[
              {
                icon: "📍", title: "Attendance Tracking", desc: "Location-based selfie attendance with login/logout timestamps for complete, verified records.",
                bullets: [
                  "GPS-verified location check-in ensures employees are physically present at their designated location",
                  "Selfie capture at login prevents buddy punching and proxy attendance entirely",
                  "Login and logout timestamps auto-recorded with no manual input required",
                  "Attendance data feeds directly into salary calculation — fully automated"
                ]
              },
              {
                icon: "💰", title: "Automated Salary Calculation", desc: "Payroll computed automatically from real attendance data, overtime, and approved leaves.",
                bullets: [
                  "Salary calculated based on actual attendance records — no spreadsheet errors",
                  "Overtime hours automatically factored into final salary computation",
                  "Leave deductions applied based on approved and unapproved absence records",
                  "One-click downloadable payroll reports per employee for compliance"
                ]
              },
              {
                icon: "🗓️", title: "Leave Management", desc: "Streamlined leave request, approval, and history tracking for the entire team.",
                bullets: [
                  "Employees submit leave requests directly from the mobile app — no paperwork",
                  "Managers approve or reject with one tap; employee notified instantly",
                  "Full leave history per employee visible to HR for audit and planning",
                  "Company holiday list visible to all staff via mobile app"
                ]
              },
              {
                icon: "🧾", title: "Billing & Invoicing", desc: "Create quotations and invoices instantly with GST support and payment status tracking.",
                bullets: [
                  "Generate professional quotations in customizable formats with GST auto-applied",
                  "Convert approved quotations to invoices in one click — no re-entry needed",
                  "Track payment status — paid, pending, or partially paid — per invoice",
                  "Downloadable billing reports for compliance and client records"
                ]
              },
              {
                icon: "💳", title: "Expense Recording", desc: "Categorized expense tracking for travel, office, utilities, and miscellaneous costs.",
                bullets: [
                  "Log expenses by category — travel, office supplies, utilities, and miscellaneous",
                  "Attach receipts and notes to each expense entry for clear records",
                  "Track spending against budget in real time from the admin dashboard",
                  "Employee-wise expense reports downloadable for payroll and reimbursement"
                ]
              },
            ].map((panel, idx) => (
              <div 
                key={idx} 
                className={`${activeTab === idx ? "block animate-[panelFade_0.3s_ease]" : "hidden"}`}
              >
                <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-lg shadow-gray-200/50">
                  <div className="p-[32px_32px_24px] border-b border-gray-50 flex items-start gap-5">
                    <div className="w-[56px] h-[56px] rounded-[16px] shrink-0 bg-[#EAF3FF] border border-[#5384CD]/20 flex items-center justify-center text-2xl shadow-sm text-[#5384CD]">
                      {panel.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-[1.25rem] font-bold mb-2 text-gray-900">{panel.title}</h3>
                      <p className="text-[0.95rem] text-gray-500 leading-[1.6] font-medium">{panel.desc}</p>
                    </div>
                  </div>
                  <div className="p-[28px_32px] flex flex-col gap-3">
                    {panel.bullets.map((bullet, bi) => (
                      <div key={bi} className="flex items-start gap-3 p-[14px_16px] bg-gray-50 border border-gray-100 rounded-[12px]">
                        <div className="w-[20px] h-[20px] rounded-md shrink-0 mt-[2px] bg-[#EAF3FF] border border-[#5384CD]/30 flex items-center justify-center text-[11px] text-[#5384CD] font-bold">✓</div>
                        <span className="text-[0.9rem] text-gray-600 leading-[1.5] font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLE-BASED ACCESS */}
      <section id="roles" className="bg-white py-[110px] px-[6vw] max-sm:py-[70px] border-y border-gray-100">
        <div className="inline-flex items-center gap-[7px] bg-[#EAF3FF] border border-[#5384CD]/20 text-[#5384CD] text-[11px] font-bold tracking-[2px] uppercase py-1.5 px-3.5 rounded-full mb-5">
          <span className="w-[5px] h-[5px] bg-[#5384CD] rounded-full animate-blink"></span>Role-Based Access
        </div>
        <Reveal>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-bold tracking-[-1px] text-gray-900">
            The Right Access for<br/><span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text">Every Role</span>
          </h2>
          <p className="text-gray-500 text-[1.05rem] mt-4 max-w-[520px] leading-[1.7] font-medium">
            Separate dashboards and permissions for Admin, HR, and Accounts ensure every team member works with exactly what they need.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[56px]">
          <Reveal className="bg-white border border-gray-100 rounded-[24px] p-[32px_28px] hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-gray-200/40 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#5384CD]"></div>
            <div className="text-[10px] font-bold tracking-[2px] uppercase py-1.5 px-3 rounded-full mb-5 inline-block bg-[#EAF3FF] text-[#5384CD]">Admin</div>
            <h3 className="font-display text-[1.25rem] font-bold mb-3 text-gray-900">Administrator</h3>
            <p className="text-[0.9rem] text-gray-500 leading-[1.65] mb-6 font-medium">Full visibility across all operations. Manage staff, oversee billing, approve decisions, and access every report.</p>
            <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#5384CD]"></div>Centralized dashboard</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#5384CD]"></div>Attendance & payroll oversight</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#5384CD]"></div>Invoice & quotation management</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#5384CD]"></div>All reports — downloadable</div>
            </div>
          </Reveal>

          <Reveal className="bg-white border border-gray-100 rounded-[24px] p-[32px_28px] hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-gray-200/40 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#F5A623]"></div>
            <div className="text-[10px] font-bold tracking-[2px] uppercase py-1.5 px-3 rounded-full mb-5 inline-block bg-[#FFF4E0] text-[#F5A623]">HR</div>
            <h3 className="font-display text-[1.25rem] font-bold mb-3 text-gray-900">Human Resources</h3>
            <p className="text-[0.9rem] text-gray-500 leading-[1.65] mb-6 font-medium">Manage attendance, process leaves, calculate salaries, and access employee performance records.</p>
            <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#F5A623]"></div>Attendance tracking & verification</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#F5A623]"></div>Leave request approval</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#F5A623]"></div>Salary calculation & payroll</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#F5A623]"></div>Employee-wise reports</div>
            </div>
          </Reveal>

          <Reveal className="bg-white border border-gray-100 rounded-[24px] p-[32px_28px] hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-gray-200/40 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#3AC6F5]"></div>
            <div className="text-[10px] font-bold tracking-[2px] uppercase py-1.5 px-3 rounded-full mb-5 inline-block bg-[#E0F7FF] text-[#3AC6F5]">Accounts</div>
            <h3 className="font-display text-[1.25rem] font-bold mb-3 text-gray-900">Accounts Team</h3>
            <p className="text-[0.9rem] text-gray-500 leading-[1.65] mb-6 font-medium">Handle all financial operations — invoices, quotations, expense records, and billing compliance reports.</p>
            <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#3AC6F5]"></div>Invoice & quotation generation</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#3AC6F5]"></div>Payment status tracking</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#3AC6F5]"></div>Expense recording & categories</div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium"><div className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#3AC6F5]"></div>Billing & compliance reports</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REPORTS */}
      <section id="reports" className="bg-[#F8F9FB] py-[110px] px-[6vw] max-sm:py-[70px]">
        <div className="inline-flex items-center gap-[7px] bg-[#EAF3FF] border border-[#5384CD]/20 text-[#5384CD] text-[11px] font-bold tracking-[2px] uppercase py-1.5 px-3.5 rounded-full mb-5">
          <span className="w-[5px] h-[5px] bg-[#5384CD] rounded-full animate-blink"></span>Reports & Downloads
        </div>
        <Reveal>
          <h2 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-bold tracking-[-1px] text-gray-900">
            Every Report You Need,<br/><span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text">Ready to Download</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center mt-[60px]">
          <div className="flex flex-col gap-4">
            {[
              { icon: "🗓️", title: "Attendance Report", desc: "Employee-wise daily and monthly attendance with login/logout times" },
              { icon: "💰", title: "Salary / Payroll Report", desc: "Auto-calculated salary per employee with overtime and deductions" },
              { icon: "🧾", title: "Billing Report", desc: "Invoice and quotation history with GST breakdown and payment status" },
              { icon: "💳", title: "Expense Report", desc: "Category-wise expense records per employee for audits and reimbursements" },
              { icon: "📋", title: "Compliance Report", desc: "Combined payroll and billing data formatted for regulatory compliance" },
            ].map((r, i) => (
              <Reveal key={i} className="flex items-center gap-5 p-[20px_24px] bg-white border border-gray-100 rounded-[18px] hover:border-[#5384CD]/30 hover:shadow-md hover:translate-x-1.5 transition-all cursor-default shadow-sm group">
                <div className="w-[46px] h-[46px] rounded-[14px] shrink-0 bg-[#EAF3FF] border border-[#5384CD]/20 flex items-center justify-center text-[20px] shadow-sm">{r.icon}</div>
                <div>
                  <h4 className="font-display text-[1rem] font-bold mb-[3px] text-gray-900 group-hover:text-[#5384CD] transition-colors">{r.title}</h4>
                  <p className="text-[0.85rem] text-gray-500 font-medium">{r.desc}</p>
                </div>
                <div className="ml-auto text-[11px] text-[#5384CD] font-bold whitespace-nowrap bg-[#EAF3FF] py-1 px-2 rounded-lg">↓ PDF / Excel</div>
              </Reveal>
            ))}
          </div>

          <Reveal className="bg-white border border-gray-100 rounded-[24px] p-7 shadow-xl shadow-gray-200/60">
            <div className="text-[14px] font-bold mb-5 flex items-center justify-between text-gray-900">
              Attendance Report — March 2025
              <button className="bg-[#EAF3FF] border border-[#5384CD]/20 text-[#5384CD] text-[10px] font-bold py-1.5 px-3 rounded-lg cursor-pointer hover:bg-[#5384CD]/10 transition-colors">↓ Download</button>
            </div>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="text-[10px] text-gray-400 font-bold tracking-[1px] uppercase px-3 pb-3 border-b border-gray-100">Employee</th>
                  <th className="text-[10px] text-gray-400 font-bold tracking-[1px] uppercase px-3 pb-3 border-b border-gray-100">Days</th>
                  <th className="text-[10px] text-gray-400 font-bold tracking-[1px] uppercase px-3 pb-3 border-b border-gray-100">OT Hrs</th>
                  <th className="text-[10px] text-gray-400 font-bold tracking-[1px] uppercase px-3 pb-3 border-b border-gray-100">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rahul Kumar", d: 22, ot: "4.5", s: "Present", sc: "bg-[#EAF3FF] text-[#5384CD]" },
                  { name: "Priya Sharma", d: 19, ot: "0", s: "On Leave", sc: "bg-orange-50 text-orange-500" },
                  { name: "Anil Mehra", d: 21, ot: "2.0", s: "Present", sc: "bg-[#EAF3FF] text-[#5384CD]" },
                  { name: "Sunita Bai", d: 20, ot: "1.5", s: "Present", sc: "bg-[#EAF3FF] text-[#5384CD]" },
                  { name: "Dev Rathore", d: 17, ot: "0", s: "Absent", sc: "bg-red-50 text-red-500" },
                ].map((tr, i) => (
                  <tr key={i}>
                    <td className="text-[12px] p-[12px_10px] border-b border-gray-50 font-semibold text-gray-800">{tr.name}</td>
                    <td className="text-[12px] p-[12px_10px] border-b border-gray-50 text-gray-500 font-medium">{tr.d}</td>
                    <td className="text-[12px] p-[12px_10px] border-b border-gray-50 text-gray-500 font-medium">{tr.ot}</td>
                    <td className="text-[12px] p-[12px_10px] border-b border-gray-50">
                      <span className={`text-[10px] font-bold py-1 px-2.5 rounded-md ${tr.sc}`}>{tr.s}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 text-[11px] text-gray-400 text-center pt-4 border-t border-gray-50 font-medium">
              Salary auto-calculated from above data ↑
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-white border-t border-gray-100 text-center py-[120px] px-[6vw] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#5384CD]/5 to-[#3AC6F5]/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl"></div>
        <div className="relative z-10 max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-[7px] bg-[#EAF3FF] border border-[#5384CD]/20 text-[#5384CD] text-[11px] font-bold tracking-[2px] uppercase py-1.5 px-3.5 rounded-full mb-5 mx-auto">
            <span className="w-[5px] h-[5px] bg-[#5384CD] rounded-full animate-blink"></span>Get Started
          </div>
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] font-bold tracking-[-1.5px] leading-[1.1] mb-6 text-gray-900">
              Try OfficeBook<br/><span className="bg-gradient-to-r from-[#5384CD] to-[#3AC6F5] text-transparent bg-clip-text">Right Now</span>
            </h2>
            <p className="text-gray-500 text-[1.1rem] leading-[1.7] mb-10 max-w-[600px] mx-auto font-medium">
              No credit card. No setup. Use the credentials below to explore the full platform instantly — web portal and mobile app both available.
            </p>
          </Reveal>

          <Reveal className="flex gap-4 justify-center flex-wrap mb-14">
            <Link href="https://evdtechnology.com" target="_blank" className="bg-gray-900 text-white font-display font-bold text-[16px] py-[16px] px-[32px] rounded-[14px] inline-flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              🌐 Open Web Portal
            </Link>
            <Link href="https://play.google.com" target="_blank" className="bg-white border border-gray-200 text-gray-900 font-display font-bold text-[16px] py-[16px] px-[32px] rounded-[14px] inline-flex items-center gap-2 hover:border-[#5384CD] hover:text-[#5384CD] transition-all shadow-sm">
              📱 Download App
            </Link>
          </Reveal>

          <Reveal className="bg-white border border-gray-100 rounded-[24px] p-8 text-left max-w-[620px] mx-auto shadow-2xl shadow-gray-200/50 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#5384CD] to-[#3AC6F5]"></div>
            <div className="font-display font-bold text-[16px] mb-2 text-gray-900">🔑 Test Credentials</div>
            <div className="text-[13px] text-gray-500 mb-6 font-medium">Explore the full platform with these pre-loaded demo accounts</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F8F9FB] border border-gray-100 rounded-xl p-5 hover:bg-[#EAF3FF] hover:border-[#5384CD]/20 transition-colors group">
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#5384CD] mb-3">🌐 Web Portal</div>
                <div className="flex justify-between items-center mb-2"><span className="text-[12px] text-gray-500 font-medium">Username</span><span className="font-display font-bold text-xs bg-white border border-gray-100 py-1 px-2 rounded text-gray-700">1010101010</span></div>
                <div className="flex justify-between items-center mb-4"><span className="text-[12px] text-gray-500 font-medium">Password</span><span className="font-display font-bold text-xs bg-white border border-gray-100 py-1 px-2 rounded text-gray-700">123456789</span></div>
                <Link href="https://evdtechnology.com" target="_blank" className="block text-center bg-[#5384CD] text-white font-display font-bold text-xs py-2.5 rounded-lg hover:bg-[#3466AF] transition-colors shadow-sm shadow-[#5384CD]/30">Launch Web Portal →</Link>
              </div>
              <div className="bg-[#F8F9FB] border border-gray-100 rounded-xl p-5 hover:bg-[#EAF3FF] hover:border-[#5384CD]/20 transition-colors group">
                <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#3AC6F5] mb-3">📱 Mobile App</div>
                <div className="flex justify-between items-center mb-2"><span className="text-[12px] text-gray-500 font-medium">Username</span><span className="font-display font-bold text-xs bg-white border border-gray-100 py-1 px-2 rounded text-gray-700">7829401605</span></div>
                <div className="flex justify-between items-center mb-4"><span className="text-[12px] text-gray-500 font-medium">Password</span><span className="font-display font-bold text-xs bg-white border border-gray-100 py-1 px-2 rounded text-gray-700">123456789</span></div>
                <Link href="https://play.google.com" target="_blank" className="block text-center bg-white border border-gray-200 text-gray-700 font-display font-bold text-xs py-2.5 rounded-lg hover:border-[#3AC6F5] hover:text-[#3AC6F5] transition-colors shadow-sm">Download App →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-[56px] px-[6vw] pb-7">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-[36px] md:gap-[56px] pb-10 border-b border-gray-100">
          <div>
            <Link href="#" className="flex items-center gap-0 no-underline text-gray-900 font-display font-black text-[18px] tracking-tight mb-2">
              <span className="text-[#5B8DB8]">OFFIC</span><span className="text-[#00CFFF]">INK</span>
            </Link>
            <p className="text-[13px] text-gray-500 leading-[1.7] mt-3 max-w-[300px] font-medium">
              An all-in-one office automation platform by EVD Technology LLP. Centralizing attendance, payroll, billing, and expense tracking for growing businesses.
            </p>
          </div>

          <div>
            <div className="font-display text-[13px] font-bold tracking-[1px] uppercase text-gray-900 mb-5">Navigation</div>
            <ul className="flex flex-col gap-3">
              <li><Link href="#solutions" className="text-sm text-gray-500 hover:text-[#5384CD] transition-colors font-medium">Solutions</Link></li>
              <li><Link href="#features" className="text-sm text-gray-500 hover:text-[#5384CD] transition-colors font-medium">Features</Link></li>
              <li><Link href="#roles" className="text-sm text-gray-500 hover:text-[#5384CD] transition-colors font-medium">Role Access</Link></li>
              <li><Link href="#reports" className="text-sm text-gray-500 hover:text-[#5384CD] transition-colors font-medium">Reports</Link></li>
              <li><Link href="#cta" className="text-sm text-gray-500 hover:text-[#5384CD] transition-colors font-medium">Try Free</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-display text-[13px] font-bold tracking-[1px] uppercase text-gray-900 mb-5">Contact</div>
            <div className="flex gap-2.5 mb-3 text-[13px] text-gray-500 font-medium">
              <span className="text-[#5384CD] shrink-0 mt-[1px]">📞</span>
              <span className="leading-[1.5]">
                <a href="tel:+917829401605" className="hover:text-[#5384CD] block">+91-7829401605</a>
                <a href="tel:+916261743903" className="hover:text-[#5384CD] block">+91-6261743903</a>
              </span>
            </div>
            <div className="flex gap-2.5 mb-3 text-[13px] text-gray-500 font-medium">
              <span className="text-[#5384CD] shrink-0 mt-[1px]">✉️</span>
              <span className="leading-[1.5]">
                <a href="mailto:anshu@evdtechnology.com" className="hover:text-[#5384CD]">anshu@evdtechnology.com</a>
              </span>
            </div>
            <div className="flex gap-2.5 mb-3 text-[13px] text-gray-500 font-medium">
              <span className="text-[#5384CD] shrink-0 mt-[1px]">🌐</span>
              <span className="leading-[1.5]">
                <a href="https://www.evdtechnology.com" target="_blank" className="hover:text-[#5384CD]">www.evdtechnology.com</a>
              </span>
            </div>
            <div className="flex gap-2.5 mb-3 text-[13px] text-gray-500 font-medium">
              <span className="text-[#5384CD] shrink-0 mt-[1px]">📍</span>
              <span className="leading-[1.5]">Korba & Raipur, Chhattisgarh, India</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-between items-center flex-wrap gap-3 text-[12px] text-gray-400 font-medium">
          <span>© 2025 EVD Technology LLP. All rights reserved.</span>
          <span>OfficeBook — Attendance · Salary · Billing · Expenses</span>
        </div>
      </footer>
    </main>
  );
}
