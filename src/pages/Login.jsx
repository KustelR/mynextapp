"use client";


import React, { useState } from 'react';

import CustomButton from '@/components/ui/TextButton';
import '../app/globals.css';
import PageComponent from '@/components/spalike/PageComponent';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import ShowIf from '@/components/ui/ShowIf';


export default function LoginView() {

    const [isNewUser, setIsNewUser] = useState(false);

    function toggleRegister() {
        setIsNewUser(!isNewUser);
    }

  return (
    <PageComponent title="Login to KUST">
        <div className='p-4 md:px-20 bg-white dark:bg-transparent mx-auto md:max-w-3xl shadow-2xl'>
            <div className='mb-6'>
            <ShowIf isVisible={!isNewUser}>
                <h2 className='font-bold'>Login page</h2>
                <LoginForm></LoginForm>
            </ShowIf>
            <ShowIf isVisible={isNewUser}>
                <h2 className='font-bold'>Register page</h2>
                <RegisterForm></RegisterForm>
            </ShowIf>
            </div>
            <div>
                <CustomButton onClick={toggleRegister}>{isNewUser ? "I have an account already" : "I don't have an account"}</CustomButton>
            </div>
        </div>
    </PageComponent>
    )
}
