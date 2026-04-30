import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Gradients */}
      <div className="hero-gradient" />
      <div className="absolute top-[40%] left-[-10%] w-[40%] h-[50%] bg-teal-900/10 rounded-full blur-[100px] -z-10" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center font-bold text-black text-xl">E</div>
            <span className="text-xl font-bold tracking-tight">EliteDental</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#ai" className="hover:text-white transition-colors">AI Receptionist</a>
            <a href="#contact" className="hover:text-white transition-colors font-semibold text-teal-400 border border-teal-400/30 px-4 py-2 rounded-full hover:bg-teal-400/10">Book Now</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Next-Gen Dental Care
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tighter">
            Smart Care, <br />
            <span className="gradient-text">Brighter Smiles.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
            Experience the future of dentistry with 24/7 AI-powered scheduling and world-class dental expertise.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-teal-500 text-black font-bold rounded-2xl hover:bg-teal-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              Book Appointment
            </button>
            <button className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              Our Services
            </button>
          </div>
        </div>
        <div className="relative animate-float">
          <div className="relative aspect-square w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="/dental_hero_premium_1777528942381.png" 
              alt="Premium Dental Clinic" 
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* AI Floating Card */}
          <div className="absolute -bottom-10 -left-10 glass p-6 max-w-[240px] shadow-2xl border-teal-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"/></svg>
              </div>
              <span className="text-sm font-bold">Sarah, AI Receptionist</span>
            </div>
            <p className="text-xs text-zinc-400">"How can I help you book your appointment today?"</p>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="section-padding max-w-7xl mx-auto" id="services">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-10 hover:border-teal-500/30 transition-all group">
            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-500 transition-colors">
              <svg className="w-8 h-8 text-teal-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">24/7 AI Booking</h3>
            <p className="text-zinc-400 leading-relaxed">Book appointments instantly via voice agent, day or night. No waiting on hold.</p>
          </div>
          
          <div className="glass p-10 hover:border-teal-500/30 transition-all group">
            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-500 transition-colors">
              <svg className="w-8 h-8 text-teal-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">WhatsApp Alerts</h3>
            <p className="text-zinc-400 leading-relaxed">Receive instant confirmations and 24h reminders directly to your WhatsApp.</p>
          </div>

          <div className="glass p-10 hover:border-teal-500/30 transition-all group">
            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-500 transition-colors">
              <svg className="w-8 h-8 text-teal-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Expert Doctors</h3>
            <p className="text-zinc-400 leading-relaxed">Top-tier specialists dedicated to providing a comfortable, modern experience.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-black">E</div>
            <span className="text-lg font-bold">EliteDental</span>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 Elite Dental Clinic. Powered by DentalAI Receptionist.</p>
        </div>
      </footer>
    </div>
  );
}
