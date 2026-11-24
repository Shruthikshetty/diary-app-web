"use client";

import { AppButton } from "./components/button";
import { AppHeader } from "./components/header";
import { AppInput } from "./components/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex-1 flex-col flex">
      <AppHeader />
      <main className="flex-1 flex overflow-hidden">
        {/* side tray  */}
        <div className="w-[30%] md:w-[25%] bg-border/50 border-r border-border h-full p-2 md:p-5 flex flex-col gap-5">
          {/*title  */}
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-lg font-semibold text-header">Your journal</h1>
            {/* no of entries */}
            <p className="text-xs p-1 border border-border rounded-md">
              6 entries
            </p>
          </div>

          {/*  add entry button */}
          <AppButton
            text="+ New entry"
            onClick={() => console.log("New entry")}
          />
          {/* search your thoughts */}
          <AppInput placeholder="Search your thoughts..." />

          {/* tabs */}
          <div className=" flex flex-row items-center text-center w-full border-b border-border pb-2">
            <button className=" flex-1">All entries</button>
            {/* show only if favorite */}
            <button className="flex-1 flex items-center gap-1 text-center">
              <Image src="/star-filled.svg" alt="star" width={16} height={16} />{" "}
              Favorites
            </button>
          </div>

          {/* all the entries */}
          <h2 className="text-text font-semibold text-sm">YOUR MOMENTS</h2>

          {/* list of entries */}
          <div className="flex flex-col gap-1">
            {/* date */}
            <div className="flex flex-row justify-between">
              <p className="text-sm">June 17, 2025</p>
              <button>
                <Image src="/star.svg" alt="star" width={16} height={16} />
              </button>
            </div>
            {/* title */}
            <p className="text-header text-base">A little room to grow</p>
            <p className="line-clamp-2 text-sm">
              I’ve been thinking about how much can change when we give
              ourselves a little room to grow.{" "}
            </p>
          </div>
        </div>
        {/* diary content */}
        <div></div>
      </main>
    </div>
  );
}
