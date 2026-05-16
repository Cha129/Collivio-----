import React, { useState } from "react";
import { Layout, Users, Plus, BarChart3, Briefcase, Bell, Search, MessageSquare, Building2, UserCheck, Trophy, LogOut } from "lucide-react";
import { Btn, Logo } from "../../App";
import Messaging from "../Messaging";

export default function BusinessDashboard({ user, onSignOut }: any) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab user={user} />;
      case "messages": return <Messaging />;
      default: return <OverviewTab user={user} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-black/5 flex flex-col">
        <div className="p-6 h-[80px] flex items-center">
          <Logo onClick={() => {}} />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: Layout },
            { id: "messages", label: "Messages", icon: MessageSquare },
            { id: "internships", label: "My Internships", icon: Briefcase },
            { id: "talent", label: "Browse Talent", icon: Users },
            { id: "challenges", label: "Challenges", icon: Trophy },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                activeTab === item.id 
                ? "bg-caramel-grad text-white shadow-glow" 
                : "text-muted hover:bg-secondary hover:text-fg"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-black/5">
          <button onClick={onSignOut} className="w-full flex items-center gap-4 p-3 rounded-2xl text-muted hover:bg-red-50 hover:text-red-600">
             <LogOut size={20} /> <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-[80px] bg-white border-b border-black/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Find candidates..." 
                  className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-caramel/20"
                />
             </div>
          </div>
          <div className="flex items-center gap-4">
            <Btn variant="secondary" className="rounded-xl"><Plus size={18} /> Post Role</Btn>
            <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted"><Bell size={20} /></button>
            <div className="h-8 w-px bg-black/5 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold">{user?.orgName || "Organization"}</div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Founding Partner</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-caramel">
                <Building2 size={24} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
           {renderContent()}
        </div>
      </main>
    </div>
  );
}

function OverviewTab({ user }: any) {
  return (
    <section className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-semibold">Managing Talent.</h1>
          <p className="text-muted text-sm mt-1">Review your active opportunities and find the next generation of builders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Total Applicants", value: "142", sub: "+12 today", icon: Users },
           { label: "Active Roles", value: "8", sub: "3 expiring soon", icon: Briefcase },
           { label: "Interviews", value: "15", sub: "4 scheduled tomorrow", icon: UserCheck },
           { label: "Conversion", value: "4.2%", sub: "Above industry avg", icon: BarChart3 },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
             <div className="flex justify-between items-center mb-3">
               <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{stat.label}</span>
               <stat.icon size={16} className="text-caramel" />
             </div>
             <div className="text-4xl font-display font-bold">{stat.value}</div>
             <p className="text-[10px] font-bold text-muted/60 uppercase mt-1">{stat.sub}</p>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
         <div className="space-y-6">
           <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm">
              <h3 className="text-2xl font-display font-bold mb-6">Recent Applicants</h3>
              <div className="space-y-4">
                 {[
                   { name: "Aanya Sharma", role: "UI Design Intern", match: "98%", status: "Pending" },
                   { name: "Daniel Koch", role: "AI Research", match: "94%", status: "Interviewed" },
                   { name: "Sara Jenkins", role: "Content Gig", match: "89%", status: "Accepted" },
                 ].map((c, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-secondary hover:bg-caramel/[0.03] transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-caramel-grad" />
                         <div>
                            <p className="text-sm font-bold">{c.name}</p>
                            <p className="text-[10px] text-muted">{c.role} · <span className="text-caramel font-bold">{c.match} Match</span></p>
                         </div>
                      </div>
                      <Btn variant="white" size="sm" className="rounded-xl border border-black/5">Review</Btn>
                   </div>
                 ))}
              </div>
              <Btn variant="ghost" className="w-full mt-6 text-xs font-bold text-caramel">View All Applicants</Btn>
           </div>
         </div>

         <aside className="space-y-6">
            <div className="bg-bg p-8 rounded-[32px] border border-black/5 shadow-sm">
               <h4 className="font-display text-xl font-bold mb-4">Talent Discovery</h4>
               <p className="text-xs text-muted leading-relaxed mb-6">
                 Our AI has found 5 new students matching your "Mobile App Developer" role.
               </p>
               <Btn variant="secondary" className="w-full rounded-xl">Unlock Talent</Btn>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
               <h4 className="font-bold text-sm mb-4">Upcoming Challenges</h4>
               <div className="bg-secondary p-4 rounded-2xl">
                  <Trophy size={20} className="text-amber-600 mb-2" />
                  <h5 className="text-xs font-bold">Hackathon 2026</h5>
                  <p className="text-[10px] text-muted">Preparation stage · 240 joined</p>
               </div>
            </div>
         </aside>
      </div>
    </section>
  );
}
