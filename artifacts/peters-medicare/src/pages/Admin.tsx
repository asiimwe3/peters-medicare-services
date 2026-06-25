import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  LogOut,
  RefreshCw,
  Download,
  ChevronDown,
  Shield,
  Eye,
  EyeOff,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ADMIN_PASSWORD = "pms-admin-2024";
const SESSION_KEY = "pms_admin_session";

type Appointment = {
  id: number;
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: string;
  createdAt: string;
};

type StatusFilter = "all" | "pending" | "confirmed" | "cancelled" | "completed";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <AlertCircle className="w-3.5 h-3.5" />,
  confirmed: <CheckCircle2 className="w-3.5 h-3.5" />,
  cancelled: <XCircle className="w-3.5 h-3.5" />,
  completed: <CheckCircle2 className="w-3.5 h-3.5" />,
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ede6] via-white to-[#e8f0ec] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c0622f] rounded-2xl shadow-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Peters Medicare Services</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          animate={shaking ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c0622f]/30 focus:border-[#c0622f] text-sm"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-1.5">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#c0622f] hover:bg-[#a8501f] text-white font-semibold rounded-xl transition-colors"
          >
            Sign In
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        STATUS_COLORS[status] ?? "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {STATUS_ICONS[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function StatusDropdown({
  appointmentId,
  current,
  onUpdate,
}: {
  appointmentId: number;
  current: string;
  onUpdate: (id: number, status: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const options = ["pending", "confirmed", "completed", "cancelled"];

  const select = async (status: string) => {
    setOpen(false);
    if (status === current) return;
    setLoading(true);
    await onUpdate(appointmentId, status);
    setLoading(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        {loading ? (
          <RefreshCw className="w-3 h-3 animate-spin" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
        Change
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 top-6 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[130px]"
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => select(opt)}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                    opt === current ? "font-semibold text-[#c0622f]" : "text-gray-700"
                  }`}
                >
                  {STATUS_ICONS[opt]}
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch("/api/appointments");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAppointments(data);
      setError("");
    } catch {
      setError("Could not load appointments. Check that the API server is running.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
    } catch {
      alert("Failed to update status. Please try again.");
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const stats = {
    total: appointments.length,
    today: appointments.filter((a) => a.preferredDate === today).length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
  };

  const filtered =
    filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  const exportCSV = () => {
    const headers = ["ID", "Name", "Phone", "Service", "Date", "Time", "Notes", "Status", "Booked At"];
    const rows = filtered.map((a) => [
      a.id,
      a.name,
      a.phone,
      a.service,
      a.preferredDate,
      a.preferredTime,
      `"${a.notes.replace(/"/g, '""')}"`,
      a.status,
      new Date(a.createdAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c0622f] flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-sm leading-none">Admin Dashboard</h1>
              <p className="text-xs text-gray-400 mt-0.5">Peters Medicare Services</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchAppointments(true)}
              disabled={refreshing}
              className="gap-2 text-gray-600"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportCSV}
              className="gap-2 text-gray-600"
              disabled={filtered.length === 0}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="gap-2 text-gray-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Appointments",
              value: stats.total,
              icon: <Users className="w-5 h-5" />,
              color: "text-violet-600 bg-violet-50",
            },
            {
              label: "Today",
              value: stats.today,
              icon: <Calendar className="w-5 h-5" />,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: <Clock className="w-5 h-5" />,
              color: "text-amber-600 bg-amber-50",
            },
            {
              label: "Confirmed",
              value: stats.confirmed,
              icon: <CheckCircle2 className="w-5 h-5" />,
              color: "text-emerald-600 bg-emerald-50",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className={`inline-flex p-2 rounded-xl ${stat.color} mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-semibold text-gray-900 text-sm">
              Appointments
              <span className="ml-2 text-gray-400 font-normal">({filtered.length})</span>
            </h2>
            <div className="flex gap-1.5 flex-wrap">
              {(["all", "pending", "confirmed", "completed", "cancelled"] as StatusFilter[]).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filter === f
                        ? "bg-[#c0622f] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              Loading appointments…
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
              <p className="text-sm text-gray-600">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => fetchAppointments()}
              >
                Retry
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <Calendar className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">
                {filter === "all" ? "No appointments yet." : `No ${filter} appointments.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wide">
                    <th className="text-left px-4 py-3 font-medium">Patient</th>
                    <th className="text-left px-4 py-3 font-medium">Service</th>
                    <th className="text-left px-4 py-3 font-medium">Date & Time</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Booked</th>
                    <th className="text-left px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((apt) => (
                      <motion.tr
                        key={apt.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{apt.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{apt.phone}</div>
                          {apt.notes && (
                            <div
                              className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate"
                              title={apt.notes}
                            >
                              {apt.notes}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700 max-w-[160px]">
                          {apt.service}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-900 font-medium">
                            {new Date(apt.preferredDate + "T00:00:00").toLocaleDateString("en-UG", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-400 capitalize mt-0.5">
                            {apt.preferredTime}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={apt.status} />
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400">
                          {new Date(apt.createdAt).toLocaleDateString("en-UG", {
                            day: "numeric",
                            month: "short",
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <StatusDropdown
                            appointmentId={apt.id}
                            current={apt.status}
                            onUpdate={updateStatus}
                          />
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-center text-gray-300 pb-4">
          Peters Medicare Services — Admin Portal · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={handleLogout} />;
}
