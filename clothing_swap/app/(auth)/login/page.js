"use client";

import { AnimatedTestimonialsDemo } from "@/app/components/AnimatedTestimonialsDemo";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      alert(res.error);
    } else {
      window.location.href = "/dashboard"; // redirect after login
    }
  }

  return (
    <div className="w-full relative h-screen bg-linear-to-l from-[#FBBA72] via-[#BB4D00] to-[#691E06]">
      
      <div className="w-1/3 bg-[#CA5310] rounded-4xl absolute m-40 p-10 text-black">
      <h2 className="font-mono text-center text-3xl font-bold">Login to Buy Your Clothes</h2>
      <p className="text-center text-xl">We are happy to see you here and would like to see you either buy from us from any person willing to exchange or sell their clothes to with yours.</p>
      <form className="flex flex-col items-center" onSubmit={handleLogin}>
        <div className="">
        <p>Email:</p>
        <input
        className=" rounded-xl p-4 bg-[#8F250C]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div><br/>
        <div>
          <p>Password:</p>
        <input
         className=" rounded-xl p-4 bg-[#8F250C]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div><br/>
        <button className=" rounded-4xl w-2/3 p-4 bg-[#FBBA72]" type="submit">Login</button>
      </form>
      </div>
      <div className="w-1/2 absolute right-20 top-32">
        <AnimatedTestimonialsDemo/>    
      </div>
    </div>

  );
}
