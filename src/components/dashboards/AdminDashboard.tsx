import React from "react";
import { ShieldCheck, UserCheck, AlertTriangle, BarChart3, Settings, LogOut, Search, Bell } from "lucide-react";
import { Btn, Logo } from "../../App";

export default function AdminDashboard({ user, onSignOut }: any) {
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-[280px] bg-white border-r border-black/5 flex flex-col">
        <div className="p-6 h-[80px] flex items-center">
          <Logo onClick={() => {}} />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { label: "Control Center", icon: ShieldCheck },
            { label: "Verifications", icon: UserCheck },
            { label: "Moderation", icon: AlertTriangle },
            { label: "Analytics", icon: BarChart3 },
            { label: "Settings", icon: Settings },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-4 p-3 rounded-2xl text-muted hover:bg-secondary">
              <item.icon size={20} />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-display font-semibold text-fire">Super Admin Console.</h1>
          <div className="flex gap-4">
             <button className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-muted"><Bell size={20} /></button>
             <Btn variant="ghost" onClick={onSignOut}><LogOut size={18} /> Exit</Btn>
          </div>
        </header>
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
           <div className="space-y-8">
              <div className="grid sm:grid-cols-3 gap-4">
                 {[
                   { label: "Pending Verifications", count: 84, color: "text-wine" },
                   { label: "Active Reports", count: 3, color: "text-fire" },
                   { label: "New Users/24h", count: 1422, color: "text-emerald-600" },
                 ].map((s, i) => (
                   <div key={i} className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">{s.label}</span>
                      <div className={`text-4xl font-display font-bold ${s.color}`}>{s.count}</div>
                   </div>
                 ))}
              </div>
              <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm shadow-elegant">
                 <h3 className="font-bold text-lg mb-6">Verification Queue</h3>
                 <div className="space-y-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex items-center justify-between p-4 bg-bg rounded-2xl border border-black/5">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-secondary" />
                            <div>
                               <p className="text-sm font-bold">Applicant {i}</p>
                               <span className="text-[10px] uppercase font-bold text-muted">Organization Request</span>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <Btn variant="ghost" size="sm" className="text-fire font-bold">Reject</Btn>
                            <Btn variant="primary" size="sm" className="rounded-xl">Approve</Btn>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           <aside className="space-y-6">
              <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
                 <h4 className="font-bold text-sm mb-4">Platform Health</h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-muted">API Latency</span>
                       <span className="text-emerald-500 font-bold">12ms</span>
                    </div>
                    <div className="h-1 bg-emerald-500/20 rounded-full relative">
                       <div className="absolute inset-0 bg-emerald-500 w-[95%] rounded-full" />
                    </div>
                 </div>
              </div>
           </aside>
        </div>
      </main>
    </div>
  );
}
