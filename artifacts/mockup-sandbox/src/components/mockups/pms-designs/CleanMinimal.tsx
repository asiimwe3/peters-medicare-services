export function CleanMinimal() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#ffffff" }}>
      {/* Nav */}
      <nav style={{ background: "white", borderBottom: "1px solid #f1f5f9", padding: "18px 80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="flex items-center gap-4">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>P</span>
          </div>
          <span style={{ color: "#0f172a", fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em" }}>Peters Medicare Services</span>
        </div>
        <div className="flex items-center gap-10">
          {["Services","About","Outreach","Pricing","Contact"].map(n => (
            <span key={n} style={{ color: "#64748b", fontSize: 14, cursor: "pointer" }}>{n}</span>
          ))}
          <button style={{ background: "#1e40af", color: "white", fontWeight: 600, fontSize: 14, borderRadius: 6, padding: "9px 22px", border: "none", cursor: "pointer" }}>
            Book
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 80px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 80 }}>
          <div style={{ flex: "0 0 560px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ color: "#64748b", fontSize: 13, letterSpacing: "0.03em" }}>Kyenjojo District, Uganda</span>
            </div>
            <h1 style={{ color: "#0f172a", fontSize: 56, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 24 }}>
              Professional<br />
              healthcare,<br />
              <span style={{ color: "#1e40af" }}>accessible to all.</span>
            </h1>
            <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.75, marginBottom: 40, maxWidth: 420 }}>
              Peters Medicare provides evidence-based medical care to families in Kyenjojo. Consultations, laboratory services, maternal health, and community outreach — all under one roof.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button style={{ background: "#1e40af", color: "white", fontWeight: 700, fontSize: 15, borderRadius: 8, padding: "14px 32px", border: "none", cursor: "pointer" }}>
                Book Appointment
              </button>
              <button style={{ background: "transparent", color: "#0f172a", fontWeight: 600, fontSize: 15, borderRadius: 8, padding: "14px 24px", border: "1.5px solid #e2e8f0", cursor: "pointer" }}>
                Our Services →
              </button>
            </div>
          </div>
          {/* Right side — info grid */}
          <div style={{ flex: 1, paddingTop: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "General Medicine", icon: "○", color: "#eff6ff" },
                { label: "Maternal & Child", icon: "○", color: "#f0fdf4" },
                { label: "Laboratory Tests", icon: "○", color: "#fefce8" },
                { label: "Pharmacy", icon: "○", color: "#fff7ed" },
              ].map(s => (
                <div key={s.label} style={{ background: s.color, borderRadius: 10, padding: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1e40af", marginBottom: 12 }} />
                  <div style={{ color: "#0f172a", fontWeight: 600, fontSize: 14 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, background: "#f8fafc", borderRadius: 10, padding: "20px 24px", border: "1px solid #e2e8f0", display: "flex", gap: 32 }}>
              {[["Mon–Sat","08:00–18:00"],["Sunday","Emergency only"]].map(([d,t]) => (
                <div key={d}>
                  <div style={{ color: "#64748b", fontSize: 12, marginBottom: 2 }}>{d}</div>
                  <div style={{ color: "#0f172a", fontWeight: 700, fontSize: 15 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider section — clean metrics */}
      <section style={{ borderTop: "1px solid #f1f5f9", padding: "40px 80px", display: "flex", gap: 0 }}>
        {[["5,000+","Patients served"],["10+","Years serving Kyenjojo"],["Mon–Sat","Open 6 days a week"],["Free","Community outreach clinics"]].map(([n,l], i, arr) => (
          <div key={l} style={{ flex: 1, padding: "0 40px", borderRight: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <div style={{ color: "#0f172a", fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em" }}>{n}</div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* CTA row */}
      <section style={{ background: "#0f172a", padding: "40px 80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Ready to visit us?</div>
          <div style={{ color: "#64748b", fontSize: 14 }}>Walk in or book ahead — no long queues.</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: "#1e40af", color: "white", fontWeight: 700, fontSize: 14, borderRadius: 8, padding: "12px 28px", border: "none", cursor: "pointer" }}>
            Book Appointment
          </button>
          <button style={{ background: "transparent", color: "#94a3b8", fontWeight: 600, fontSize: 14, borderRadius: 8, padding: "12px 24px", border: "1px solid #334155", cursor: "pointer" }}>
            Get Directions
          </button>
        </div>
      </section>
    </div>
  );
}
