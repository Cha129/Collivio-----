import React from "react";
import { Layout, Users, Star, MessageSquare, ClipboardList, Settings, CheckCircle2, FlaskConical } from "lucide-react";
import { Btn, Logo } from "../../App";

export default function MentorDashboard({ user, onSignOut }: any) {
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-[280px] bg-white border-r border-black/5 flex flex-col">
        <div className="p-6 h-[80px] flex items-center">
          <Logo onClick={() => {}} />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: Layout },
            { id: "students", label: "Assigned Students", icon: Users },
            { id: "reviews", label: "Task Reviews", icon: CheckCircle2 },
            { id: "research", label: "Research Hub", icon: FlaskConical },
            { id: "feedback", label: "Feedback Log", icon: Star },
          ].map((item) => (
            <button key={item.id} className="w-full flex items-center gap-4 p-3 rounded-2xl text-muted hover:bg-secondary">
              <item.icon size={20} />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-4xl font-display font-semibold mb-8">Guide the next generation.</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
            <h3 className="font-bold text-sm mb-4">Pending Reviews</h3>
            <p className="text-2xl font-display font-bold text-wine">12 Tasks</p>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
            <h3 className="font-bold text-sm mb-4">Active Mentorships</h3>
            <p className="text-2xl font-display font-bold">4 Students</p>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
            <h3 className="font-bold text-sm mb-4">Avg Rating Given</h3>
            <p className="text-2xl font-display font-bold text-caramel">4.8/5.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
