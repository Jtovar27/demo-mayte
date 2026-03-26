"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

export default function MarkdownTextarea({ name, value, onChange, rows = 12, placeholder, required }: Props) {
  const [tab, setTab] = useState<"write" | "preview">("write");

  const tabBase = "px-4 py-1.5 text-xs font-semibold rounded-md transition-colors";
  const active = { backgroundColor: "#1C1C1C", color: "#FFFFFF" };
  const inactive = { backgroundColor: "transparent", color: "#6E6E6E" };

  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: "#D0D0D0" }}>
      {/* Tab bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ backgroundColor: "#FAFAFA", borderColor: "#E4E4E4" }}>
        <div className="flex gap-1">
          <button type="button" onClick={() => setTab("write")} className={tabBase} style={tab === "write" ? active : inactive}>
            Write
          </button>
          <button type="button" onClick={() => setTab("preview")} className={tabBase} style={tab === "preview" ? active : inactive}>
            Preview
          </button>
        </div>
        <span className="text-xs" style={{ color: "#AFAFAF" }}>Markdown supported</span>
      </div>

      {tab === "write" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none resize-y font-mono"
        />
      ) : (
        <div
          className="px-4 py-3 text-sm bg-white prose prose-sm max-w-none min-h-[120px]"
          style={{ color: "#3A3A3A", lineHeight: "1.75" }}
        >
          {value.trim() ? (
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "#1C1C1C" }}>{children}</h1>,
                h2: ({ children }) => <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem", color: "#1C1C1C" }}>{children}</h2>,
                h3: ({ children }) => <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.3rem", color: "#1C1C1C" }}>{children}</h3>,
                p: ({ children }) => <p style={{ marginBottom: "0.75rem" }}>{children}</p>,
                ul: ({ children }) => <ul style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem", listStyleType: "disc" }}>{children}</ul>,
                ol: ({ children }) => <ol style={{ paddingLeft: "1.25rem", marginBottom: "0.75rem", listStyleType: "decimal" }}>{children}</ol>,
                li: ({ children }) => <li style={{ marginBottom: "0.2rem" }}>{children}</li>,
                strong: ({ children }) => <strong style={{ fontWeight: 700, color: "#1C1C1C" }}>{children}</strong>,
                em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
                blockquote: ({ children }) => <blockquote style={{ borderLeft: "3px solid #B9954F", paddingLeft: "0.75rem", color: "#6E6E6E", marginBottom: "0.75rem" }}>{children}</blockquote>,
              }}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <span style={{ color: "#AFAFAF" }}>Nothing to preview yet.</span>
          )}
        </div>
      )}
    </div>
  );
}
