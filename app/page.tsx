"use client";

import { useMemo, useState } from "react";
import { AppButton } from "../components/button";
import { AppHeader } from "../components/header";
import { AppInput } from "../components/input";
import Image from "next/image";
import { useEffect } from "react";
import { Endpoints } from "../constants/endpoints";
import { formatDate } from "../utils/date";
import useScreenLoader from "../components/screen-loader";

// type------------------------
type Entries = {
  _id: string;
  userId: string;
  title: string;
  mood: string;
  content: string;
  date: string; // date string
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

type GetEntriesResponse = {
  data: Entries[];
  success: boolean;
};

// components -------------------

export default function Home() {
  const [entries, setEntries] = useState<Entries[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entries | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState(selectedEntry?.title || "");
  const [newContent, setNewContent] = useState(selectedEntry?.content || "");
  const [selectedTab, setSelectedTab] = useState<"all_entries" | "favorite">(
    "all_entries",
  );
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  // loader state
  const { setScreenLoader } = useScreenLoader();

  // filtered entries based on tab
  const filteredEntries = useMemo(
    () =>
      entries?.filter((entry) => {
        if (selectedTab === "all_entries") {
          return true;
        }
        return entry.isFavorite;
      }) ?? [],
    [entries, selectedTab],
  );

  // function to fetch entries
  async function fetchEntries() {
    try {
      setScreenLoader(true);
      // fetch data from server
      const res = await fetch(Endpoints.getAllEntries, {
        method: "GET",
        credentials: "include",
      });
      const data: GetEntriesResponse = await res.json();
      if (!res.ok) {
        alert("failed to fetch your diary entries");
        return;
      }
      setEntries(data.data);
      // set a default selected
      if (data.data.length > 0 && !selectedEntry) {
        setSelectedEntry(data.data[0]);
      }
      return data.data;
    } finally {
      setScreenLoader(false);
    }
  }

  // function to handle update the entry
  async function handleUpdateEntry({
    title,
    content,
    isFavorite,
  }: {
    title?: string;
    content?: string;
    isFavorite?: boolean;
  }) {
    try {
      setScreenLoader(true);
      // update the data
      const res = await fetch(
        Endpoints.updateEntry + `/${selectedEntry?._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: selectedEntry?._id,
            title: title,
            content: content,
            isFavorite: isFavorite,
          }),
        },
      );
      if (!res.ok) {
        alert("failed to fetch your diary entries");
      }
      // refetch the data
      fetchEntries().then(() => {
        setIsEditing(false);
        setSelectedEntry((prev) =>
          prev
            ? {
                ...prev,
                title: newTitle || prev.title,
                content: newContent || prev.content,
                isFavorite:
                  isFavorite === undefined ? prev.isFavorite : isFavorite,
              }
            : null,
        );
      });
    } finally {
      setScreenLoader(false);
    }
  }

  // function to handle add the entry
  async function handleAddEntry() {
    try {
      setScreenLoader(true);
      // add the data
      const res = await fetch(Endpoints.createEntry, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          date: new Date().toISOString(),
          mood: "happy", //@TODO fix later
        }),
      });
      if (!res.ok) {
        alert("failed to add your diary entry");
      }
      // refetch the data
      fetchEntries().then(() => {
        setIsAdding(false);
        setIsEditing(false);
      });
    } finally {
      setScreenLoader(false);
    }
  }

  // function to handle delete a entry
  async function handleDelete(id: string) {
    try {
      setScreenLoader(true);
      const res = await fetch(Endpoints.deleteEntry + `/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("failed to delete your diary entry");
      }

      // refetch the data
      await fetchEntries().then((data) => {
        if (selectedEntry?._id === id && data?.length) {
          setSelectedEntry(data[0]);
        }
      });
    } finally {
      setScreenLoader(false);
    }
  }

  // fetch data
  useEffect(() => {
    fetchEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-screen flex-1 flex-col flex">
      <AppHeader />
      <main className="flex-1 flex overflow-hidden">
        {/* overlay */}
        {isTrayOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setIsTrayOpen(false);
            }}
          />
        )}
        {/* side tray  */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-72  sm:max-w-[60vw] max-w-[45%] bg-surface md:bg-border/50 border-r border-border h-full p-4 md:p-5 flex flex-col gap-5 transform transition-transform duration-300 ease-in-out md:static md:w-[25%] md:translate-x-0 ${
            isTrayOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
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
            onClick={() => {
              setIsAdding(true);
              setIsEditing(true);
              setSelectedEntry(null);
              setNewTitle("");
              setNewContent("");
              setIsTrayOpen(false);
            }}
          />
          {/* search your thoughts */}
          <AppInput placeholder="Search your thoughts..." />

          {/* tabs */}
          <div className="flex flex-row items-center text-center w-full border-b border-border">
            <button
              className={`flex-1 pb-2 border-b-3 transition-colors ${selectedTab === "all_entries" ? "border-header" : "border-transparent "}`}
              onClick={() => {
                setSelectedTab("all_entries");
              }}
            >
              All entries
            </button>
            {/* show only if favorite */}
            <button
              className={`flex-1 flex items-center justify-center gap-1 text-center pb-2 border-b-3 transition-colors ${selectedTab === "favorite" ? "border-header" : "border-transparent "}`}
              onClick={() => {
                setSelectedTab("favorite");
              }}
            >
              <Image src="/star-filled.svg" alt="star" width={16} height={16} />{" "}
              Favorites
            </button>
          </div>

          {/* all the entries */}
          <h2 className="text-text font-semibold text-sm">YOUR MOMENTS</h2>
          <div
            className="overflow-auto w-full flex flex-col"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "var(--petal) transparent",
            }}
          >
            {filteredEntries?.map((entry) => (
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
                  setIsTrayOpen(false);
                }}
              >
                {/* date */}
                <div className="flex flex-row justify-between">
                  <p className="text-sm text-left">{formatDate(entry.date)}</p>
                  <div className="flex gap-2">
                    {entry.isFavorite ? (
                      <div>
                        <Image
                          src="/star-filled.svg"
                          alt="star"
                          width={16}
                          height={16}
                        />
                      </div>
                    ) : null}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry._id);
                      }}
                    >
                      <Image
                        src="/trash.svg"
                        alt="trash"
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                </div>
                {/* title */}
                <p className="text-header text-base text-left">{entry.title}</p>
                <p className="line-clamp-2 text-sm text-left">
                  {entry.content}
                </p>
              </button>
            ))}
          </div>
        </div>
        {/* diary content */}
        <div className="flex flex-col h-full w-full">
          {/* utilities */}
          <div className="px-5 py-3 border-b-2 border-border w-full flex flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded-lg border border-border hover:bg-border/50"
                onClick={() => setIsTrayOpen(true)}
                aria-label="Open entries tray"
              >
                ☰
              </button>
              <p>My journal &gt; {formatDate(selectedEntry?.date)}</p>
            </div>
            <div className="flex flex-row gap-5">
              <button
                onClick={() => {
                  handleUpdateEntry({ isFavorite: !selectedEntry?.isFavorite });
                }}
              >
                <Image
                  src={
                    selectedEntry?.isFavorite ? "/star-filled.svg" : "/star.svg"
                  }
                  alt="star"
                  width={16}
                  height={16}
                />
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
          <div
            className="py-10 px-20 h-full overflow-auto"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            <h2 className="text-base">------------ A PAGE FROM YOUR LIFE</h2>

            {filteredEntries.length == 0 && !selectedEntry && !isEditing ? (
              <div className="flex items-center justify-center h-[70%]">
                <p className="text-xl text-header font-semibold text-center">
                  No entries yet. Start capturing your thoughts!
                </p>
              </div>
            ) : (
              <>
                {/* title */}
                {isEditing ? (
                  <input
                    className="border-none outline-none text-3xl text-header font-semibold py-5 w-full"
                    value={newTitle}
                    placeholder="Enter a title..."
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
                    className="border-none outline-none w-full h-[50%] min-h-40"
                    value={newContent}
                    placeholder="Enter your thoughts..."
                    onChange={(e) => setNewContent(e.target.value)}
                  ></textarea>
                ) : (
                  <p className="whitespace-pre-wrap">
                    {selectedEntry?.content}
                  </p>
                )}
                {isEditing ? (
                  <div className="mt-5 flex justify-end">
                    <AppButton
                      text={isAdding ? "Add" : "Update"}
                      onClick={() => {
                        if (isAdding) {
                          handleAddEntry();
                        } else {
                          handleUpdateEntry({
                            title: newTitle,
                            content: newContent,
                          });
                        }
                      }}
                      className="max-w-[20%]"
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
