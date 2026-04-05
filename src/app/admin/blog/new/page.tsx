"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/admin-store";
import MarkdownTextarea from "@/components/MarkdownTextarea";

type FormState = Omit<BlogPost, "id">;

const EMPTY: FormState = {
  slug: "",
  title: { es: "", en: "" },
  excerpt: { es: "", en: "" },
  content: { es: "", en: "" },
  category: "taxes",
  date: new Date().toISOString().split("T")[0] ?? "",
  published: false,
  image: "",
};

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

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name === "slug") {
      setSlugEdited(true);
      setForm((prev) => ({ ...prev, slug: value }));
      return;
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".") as [string, string];
      setForm((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof FormState] as Record<string, string>), [child]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Auto-generate slug from ES title only if user hasn't manually edited it
    if (name === "title.es" && !slugEdited) {
      setForm((prev) => ({
        ...prev,
        title: { ...prev.title, es: value },
        slug: slugify(value),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setError(data.error ?? "Failed to create post.");
        return;
      }

      router.push("/admin/blog");
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="text-sm" style={{ color: "#B9954F" }}>
          ← Blog
        </Link>
        <span style={{ color: "#D0D0D0" }}>/</span>
        <h1
          className="text-2xl font-bold"
          style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
        >
          New Post
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Metadata row */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>
            Metadata
          </h2>
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
              placeholder="auto-generated-from-title"
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
              Publish immediately
            </label>
          </div>
        </div>

        {/* Title */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Title</h2>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
              Spanish
            </label>
            <input
              type="text"
              name="title.es"
              value={form.title.es}
              onChange={handleChange}
              required
              placeholder="Título en español"
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
              style={{ borderColor: "#D0D0D0" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
              English
            </label>
            <input
              type="text"
              name="title.en"
              value={form.title.en}
              onChange={handleChange}
              required
              placeholder="Title in English"
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
              style={{ borderColor: "#D0D0D0" }}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Excerpt</h2>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
              Spanish
            </label>
            <textarea
              name="excerpt.es"
              value={form.excerpt.es}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Resumen en español..."
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none resize-none"
              style={{ borderColor: "#D0D0D0" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>
              English
            </label>
            <textarea
              name="excerpt.en"
              value={form.excerpt.en}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Summary in English..."
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none resize-none"
              style={{ borderColor: "#D0D0D0" }}
            />
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
            <MarkdownTextarea
              name="content.es"
              value={form.content.es}
              onChange={handleChange}
              required
              rows={10}
              placeholder="Contenido completo en español..."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#0D2B4E" }}>English</label>
            <MarkdownTextarea
              name="content.en"
              value={form.content.en}
              onChange={handleChange}
              required
              rows={10}
              placeholder="Full content in English..."
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-center" style={{ color: "#C0392B" }}>
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60"
            style={{ backgroundColor: "#0D2B4E" }}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
          <Link
            href="/admin/blog"
            className="px-6 py-3 rounded-xl text-sm font-semibold border"
            style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
