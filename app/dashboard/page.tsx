'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0f0d] flex items-center justify-center">
      <div className="text-[#2dff8f] font-mono animate-pulse">LOADING_ENCRYPTED_DATA...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8f0eb] font-sans selection:bg-[#2dff8f] selection:text-[#0a0f0d]">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f3028_1px,transparent_1px),linear-gradient(to_bottom,#1f3028_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2dff8f10] border border-[#2dff8f30] text-[#2dff8f] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2dff8f] animate-pulse"></span>
              System Live
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Clinic <span className="italic text-[#2dff8f]">Intelligence</span></h1>
            <p className="text-[#6b8c78]">Real-time AI receptionist performance & scheduling analytics.</p>
          </div>
          
          <button className="px-6 py-3 bg-[#111a16] border border-[#1f3028] hover:border-[#2dff8f50] rounded-xl transition-all group flex items-center gap-2">
            <span className="text-sm font-semibold group-hover:text-[#2dff8f]">Export CSV</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6b8c78] group-hover:text-[#2dff8f] transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Bookings', value: stats.totalBookings, color: '#2dff8f', icon: '📅' },
            { label: 'Missed Opportunities', value: stats.missedCalls, color: '#ff6b4a', icon: '📞' },
            { label: 'Today\'s Schedule', value: stats.todayBookings.length, color: '#00c9ff', icon: '⏰' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#111a16] border border-[#1f3028] p-8 rounded-2xl relative overflow-hidden group hover:border-opacity-50 transition-all duration-500">
              <div className="absolute top-0 right-0 p-4 text-3xl opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">{stat.icon}</div>
              <div className="text-sm font-bold text-[#6b8c78] uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-5xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="mt-4 h-1 w-full bg-[#1f3028] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: '65%', backgroundColor: stat.color }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Appointments */}
        <div className="bg-[#111a16] border border-[#1f3028] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 border-bottom border-[#1f3028] flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Today's Appointments</h2>
            <span className="text-xs text-[#6b8c78] font-mono">{new Date().toDateString()}</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#162018] text-[#6b8c78] text-xs font-bold uppercase tracking-widest">
                  <th className="px-8 py-4">Patient</th>
                  <th className="px-8 py-4">Service</th>
                  <th className="px-8 py-4">Time</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f3028]">
                {stats.todayBookings.length > 0 ? stats.todayBookings.map((appt: any, i: number) => (
                  <tr key={i} className="hover:bg-[#1f302830] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-white group-hover:text-[#2dff8f] transition-colors">{appt.name}</div>
                      <div className="text-xs text-[#6b8c78]">{appt.phone}</div>
                    </td>
                    <td className="px-8 py-6 text-sm text-[#e8f0eb]">{appt.service}</td>
                    <td className="px-8 py-6 text-sm font-mono text-[#00c9ff]">{new Date(appt.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2dff8f10] text-[#2dff8f] text-[10px] font-bold uppercase tracking-wider">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-[#6b8c78] italic">No appointments scheduled for today yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#1f3028] text-center text-[#6b8c78] text-xs tracking-widest uppercase">
          Build with Antigravity · Secured via Google Cloud · Dental AI Kit v1.0
        </footer>
      </div>
    </div>
  );
}
