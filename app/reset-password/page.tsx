"use client";

import { AppButton } from "@/components/button";
import { AppFooter } from "@/components/footer";
import { AppHeader } from "@/components/header";
import { AppInput } from "@/components/input";
import useScreenLoader from "@/components/screen-loader";
import { Endpoints } from "@/constants/endpoints";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ResetPassWord() {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // loader state
  const { setScreenLoader } = useScreenLoader();

  const route = useRouter();
  // get token from route params
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      alert("Invalid link or token expired");
      // navigate to login
      route.push("/login");
    }
  }, [route, token]);

  async function handleReset() {
    try {
      setScreenLoader(true);
      if (!pass || !confirmPass) {
        alert("Please fill all the fields");
        return;
      }

      if (pass != confirmPass) {
        alert("password and confirm password dose not match ");
        return;
      }

      const response = await fetch(Endpoints.updateUser, {
        method: "PUT",
        body: JSON.stringify({
          password: pass,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(5000), // 5 sec
      });

      const data = await response.json();

      // in case failed
      if (!response.ok) {
        alert(data.message || "Error resetting password");
        return;
      }
      // else show success
      alert("password reset successfully");
      // navigate back to login
      route.push("/login");
    } finally {
      setScreenLoader(false);
    }
  }

  return (
    <div className="flex-1 flex-col flex justify-between">
      <AppHeader />
      <main className="flex items-center justify-center">
        <div className="border-border border-2 rounded-lg p-5 flex flex-col gap-5">
          {/* title section*/}
          <div>
            <h2 className="text-3xl text-header my-2">Reset your Password</h2>
          </div>
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
          {/* reset signup*/}
          <AppButton text="Reset" onClick={handleReset} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default ResetPassWord;
