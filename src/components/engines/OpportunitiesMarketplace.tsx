import React, { useState } from "react";
import { Search, Filter, Briefcase, MapPin, DollarSign, Clock, Layout, ArrowRight, CheckCircle2 } from "lucide-react";
import { Btn, toast } from "../../App";

const opportunities = [
  { 
    id: "1", 
    title: "Junior UI Intern", 
    org: "DesignFlow Studio", 
    location: "Remote", 
    stipend: "$500/mo", 
    duration: "3 months", 
    type: "Internship",
    domain: "Design",
    tags: ["Figma", "UI/UX"]
  },
  { 
    id: "2", 
    title: "AI Research Assistant", 
    org: "GenFuture Labs", 
    location: "Berlin, DE", 
    stipend: "$800/mo", 
    duration: "6 months", 
    type: "Research",
    domain: "AI",
    tags: ["Python", "PyTorch"]
  },
  { 
    id: "3", 
    title: "Content Marketing Gig", 
    org: "EcoAction NGO", 
    location: "Remote", 
    stipend: "$200/project", 
    duration: "2 weeks", 
    type: "Gig",
    domain: "Marketing",
    tags: ["Writing", "Social Media"]
  }
];

export default function OpportunitiesMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleApply = (title: string) => {
    toast(`Application for ${title} submitted!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-semibold">Opportunities</h2>
          <p className="text-muted text-sm mt-1">Curated micro-internships and startup gigs.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-black/5 shadow-sm">
          <div className="pl-3 pr-2 text-muted">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search roles, skills..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm py-2 focus:outline-none w-[200px] md:w-[300px]"
          />
          <button className="p-2 bg-secondary rounded-xl hover:bg-black/5 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div 
              key={opp.id} 
              className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm hover:shadow-elegant transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-muted group-hover:bg-wine/10 group-hover:text-wine transition-colors">
                  <Briefcase size={28} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">{opp.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted items-center">
                    <span className="font-bold text-fg">{opp.org}</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> {opp.location}</span>
                    <span className="flex items-center gap-1"><DollarSign size={14}/> {opp.stipend}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {opp.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex gap-1.5 order-2 sm:order-1">
                  {opp.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-secondary px-3 py-1.5 rounded-full">{t}</span>
                  ))}
                </div>
                <Btn 
                  variant="primary" 
                  size="md" 
                  className="rounded-xl order-1 sm:order-2 w-full sm:w-auto"
                  onClick={() => handleApply(opp.title)}
                >
                  Apply Now <ArrowRight size={16} />
                </Btn>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="bg-bg p-8 rounded-[32px] border border-black/5 shadow-sm">
            <h4 className="font-bold text-sm mb-4">Recommended for You</h4>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold text-wine tracking-widest">98% Match</span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                  <h5 className="font-bold text-sm">Product Manager Assist</h5>
                  <p className="text-[10px] text-muted mb-3">Nebula Startups · Remote</p>
                  <Btn variant="ghost" size="sm" className="w-full rounded-lg text-[10px] bg-secondary">View Role</Btn>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-wine-grad p-8 rounded-[32px] text-white">
            <h4 className="font-display text-xl font-bold mb-2">Post an Opportunity</h4>
            <p className="text-xs text-white/70 leading-relaxed mb-6">
              Looking for young talent? Organizations can post roles and find the best verified students.
            </p>
            <Btn variant="white" className="w-full rounded-xl" onClick={() => toast("Redirecting to organization portal...")}>Get Started</Btn>
          </div>
        </aside>
      </div>
    </div>
  );
}
