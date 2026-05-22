"use client";

import React from "react";

import { useState } from "react";
import { Search, Trash2, ChevronDown } from "lucide-react";
import { DbService } from "@/services/db.service";

export interface HireRequest {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  details: string;
  date: string;
  status: "new" | "in-progress" | "completed" | "declined";
}

interface AdminHireRequestsProps {
  hireRequests: HireRequest[];
  setHireRequests: (h: HireRequest[]) => void;
}

const STATUS_COLORS: Record<HireRequest["status"], string> = {
  new: "bg-amber-400/15 text-amber-400 border border-amber-400/30",
  "in-progress": "bg-blue-400/15 text-blue-400 border border-blue-400/30",
  completed: "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30",
  declined: "bg-red-400/15 text-red-400 border border-red-400/30",
};

const ALL_STATUSES: HireRequest["status"][] = ["new", "in-progress", "completed", "declined"];

export default function AdminHireRequests({ hireRequests, setHireRequests }: AdminHireRequestsProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = hireRequests.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.email.toLowerCase().includes(search.toLowerCase()) ||
      h.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || h.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: HireRequest["status"]) => {
    try {
      await DbService.update("hire_requests", id, { status });
      setHireRequests(hireRequests.map((h) => (h.id === id ? { ...h, status } : h)));
    } catch (err) {
      console.error("Failed to update hire request status:", err);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await DbService.delete("hire_requests", id);
      setHireRequests(hireRequests.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Failed to delete hire request:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Hire Requests</h1>
        <p className="text-foreground/40 text-sm mt-1">{hireRequests.length} total requests</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border text-foreground text-sm placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
        >
          <option value="all">All Statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace("-", " ")}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Client", "Service", "Budget", "Date", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-foreground/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-foreground/30">No requests found.</td>
                </tr>
              ) : (
                filtered.map((h) => (
                  <React.Fragment key={h.id}>
                    <tr
                      key={h.id}
                      className="hover:bg-secondary transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === h.id ? null : h.id)}
                    >
                      <td className="px-5 py-4">
                        <p className="text-foreground font-semibold">{h.name}</p>
                        <p className="text-foreground/40 text-xs">{h.email}</p>
                      </td>
                      <td className="px-5 py-4 text-foreground/60">{h.service}</td>
                      <td className="px-5 py-4 text-foreground/60 text-xs">{h.budget}</td>
                      <td className="px-5 py-4 text-foreground/40 text-xs whitespace-nowrap">
                        {new Date(h.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[h.status]}`}>
                          {h.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <ChevronDown
                          size={16}
                          className={`text-foreground/30 transition-transform ${expanded === h.id ? "rotate-180" : ""}`}
                        />
                      </td>
                    </tr>

                    {expanded === h.id && (
                      <tr className="bg-muted">
                        <td colSpan={6} className="px-5 py-5">
                          {h.details && (
                            <div className="mb-5">
                              <p className="text-foreground/30 text-xs uppercase tracking-wider mb-1">Project Details</p>
                              <p className="text-foreground/70 text-sm leading-relaxed max-w-2xl">{h.details}</p>
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-foreground/30 text-xs mr-2">Change status:</span>
                            {ALL_STATUSES.map((s) => (
                              <button
                                key={s}
                                onClick={(ev) => { ev.stopPropagation(); updateStatus(h.id, s); }}
                                className={`px-3 py-1 text-xs font-semibold capitalize transition-all border ${
                                  h.status === s
                                    ? STATUS_COLORS[s]
                                    : "bg-secondary text-foreground/40 border-border hover:border-border"
                                }`}
                              >
                                {s.replace("-", " ")}
                              </button>
                            ))}
                            <button
                              onClick={(ev) => { ev.stopPropagation(); deleteEntry(h.id); }}
                              className="ml-auto flex items-center gap-1.5 px-3 py-1 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all border border-red-400/20"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
