import React from "react";
import { FlaskConical, Users, Kanban, FileText, Share2, Plus, ArrowUpRight } from "lucide-react";
import { Btn } from "../../App";

const activeProjects = [
  { id: "1", title: "AI in Urban Planning", domain: "Smart Cities", team: 4, progress: 65, role: "Lead Researcher" },
  { id: "2", title: "Micro-Grid Stability Analysis", domain: "Energy", team: 3, progress: 20, role: "Analyst" },
];

export default function ResearchHub() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-caramel uppercase tracking-widest block mb-1.5">Engine v1</span>
          <h2 className="text-4xl font-display font-semibold">Research Hub</h2>
          <p className="text-muted text-sm mt-1">Collaborative project ecosystem. Build teams and run studies.</p>
        </div>
        <Btn variant="primary" size="lg" className="rounded-2xl">
          <Plus size={18} /> Create Project
        </Btn>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {activeProjects.map((proj) => (
              <div key={proj.id} className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm hover:shadow-elegant transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-caramel/10 flex items-center justify-center text-caramel group-hover:bg-caramel group-hover:text-white transition-all">
                    <FlaskConical size={24} />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-muted bg-secondary px-2.5 py-1 rounded-full">
                    {proj.domain}
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold mb-1">{proj.title}</h3>
                <p className="text-[10px] text-muted mb-6">Current Role: <span className="text-fg font-bold uppercase">{proj.role}</span></p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-1.5 font-medium"><Users size={14} className="text-muted" /> {proj.team} Contributors</span>
                    <span className="text-wine font-bold">{proj.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-caramel-grad" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Btn variant="ghost" size="sm" className="flex-1 rounded-xl text-[10px]">Open Workspace</Btn>
                </div>
              </div>
            ))}
            <div className="border-2 border-dashed border-black/5 rounded-[32px] flex flex-col items-center justify-center p-8 text-muted hover:bg-black/[0.02] transition-all cursor-pointer">
              <Plus size={32} className="opacity-20 mb-2" />
              <span className="text-sm font-semibold tracking-tight">New Collaboration</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
            <h3 className="font-display text-2xl font-bold mb-6">Recent Workspace Activity</h3>
            <div className="space-y-6">
              {[
                { user: "Aanya", action: "uploaded a new dataset", target: "Smart Cities Project", time: "2h ago" },
                { user: "Daniel", action: "completed milestone", target: "Micro-Grid Stability", time: "5h ago" },
                { user: "Sara", action: "added a comment in", target: "AI in Planning", time: "Yesterday" }
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm flex flex-wrap gap-1">
                      <span className="font-bold">{act.user}</span>
                      <span className="text-muted">{act.action}</span>
                      <span className="font-bold text-wine">{act.target}</span>
                    </p>
                    <span className="text-[10px] text-muted font-bold tracking-widest">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-wine-grad p-8 rounded-[32px] text-white">
            <h4 className="font-display text-xl font-bold mb-2">Publish Results</h4>
            <p className="text-xs text-white/70 leading-relaxed mb-6">
              Completed your research? Prepare your findings for the global Media Lab showcase.
            </p>
            <Btn variant="white" className="w-full rounded-xl">Generate Report</Btn>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
            <h4 className="font-bold text-sm mb-4">Workspace Tools</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Kanban, label: "Boards" },
                { icon: FileText, label: "Docs" },
                { icon: Share2, label: "Sharing" },
                { icon: ArrowUpRight, label: "Exports" }
              ].map((tool, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-4 bg-bg rounded-2xl hover:bg-caramel/10 transition-colors gap-2">
                  <tool.icon size={20} className="text-caramel" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
