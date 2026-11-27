"use client";

import { Endpoints } from "@/constants/endpoints";
import useScreenLoader from "./screen-loader";
import { useRouter } from "next/navigation";

export function AppHeader({ showLogOut = false }: { showLogOut?: boolean }) {
  const { setScreenLoader } = useScreenLoader();
  const router = useRouter();

  async function handleLogOut() {
    try {
      setScreenLoader(true);
      const res = await fetch(Endpoints.logOut, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Failed to log out");
        return;
      }

      // push to login
      router.push("/login");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setScreenLoader(false);
    }
  }

  return (
    <header className="p-5 flex flex-row justify-between border-border border-b-2">
      {/* left icon  */}
      <div className="flex flex-row gap-3 items-center">
        <p className="text-text font-bold text-lg">STILL.</p>
        <div className="border-r-2 border-border h-full"></div>
        <p>A little space for you.</p>
      </div>
      {/* right button  */}
      {showLogOut ? (
        <button
          className="p-2 rounded-lg border border-border hover:bg-border/50"
          onClick={handleLogOut}
        >
          Log out
        </button>
      ) : null}
    </header>
  );
}
