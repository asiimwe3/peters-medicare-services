export function BoldModern() {
  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: "#0a1628" }} className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ background: "#00d97e", width: 36, height: 36, borderRadius: 8 }} className="flex items-center justify-center">
            <span style={{ color: "#0a1628", fontWeight: 800, fontSize: 18 }}>P</span>
          </div>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Peters Medicare</span>
        </div>
        <div className="flex items-center gap-8">
          {["Services","Outreach","Pricing","Contact"].map(n => (
            <span key={n} style={{ color: "#94a3b8", fontSize: 14, cursor: "pointer" }}>{n}</span>
          ))}
          <button style={{ background: "#00d97e", color: "#0a1628", fontWeight: 700, fontSize: 14, borderRadius: 8, padding: "8px 20px", border: "none", cursor: "pointer" }}>
            Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2545 60%, #0a1628 100%)", minHeight: 580, position: "relative", overflow: "hidden", padding: "80px 80px 60px" }}>
        {/* Geometric accent */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(0,217,126,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 20, right: 60, width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(0,217,126,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 180, height: 180, borderRadius: "50%", background: "rgba(0,217,126,0.04)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 660, position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,217,126,0.12)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d97e", display: "inline-block" }} />
            <span style={{ color: "#00d97e", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>Kyenjojo, Uganda</span>
          </div>
          <h1 style={{ color: "white", fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Quality Care.<br />
            <span style={{ color: "#00d97e" }}>Close to Home.</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 500 }}>
            Peters Medicare Services brings professional, affordable healthcare to every family in Kyenjojo district. From general consultations to community outreach.
          </p>
          <div className="flex gap-4">
            <button style={{ background: "#00d97e", color: "#0a1628", fontWeight: 700, fontSize: 16, borderRadius: 10, padding: "14px 32px", border: "none", cursor: "pointer" }}>
              Book Appointment
            </button>
            <button style={{ background: "transparent", color: "white", fontWeight: 600, fontSize: 16, borderRadius: 10, padding: "14px 32px", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer" }}>
              View Services
            </button>
          </div>
          <div className="flex gap-8 mt-12">
            {[["5,000+","Patients Served"],["6","Days a Week"],["10+","Years of Care"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ color: "white", fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bar */}
      <section style={{ background: "#0f172a", padding: "48px 80px" }}>
        <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32 }}>Our Services</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            { icon: "🩺", title: "General Medicine", desc: "Consultations, diagnosis, and treatment for all ages" },
            { icon: "👶", title: "Maternal & Child", desc: "Prenatal care, delivery support, and vaccination" },
            { icon: "🔬", title: "Laboratory", desc: "Blood tests, malaria RDT, and diagnostic panels" },
            { icon: "💊", title: "Pharmacy", desc: "On-site dispensing of essential medicines" },
          ].map(s => (
            <div key={s.title} style={{ background: "#1e293b", borderRadius: 12, padding: 24, border: "1px solid #334155" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
              <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "#00d97e", padding: "40px 80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#0a1628", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Open Monday – Saturday, 8:00 AM – 6:00 PM</div>
          <div style={{ color: "#065f3e", fontSize: 15 }}>Emergency contacts available on Sundays. Walk-ins welcome.</div>
        </div>
        <button style={{ background: "#0a1628", color: "white", fontWeight: 700, fontSize: 15, borderRadius: 10, padding: "14px 32px", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
          Get Directions
        </button>
      </section>
    </div>
  );
}
