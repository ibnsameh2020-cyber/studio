
"use client";

import { Globe, Hospital, Building, Bot } from 'lucide-react';

const competencies = [
    { icon: <Bot className="w-5 h-5 mr-3 text-primary" />, text: "Smart Ecosystems: IoT & Smart Cities" },
    { icon: <Hospital className="w-5 h-5 mr-3 text-primary" />, text: "Digital Health: Medical Archiving, HMS, & Integration" },
    { icon: <Building className="w-5 h-5 mr-3 text-primary" />, text: "Enterprise Technology: ERP, CRM, & Low-Current Systems" },
    { icon: <Globe className="w-5 h-5 mr-3 text-primary" />, text: "Facility Intelligence: CAFM & Infrastructure Management" }
];

export default function GlobalExpertiseCompetencies() {
  return (
    <div className="w-full px-4">
      <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-sm border border-border/20 rounded-2xl p-12 shadow-xl transition-all duration-300 hover:border-primary/80">
        <h3 className="text-xl font-headline font-semibold text-center mb-8">Core Competencies Across Regions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {competencies.map(item => (
            <div key={item.text} className="flex items-center">
              {item.icon}
              <span className="text-lg text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
