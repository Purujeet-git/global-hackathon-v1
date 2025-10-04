"use client";

import { useState } from "react";
import { AnimatedTestimonialsDemo } from "@/app/components/AnimatedTestimonialsDemo";
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
    <div className="w-full relative h-screen bg-linear-to-l from-[#FBBA72] via-[#BB4D00] to-[#691E06]">
      <div className="w-1/3 bg-[#CA5310] rounded-4xl absolute m-40 p-10 text-black">
      <h2 className="font-mono text-center text-3xl font-bold">Signup</h2>
      <p className="text-center text-xl">We are happy to see you here and would like to see you either buy from us from any person willing to exchange or sell their clothes to with yours.</p>
      <form className="flex flex-col items-center" onSubmit={handleSignup}>
        <div>
          <p>Name:</p>
        <input
          className=" rounded-xl p-4 bg-[#8F250C]"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        </div><br/>
        <div>
        <p>Email:</p>
        <input

          className=" rounded-xl p-4 bg-[#8F250C]"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        </div><br/>
        <div>
          <p>Password:</p>
        <input
          className=" rounded-xl p-4 bg-[#8F250C]"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        </div><br/>
        <button type="submit">Signup</button>
      </form>
      </div>
      <div className="w-1/2 absolute right-20 top-32">
        <AnimatedTestimonialsDemo/>    
      </div>
    </div>
  );
}
