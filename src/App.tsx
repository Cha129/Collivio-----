/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, Check, Shield, Globe, Briefcase, 
  FlaskConical, Image as ImageIcon, Trophy, 
  MessageSquare, Bot, GraduationCap, Building2, 
  Compass, Layout, ClipboardList, LogOut, 
  ArrowRight, Upload, ChevronLeft, Menu, X, 
  BadgeCheck, Settings, Bell, Search 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import StudentDashboard from "./components/dashboards/StudentDashboard";
import BusinessDashboard from "./components/dashboards/BusinessDashboard";
import MentorDashboard from "./components/dashboards/MentorDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import AIAssistant from "./components/AIAssistant";
import EmploymentSkillBridge from "./components/engines/EmploymentSkillBridge";
import ResearchHub from "./components/engines/ResearchHub";
import MediaLab from "./components/engines/MediaLab";
import OpportunitiesMarketplace from "./components/engines/OpportunitiesMarketplace";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./lib/firebase";

/* --- TYPES --- */
export type Role = "student" | "business" | "mentor" | "admin";
export type Page = "home" | "login" | "signup" | "onboarding" | "dashboard" | "verify-student" | "opportunities" | "research" | "media-lab" | "for-business" | "how-it-works" | "pricing" | "about";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: Role;
  orgName?: string;
  isVerified?: boolean;
}

/* --- TOAST SYSTEM --- */
// ... (rest of the file until the App component)
let toastId = 0;
let setToastsGlobal: React.Dispatch<React.SetStateAction<any[]>> | null = null;
export function toast(msg: string, type: "success" | "error" = "success") {
  const id = ++toastId;
  setToastsGlobal?.((t) => [...t, { id, msg, type }]);
  setTimeout(() => setToastsGlobal?.((t) => t.filter((x) => x.id !== id)), 3200);
}

function Toaster() {
  const [toasts, setToasts] = useState<any[]>([]);
  useEffect(() => { setToastsGlobal = setToasts; return () => { setToastsGlobal = null; }; }, []);
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          key={t.id} 
          className={`px-4.5 py-3 rounded-xl text-sm font-medium shadow-elegant bg-white border-l-4 ${t.type === "success" ? "border-emerald-500" : "border-red-500"}`}
        >
          {t.msg}
        </motion.div>
      ))}
    </div>
  );
}

/* --- SHARED COMPONENTS --- */
export const Logo = ({ onClick }: { onClick: () => void }) => (
  <div className="flex items-center gap-2 cursor-pointer group" onClick={onClick}>
    <div className="w-9 h-9 rounded-xl bg-wine-grad flex items-center justify-center text-white font-script text-xl group-hover:scale-105 transition-transform">C</div>
    <span className="font-script text-2xl text-wine leading-none">Collivio</span>
  </div>
);

export const Btn = ({ children, variant = "primary", size = "md", onClick, disabled, className, type = "button" }: any) => {
  const variants = {
    primary: "bg-wine-grad text-white shadow-glow",
    ghost: "bg-transparent text-fg hover:bg-black/5",
    outline: "bg-transparent border border-white/40 text-white hover:bg-white/10",
    white: "bg-white text-fg hover:bg-white/90",
    secondary: "bg-caramel-grad text-white"
  };
  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-4.5 py-2 text-sm",
    lg: "px-7 py-3 text-base"
  };
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${className}`}
    >
      {children}
    </button>
  );
};

/* --- NAV & FOOTER --- */
function Navbar({ page, setPage, user, onSignOut }: any) {
  const links = [
    { id: "home", label: "Home" },
    { id: "opportunities", label: "Opportunities" },
    { id: "research", label: "Research Hub" },
    { id: "media-lab", label: "Media Lab" },
    { id: "for-business", label: "For Businesses" },
  ];
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <nav className="max-w-6xl mx-auto glass rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm">
        <Logo onClick={() => setPage("home")} />
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button 
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${page === l.id ? "text-wine font-semibold" : "text-fg/80 hover:bg-black/5"}`} 
                onClick={() => setPage(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {user ? (
            <Btn size="sm" onClick={() => setPage("dashboard")}>Dashboard</Btn>
          ) : (
            <>
              <Btn variant="ghost" size="sm" onClick={() => setPage("login")}>Sign In</Btn>
              <Btn size="sm" onClick={() => setPage("signup")}>Get Started</Btn>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

function Footer({ setPage }: any) {
  return (
    <footer className="footer bg-secondary border-t border-black/5 mt-20">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] px-6 py-14">
        <div>
          <Logo onClick={() => setPage("home")} />
          <p className="text-sm text-muted mt-3.5 max-w-[260px] leading-relaxed">
            Think it. Drop it. Build it. The global platform for ambitious students aged 13–19.
          </p>
        </div>
        {[
          { title: "Platform", links: [["Opportunities","opportunities"],["Research Hub","research"],["Media Lab","media-lab"],["Challenges","challenges"]] },
          { title: "For You", links: [["Join as Student","signup"],["For Businesses","for-business"],["Mentor with us","signup"],["Sign in","login"]] },
          { title: "Company", links: [["About","about"],["Privacy","privacy"],["Terms","terms"],["Contact","contact"]] },
        ].map((c) => (
          <div key={c.title}>
            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-4">{c.title}</h4>
            <ul className="flex flex-col gap-2">
              {c.links.map(([label, to]) => (
                <li key={label}><button onClick={() => setPage(to)} className="text-sm text-muted hover:text-wine transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/[0.07] py-5 px-6 text-center text-[10px] text-muted">
        © {new Date().getFullYear()} Collivio. All rights reserved.
      </div>
    </footer>
  );
}

/* --- PAGES --- */
function LandingPage({ setPage }: any) {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-hero-grad relative overflow-hidden pt-36 pb-32 px-6">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(1200px circle at 80% -10%, oklch(0.6 0.18 28/0.4), transparent 60%)" }} />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[10px] font-medium text-white backdrop-blur mb-5">
              <Sparkles size={14} className="text-yellow-400" /> Now onboarding founding students & partners
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-semibold leading-[1.05] mb-5 font-display tracking-tight">
              Build Real Experience<br />Before College.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-lg leading-relaxed mb-8 font-sans">
              Micro-internships, startup collaborations, research opportunities, and portfolio showcases for ambitious students aged 13–19.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Btn variant="white" size="lg" onClick={() => setPage("signup")}>
                Join as Student <ArrowRight size={18} />
              </Btn>
              <Btn variant="outline" size="lg" onClick={() => setPage("for-business")}>
                For Businesses
              </Btn>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 max-w-sm">
              {[
                { icon: Check, label: "Verified Students" },
                { icon: Shield, label: "Trusted Organizations" },
                { icon: Globe, label: "Global Opportunities" },
                { icon: Sparkles, label: "AI Matching" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-white/80 font-medium">
                  <item.icon size={16} className="text-wine" /> {item.label}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-[5/4] w-full max-w-lg mx-auto">
             <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/15 backdrop-blur-md" />
             {/* Mock Cards */}
             <div className="absolute left-4 top-6 w-[42%] bg-white/95 p-3 rounded-2xl shadow-elegant border border-black/5 animate-float-1">
                <div className="flex gap-1 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-caramel to-chestnut shrink-0" />
                    <div className="h-1.5 flex-1 rounded-full bg-secondary" />
                  </div>
                ))}
             </div>
             <div className="absolute right-2 top-2 w-[52%] bg-white/95 p-3 rounded-2xl shadow-elegant border border-black/5 animate-float-2">
                {[
                  { text: "Internship Discovery", type: "Startup" },
                  { text: "Social Impact Gig", type: "Non-Profit" },
                  { text: "Research Project", type: "Academic" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 border border-black/5 rounded-xl p-2 mb-1.5 text-[10px]">
                    <div className="w-5.5 h-5.5 rounded-lg bg-wine-grad flex items-center justify-center text-white text-[8px] shrink-0">✦</div>
                    <div className="font-semibold text-fg flex-1">{item.text}</div>
                    <div className="text-[8px] bg-caramel/15 text-caramel px-2 py-0.5 rounded-full">{item.type}</div>
                  </div>
                ))}
             </div>
             <div className="absolute bottom-2 right-10 w-[44%] bg-white/95 p-3 rounded-2xl shadow-elegant border border-black/5 animate-float-3">
                <div className="flex items-center gap-1.5 font-bold text-[10px] mb-1">
                  <Sparkles size={12} className="text-wine" /> AI Matching
                </div>
                <div className="text-muted text-[8px] mb-2">Personalized recommendations</div>
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-1.5 bg-secondary rounded-lg p-1 px-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-chestnut to-wine shrink-0" />
                    <div className="h-1.5 flex-1 rounded-full bg-fg/10" />
                    <ArrowRight size={10} className="text-muted" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {[
            { icon: GraduationCap, title: "Student", desc: "Explore internships, research teams, projects.", label: "Join as Student", bg: "bg-wine-grad" },
            { icon: Building2, title: "Business / Organization", desc: "Discover young talent and post opportunities.", label: "Join as Business", bg: "bg-caramel-grad" },
          ].map((c, i) => (
            <div key={i} className="glass p-5 rounded-[24px] shadow-elegant flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-wine shrink-0">
                  <c.icon />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <p className="text-sm text-muted">{c.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => setPage("signup")}
                className={`w-full py-2.5 rounded-xl text-white font-medium transition-transform active:scale-95 ${c.bg}`}
              >
                {c.label}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold text-caramel uppercase tracking-widest block mb-2">Product</span>
            <h2 className="text-4xl md:text-5xl font-display font-semibold">Everything you need to build your edge.</h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">A single platform that turns ambition into real, verified experience — before college.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Briefcase, title: "Opportunities Marketplace", desc: "Curated internships, gigs, and projects from vetted organizations worldwide." },
              { icon: FlaskConical, title: "Research Hub", desc: "Form teams, manage projects, publish — like Notion + Trello, built for young researchers." },
              { icon: ImageIcon, title: "Media Lab", desc: "A premium portfolio surface to showcase prototypes, videos, decks, and websites." },
              { icon: Trophy, title: "Open Challenges", desc: "Hackathons, design sprints, and real startup problem statements with rewards." },
              { icon: Sparkles, title: "AI Matching", desc: "Personalised recommendations based on skills, interests, and performance." },
              { icon: MessageSquare, title: "Realtime Chat", desc: "DMs, team channels, and mentor conversations — with read receipts." },
              { icon: Bot, title: "AI Assistant", desc: "An always-on copilot for opportunity discovery and profile growth." },
              { icon: Shield, title: "Trust & Verification", desc: "Verified students and organizations. Manual document review by experts." },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-black/5 p-5 rounded-[24px] shadow-sm hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="w-11 h-11 rounded-2xl bg-wine-grad flex items-center justify-center text-white mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
                <p className="text-[13px] text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SharedAuthLayout({ title, subtitle, children, setPage }: any) {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="hidden md:flex flex-col justify-between bg-hero-grad p-12 text-white">
        <Logo onClick={() => setPage("home")} />
        <div>
          <p className="font-script text-4xl mb-3">Think it. Drop it. Build it.</p>
          <p className="text-white/70 max-w-sm leading-relaxed text-sm">
            The global experience platform for ambitious students aged 13–19, and the organizations that want to find them.
          </p>
        </div>
        <p className="text-white/40 text-[10px]">© {new Date().getFullYear()} Collivio</p>
      </div>
      <div className="flex items-center justify-center p-6 md:p-12 bg-bg">
        <div className="w-full max-w-sm">
          <div className="mb-8 md:hidden"><Logo onClick={() => setPage("home")} /></div>
          <h1 className="text-3xl font-display font-semibold mb-2">{title}</h1>
          <p className="text-muted text-sm mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, value, onChange, type = "text", placeholder, required = true }: any) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider opacity-60">{label}</label>
      <input 
        id={id} type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl bg-white border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 focus:border-wine transition-all text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

function SignupPage({ setPage }: { setPage: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      await sendEmailVerification(firebaseUser);
      
      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        fullName: name,
        accountStatus: "active",
        emailVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      toast("Account created! Verify your email to unlock all features.");
      setPage("onboarding");
    } catch (error: any) {
      toast(error.message || "Failed to sign up", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setPage("onboarding");
    } catch (error: any) {
      toast(error.message || "Google Sign In failed", "error");
    }
  };

  return (
    <SharedAuthLayout 
      title="Create your account." 
      subtitle="Join the global network of student innovators and researchers."
      setPage={setPage}
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Full Name</label>
          <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe" 
            className="w-full px-5 py-3.5 rounded-2xl bg-secondary border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all font-sans"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Email Address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com" 
            className="w-full px-5 py-3.5 rounded-2xl bg-secondary border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all font-sans"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-5 py-3.5 rounded-2xl bg-secondary border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all font-sans"
          />
        </div>
        <Btn type="submit" disabled={isLoading} className="w-full py-4 text-sm rounded-2xl mt-4">
          {isLoading ? "Creating Account..." : "Create Account"}
        </Btn>
      </form>
      <div className="mt-8 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-muted bg-white px-4">OR CONTINUE WITH</div>
        </div>
        <button 
          onClick={handleGoogle} 
          className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-black/10 flex items-center justify-center gap-3 text-sm font-medium hover:bg-black/[0.02] transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> Google
        </button>
        <p className="mt-8 text-sm text-muted">Already have an account? <span className="text-wine font-bold cursor-pointer" onClick={() => setPage("login")}>Sign In</span></p>
      </div>
    </SharedAuthLayout>
  );
}

function LoginPage({ setPage }: { setPage: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update last login and verification status
      const userRef = doc(db, "users", firebaseUser.uid);
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        emailVerified: firebaseUser.emailVerified
      });

      toast("Success! Relocating...");
      setPage("dashboard");
    } catch (error: any) {
      toast(error.message || "Login failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast("Please enter your email address first.", "error");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast("Reset link sent to your email!");
    } catch (error: any) {
      toast(error.message || "Failed to send reset link", "error");
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setPage("dashboard");
    } catch (error: any) {
      toast(error.message || "Google Sign In failed", "error");
    }
  };

  return (
    <SharedAuthLayout 
      title="Welcome back." 
      subtitle="Sign in to access your dashboard and continue your journey."
      setPage={setPage}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Email Address</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl bg-secondary border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all font-sans"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-muted">Password</label>
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-[10px] font-bold text-wine uppercase tracking-widest hover:underline"
            >
              Forgot?
            </button>
          </div>
          <input 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl bg-secondary border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all font-sans"
          />
        </div>
        <Btn type="submit" disabled={isLoading} className="w-full py-4 text-sm rounded-2xl mt-4">
          {isLoading ? "Signing In..." : "Sign In"}
        </Btn>
      </form>
      <div className="mt-8 text-center text-sm text-muted">
        <p>Don't have an account? <span className="text-wine font-bold cursor-pointer" onClick={() => setPage("signup")}>Sign Up</span></p>
      </div>
      <div className="mt-8">
        <button 
          onClick={handleGoogle} 
          className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-black/10 flex items-center justify-center gap-3 text-sm font-medium hover:bg-black/[0.02] transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> Continue with Google
        </button>
      </div>
    </SharedAuthLayout>
  );
}

function OnboardingPage({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [orgName, setOrgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshUser } = useAuth();

  const handleComplete = async () => {
    if (!selectedRole || !user) return;
    setIsLoading(true);
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        role: selectedRole,
        orgName: selectedRole === "business" ? orgName : null,
        updatedAt: serverTimestamp(),
      });
      await refreshUser();
      setPage("dashboard");
    } catch (error: any) {
      toast(error.message || "Failed to update role", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6">
      <div className="mb-8"><Logo onClick={() => setPage("home")} /></div>
      <div className="w-full max-w-xl bg-white border border-black/5 p-8 rounded-[38px] shadow-elegant text-center">
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-display font-semibold mb-2">Choose your path.</h2>
            <p className="text-muted text-sm mb-10">This helps us personalize your journey on Collivio.</p>
            
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { id: "student", label: "Student", icon: GraduationCap, desc: "Discovery and portfolios." },
                { id: "business", label: "Organization", icon: Building2, desc: "Startup or Academic hub." },
                { id: "mentor", label: "Mentor", icon: Compass, desc: "Guide and review talent." }
              ].map((role) => (
                <div 
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as Role)}
                  className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer text-left ${
                    selectedRole === role.id ? "border-wine bg-wine/5" : "border-black/5 hover:border-black/10"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    selectedRole === role.id ? "bg-wine text-white" : "bg-secondary text-muted"
                  }`}>
                    <role.icon size={22} />
                  </div>
                  <h3 className="font-bold text-base mb-1">{role.label}</h3>
                  <p className="text-[11px] text-muted leading-relaxed opacity-70">{role.desc}</p>
                </div>
              ))}
            </div>
            
            <Btn 
              className="mt-10 px-12 py-3.5 rounded-2xl" 
              disabled={!selectedRole}
              onClick={() => {
                if (selectedRole === "business") setStep(2);
                else handleComplete();
              }}
            >
              Continue <ArrowRight size={18} />
            </Btn>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
             <h2 className="text-3xl font-display font-semibold mb-2">Organization Name.</h2>
             <p className="text-muted text-sm mb-10">Help builders recognize who they'll be collaborating with.</p>
             <input 
              type="text" 
              required 
              placeholder="e.g. Acme Research Lab" 
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full max-w-md px-6 py-4 rounded-2xl bg-secondary border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 text-center text-xl font-display font-medium"
             />
             <div className="mt-10 flex gap-3 justify-center">
               <Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn>
               <Btn 
                className="px-12 py-3.5 rounded-2xl" 
                disabled={!orgName || isLoading}
                onClick={handleComplete}
               >
                {isLoading ? "Setting Up..." : "Complete Setup"}
               </Btn>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function VerifyStudentPage({ setPage }: any) {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("Verification submitted! We'll notify you soon.");
      setPage("dashboard");
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-secondary py-20 px-6">
       <div className="max-w-xl mx-auto">
         <div className="flex items-center justify-between mb-8">
           <Logo onClick={() => setPage("home")} />
           <button onClick={() => setPage("dashboard")} className="text-sm font-bold text-muted flex items-center gap-1"><ChevronLeft size={16} /> Back</button>
         </div>
         <div className="bg-white p-8 rounded-[32px] shadow-elegant border border-black/5">
            <h2 className="text-2xl font-display font-semibold mb-2">Verify Student Status</h2>
            <p className="text-sm text-muted mb-8">Authenticity is core to Collivio. Please upload proof of enrollment.</p>
            <form onSubmit={submit}>
              <Field label="School / Institution" placeholder="Oxford Academy" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Grade/Year" placeholder="Year 11" />
                <Field label="Country" placeholder="India" />
              </div>
              <div className="mb-6">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-2">Upload ID or Letter</label>
                <div 
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-black/10 rounded-2xl py-10 flex flex-col items-center gap-2 cursor-pointer hover:bg-black/[0.02] transition-colors"
                >
                  <Upload size={24} className="text-muted" />
                  <span className="text-xs text-muted">Click to browse or drag and drop</span>
                  <input type="file" ref={fileRef} className="hidden" />
                </div>
              </div>
              <Btn type="submit" disabled={loading} className="w-full rounded-xl">
                 {loading ? "Submitting..." : "Submit for Review"}
              </Btn>
            </form>
         </div>
       </div>
    </div>
  );
}

function ComingSoon({ title, setPage }: any) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
       <div className="text-6xl mb-6">🚧</div>
       <h2 className="text-4xl font-display font-semibold mb-3">{title} is Coming Soon.</h2>
       <p className="text-muted mb-8 max-w-sm">We're building the first-ever infrastructure for early-career researchers and ambitious students.</p>
       <Btn variant="primary" size="lg" onClick={() => setPage("home")}>Back to Home</Btn>
    </div>
  );
}

/* --- MAIN APP --- */
function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const { user, signOut, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const fullNav = ["home", "opportunities", "research", "media-lab", "for-business", "how-it-works", "pricing", "about"];
  const showNav = fullNav.includes(page);
  const isComingSoon = ["how-it-works", "pricing", "about"].includes(page);

  if (!mounted || loading) return null;

  const renderDashboard = () => {
    if (!user) return <LoginPage setPage={setPage} />;
    
    switch (user.role) {
      case "student": return <StudentDashboard user={user} onSignOut={signOut} />;
      case "business": return <BusinessDashboard user={user} onSignOut={signOut} />;
      case "mentor": return <MentorDashboard user={user} onSignOut={signOut} />;
      case "admin": return <AdminDashboard user={user} onSignOut={signOut} />;
      default: return <OnboardingPage setPage={setPage} />;
    }
  };

  return (
    <div className="text-fg font-sans selection:bg-wine/10">
      <AnimatePresence mode="wait">
        {showNav && <Navbar page={page} setPage={setPage} user={user} onSignOut={signOut} />}
      </AnimatePresence>
      
      <main className={showNav ? "pt-24" : ""}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {page === "home" && <LandingPage setPage={setPage} />}
            {page === "signup" && <SignupPage setPage={setPage} />}
            {page === "login" && <LoginPage setPage={setPage} />}
            {page === "onboarding" && <OnboardingPage setPage={setPage} />}
            {page === "dashboard" && renderDashboard()}
            {page === "verify-student" && <VerifyStudentPage setPage={setPage} />}
            {isComingSoon && <ComingSoon title={page.replace("-", " ")} setPage={setPage} />}
            {(page === "opportunities" || page === "research" || page === "media-lab" || page === "for-business") && (
              <div className="max-w-6xl mx-auto px-6 py-12">
                {page === "opportunities" && <OpportunitiesMarketplace />}
                {page === "research" && <ResearchHub />}
                {page === "media-lab" && <MediaLab />}
                {page === "for-business" && <ComingSoon title="Business Portal" setPage={setPage} />}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {showNav && <Footer setPage={setPage} />}
      
      {/* Global Elements */}
      <AIAssistant />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
