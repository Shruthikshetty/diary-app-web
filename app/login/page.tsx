"use client";

import { useState } from "react";
import { AppButton } from "../../components/button";
import { AppInput } from "../../components/input";
import { Endpoints } from "../../constants/endpoints";
import { useRouter } from "next/navigation";
import { AppHeader } from "../../components/header";
import { AppFooter } from "../../components/footer";
import useScreenLoader from "../../components/screen-loader";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  // loader state
  const { setScreenLoader } = useScreenLoader();

  const route = useRouter();

  // handle submit
  const onSubmit = async () => {
    if (!name || !pass) {
      alert("Please fill in all fields");
      return;
    }

    // call api
    try {
      setScreenLoader(true);
      const response = await fetch(Endpoints.login, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          password: pass,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
    } finally {
      setScreenLoader(false);
    }
  };

  // handle forgot password
  const handleForgotPassword = async () => {
    try {
      setScreenLoader(true);
      if (!name) {
        alert("Please fill in name before triggering forgot password");
      }
      await fetch(Endpoints.forgotPass + `/${name}`, {
        method: "POST",
      });
      alert("check your email for reset link");
    } finally {
      setScreenLoader(false);
    }
  };

  return (
    <div className="flex-1 flex-col flex justify-between">
      {/* header */}
      <AppHeader />
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
            rightButtonOnClick={handleForgotPassword}
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
      <AppFooter />
    </div>
  );
}

export default Login;
