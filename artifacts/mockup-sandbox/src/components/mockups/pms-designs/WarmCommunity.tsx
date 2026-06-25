export function WarmCommunity() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#fdf8f0" }}>
      {/* Nav */}
      <nav style={{ background: "#fdf8f0", borderBottom: "1px solid #e8d9c0", padding: "16px 64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#c2623f", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 800, fontSize: 20, fontFamily: "sans-serif" }}>P</span>
          </div>
          <div>
            <div style={{ color: "#1a0f00", fontWeight: 700, fontSize: 17, fontFamily: "sans-serif" }}>Peters Medicare</div>
            <div style={{ color: "#9c6e4a", fontSize: 11, fontFamily: "sans-serif", letterSpacing: "0.05em" }}>KYENJOJO, UGANDA</div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          {["Services","Outreach","Pricing","Contact"].map(n => (
            <span key={n} style={{ color: "#6b4c30", fontSize: 15, cursor: "pointer", fontFamily: "sans-serif" }}>{n}</span>
          ))}
          <button style={{ background: "#c2623f", color: "white", fontWeight: 600, fontSize: 14, borderRadius: 40, padding: "10px 24px", border: "none", cursor: "pointer", fontFamily: "sans-serif" }}>
            Book a Visit
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #fdf8f0 0%, #f5e8d0 100%)", padding: "72px 64px 56px", display: "flex", alignItems: "center", gap: 64, minHeight: 500 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-block", background: "#fde8d0", borderRadius: 100, padding: "6px 18px", marginBottom: 24, fontFamily: "sans-serif" }}>
            <span style={{ color: "#c2623f", fontSize: 13, fontWeight: 600 }}>Serving Kyenjojo Since 2013</span>
          </div>
          <h1 style={{ color: "#1a0f00", fontSize: 52, fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            Healthcare that<br />
            <em style={{ color: "#c2623f", fontStyle: "italic" }}>feels like family.</em>
          </h1>
          <p style={{ color: "#6b4c30", fontSize: 17, lineHeight: 1.8, marginBottom: 36, fontFamily: "sans-serif", maxWidth: 440 }}>
            At Peters Medicare, every patient is welcomed with warmth and dignity. We provide quality, affordable care for families across Kyenjojo district.
          </p>
          <div className="flex gap-4" style={{ flexWrap: "wrap" }}>
            <button style={{ background: "#c2623f", color: "white", fontWeight: 600, fontSize: 16, borderRadius: 40, padding: "14px 36px", border: "none", cursor: "pointer", fontFamily: "sans-serif" }}>
              Book an Appointment
            </button>
            <button style={{ background: "transparent", color: "#c2623f", fontWeight: 600, fontSize: 16, borderRadius: 40, padding: "14px 32px", border: "2px solid #c2623f", cursor: "pointer", fontFamily: "sans-serif" }}>
              Learn About Us
            </button>
          </div>
        </div>
        {/* Illustration-style right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, maxWidth: 380 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 4px 24px rgba(194,98,63,0.08)", border: "1px solid #f0dcc8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>🩺</span>
              <div>
                <div style={{ fontWeight: 700, color: "#1a0f00", fontSize: 16, fontFamily: "sans-serif" }}>General Consultation</div>
                <div style={{ color: "#9c6e4a", fontSize: 13, fontFamily: "sans-serif" }}>Available Mon – Sat</div>
              </div>
            </div>
            <div style={{ color: "#6b4c30", fontSize: 14, lineHeight: 1.6, fontFamily: "sans-serif" }}>Expert diagnosis and treatment for adults and children. Walk-ins welcome every morning.</div>
          </div>
          <div style={{ background: "#fde8d0", borderRadius: 20, padding: 24, border: "1px solid #f0c8a0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>👶</span>
              <div>
                <div style={{ fontWeight: 700, color: "#1a0f00", fontSize: 16, fontFamily: "sans-serif" }}>Maternal & Child Health</div>
                <div style={{ color: "#9c6e4a", fontSize: 13, fontFamily: "sans-serif" }}>Prenatal · Postnatal · Vaccines</div>
              </div>
            </div>
            <div style={{ color: "#6b4c30", fontSize: 14, lineHeight: 1.6, fontFamily: "sans-serif" }}>Caring for mothers and children through every stage with compassion and expertise.</div>
          </div>
          <div style={{ background: "#e8f5ee", borderRadius: 20, padding: 20, border: "1px solid #b6d8c4", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 28 }}>✓</span>
            <div style={{ fontFamily: "sans-serif" }}>
              <div style={{ fontWeight: 700, color: "#155e3a", fontSize: 15 }}>Emergency Line Available</div>
              <div style={{ color: "#2d7a52", fontSize: 13 }}>Contact us any day for urgent help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community section */}
      <section style={{ background: "#c2623f", padding: "48px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#fde8d0", fontSize: 13, fontWeight: 600, fontFamily: "sans-serif", letterSpacing: "0.05em", marginBottom: 8 }}>COMMUNITY OUTREACH</div>
            <div style={{ color: "white", fontSize: 26, fontWeight: 700, marginBottom: 4 }}>We come to you — every quarter.</div>
            <div style={{ color: "#fde8d0", fontSize: 15, fontFamily: "sans-serif" }}>Free clinics and health camps across the district</div>
          </div>
          <button style={{ background: "white", color: "#c2623f", fontWeight: 700, fontSize: 15, borderRadius: 40, padding: "14px 32px", border: "none", cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>
            View Upcoming Events
          </button>
        </div>
      </section>
    </div>
  );
}
