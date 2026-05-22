"use client";

import React from "react";

import { useState } from "react";
import { Search, Trash2, Mail, Phone, ChevronDown } from "lucide-react";
import { DbService } from "@/services/db.service";

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  course: string;
  message: string;
  date: string;
  status: "new" | "contacted" | "enrolled" | "declined";
}

interface AdminEnrollmentsProps {
  enrollments: Enrollment[];
  setEnrollments: (e: Enrollment[]) => void;
}

const STATUS_COLORS: Record<Enrollment["status"], string> = {
  new: "bg-amber-400/15 text-amber-400 border border-amber-400/30",
  contacted: "bg-blue-400/15 text-blue-400 border border-blue-400/30",
  enrolled: "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30",
  declined: "bg-red-400/15 text-red-400 border border-red-400/30",
};

const ALL_STATUSES: Enrollment["status"][] = ["new", "contacted", "enrolled", "declined"];

export default function AdminEnrollments({ enrollments, setEnrollments }: AdminEnrollmentsProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = enrollments.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id: string, status: Enrollment["status"]) => {
    try {
      await DbService.update("enrollments", id, { status });
      setEnrollments(enrollments.map((e) => (e.id === id ? { ...e, status } : e)));
    } catch (err) {
      console.error("Failed to update enrollment status:", err);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await DbService.delete("enrollments", id);
      setEnrollments(enrollments.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete enrollment:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Enrollments</h1>
        <p className="text-foreground/40 text-sm mt-1">{enrollments.length} total submissions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
          <input
            type="text"
            placeholder="Search by name, email, or course..."
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
            <option key={s} value={s} className="capitalize">{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Course", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-foreground/30">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-foreground/30">No enrollments found.</td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <React.Fragment key={e.id}>
                    <tr
                      key={e.id}
                      className="hover:bg-secondary transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                    >
                      <td className="px-5 py-4">
                        <p className="text-foreground font-semibold">{e.name}</p>
                        <p className="text-foreground/40 text-xs">{e.email}</p>
                      </td>
                      <td className="px-5 py-4 text-foreground/60">{e.course}</td>
                      <td className="px-5 py-4 text-foreground/40 text-xs whitespace-nowrap">
                        {new Date(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[e.status]}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <ChevronDown
                          size={16}
                          className={`text-foreground/30 transition-transform ${expanded === e.id ? "rotate-180" : ""}`}
                        />
                      </td>
                    </tr>

                    {expanded === e.id && (
                      <tr className="bg-muted">
                        <td colSpan={5} className="px-5 py-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                            <div>
                              <p className="text-foreground/30 text-xs uppercase tracking-wider mb-1">Phone</p>
                              <p className="text-foreground text-sm flex items-center gap-1.5">
                                <Phone size={13} className="text-foreground/30" /> {e.phone || "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-foreground/30 text-xs uppercase tracking-wider mb-1">Experience</p>
                              <p className="text-foreground text-sm">{e.experience}</p>
                            </div>
                            <div>
                              <p className="text-foreground/30 text-xs uppercase tracking-wider mb-1">Email</p>
                              <p className="text-foreground text-sm flex items-center gap-1.5">
                                <Mail size={13} className="text-foreground/30" /> {e.email}
                              </p>
                            </div>
                            {e.message && (
                              <div className="sm:col-span-2 lg:col-span-3">
                                <p className="text-foreground/30 text-xs uppercase tracking-wider mb-1">Message</p>
                                <p className="text-foreground/70 text-sm leading-relaxed">{e.message}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-foreground/30 text-xs mr-2">Change status:</span>
                            {ALL_STATUSES.map((s) => (
                              <button
                                key={s}
                                onClick={(ev) => { ev.stopPropagation(); updateStatus(e.id, s); }}
                                className={`px-3 py-1 text-xs font-semibold capitalize transition-all border ${
                                  e.status === s
                                    ? STATUS_COLORS[s]
                                    : "bg-secondary text-foreground/40 border-border hover:border-border"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                            <button
                              onClick={(ev) => { ev.stopPropagation(); deleteEntry(e.id); }}
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
