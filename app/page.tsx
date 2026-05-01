"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Phone, Calendar, MessageCircle, Bot, Shield, Clock, Star,
  ChevronRight, ChevronDown, Sparkles, Mic, CheckCircle2,
  ArrowRight, Mail, Headphones,
} from "lucide-react";

/* ─── reusable bits ─── */
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-royal-gold/80 font-semibold mb-4">
      <Sparkles size={14} className="text-royal-gold" />
      {children}
    </span>
  );
}

/* ━━━ NAVBAR ━━━ */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-midnight-purple/60 border-b border-royal-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold gold-text">Sarah<span className="text-marigold">.</span></a>
        <div className="hidden md:flex items-center gap-8">
          {["Problem", "How It Works", "Features", "FAQ"].map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm text-champagne/60 hover:text-royal-gold transition-colors">{link}</a>
          ))}
        </div>
        <a href="tel:+19856022627" className="btn-premium !py-2.5 !px-6 text-sm flex items-center gap-2">
          <Phone size={14} /> Call Sarah
        </a>
      </div>
    </nav>
  );
}

/* ━━━ HERO ━━━ */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/dental-hero.png" alt="Premium Dental Clinic" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-purple/95 via-midnight-purple/80 to-midnight-purple/50" />
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full border border-royal-gold/10 animate-rotate-slow" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up opacity-0">
            <span className="inline-flex items-center gap-2 text-sm bg-velvet-violet/40 border border-royal-gold/20 rounded-full px-4 py-2 text-champagne/70 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI Receptionist · Live Now
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight animate-fade-in-up opacity-0 delay-100">
            Stop missing<br />1 in 4 patient <span className="gold-text italic">calls.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-champagne/70 leading-relaxed max-w-lg animate-fade-in-up opacity-0 delay-200">
            <strong className="text-royal-gold">Sarah</strong> is a 24/7 AI voice receptionist that answers every call, books appointments to your Google Calendar, and confirms via WhatsApp — automatically.
          </p>
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up opacity-0 delay-300">
            <a href="tel:+19856022627" className="btn-premium flex items-center gap-2 text-base">
              <Phone size={18} /> Call Sarah Live
            </a>
            <a href="#problem" className="btn-outline flex items-center gap-2 text-base">
              See the Problem <ChevronRight size={16} />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 mt-14 animate-fade-in-up opacity-0 delay-400">
            {["GPT-4 Powered", "Google Calendar Sync", "WhatsApp Alerts", "Available 24/7"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-xs tracking-widest uppercase text-champagne/40">
                <span className="text-royal-gold">·</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="text-[10px] tracking-[0.3em] uppercase text-champagne/30">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-royal-gold/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ━━━ PROBLEM (real industry stats with sources) ━━━ */
const problemStats = [
  { num: "27%", label: "of dental calls go unanswered", source: "NexHealth Industry Report, 2024" },
  { num: "$280", label: "average value of one missed new-patient call", source: "ADA New Patient LTV Study" },
  { num: "67%", label: "of patients book with the first practice that answers", source: "Patient Experience Survey, 2023" },
];

function Problem() {
  return (
    <section id="problem" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple via-velvet-violet/20 to-midnight-purple pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <SectionTag>The Cost of Unanswered Calls</SectionTag>
        <h2 className="text-4xl md:text-5xl font-bold mt-2 text-champagne">
          Every missed call is a<br />
          <span className="gold-text italic">patient who chose someone else.</span>
        </h2>
        <p className="mt-4 text-champagne/60 max-w-xl leading-relaxed">
          The math is brutal. The average dental practice misses 27% of incoming calls — and 67% of new patients book with whoever answers first.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {problemStats.map((s) => (
            <div key={s.num} className="glass-card rounded-2xl p-8 text-center group">
              <p className="text-5xl md:text-6xl font-bold gold-text">{s.num}</p>
              <p className="mt-4 text-champagne font-semibold">{s.label}</p>
              <p className="mt-2 text-xs text-champagne/35 italic">{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━ HOW IT WORKS ━━━ */
const steps = [
  { num: "01", icon: <Phone size={28} />, title: "Call Sarah", desc: "Patients call Sarah's number directly or you forward unanswered calls to her. No new hardware needed." },
  { num: "02", icon: <Headphones size={28} />, title: "She books the appointment", desc: "Sarah has a natural GPT-4 powered conversation, collects patient details, and books directly to your Google Calendar." },
  { num: "03", icon: <MessageCircle size={28} />, title: "Everyone gets notified", desc: "Patient receives a WhatsApp confirmation. Doctor gets a WhatsApp alert with all booking details. Calendar is updated." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="glass-card rounded-3xl p-10 md:p-16">
          <div className="text-center mb-14">
            <SectionTag>How It Works</SectionTag>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-champagne">
              Live in <span className="gold-text italic">minutes.</span><br />No new hardware.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.num} className="text-center group">
                <span className="text-5xl font-bold gold-text italic script-text">{s.num}</span>
                <div className="w-14 h-14 mx-auto mt-4 rounded-xl bg-gradient-to-br from-royal-gold/20 to-marigold/10 flex items-center justify-center text-royal-gold">
                  {s.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-champagne">{s.title}</h3>
                <p className="mt-3 text-champagne/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━ FEATURES (only what's actually built) ━━━ */
const features = [
  { icon: <Mic size={24} />, title: "Natural voice conversations", desc: "Powered by GPT-4 with natural-sounding voice. Patients have a real conversation — not a phone tree." },
  { icon: <Calendar size={24} />, title: "Google Calendar sync", desc: "Appointments are instantly created on your Google Calendar with correct time, patient name, and phone number." },
  { icon: <MessageCircle size={24} />, title: "WhatsApp patient confirmation", desc: "Patients receive an instant WhatsApp message with their booking details and confirmation ID." },
  { icon: <Bot size={24} />, title: "Doctor WhatsApp alerts", desc: "Doctor gets a real-time WhatsApp notification for every new booking — name, time, service, and patient phone." },
  { icon: <Clock size={24} />, title: "Available 24/7", desc: "Sarah never sleeps, takes no breaks, and answers every single call — nights, weekends, and holidays." },
  { icon: <Shield size={24} />, title: "Booking logged to Sheets", desc: "Every appointment is automatically logged to Google Sheets for record-keeping and easy tracking." },
];

function Features() {
  return (
    <section id="features" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velvet-violet/10 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <SectionTag>What Sarah Actually Does</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-champagne">
            Built for dental.<br /><span className="gold-text italic">Every feature works today.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className="glass-card rounded-2xl p-7 group" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal-gold/20 to-marigold/10 flex items-center justify-center text-royal-gold mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-champagne">{f.title}</h3>
              <p className="mt-2 text-sm text-champagne/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━ LIVE DEMO SECTION (instead of fake case study) ━━━ */
function LiveDemo() {
  return (
    <section id="demo" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple via-velvet-violet/20 to-midnight-purple pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14 bg-gradient-to-br from-velvet-violet/40 to-midnight-purple/60">
              <SectionTag>See It In Action</SectionTag>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 text-champagne">
                Don&apos;t take our word.<br /><span className="gold-text italic">Test Sarah yourself.</span>
              </h2>
              <p className="mt-5 text-champagne/60 leading-relaxed">
                Sarah is live right now. Call her number, pretend you&apos;re a patient, and watch the magic happen — appointment in your calendar, notifications on WhatsApp, all in under 60 seconds.
              </p>
              <a href="tel:+19856022627" className="btn-premium inline-flex items-center gap-2 text-base mt-8">
                <Phone size={18} /> Call +1 (985) 602-2627
              </a>
            </div>
            <div className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-royal-gold/10">
              <h3 className="text-xl font-semibold text-champagne mb-6">What happens when a patient calls:</h3>
              <div className="space-y-5">
                {[
                  { step: "1", text: "Sarah greets the patient naturally and asks how she can help" },
                  { step: "2", text: "Patient tells her the preferred date, time, and service" },
                  { step: "3", text: "Sarah collects the patient's name and phone number" },
                  { step: "4", text: "Appointment instantly appears in your Google Calendar" },
                  { step: "5", text: "Patient receives a WhatsApp confirmation automatically" },
                  { step: "6", text: "You get a WhatsApp alert with the patient's full details" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-royal-gold/30 to-marigold/10 flex items-center justify-center text-royal-gold text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <p className="text-sm text-champagne/65 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━ FAQ ━━━ */
const faqs = [
  { q: "Will Sarah sound robotic?", a: "No. Sarah runs on GPT-4 with a natural-sounding voice. Most people can't tell they're talking to AI. Try it yourself — call her right now." },
  { q: "What does Sarah actually do right now?", a: "She answers calls, collects patient details (name, phone, date, time), books appointments to Google Calendar, sends WhatsApp confirmation to the patient, and sends a WhatsApp alert to the doctor." },
  { q: "Does it work with Google Calendar?", a: "Yes. Appointments are created directly in your Google Calendar with the correct local time, patient name, and contact details." },
  { q: "What about WhatsApp notifications?", a: "Both the patient and the doctor receive instant WhatsApp messages. The patient gets a confirmation with date, time, and address. The doctor gets an alert with all patient details." },
  { q: "How long does setup take?", a: "The technical setup is ready. You just need a Vapi account, Twilio account (for WhatsApp), and Google service account. We handle the rest." },
  { q: "Will it replace my front desk?", a: "No — and that's the point. Sarah handles overflow, after-hours, and routine bookings so your team can focus on patients in the chair." },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple via-velvet-violet/15 to-midnight-purple pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <SectionTag>Common Questions</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 gold-text">
            Honest answers.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer">
                <span className="font-semibold text-champagne">{f.q}</span>
                <ChevronDown size={18} className={`text-royal-gold flex-shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-sm text-champagne/55 leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━ FINAL CTA ━━━ */
function FinalCTA() {
  return (
    <section className="py-28 relative">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="glass-card rounded-3xl p-12 md:p-16 animate-pulse-glow">
          <SectionTag>Ready to try Sarah?</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold gold-text mt-2">
            Call her right now.<br /><span className="text-champagne italic">Judge for yourself.</span>
          </h2>
          <p className="mt-5 text-champagne/60 max-w-lg mx-auto leading-relaxed">
            No demo forms, no sales calls. Just dial the number and talk to Sarah. If she impresses you, let&apos;s talk about putting her to work for your practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="tel:+19856022627" className="btn-premium flex items-center gap-2 text-base">
              <Phone size={18} /> Call Sarah Now
            </a>
            <a href="#contact" className="btn-outline flex items-center gap-2 text-base">
              Contact Us <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-royal-gold/10">
            {[
              { val: "24/7", label: "Always Available" },
              { val: "<60s", label: "Booking Time" },
              { val: "100%", label: "Calls Answered" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold gold-text">{s.val}</p>
                <p className="text-xs text-champagne/40 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━ FOOTER ━━━ */
function Footer() {
  return (
    <footer id="contact" className="border-t border-royal-gold/10 bg-midnight-purple/80 py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold gold-text">Sarah<span className="text-marigold">.</span></h3>
            <p className="mt-3 text-sm text-champagne/50 leading-relaxed">
              AI voice receptionist built for dental practices. Every call answered. Every appointment booked.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-royal-gold/70 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Problem", "How It Works", "Features", "FAQ"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-champagne/50 hover:text-royal-gold transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-royal-gold/70 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-champagne/50"><Phone size={14} className="text-royal-gold" /> +1 (985) 602-2627</li>
              <li className="flex items-center gap-2 text-sm text-champagne/50"><Mail size={14} className="text-royal-gold" /> hello@sarahreceptionist.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-royal-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-champagne/30">© {new Date().getFullYear()} Sarah AI · Built for dental practices.</p>
          <p className="text-xs text-champagne/30 flex items-center gap-1">
            Powered by <Bot size={12} className="text-royal-gold" /> GPT-4 + Vapi
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ━━━ PAGE ━━━ */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <LiveDemo />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
