"use client";

import { useState } from "react";
import { AppButton } from "./components/button";
import { AppHeader } from "./components/header";
import { AppInput } from "./components/input";
import Image from "next/image";
import { useEffect } from "react";
import { Endpoints } from "./constants/endpoints";

type Entries = {
  _id: string;
  userId: string;
  title: string;
  mood: string;
  content: string;
  date: string; // date string
  createdAt: string;
  updatedAt: string;
};

type GetEntriesResponse = {
  data: Entries[];
  success: boolean;
};

export default function Home() {
  const [entries, setEntries] = useState<Entries[]>([]);

  // function to fetch entries
  async function fetchEntries() {
    // fetch data from server
    const res = await fetch(Endpoints.getAllEntries, {
      method: "GET",
      credentials: "include",
    });
    const data: GetEntriesResponse = await res.json();
    if (!res.ok) {
      alert("failed to fetch your diary entries");
    }
    setEntries(data.data);
    console.log(data.data);
  }
  // fetch data
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEntries();
  }, []);
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
              {entries?.length ?? 0} entries
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
          {entries?.map((entry) => (
            <div
              className="flex flex-col gap-1 hover:border-border hover:bg-border/80 border-2 border-transparent rounded-lg transition-all p-2 hover:cursor-pointer"
              key={entry._id}
            >
              {/* date */}
              <div className="flex flex-row justify-between">
                <p className="text-sm">{entry.date}</p>
                <button>
                  <Image src="/star.svg" alt="star" width={16} height={16} />
                </button>
              </div>
              {/* title */}
              <p className="text-header text-base">{entry.title}</p>
              <p className="line-clamp-2 text-sm">{entry.content}</p>
            </div>
          ))}
        </div>
        {/* diary content */}
        <div></div>
      </main>
    </div>
  );
}
