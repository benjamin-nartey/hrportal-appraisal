"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const login: LoginProps = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
        credentials: "include",
      });

      if (!response.ok) {
        const errData = await response.json();
        const errMsg: string = errData.error;
        setErrorMessage(errMsg);
        return;
      }

      const data: TokenProps = await response.json();

      const cookieResponse = await fetch("/api/set-cookie/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data.token }),
      });

      if (!cookieResponse.ok) {
        setErrorMessage("Failed to set cookie");
        return;
      }

      router.push("/dashboard");
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
        autoComplete="true"
      />
      <input
        className="p-2 outline-none w-full border border-solid border-gray-300 focus:border-secondary"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete="true"
        required
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
      <button
        className="bg-secondary font-semibold hover:bg-primary hover:text-white transition-all active:bg-secondary text-black p-2"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
