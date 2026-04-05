"use client";
import { useEffect, useState } from "react";
import type { AdminTeamMember } from "@/lib/admin-store";

type MemberForm = Omit<AdminTeamMember, "id">;

const EMPTY_FORM: MemberForm = {
  name: "",
  role: { es: "", en: "" },
  email: "",
  phone: "",
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState<AdminTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<MemberForm>(EMPTY_FORM);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<MemberForm>(EMPTY_FORM);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadMembers() {
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json() as AdminTeamMember[];
      setMembers(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadMembers(); }, []);

  function handleAddChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".") as [string, string];
      setAddForm((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof MemberForm] as Record<string, string>), [child]: value },
      }));
    } else {
      setAddForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".") as [string, string];
      setEditForm((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof MemberForm] as Record<string, string>), [child]: value },
      }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddLoading(true);
    setAddError("");
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      if (!res.ok) {
        setAddError("Failed to add member.");
        return;
      }
      const newMember = await res.json() as AdminTeamMember;
      setMembers((prev) => [...prev, newMember]);
      setAddForm(EMPTY_FORM);
      setShowAdd(false);
    } catch {
      setAddError("Connection error.");
    } finally {
      setAddLoading(false);
    }
  }

  function startEdit(member: AdminTeamMember) {
    setEditingId(member.id);
    setEditForm({ name: member.name, role: { ...member.role }, email: member.email, phone: member.phone });
    setEditError("");
    setEditSuccess(false);
  }

  async function handleEditSubmit(e: React.FormEvent, id: string) {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    setEditSuccess(false);
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        setEditError("Failed to save.");
        return;
      }
      const updated = await res.json() as AdminTeamMember;
      setMembers((prev) => prev.map((m) => (m.id === id ? updated : m)));
      setEditSuccess(true);
      setTimeout(() => {
        setEditingId(null);
        setEditSuccess(false);
      }, 1500);
    } catch {
      setEditError("Connection error.");
    } finally {
      setEditLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this team member? They will no longer appear in the contact form.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Failed to delete.");
        return;
      }
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  }

  const inputCls = "w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none";
  const inputStyle = { borderColor: "#D0D0D0" };
  const labelCls = "block text-xs font-semibold mb-1.5 uppercase tracking-wider";
  const labelStyle = { color: "#0D2B4E" };

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
          >
            Team Members
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6E6E6E" }}>
            These members appear in the contact form advisor dropdown.
          </p>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
            style={{ backgroundColor: "#0D2B4E" }}
          >
            + Add Member
          </button>
        )}
      </div>

      {/* Add form */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="bg-white rounded-xl border p-6 mb-6 space-y-4"
          style={{ borderColor: "#E4E4E4" }}
        >
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>
            New Member
          </h2>
          <div>
            <label className={labelCls} style={labelStyle}>Name</label>
            <input type="text" name="name" value={addForm.name} onChange={handleAddChange} required
              placeholder="Full name" className={inputCls} style={inputStyle} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} style={labelStyle}>Role (Spanish)</label>
              <input type="text" name="role.es" value={addForm.role.es} onChange={handleAddChange} required
                placeholder="Asesor..." className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Role (English)</label>
              <input type="text" name="role.en" value={addForm.role.en} onChange={handleAddChange} required
                placeholder="Advisor..." className={inputCls} style={inputStyle} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} style={labelStyle}>Email</label>
              <input type="email" name="email" value={addForm.email} onChange={handleAddChange}
                placeholder="email@example.com" className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Phone</label>
              <input type="text" name="phone" value={addForm.phone} onChange={handleAddChange}
                placeholder="(407) 000-0000" className={inputCls} style={inputStyle} />
            </div>
          </div>
          {addError && <p className="text-xs" style={{ color: "#C0392B" }}>{addError}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={addLoading}
              className="px-5 py-2.5 rounded-lg text-sm font-bold text-white disabled:opacity-60"
              style={{ backgroundColor: "#0D2B4E" }}>
              {addLoading ? "Adding..." : "Add Member"}
            </button>
            <button type="button" onClick={() => { setShowAdd(false); setAddForm(EMPTY_FORM); setAddError(""); }}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold border"
              style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Members list */}
      {loading ? (
        <div className="text-sm" style={{ color: "#6E6E6E" }}>Loading...</div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center" style={{ borderColor: "#E4E4E4" }}>
          <p className="text-sm" style={{ color: "#6E6E6E" }}>No team members yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {members.map((member) =>
            editingId === member.id ? (
              <form
                key={member.id}
                onSubmit={(e) => handleEditSubmit(e, member.id)}
                className="bg-white rounded-xl border p-6 space-y-4"
                style={{ borderColor: "#B9954F" }}
              >
                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>
                  Editing: {member.name}
                </h2>
                <div>
                  <label className={labelCls} style={labelStyle}>Name</label>
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required
                    className={inputCls} style={inputStyle} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} style={labelStyle}>Role (Spanish)</label>
                    <input type="text" name="role.es" value={editForm.role.es} onChange={handleEditChange} required
                      className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelCls} style={labelStyle}>Role (English)</label>
                    <input type="text" name="role.en" value={editForm.role.en} onChange={handleEditChange} required
                      className={inputCls} style={inputStyle} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls} style={labelStyle}>Email</label>
                    <input type="email" name="email" value={editForm.email} onChange={handleEditChange}
                      className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className={labelCls} style={labelStyle}>Phone</label>
                    <input type="text" name="phone" value={editForm.phone} onChange={handleEditChange}
                      className={inputCls} style={inputStyle} />
                  </div>
                </div>
                {editError && <p className="text-xs" style={{ color: "#C0392B" }}>{editError}</p>}
                {editSuccess && <p className="text-xs" style={{ color: "#2E7D32" }}>Saved!</p>}
                <div className="flex gap-3">
                  <button type="submit" disabled={editLoading}
                    className="px-5 py-2.5 rounded-lg text-sm font-bold text-white disabled:opacity-60"
                    style={{ backgroundColor: "#0D2B4E" }}>
                    {editLoading ? "Saving..." : "Save"}
                  </button>
                  <button type="button" onClick={() => setEditingId(null)}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border"
                    style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div
                key={member.id}
                className="bg-white rounded-xl border p-5 flex items-center justify-between gap-4"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div>
                  <div className="text-sm font-bold" style={{ color: "#0D2B4E" }}>{member.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#6E6E6E" }}>
                    {member.role.es} / {member.role.en}
                  </div>
                  {(member.email || member.phone) && (
                    <div className="text-xs mt-1" style={{ color: "#AFAFAF" }}>
                      {member.email}{member.email && member.phone ? " · " : ""}{member.phone}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(member)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                    style={{ backgroundColor: "#0D2B4E" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    disabled={deletingId === member.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white disabled:opacity-50"
                    style={{ backgroundColor: "#C0392B" }}
                  >
                    {deletingId === member.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
