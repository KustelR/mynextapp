import React, { useState } from "react";

import {TextButton as CustomButton, ShowIf} from "@/components/ui";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  const [isNewUser, setIsNewUser] = useState(false);

  function toggleRegister() {
    setIsNewUser(!isNewUser);
  }

  return (
    <div className="p-4 md:px-20 bg-white dark:bg-neutral-800 mx-auto md:max-w-3xl shadow-2xl">
      <div className="mb-6">
        <ShowIf isVisible={!isNewUser}>
          <h2 className="font-bold">Login page</h2>
          <LoginForm></LoginForm>
        </ShowIf>
        <ShowIf isVisible={isNewUser}>
          <h2 className="font-bold">Sign up page</h2>
          <RegisterForm></RegisterForm>
        </ShowIf>
      </div>
      <div>
        <CustomButton onClick={toggleRegister}>
          {isNewUser ? "I have an account already" : "I don't have an account"}
        </CustomButton>
      </div>
    </div>
  );
}
