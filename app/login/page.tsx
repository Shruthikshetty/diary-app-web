"use client";

import { AppButton } from "../components/button";
import { AppInput } from "../components/input";

function Login() {
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
        <div className="border-border border-2 rounded-lg p-5">
          {/* title  */}
          <p className="text-sm text-text">YOUR LITTLE CORNER</p>
          <h2 className="text-3xl text-header my-2">Welcome back.</h2>
          <p className="text-sm text-text">
            Settle in. Your thoughts are right where you left them.
          </p>
          {/* name field */}
          <AppInput placeholder="First name" title="First name" id={"name"} />
          {/* password filed */}
          <AppInput
            placeholder="Password"
            title="Password"
            rightbuttonText="Forgot password?"
          />
          {/* button login*/}
          <AppButton text="Log in" onClick={() => {}} />
          {/*create new account  */}
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
