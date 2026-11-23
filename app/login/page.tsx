"use client";

import { useState } from "react";
import { AppButton } from "../components/button";
import { AppInput } from "../components/input";
import { Endpoints } from "../constants/endpoints";
import { useRouter } from "next/navigation";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const route = useRouter();

  // handle submit
  const onSubmit = async () => {
    if (!name || !pass) {
      alert("Please fill in all fields");
    }

    // call api
    try {
      const response = await fetch(Endpoints.login, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          password: pass,
        }),
      });

      const data = await response.json();

      // in case failed
      if (!response.ok) {
        alert(data.message || "Login failed ");
        return;
      }
      // else show success
      alert("login Success");
      // navigate to home
      route.push("/");
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex-col flex justify-between">
      {/* header */}
      <header className="p-5 flex flex-row justify-between border-border border-b-2">
        {/* left icon  */}
        <div className="flex flex-row gap-3 items-center">
          <p className="text-text font-bold text-lg">STILL.</p>
          <div className="border-r-2 border-border h-full"></div>
          <p>A little space for you.</p>
        </div>
        {/* middle content  */}
      </header>
      <main className="flex items-center justify-center">
        <div className="border-border border-2 rounded-lg p-5 flex flex-col gap-5">
          {/* title section*/}
          <div>
            <p className="text-sm text-text">YOUR LITTLE CORNER</p>
            <h2 className="text-3xl text-header my-2">Welcome back.</h2>
            <p className="text-sm text-text">
              Settle in. Your thoughts are right where you left them.
            </p>
          </div>
          {/* name field */}
          <AppInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name"
            title="First name"
            id={"name"}
          />
          {/* password filed */}
          <AppInput
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            title="Password"
            rightbuttonText="Forgot password?"
          />
          {/* button login*/}
          <AppButton text="Log in" onClick={onSubmit} />
          {/*create new account  */}
          <button
            className="w-full group"
            onClick={() => route.push("/signup")}
          >
            <p className="text-center">
              new here ?{" "}
              <span className="text-primary group-active:opacity-80 transition-colors">
                create one
              </span>
            </p>
          </button>
        </div>
      </main>
      <footer className="flex flex-row justify-between gap-5 px-5 pt-5 pb-10">
        {/* left text  */}
        <p className="text-text text-base">A small moment. A lasting memory.</p>
        {/* right text */}
        <p className="text-text text-base">Your thoughts, just yours.</p>
      </footer>
    </div>
  );
}

export default Login;
