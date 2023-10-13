import React from 'react'
import CustomInput from './ui/CustomInput'
import TextButton from './ui/TextButton'
import SendableForm from './SendableForm';


function onFail(error) {
    return (<div>error.message</div>)
}


export default function LoginForm() {
  return (
    <SendableForm href="/api/v1/login">
        <CustomInput className="mb-2" id="login" label="Login" autoComplete="username"/>
        <CustomInput 
            className="mb-2" 
            id="password" 
            label="Password" 
            type="password" 
            autoComplete="current-password"/>
        <TextButton>Log in</TextButton>
    </SendableForm>
  )
}
