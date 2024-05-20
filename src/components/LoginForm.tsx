"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/dist/client/router";

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log(response.json());
        router.push("/dashboard");
      } else {
        const errData = await response.json();
        const errMsg = errData.error;
        setErrorMessage(errMsg);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        className="p-2 outline-none w-full border border-solid border-gray-300 focus:border-secondary"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
      />
      <input
        className="p-2 outline-none w-full border border-solid border-gray-300 focus:border-secondary"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        required
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
      <button
        className="bg-secondary hover:bg-primary hover:text-white transition-all active:bg-secondary text-black p-2"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
