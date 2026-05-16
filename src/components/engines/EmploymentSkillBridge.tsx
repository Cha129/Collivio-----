import React from "react";
import { GraduationCap, Trophy, CheckCircle2, ChevronRight, BarChart3, Clock, Star } from "lucide-react";
import { motion } from "motion/react";
import { Btn } from "../../App";

const tasks = [
  { id: "1", title: "UI Design Assignment", domain: "Design", level: "Beginner", points: 150, deadline: "2 days" },
  { id: "2", title: "Prompt Engineering Task", domain: "AI", level: "Intermediate", points: 300, deadline: "5 days" },
  { id: "3", title: "Research Synthesis", domain: "Academic", level: "Advanced", points: 500, deadline: "1 week" },
];

export default function EmploymentSkillBridge() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-caramel uppercase tracking-widest block mb-1.5">Engine v1</span>
          <h2 className="text-4xl font-display font-semibold">Employment Skill Bridge</h2>
          <p className="text-muted text-sm mt-1">Practical career readiness ecosystem. Learn by doing real tasks.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-3 px-5 rounded-2xl border border-black/5 shadow-sm text-center">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">XP Points</span>
            <span className="text-2xl font-display font-bold text-wine">2,450</span>
          </div>
          <div className="bg-white p-3 px-5 rounded-2xl border border-black/5 shadow-sm text-center">
            <span className="text-[10px] uppercase font-bold text-muted block mb-1">Rank</span>
            <span className="text-2xl font-display font-bold text-caramel">Top 5%</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" /> Active Tasks
              </h3>
              <button className="text-xs font-bold text-wine">View All</button>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-secondary hover:bg-wine/[0.03] border border-transparent hover:border-wine/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-wine shadow-sm group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{task.title}</h4>
                      <div className="flex gap-4 text-[10px] text-muted mt-1">
                        <span className="flex items-center gap-1"><GraduationCap size={12}/> {task.domain}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {task.deadline}</span>
                        <span className="font-bold text-caramel uppercase tracking-widest">{task.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-6">
                    <div className="text-right">
                      <span className="block text-sm font-bold text-wine">+{task.points}</span>
                      <span className="text-[10px] uppercase text-muted font-bold tracking-tighter">XP Potentials</span>
                    </div>
                    <Btn variant="white" size="sm" className="shadow-sm">Start <ChevronRight size={14}/></Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-wine-grad p-8 rounded-[32px] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <BarChart3 size={120} />
              </div>
              <h4 className="font-display text-2xl font-bold mb-2">Performance Analytics</h4>
              <p className="text-sm text-white/70 mb-6">Track your growth across 12 core competencies.</p>
              <Btn variant="white" size="sm" className="rounded-xl">View Analytics</Btn>
            </div>
            <div className="bg-caramel-grad p-8 rounded-[32px] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Star size={120} />
              </div>
              <h4 className="font-display text-2xl font-bold mb-2">Mentor Feedback</h4>
              <p className="text-sm text-white/70 mb-6">Review comments and guidance from industry mentors.</p>
              <Btn variant="white" size="sm" className="rounded-xl">Read Feedback</Btn>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
            <h4 className="font-bold text-sm mb-4">Milestones</h4>
            <div className="space-y-4">
              {[
                { label: "Junior Task Master", progress: 80 },
                { label: "Prompt Expert", progress: 45 },
                { label: "Community Valued", progress: 100 },
              ].map((m, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span>{m.label}</span>
                    <span className="text-wine">{m.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      className="h-full bg-wine-grad"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg p-6 rounded-[32px] border border-black/5 shadow-sm">
            <h4 className="font-display text-xl font-bold mb-3">AI Discovery</h4>
            <p className="text-[11px] text-muted leading-relaxed mb-4">
              Based on your design scores, I recommend the "Advanced Figma Prototyping" track next.
            </p>
            <Btn className="w-full rounded-xl py-3 text-xs">Unlock Track</Btn>
          </div>
        </aside>
      </div>
    </div>
  );
}
