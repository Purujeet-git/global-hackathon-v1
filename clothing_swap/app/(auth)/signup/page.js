"use client";

import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSignup(e) {
    e.preventDefault();
    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } else {
      alert(data.error || "Signup failed");
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        /><br/>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        /><br/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
