"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const lessons = [
  { id: 1, title: "Clase 1 - Welcome", file: "clase-1-welcome.pptx" },
  { id: 2, title: "Clase 2 - The Alphabet", file: "clase-2-alphabet.pptx" },
  { id: 3, title: "Clase 3 - Singular and Plural", file: "clase-3-singular-plural.pptx" },
  { id: 4, title: "Clase 4 - Around the House", file: "clase-4-around-house.pptx" },
  { id: 5, title: "Clase 5 - Verb to be", file: "clase-5-verb-to-be.pptx" },
];

export default function LessonsPage() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.replace("/");
    };
    check();
  }, [router]);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 44, marginBottom: 18 }}>Lessons</h1>

      {lessons.map((l) => {
        const pptUrl = `/ppts/${l.file}`;

        return (
          <div
            key={l.id}
            style={{
              border: "1px solid #333",
              borderRadius: 16,
              padding: 18,
              marginBottom: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 28 }}>{l.title}</div>
              <div style={{ opacity: 0.7 }}>{pptUrl}</div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <a
                href={pptUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: "#1fb6ff",
                  color: "#000",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                Open PPT
              </a>

              <button
                onClick={() => router.push(`/lessons/${l.id}/quiz`)}
                style={{
                  padding: "14px 20px",
                  borderRadius: 14,
                  background: "#22c55e",
                  color: "#000",
                  fontWeight: 800,
                  border: 0,
                  cursor: "pointer",
                }}
              >
                Take Quiz
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}