"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Login error: " + error.message);

    router.push("/dashboard");
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert("Signup error: " + error.message);

    alert("Cuenta creada. Ahora inicia sesión.");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>English Lessons Platform</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10 }}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Create Account</button>
        </div>
      </div>
    </div>
  );
}