"use client";

import { useState } from "react";
import { AppButton } from "../components/button";
import { AppFooter } from "../components/footer";
import { AppHeader } from "../components/header";
import { AppInput } from "../components/input";
import { Endpoints } from "../constants/endpoints";
import { useRouter } from "next/navigation";

function SignUp() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const route = useRouter();

  // handle create account
  const createAccount = async () => {
    if (!name || !pass || !confirmPass) {
      alert("Please fill in all fields");
      return;
    }

    if (pass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    // call api
    try {
      const response = await fetch(Endpoints.signup, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          password: pass,
        }),
        signal: AbortSignal.timeout(5000), // 5 sec
      });

      const data = await response.json();

      // in case failed
      if (!response.ok) {
        alert(data.message || "Error creating account");
        return;
      }
      // else show success
      alert("account create successfully");
      // navigate back to login
      route.push("/login");
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex-col flex justify-between">
      <AppHeader />
      <main className="flex items-center justify-center">
        <div className="border-border border-2 rounded-lg p-5 flex flex-col gap-5">
          {/* title section*/}
          <div>
            <p className="text-sm text-text">YOUR STORY STARTS HERE</p>
            <h2 className="text-3xl text-header my-2">
              A little space, just for you.
            </h2>
            <p className="text-sm text-text">
              Create an account and make room for your thoughts.
            </p>
          </div>
          {/* name field */}
          <AppInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should I call you?"
            title="Your name"
            id={"name"}
          />
          {/* password filed */}
          <AppInput
            value={pass}
            type="password"
            onChange={(e) => setPass(e.target.value)}
            placeholder="Create a password"
            title="Password"
          />
          <AppInput
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirm your password"
            title="Retype password"
          />
          {/* button signup*/}
          <AppButton text="Create account" onClick={createAccount} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default SignUp;
