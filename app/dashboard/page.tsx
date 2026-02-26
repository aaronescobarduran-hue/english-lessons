"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/");
        return;
      }

      // pasar a lessons automáticamente
      setTimeout(() => {
        router.replace("/lessons");
      }, 1000);
    };

    run();
  }, [router]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome to your Dashboard 🎉</h1>
      <p>Login successful! Redirecting to lessons...</p>
    </div>
  );
}