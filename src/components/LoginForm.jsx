import React from "react";
import { CustomInput, TextButton } from "@/components/ui";
import SendableForm from "@/components/SendableForm";
import { sendFormData } from "@/scripts/forms/sendAuthForm";

function onFail(error) {
  return <div>error.message</div>;
}

export default function LoginForm() {
  return (
    <SendableForm href="/auth/v1/login" submitHandler={sendFormData}>
      <CustomInput
        className="mb-2"
        id="login"
        label="Login"
        autoComplete="username"
      />
      <CustomInput
        className="mb-2"
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <TextButton>Log in</TextButton>
    </SendableForm>
  );
}
