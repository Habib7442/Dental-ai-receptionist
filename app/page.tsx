"use client";

import Image from "next/image";
import {
  Phone,
  Calendar,
  MessageCircle,
  Bot,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  Mic,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Mail,
} from "lucide-react";

/* ─── tiny reusable bits ─── */
function GoldDivider() {
  return <div className="section-divider mx-auto my-6" />;
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-royal-gold/80 font-semibold mb-4">
      <Sparkles size={14} className="text-royal-gold" />
      {children}
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/dental-hero.png"
          alt="Elite Dental Clinic Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-purple/95 via-midnight-purple/80 to-midnight-purple/50" />
        {/* decorative ring */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full border border-royal-gold/10 animate-rotate-slow" />
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full border border-marigold/5 animate-rotate-slow" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up opacity-0">
            <SectionTag>AI-Powered Dental Care</SectionTag>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight mt-4 animate-fade-in-up opacity-0 delay-100">
            Your Smile,{" "}
            <span className="gold-text">Our Priority</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-champagne/70 leading-relaxed max-w-lg animate-fade-in-up opacity-0 delay-200">
            Meet <strong className="text-royal-gold">Sarah</strong> — our 24/7 AI
            voice receptionist. Book appointments, get instant confirmations on
            WhatsApp, and never wait on hold again.
          </p>

          <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up opacity-0 delay-300">
            <a href="#how-it-works" className="btn-premium flex items-center gap-2 text-base">
              <Phone size={18} /> Call Sarah Now
            </a>
            <a href="#features" className="btn-outline flex items-center gap-2 text-base">
              Learn More <ChevronRight size={16} />
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-14 animate-fade-in-up opacity-0 delay-400">
            {[
              { icon: <Shield size={16} />, label: "HIPAA Compliant" },
              { icon: <Clock size={16} />, label: "Available 24/7" },
              { icon: <Star size={16} />, label: "5-Star Rated" },
            ].map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-2 text-xs tracking-widest uppercase text-champagne/50"
              >
                <span className="text-royal-gold">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="text-[10px] tracking-[0.3em] uppercase text-champagne/30">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-royal-gold/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOW IT WORKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const steps = [
  {
    num: "01",
    icon: <Mic size={28} />,
    title: "Call or Chat",
    desc: "Reach out to Sarah anytime — by phone or web. She understands natural speech perfectly.",
  },
  {
    num: "02",
    icon: <Calendar size={28} />,
    title: "Instant Booking",
    desc: "Sarah checks the doctor's live calendar and books your appointment in seconds.",
  },
  {
    num: "03",
    icon: <MessageCircle size={28} />,
    title: "Confirmation",
    desc: "Receive a WhatsApp confirmation with your details, plus your doctor gets notified automatically.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative">
      {/* subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple via-velvet-violet/20 to-midnight-purple pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <SectionTag>Simple Process</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold gold-text mt-2">
            How It Works
          </h2>
          <GoldDivider />
          <p className="mt-4 text-champagne/60 max-w-lg mx-auto">
            Three effortless steps from your first call to sitting in the chair.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="glass-card rounded-2xl p-8 text-center group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* number badge */}
              <span className="text-[64px] font-bold leading-none text-royal-gold/10 group-hover:text-royal-gold/20 transition-colors select-none">
                {s.num}
              </span>
              <div className="w-14 h-14 mx-auto -mt-6 rounded-xl bg-gradient-to-br from-royal-gold/20 to-marigold/10 flex items-center justify-center text-royal-gold">
                {s.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-champagne">
                {s.title}
              </h3>
              <p className="mt-3 text-champagne/55 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FEATURES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const features = [
  {
    icon: <Bot size={24} />,
    title: "AI Voice Agent",
    desc: "Powered by GPT-4, Sarah sounds human and handles complex conversations with empathy.",
  },
  {
    icon: <Calendar size={24} />,
    title: "Google Calendar Sync",
    desc: "Real-time calendar integration prevents double-bookings and keeps your schedule accurate.",
  },
  {
    icon: <MessageCircle size={24} />,
    title: "WhatsApp Alerts",
    desc: "Patients and doctors get instant WhatsApp confirmations — no missed appointments.",
  },
  {
    icon: <Shield size={24} />,
    title: "Secure & Private",
    desc: "Enterprise-grade encryption ensures patient data stays safe and HIPAA-compliant.",
  },
  {
    icon: <Clock size={24} />,
    title: "24/7 Availability",
    desc: "Sarah never sleeps. Patients can book at midnight or during holidays — always open.",
  },
  {
    icon: <Star size={24} />,
    title: "Smart Follow-ups",
    desc: "Automated reminders 24h and 2h before the appointment, plus post-visit review requests.",
  },
];

function Features() {
  return (
    <section id="features" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velvet-violet/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <SectionTag>Why Choose Us</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold gold-text mt-2">
            Premium Features
          </h2>
          <GoldDivider />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-7 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal-gold/20 to-marigold/10 flex items-center justify-center text-royal-gold mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-champagne">{f.title}</h3>
              <p className="mt-2 text-sm text-champagne/50 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SERVICES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const services = [
  { name: "General Checkup", price: "Free Consultation" },
  { name: "Teeth Whitening", price: "From ₹2,500" },
  { name: "Root Canal", price: "From ₹5,000" },
  { name: "Dental Implants", price: "From ₹15,000" },
  { name: "Braces & Aligners", price: "From ₹25,000" },
  { name: "Cosmetic Dentistry", price: "Custom Quote" },
];

function Services() {
  return (
    <section id="services" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple via-velvet-violet/15 to-midnight-purple pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <SectionTag>Our Services</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold gold-text mt-2">
            What We Offer
          </h2>
          <GoldDivider />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.name}
              className="glass-card rounded-2xl p-6 flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-gold/25 to-marigold/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={18} className="text-royal-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-champagne group-hover:text-royal-gold transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs text-champagne/40 mt-0.5">{s.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TESTIMONIALS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Patient",
    text: "I called at 11 PM and Sarah booked my appointment instantly. Got the WhatsApp confirmation right away. Incredible!",
    stars: 5,
  },
  {
    name: "Dr. Rajesh Patel",
    role: "Partner Dentist",
    text: "Since adding the AI receptionist, my no-show rate dropped by 60%. The automated reminders are a game-changer.",
    stars: 5,
  },
  {
    name: "Anjali Mehta",
    role: "Patient",
    text: "It felt like talking to a real person. Sarah was so polite and even reminded me to bring my insurance card.",
    stars: 5,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-velvet-violet/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <SectionTag>Testimonials</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold gold-text mt-2">
            What People Say
          </h2>
          <GoldDivider />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-7">
              {/* stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-royal-gold text-royal-gold"
                  />
                ))}
              </div>
              <p className="text-champagne/70 text-sm leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-gold to-marigold flex items-center justify-center text-midnight-purple font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-champagne">
                    {t.name}
                  </p>
                  <p className="text-xs text-champagne/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CTA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CTA() {
  return (
    <section id="cta" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple via-velvet-violet/25 to-midnight-purple pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="glass-card rounded-3xl p-12 md:p-16 animate-pulse-glow">
          <SectionTag>Get Started Today</SectionTag>
          <h2 className="text-4xl md:text-5xl font-bold gold-text mt-2">
            Ready to Transform Your Clinic?
          </h2>
          <p className="mt-5 text-champagne/60 max-w-lg mx-auto leading-relaxed">
            Let Sarah handle your calls while you focus on what matters —
            providing world-class dental care to your patients.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a
              href="tel:+12125550198"
              className="btn-premium flex items-center gap-2 text-base"
            >
              <Phone size={18} /> Book Appointment
            </a>
            <a
              href="#contact"
              className="btn-outline flex items-center gap-2 text-base"
            >
              Contact Us <ArrowRight size={16} />
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-royal-gold/10">
            {[
              { val: "2,500+", label: "Appointments Booked" },
              { val: "98%", label: "Patient Satisfaction" },
              { val: "24/7", label: "Always Available" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold gold-text">
                  {s.val}
                </p>
                <p className="text-xs text-champagne/40 mt-1 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-royal-gold/10 bg-midnight-purple/80 py-16"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gold-text">
              Elite Dental
            </h3>
            <p className="mt-3 text-sm text-champagne/50 leading-relaxed">
              Where cutting-edge AI meets compassionate dental care. Your smile
              deserves the best.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-royal-gold/70 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["How It Works", "Features", "Services", "Testimonials"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                      className="text-sm text-champagne/50 hover:text-royal-gold transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-royal-gold/70 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-champagne/50">
                <MapPin size={14} className="text-royal-gold flex-shrink-0" />
                123 Smile Avenue, New York, NY
              </li>
              <li className="flex items-center gap-2 text-sm text-champagne/50">
                <Phone size={14} className="text-royal-gold flex-shrink-0" />
                +1 (212) 555-0198
              </li>
              <li className="flex items-center gap-2 text-sm text-champagne/50">
                <Mail size={14} className="text-royal-gold flex-shrink-0" />
                hello@elitedental.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-royal-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-champagne/30">
            © {new Date().getFullYear()} Elite Dental Clinic. All rights
            reserved.
          </p>
          <p className="text-xs text-champagne/30 flex items-center gap-1">
            Powered by <Bot size={12} className="text-royal-gold" /> AI Voice
            Receptionist
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAVBAR
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-midnight-purple/60 border-b border-royal-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold gold-text">
          Elite Dental
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["How It Works", "Features", "Services", "Testimonials"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-champagne/60 hover:text-royal-gold transition-colors"
              >
                {link}
              </a>
            )
          )}
        </div>

        <a href="tel:+12125550198" className="btn-premium !py-2.5 !px-6 text-sm flex items-center gap-2">
          <Phone size={14} /> Book Now
        </a>
      </div>
    </nav>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
