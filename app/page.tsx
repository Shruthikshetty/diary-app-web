"use client";

import { useState } from "react";
import { AppButton } from "./components/button";
import { AppHeader } from "./components/header";
import { AppInput } from "./components/input";
import Image from "next/image";
import { useEffect } from "react";
import { Endpoints } from "./constants/endpoints";
import { formatDate } from "./utils/date";

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
  const [selectedEntry, setSelectedEntry] = useState<Entries | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(selectedEntry?.title || "");
  const [newContent, setNewContent] = useState(selectedEntry?.content || "");

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
    // set a default selected
    if (data.data.length > 0 && !selectedEntry) {
      setSelectedEntry(data.data[0]);
    }
  }

  // function to handle update the entry
  async function handleUpdateEntry() {
    // update the data
    const res = await fetch(Endpoints.updateEntry + `/${selectedEntry?._id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: selectedEntry?._id,
        title: newTitle,
        content: newContent,
      }),
    });
    if (!res.ok) {
      alert("failed to fetch your diary entries");
    }
    // refetch the data
    fetchEntries().then(() => {
      setIsEditing(false);
      setSelectedEntry((prev) =>
        prev ? { ...prev, title: newTitle, content: newContent } : null,
      );
    });
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
            <button
              className={`flex flex-col gap-1 hover:border-border hover:bg-border/80 border-2 border-transparent rounded-lg transition-all p-2 hover:cursor-pointer ${
                selectedEntry?._id === entry._id
                  ? "bg-surface/80 border-border"
                  : ""
              }`}
              key={entry._id}
              onClick={() => {
                setSelectedEntry(entry);
                setNewTitle(entry.title);
                setNewContent(entry.content);
              }}
            >
              {/* date */}
              <div className="flex flex-row justify-between">
                <p className="text-sm text-left">{formatDate(entry.date)}</p>
                <div>
                  <Image src="/star.svg" alt="star" width={16} height={16} />
                </div>
              </div>
              {/* title */}
              <p className="text-header text-base text-left">{entry.title}</p>
              <p className="line-clamp-2 text-sm text-left">{entry.content}</p>
            </button>
          ))}
        </div>
        {/* diary content */}
        <div className="flex-1">
          {/* utilities */}
          <div className="px-5 py-3 border-b-2 border-border w-full flex flex-row justify-between items-center ">
            <p>My journal &gt; {formatDate(selectedEntry?.date)}</p>
            <div className="flex flex-row gap-5">
              <button>
                {/*@TODO toggle based on fav or not */}
                <Image src={"/star.svg"} alt="star" width={16} height={16} />
              </button>
              <button
                className="hover:bg-border/50 p-3 rounded-xl"
                onClick={() => {
                  setIsEditing(true);
                  setNewTitle(selectedEntry?.title || "");
                  setNewContent(selectedEntry?.content || "");
                }}
              >
                Edit entry
              </button>
            </div>
          </div>
          {/* main content */}
          <div className="py-10 px-20">
            <h2 className="text-base">------------ A PAGE FROM YOUR LIFE</h2>
            {/* title */}
            {isEditing ? (
              <input
                className="border-none outline-none text-3xl text-header font-semibold py-5 w-full"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              ></input>
            ) : (
              <p className="text-3xl text-header font-semibold py-5">
                {selectedEntry?.title}
              </p>
            )}

            <div className="w-full border-border border-b my-5"></div>
            {/* separator */}
            {isEditing ? (
              <textarea
                className="border-none outline-none w-full"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              ></textarea>
            ) : (
              <p>{selectedEntry?.content}</p>
            )}

            {isEditing ? (
              <div className="mt-5 flex justify-end">
                <AppButton
                  text={"Update"}
                  onClick={handleUpdateEntry}
                  className="max-w-[20%]"
                />
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
