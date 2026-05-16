import React, { useState } from "react";
import { Layout, Compass, ClipboardList, Briefcase, Settings, Bell, MessageSquare, Bot, GraduationCap, ChevronRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Btn, Logo } from "../../App";
import EmploymentSkillBridge from "../engines/EmploymentSkillBridge";
import ResearchHub from "../engines/ResearchHub";
import MediaLab from "../engines/MediaLab";
import OpportunitiesMarketplace from "../engines/OpportunitiesMarketplace";
import Messaging from "../Messaging";

type ActiveTab = "overview" | "skill-bridge" | "research-hub" | "media-lab" | "opportunities" | "settings" | "messages";

export default function StudentDashboard({ user, onSignOut }: any) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "opportunities", label: "Opportunities", icon: Briefcase },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "skill-bridge", label: "Skill Bridge", icon: GraduationCap },
    { id: "research-hub", label: "Research Hub", icon: Compass },
    { id: "media-lab", label: "Media Lab", icon: ClipboardList },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab user={user} setActiveTab={setActiveTab} />;
      case "opportunities": return <OpportunitiesMarketplace />;
      case "skill-bridge": return <EmploymentSkillBridge />;
      case "research-hub": return <ResearchHub />;
      case "media-lab": return <MediaLab />;
      case "messages": return <Messaging />;
      case "settings": return <div className="p-20 text-center text-muted">Account settings configuration coming soon.</div>;
      default: return <OverviewTab user={user} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-black/5 flex flex-col transition-all duration-300 ${isSidebarOpen ? "w-[280px]" : "w-[80px]"}`}>
        <div className="p-6 h-20 flex items-center h-[80px]">
          {isSidebarOpen ? <Logo onClick={() => {}} /> : <div className="w-9 h-9 rounded-xl bg-wine-grad flex items-center justify-center text-white font-script text-xl mx-auto">C</div>}
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                activeTab === item.id 
                ? "bg-wine-grad text-white shadow-glow translate-x-1" 
                : "text-muted hover:bg-secondary hover:text-fg"
              }`}
            >
              <item.icon size={20} className={isSidebarOpen ? "" : "mx-auto"} />
              {isSidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-black/5">
          <button 
            onClick={onSignOut}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl text-muted hover:bg-red-50 hover:text-red-600 transition-all`}
          >
            <Settings size={20} className={isSidebarOpen ? "" : "mx-auto"} />
            {isSidebarOpen && <span className="text-sm font-semibold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-[80px] bg-white border-b border-black/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-md hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all"
                />
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted hover:text-wine transition-colors">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-wine rounded-full" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted hover:text-wine transition-colors">
              <MessageSquare size={20} />
            </button>
            <div className="h-8 w-px bg-black/5 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold leading-none">{user?.name}</div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Lvl 12 Student</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-caramel to-chestnut" />
            </div>
          </div>
        </header>

        {/* Scrollable View */}
        <div className="flex-1 overflow-y-auto p-8 bg-bg/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function OverviewTab({ user, setActiveTab }: any) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-semibold">Hello, {user?.name.split(" ")[0]}!</h1>
          <p className="text-muted text-sm mt-1">Here's what's happening in your Collivio ecosystem today.</p>
        </div>
        <div className="flex gap-2">
           <Btn variant="white" className="rounded-xl border border-black/5 shadow-sm">My Portfolio</Btn>
           <Btn variant="primary" className="rounded-xl">Complete Tasks</Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Completed Tasks", value: "24", sub: "+3 this week", color: "text-wine" },
           { label: "Research Projects", value: "2", sub: "1 pending review", color: "text-caramel" },
           { label: "Micro-Internships", value: "3", sub: "1 active now", color: "text-fg" },
           { label: "Skill Score", value: "92", sub: "Top 2% globally", color: "text-emerald-600" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">{stat.label}</span>
             <div className={`text-4xl font-display font-bold ${stat.color}`}>{stat.value}</div>
             <p className="text-[10px] font-bold text-muted/60 uppercase tracking-tighter mt-1">{stat.sub}</p>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <section className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-bold mb-2">Continue your Skill Track</h3>
              <p className="text-sm text-muted max-w-sm mb-8">You're 80% through the UI Design Bridge. Complete your final assignment to earn your badge.</p>
              <div className="flex items-center gap-6">
                <Btn variant="primary" size="lg" className="rounded-2xl" onClick={() => setActiveTab("skill-bridge")}>Resume Task <ChevronRight size={18} /></Btn>
                <div className="flex -space-x-3 overflow-hidden">
                  {[1,2,3].map(i => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-4 ring-white bg-secondary" />
                  ))}
                  <div className="flex items-center justify-center h-8 w-8 rounded-full ring-4 ring-white bg-wine text-white text-[10px] font-bold">+12</div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-10 -mr-8 -mt-8 rotate-12">
               <GraduationCap size={240} />
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
                <h4 className="font-bold text-sm mb-4">Pending Applications</h4>
                <div className="space-y-3">
                   {[
                     { name: "Junior UI Intern", org: "Vanguard", status: "In Review" },
                     { name: "Data Analyst", org: "EcoPulse", status: "Interview" },
                   ].map((app, i) => (
                     <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-secondary">
                        <div>
                          <p className="text-xs font-bold">{app.name}</p>
                          <p className="text-[10px] text-muted">{app.org}</p>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-white px-2 py-1 rounded-full">{app.status}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
                <h4 className="font-bold text-sm mb-4">Upcoming Deadlines</h4>
                <div className="space-y-3">
                   {[
                     { name: "Research Submission", date: "Tomorrow, 6pm" },
                     { name: "Portfolio Update", date: "Friday, 10am" },
                   ].map((dl, i) => (
                     <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-secondary">
                        <div>
                          <p className="text-xs font-bold">{dl.name}</p>
                          <p className="text-[10px] text-muted">{dl.date}</p>
                        </div>
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <aside className="space-y-6">
           <div className="bg-wine-grad p-8 rounded-[32px] text-white overflow-hidden relative group">
              <Bot size={80} className="absolute -top-4 -right-4 opacity-10 rotate-12" />
              <h4 className="font-display text-2xl font-bold mb-2">AI Career Coach</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6">"You've shown strong research skills. Have you considered looking at 'Climate Intelligence' projects?"</p>
              <Btn variant="white" className="w-full rounded-xl">Chat with Coach</Btn>
           </div>

           <div className="bg-bg p-6 rounded-[32px] border border-black/5 shadow-sm">
              <h4 className="font-bold text-sm mb-4">Trending in Research</h4>
              <div className="space-y-4">
                 {[
                   { title: "Neuroscience in Teens", contributors: 42, views: 1200 },
                   { title: "Quantum Basics", contributors: 12, views: 840 },
                 ].map((tr, i) => (
                   <div key={i} className="pb-4 border-b border-black/5 last:border-0 last:pb-0">
                      <h5 className="text-xs font-bold mb-1 hover:text-wine cursor-pointer">{tr.title}</h5>
                      <div className="flex gap-3 text-[10px] text-muted font-bold uppercase">
                        <span>{tr.contributors} Active</span>
                        <span>{tr.views} Views</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
