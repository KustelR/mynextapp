import React, {useState, useRef, useEffect} from 'react'
import {sendFormData} from '../scripts/registration';

import CustomInput from './ui/CustomInput'
import CustomButton from './ui/TextButton'
import ShowIf from './ui/ShowIf'
import SendableForm from './SendableForm'

import { validateLogin, validateEmail, validatePassword } from '@/scripts/validations'


export default function RegisterForm() {

  const [isLoginValid, setIsLoginValid] = useState()
  const [isUsernameValid, setIsUsernameValid] = useState()
  const [isEmailValid, setIsEmailValid] = useState()

  const [isPasswordValid, setIsPasswordValid] = useState()
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState()
  const passwordField = useRef(null);

  const [isFormValid, setIsFormValid] = useState(false)

  function loginValidation(event) {
    if(event.target.value) {
        setIsLoginValid(validateLogin(event.target.value))
    }
  }

  function emailValidation(event) {
    if(event.target.value) {
        setIsEmailValid(validateEmail(event.target.value))
    }
  }
  function passwordValidation(event) {
    if(event.target.value) {
        setIsPasswordValid(validatePassword(event.target.value))
    }
  }

  function validatePasswordConfirm(event) {
    if(event.target.value) {
        setIsPasswordConfirmed(event.target.value == passwordField.current.value)
    }
  }

  function validateUsername(event) {
    if(event.target.value) {
        setIsUsernameValid(validateLogin(event.target.value))
    }
  }

  useEffect(() => {
    if (isLoginValid && isEmailValid && isPasswordValid && isPasswordConfirmed && isUsernameValid) {
      setIsFormValid(true);
    }
  }, [isLoginValid, isEmailValid, isPasswordValid, isPasswordConfirmed, isUsernameValid])

  return (
    <SendableForm 
      href="/api/v1/register"
      submitHandler={sendFormData}>
        <div className='md:columns-2 mb-2'>
          <CustomInput
            className="mb-2" 
            onChange={loginValidation} 
            id="login" 
            label="Login" 
            validation={isLoginValid} 
            validationMessage={"Incorrect login"} 
            advice={"Only latin literals and numbers"} 
            autoComplete="username"
            />
          <CustomInput 
            className="mb-2" 
            onChange={emailValidation} 
            id="email" 
            label="Email" 
            type="email" 
            validation={isEmailValid} 
            validationMessage={"Incorrect email"}
            autoComplete="email"
            />
        </div>
        <div className='md:columns-2 mb-2'>
            <CustomInput
              className="mb-2" 
              onChange={passwordValidation}
              validation={isPasswordValid} 
              validationMessage={"Incorrect password"} 
              id="password"
              reference={passwordField} 
              label="Password" 
              type="password" 
              advice="Minimum 8 characters long"
              autoComplete="new-password"
              />
            <CustomInput
              onChange={validatePasswordConfirm}
              validation={isPasswordConfirmed}
              validationMessage={"Passwords are not same"} 
              name="password-confirm" 
              label="Confirm password" 
              type="password"
              autoComplete="new-password"
              />
        </div>
        <CustomInput
          className="mb-2" 
          onChange={validateUsername}
          validation={isUsernameValid}
          validationMessage={"Nickname is invalid"} 
          id="nickname" 
          label="Nickname" 
          advice="Will be shown to all users" 
          autoComplete="off"/>
        <div className='flex items-center'>
          <CustomButton disabled={!isFormValid}>Confirm registration</CustomButton>
          <ShowIf 
            isVisible={!isFormValid} 
            className='ml-4 border-l-2 px-2 border-red-700 bg-red-200 text-red-800 dark:bg-transparent dark:text-white'>Some of the fields are filled incorrect
            </ShowIf>
        </div>
    </SendableForm>
  )
}
