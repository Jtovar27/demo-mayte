"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/admin-store";
import MarkdownTextarea from "@/components/MarkdownTextarea";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<BlogPost | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        if (!res.ok) {
          setError("Post not found.");
          return;
        }
        const data = await res.json() as BlogPost;
        setForm(data);
        setSlugEdited(true); // prevent auto-overwriting existing slug when title changes
      } catch {
        setError("Failed to load post.");
      } finally {
        setLoadingData(false);
      }
    }
    void load();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    if (!form) return;
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name.includes(".")) {
      const [parent, child] = name.split(".") as [string, string];
      setForm((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [parent]: { ...(prev[parent as keyof BlogPost] as Record<string, string>), [child]: value },
        };
      });
    } else {
      setForm((prev) => {
        if (!prev) return prev;
        return { ...prev, [name]: type === "checkbox" ? checked : value };
      });
    }

    if (name === "slug") {
      setSlugEdited(true);
    }

    if (name === "title.es" && !slugEdited) {
      setForm((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          title: { ...prev.title, es: value },
          slug: slugify(value),
        };
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setError(data.error ?? "Failed to save post.");
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Connection error.");
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) {
    return (
      <div className="p-8">
        <div className="text-sm" style={{ color: "#6E6E6E" }}>Loading...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="p-8">
        <p className="text-sm mb-4" style={{ color: "#C0392B" }}>{error || "Post not found."}</p>
        <Link href="/admin/blog" className="text-sm" style={{ color: "#B9954F" }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="text-sm" style={{ color: "#B9954F" }}>
          ← Blog
        </Link>
        <span style={{ color: "#D0D0D0" }}>/</span>
        <h1
          className="text-2xl font-bold truncate"
          style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
        >
          Edit Post
        </h1>
        {form.slug && (
          <a
            href={`/blog/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg border shrink-0"
            style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}
          >
            ↗ View
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Metadata */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Metadata</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                style={{ borderColor: "#D0D0D0" }}
              >
                <option value="taxes">Taxes</option>
                <option value="insurance">Insurance</option>
                <option value="notary">Notary</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                style={{ borderColor: "#D0D0D0" }}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none font-mono"
              style={{ borderColor: "#D0D0D0" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
              Image URL (optional)
            </label>
            <input
              type="url"
              name="image"
              value={form.image ?? ""}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
              style={{ borderColor: "#D0D0D0" }}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="published" className="text-sm font-medium" style={{ color: "#0D2B4E" }}>
              Published
            </label>
          </div>
        </div>

        {/* Title */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Title</h2>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>Spanish</label>
            <input type="text" name="title.es" value={form.title.es} onChange={handleChange} required
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none" style={{ borderColor: "#D0D0D0" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>English</label>
            <input type="text" name="title.en" value={form.title.en} onChange={handleChange} required
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none" style={{ borderColor: "#D0D0D0" }} />
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Excerpt</h2>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>Spanish</label>
            <textarea name="excerpt.es" value={form.excerpt.es} onChange={handleChange} required rows={3}
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none resize-none" style={{ borderColor: "#D0D0D0" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>English</label>
            <textarea name="excerpt.en" value={form.excerpt.en} onChange={handleChange} required rows={3}
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none resize-none" style={{ borderColor: "#D0D0D0" }} />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Content</h2>
            <span className="text-xs" style={{ color: "#AFAFAF" }}>**bold** · *italic* · # Heading · - list item</span>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>Spanish</label>
            <MarkdownTextarea name="content.es" value={form.content.es} onChange={handleChange} required rows={12} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>English</label>
            <MarkdownTextarea name="content.en" value={form.content.en} onChange={handleChange} required rows={12} />
          </div>
        </div>

        {error && <p className="text-sm text-center" style={{ color: "#C0392B" }}>{error}</p>}
        {success && <p className="text-sm text-center" style={{ color: "#2E7D32" }}>Post saved successfully.</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60"
            style={{ backgroundColor: "#0D2B4E" }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-6 py-3 rounded-xl text-sm font-semibold border"
            style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
