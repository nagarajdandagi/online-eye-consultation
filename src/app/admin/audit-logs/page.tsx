"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  History,
  ShieldCheck,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  User,
  Activity,
  FileCheck,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { AuditLogEntry } from "@/lib/services/auditService";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("ALL");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/audit-logs", {
        headers: {
          "x-user-role": "ADMIN",
          "x-admin-email": "admin@opticurehealth.com"
        }
      });
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
      } else {
        setError(data.message || "Failed to load audit trail");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.adminUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === "ALL" || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "CREATED_DOCTOR":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "UPDATED_DOCTOR":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "DELETED_DOCTOR":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "ACTIVATED_DOCTOR":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "DEACTIVATED_DOCTOR":
        return "bg-slate-100 text-slate-700 border-slate-300";
      case "VERIFIED_DOCTOR":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "UNVERIFIED_DOCTOR":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "UPLOADED_IMAGE":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/doctors"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors subtle-shadow"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  Administrative Audit Logs
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  Immutable Ledger
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Cryptographically tracked administrative mutations, profile changes, and governance events.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLogs}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-teal-700 text-xs font-bold flex items-center gap-1.5 transition-colors subtle-shadow cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Trail</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 subtle-shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail by doctor name, administrator, or modified field..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-teal-600"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-teal-600"
              >
                <option value="ALL">All Actions</option>
                <option value="UPDATED_DOCTOR">UPDATED_DOCTOR</option>
                <option value="CREATED_DOCTOR">CREATED_DOCTOR</option>
                <option value="DELETED_DOCTOR">DELETED_DOCTOR</option>
                <option value="ACTIVATED_DOCTOR">ACTIVATED_DOCTOR</option>
                <option value="DEACTIVATED_DOCTOR">DEACTIVATED_DOCTOR</option>
                <option value="VERIFIED_DOCTOR">VERIFIED_DOCTOR</option>
                <option value="UPLOADED_IMAGE">UPLOADED_IMAGE</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Log Timeline */}
        {loading ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 subtle-shadow space-y-3">
            <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-600">Retrieving audit event ledger...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 subtle-shadow space-y-3">
            <History className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No audit events match your search</h3>
            <p className="text-xs text-slate-500">Every change to doctor records is logged here automatically.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => {
              const formattedDate = new Date(log.timestamp).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              });

              return (
                <div
                  key={log.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 subtle-shadow hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${getActionBadgeColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                      <span className="font-bold text-slate-900">{log.doctorName}</span>
                      <span className="text-[11px] text-slate-400">({log.doctorId})</span>
                    </div>

                    <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {log.details}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1 font-semibold text-slate-600">
                        <User className="w-3 h-3 text-slate-400" />
                        Admin: {log.adminUser}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-left md:text-right space-y-1">
                    <div className="font-mono text-[11px] font-semibold text-slate-600 flex items-center md:justify-end gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {formattedDate}
                    </div>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100 font-mono inline-block">
                      ID: {log.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
