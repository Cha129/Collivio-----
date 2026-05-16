import React from "react";
import { ImageIcon, Layout, ExternalLink, Heart, MessageSquare, Share2, Plus, Sparkles } from "lucide-react";
import { Btn } from "../../App";

const works = [
  { id: "1", title: "Sustainable Living App", category: "App Prototype", likes: 124, comments: 12, user: "Aanya S." },
  { id: "2", title: "Climate Data Visualization", category: "D3.js Visualization", likes: 89, comments: 8, user: "Daniel K." },
  { id: "3", title: "Neural Network Paper", category: "Research Paper", likes: 210, comments: 34, user: "Sara J." },
];

export default function MediaLab() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold text-wine uppercase tracking-widest block mb-1.5">Engine v1</span>
          <h2 className="text-4xl font-display font-semibold">Media Lab</h2>
          <p className="text-muted text-sm mt-1">Portfolio + Innovation visibility. Showcase your real impact.</p>
        </div>
        <Btn variant="primary" size="lg" className="rounded-2xl shadow-glow">
          <Plus size={18} /> Add Prototype
        </Btn>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-12">
          {/* Featured Sections */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {works.map((work) => (
              <div key={work.id} className="group bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-sm hover:shadow-elegant transition-all">
                <div className="aspect-video bg-secondary relative overflow-hidden">
                  <div className="absolute inset-0 bg-wine-grad opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                    <ImageIcon size={48} className="text-muted group-hover:text-wine" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all bg-white p-2 rounded-xl text-wine shadow-elegant">
                    <ExternalLink size={16} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-display text-xl font-bold">{work.title}</h3>
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{work.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary" />
                      <span className="text-[10px] font-bold">{work.user}</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted">
                      <button className="flex items-center gap-1 hover:text-wine transition-colors">
                        <Heart size={14} /> <span className="text-[10px] font-bold">{work.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-wine transition-colors">
                        <MessageSquare size={14} /> <span className="text-[10px] font-bold">{work.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-fire p-10 rounded-[48px] text-white flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-wine-grad opacity-40" />
            <div className="relative z-10 max-w-lg">
              <Sparkles size={40} className="mx-auto mb-6 text-amber-300 animate-pulse" />
              <h3 className="font-display text-4xl font-bold mb-4">Open Innovation Challenges</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Real startup problem statements with rewards. Help founders solve their biggest hurdles and earn visibility.
              </p>
              <Btn variant="white" size="lg" className="rounded-2xl px-12">Browse Challenges</Btn>
            </div>
            <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700">
               <ImageIcon size={300} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm">
            <h4 className="font-bold text-sm mb-4">Stats Dashboard</h4>
            <div className="space-y-4">
              {[
                { label: "Total Views", value: "3.2k", icon: ImageIcon },
                { label: "Interactions", value: "842", icon: Heart },
                { label: "Org Profile Visits", value: "45", icon: Layout },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-secondary">
                  <div className="flex items-center gap-3">
                    <stat.icon size={16} className="text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{stat.label}</span>
                  </div>
                  <span className="font-bold text-wine">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-caramel-grad p-8 rounded-[32px] text-white">
            <h4 className="font-display text-xl font-bold mb-2">Prototype Support</h4>
            <p className="text-[10px] text-white/70 leading-relaxed mb-6 italic">
              "Need help finishing your MVP? Our community of peer-developers and mentors are ready to assist."
            </p>
            <Btn variant="white" className="w-full rounded-xl text-[10px]">Request Build Help</Btn>
          </div>
        </aside>
      </div>
    </div>
  );
}
