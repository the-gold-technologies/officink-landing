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

export default function Home() {

  return (
    <main className="min-h-screen font-body selection:bg-brand-teal selection:text-white">
      {/* NAV */}
      <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-[6vw] h-[100px] bg-transparent">
        <Link href="#" className="flex items-center gap-2 no-underline">
          <img src="/fulllogo_transparent.png" alt="Officink Logo" className="h-[90px] w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-10 font-medium">
          <Link href="#solutions" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Solutions</Link>
          <Link href="#features" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Features</Link>
          <Link href="#roles" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Roles</Link>
          <Link href="#cta" className="text-gray-500 text-[14px] hover:text-[#5384CD] transition-colors">Get Started</Link>
        </div>
        <div className="hidden sm:block">
          <Link href="#cta" className="bg-[#0B0F1A] text-white font-bold text-[13px] py-3 px-6 rounded-xl hover:bg-[#5384CD] transition-all shadow-lg shadow-blue-500/20">
            Login
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
                  <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none"><path d="M0,50 L0,30 Q25,10 50,25 T100,10 L100,50 Z" fill="#A8EBE0" opacity="0.5" /><path d="M0,50 L0,40 Q25,20 50,35 T100,20 L100,50 Z" fill="#5CE0CC" /></svg>
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
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=4" alt="user" className="w-full h-full object-cover" /></div>
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
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" alt="user" className="w-full h-full object-cover" /></div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=6" alt="user" className="w-full h-full object-cover" /></div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=7" alt="user" className="w-full h-full object-cover" /></div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src="https://i.pravatar.cc/100?img=8" alt="user" className="w-full h-full object-cover" /></div>
                </div>

                <div className="text-[12px] font-bold text-gray-900 mb-2">Recent Activity</div>
                <div className="flex-1 bg-gray-50 rounded-xl"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KEY SOLUTIONS */}
      <section id="solutions" className="bg-white py-[110px] px-[6vw] max-sm:py-[70px]">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4 text-gray-900">
            Run your office on <span className="bg-gradient-to-r from-[#00C6A7] to-[#3AC6F5] text-transparent bg-clip-text">Autopilot</span>
          </h2>
          <p className="text-gray-500 text-[1.05rem] font-medium leading-[1.6]">
            Replace 10 different tools with one OfficeBook. Managing your team has never been this simple.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🖥️", title: "Centralized Dashboard", desc: "Manage all office operations — attendance, payroll, billing, and expenses — from one unified admin panel.", color: "bg-blue-50 text-blue-500" },
              { icon: "📍", title: "Attendance Tracking", desc: "Location-verified selfie capture with login and logout timestamps. Tamper-proof and accurate every shift.", color: "bg-pink-50 text-pink-500" },
              { icon: "💰", title: "Automated Salary", desc: "Salary auto-computed from attendance records, overtime hours, and approved leaves. Zero manual errors.", color: "bg-amber-50 text-amber-500" },
              { icon: "🗓️", title: "Leave Management", desc: "Employees request leaves via app. Managers approve instantly. Full history and holiday calendar included.", color: "bg-indigo-50 text-indigo-500" },
              { icon: "📋", title: "Quotation Creation", desc: "Generate customizable quotations with GST support in seconds. Professional formats ready to send.", color: "bg-orange-50 text-orange-500" },
              { icon: "🧾", title: "Invoice Generation", desc: "Create GST-compliant invoices and track payment status — paid, pending, or overdue — at a glance.", color: "bg-teal-50 text-teal-500" },
              { icon: "💳", title: "Expense Recording", desc: "Log travel, office, utility, and miscellaneous expenses with category tags. Real-time budget tracking.", color: "bg-cyan-50 text-cyan-500" },
              { icon: "📊", title: "Employee Reports", desc: "Downloadable reports per employee for attendance, salary, and expenses. Ready for audits and compliance.", color: "bg-purple-50 text-purple-500" },
            ].map((sol, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center text-xl mb-6 ${sol.color}`}>
                  {sol.icon}
                </div>
                <h4 className="font-display text-[1.1rem] font-bold mb-3 text-gray-900">{sol.title}</h4>
                <p className="text-[0.875rem] text-gray-500 leading-[1.6] font-medium">{sol.desc}</p>
              </div>
            ))}

            {/* Role Access Card Integrated */}
            <div className="bg-white border border-gray-100 rounded-[20px] p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center text-xl mb-6 bg-gray-50 text-gray-600">
                🔐
              </div>
              <h4 className="font-display text-[1.1rem] font-bold mb-3 text-gray-900">Role-Based Access</h4>
              <p className="text-[0.875rem] text-gray-500 leading-[1.6] font-medium">Separate access for Admin, HR, and Accounts. Each role sees exactly what they need.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEATURES DEEP DIVE (Bento Grid) */}
      <section id="features" className="bg-[#F8F9FB] py-[110px] px-[6vw] max-sm:py-[70px]">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4 text-gray-900">
            Everything you need,<br /><span className="text-[#00C6A7]">Nothing you don't.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Card 1 */}
            <div className="lg:col-span-2 bg-[#0B0F1A] rounded-[30px] p-10 relative overflow-hidden text-white flex flex-col justify-center min-h-[400px]">
              <div className="relative z-10 max-w-[400px]">
                <div className="w-10 h-10 rounded-full bg-[#E91E63]/20 flex items-center justify-center text-lg mb-6 text-[#E91E63]">📍</div>
                <h3 className="font-display text-[1.75rem] font-bold mb-4">GPS & Selfie Attendance</h3>
                <p className="text-gray-400 text-[1rem] leading-[1.6] mb-8">Eliminate time theft. Employees must be at the office location to check in. Selfie verification adds an extra layer of security.</p>
              </div>

              {/* Abstract UI for Attendance */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[340px] bg-[#1C2537] rounded-l-2xl border-l border-t border-b border-white/10 p-4 shadow-2xl translate-x-[20%] lg:translate-x-0 hidden sm:block">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                    <div><div className="w-20 h-2 bg-gray-600 rounded"></div><div className="w-12 h-2 bg-gray-700 rounded mt-1"></div></div>
                  </div>
                  <div className="bg-green-500/20 text-green-500 text-[10px] px-2 py-0.5 rounded">On-Time</div>
                </div>
                <div className="w-full h-[180px] bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-gray-600 text-xs">Map View</div>
                <div className="flex justify-center"><div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center">📸</div></div>
              </div>
            </div>

            {/* Tall Card 2 */}
            <div className="bg-white rounded-[30px] p-8 border border-gray-100 flex flex-col min-h-[400px]">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg mb-6 text-orange-500">💰</div>
              <h3 className="font-display text-[1.25rem] font-bold mb-2">Auto Payroll</h3>
              <p className="text-gray-500 text-[0.9rem] leading-[1.6] mb-8">Zero manual calculation. Attendance + Overtime + Leaves = Final Salary.</p>

              <div className="mt-auto bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between text-[11px] text-gray-500 mb-2"><span>Basic Salary</span><span>₹25,000</span></div>
                <div className="flex justify-between text-[11px] text-green-600 mb-4"><span>+ Overtime (4h)</span><span>₹1,200</span></div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-[13px] font-bold text-gray-900"><span>Total Payout</span><span>₹26,200</span></div>
              </div>
            </div>

            {/* Small Card 3 */}
            <div className="bg-white rounded-[30px] p-8 border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg mb-4 text-blue-500">🗓️</div>
              <h3 className="font-display text-[1.1rem] font-bold mb-2">Smart Leaves</h3>
              <p className="text-gray-500 text-[0.85rem] leading-[1.6]">App-based requests & instant approvals.</p>
            </div>

            {/* Small Card 4 */}
            <div className="bg-white rounded-[30px] p-8 border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg mb-4 text-purple-500">🧾</div>
              <h3 className="font-display text-[1.1rem] font-bold mb-2">GST Billing</h3>
              <p className="text-gray-500 text-[0.85rem] leading-[1.6]">Create pro invoices in under 30 seconds.</p>
            </div>

            {/* Small Card 5 */}
            <div className="bg-white rounded-[30px] p-8 border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-lg mb-4 text-cyan-500">💳</div>
              <h3 className="font-display text-[1.1rem] font-bold mb-2">Expenses</h3>
              <p className="text-gray-500 text-[0.85rem] leading-[1.6]">Track every rupee spent on office needs.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ROLE-BASED ACCESS */}
      <section id="roles" className="bg-white py-[110px] px-[6vw] max-sm:py-[70px]">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4 text-gray-900">
            One Tool, <span className="text-[#00C6A7]">Three Roles.</span>
          </h2>
          <p className="text-gray-500 text-[1.05rem] font-medium leading-[1.6]">
            Separate views for Admin, HR, and Accounts to keep work focused and secure.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Admin */}
          <Reveal className="bg-white p-6 rounded-[24px] border border-gray-50 hover:border-green-100 hover:shadow-xl hover:shadow-green-500/5 transition-all group">
            <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-500 text-[10px] font-bold uppercase tracking-wider mb-6">Admin</span>
            <h3 className="font-display text-xl font-bold mb-3">Admin Access</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">Full visibility. Manage staff, oversee billing, approve decisions, and access every report.</p>
            <ul className="space-y-3">
              {["Centralized Dashboard", "Attendance Oversight", "Invoice Mgmt", "All Reports"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[12px] font-semibold text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* HR */}
          <Reveal className="bg-white p-6 rounded-[24px] border border-gray-50 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all group">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-[10px] font-bold uppercase tracking-wider mb-6">HR</span>
            <h3 className="font-display text-xl font-bold mb-3">HR Access</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">Manage attendance, process leaves, calculate salaries, and access employee records.</p>
            <ul className="space-y-3">
              {["Attendance Tracking", "Leave Approvals", "Salary Payroll", "Employee Data"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[12px] font-semibold text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Accounts */}
          <Reveal className="bg-white p-6 rounded-[24px] border border-gray-50 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-500 text-[10px] font-bold uppercase tracking-wider mb-6">Accounts</span>
            <h3 className="font-display text-xl font-bold mb-3">Accounts Access</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">Handle all financial operations — invoices, quotations, expense records, and billing.</p>
            <ul className="space-y-3">
              {["Invoice Generation", "Payment Tracking", "Expense Recording", "Billing Reports"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[12px] font-semibold text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-white pb-[100px] px-[6vw]">
        <div className="max-w-[1000px] mx-auto bg-[#000000] rounded-[40px] p-[60px_40px] text-center relative overflow-hidden">
          {/* Glow Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00C6A7]/20 blur-[100px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-white leading-[1.1] mb-4">
              Ready to transform your<br />
              <span className="bg-gradient-to-r from-[#00C6A7] to-[#3AC6F5] text-transparent bg-clip-text">office operations?</span>
            </h2>
            <p className="text-gray-400 text-[1rem] mb-12 max-w-xl mx-auto">
              Start using OfficeBook today with our instant demo credentials.<br /> No signup required.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {/* Web Portal Login */}
              <div className="bg-[#1C1C1C] border border-white/10 rounded-[20px] p-6 w-[280px] text-left hover:border-white/20 transition-all">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">WEB PORTAL LOGIN</div>
                <div className="flex justify-between text-xs text-gray-400 mb-2"><span>User: </span><span className="text-white font-mono font-bold">demo_user</span></div>
                <div className="flex justify-between text-xs text-gray-400 mb-6"><span>Pass: </span><span className="text-white font-mono font-bold">demo_pass</span></div>
                <Link href="https://console.officink.com" target="_blank" className="flex items-center justify-center w-full bg-white text-black font-bold text-xs py-3 rounded-xl hover:bg-gray-200 transition-colors">
                  Launch Web Portal →
                </Link>
              </div>

              {/* Mobile App Login */}
              <div className="bg-[#1C1C1C] border border-white/10 rounded-[20px] p-6 w-[280px] text-left hover:border-white/20 transition-all">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">MOBILE APP LOGIN</div>
                <div className="flex justify-between text-xs text-gray-400 mb-2"><span>User: </span><span className="text-white font-mono font-bold">demo_mobile</span></div>
                <div className="flex justify-between text-xs text-gray-400 mb-6"><span>Pass: </span><span className="text-white font-mono font-bold">demo_pass</span></div>
                <Link href="https://play.google.com" target="_blank" className="flex items-center justify-center w-full bg-transparent border border-white/20 text-white font-bold text-xs py-3 rounded-xl hover:bg-white/10 transition-colors">
                  Download App →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-20 px-[6vw]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <Link href="#" className="flex items-center gap-2 no-underline mb-6">
              <img src="/fulllogo_transparent.png" alt="Officink Logo" className="h-[90px] w-auto object-contain" />
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              An all-in-one office automation platform by The Gold Technologies. Centralizing attendance, payroll, billing, and expense tracking for growing businesses.
            </p>
          </div>

          <div className="flex gap-20">
            <div>
              <h4 className="font-bold text-sm text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link href="#solutions" className="hover:text-blue-500">Home</Link></li>
                <li><Link href="#solutions" className="hover:text-blue-500">Solutions</Link></li>
                <li><Link href="#features" className="hover:text-blue-500">Features</Link></li>
                <li><Link href="#cta" className="hover:text-blue-500">Get Started</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-gray-900 mb-4">Contact</h4>
              <div className="text-xs text-gray-500 space-y-4">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">Call Us</div>
                  <a href="tel:+918368198551" className="block hover:text-blue-500 font-medium text-gray-900">+91 8368198551</a>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">Email Us</div>
                  <a href="mailto:info@thegoldtechnologies.com" className="hover:text-blue-500 font-medium text-gray-900">info@thegoldtechnologies.com</a>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">Visit Us</div>
                  <span className="block mb-2"><strong>INDIA:</strong> SD-369, D block, Shastri Nagar, Ghaziabad, UP, India - 201002</span>
                  <span className="block"><strong>USA:</strong> Accessible Minds 1309- Coffeen Avenue, STE 1200 Sheridan, Wyoming- 82801, U</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400">
          <p>© 2026 The Gold Technologies. All rights reserved.</p>
          <p>OfficeBook — Attendance · Salary · Billing · Expenses</p>
        </div>
      </footer>
    </main>
  );
}
