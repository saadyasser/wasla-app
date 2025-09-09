'use client';
import { useState } from 'react';
import { SignHeader } from '@/components/SignHeader';
import RegisterForm from '@/components/RegisterForm';
import LoginForm from '@/components/LoginForm';

export const AuthFormContainer = () => {
    const [visibleForm, setVisibleForm] =  useState<'registration' | 'login'>('registration');
    return(
            <>
                <SignHeader />
                <div className="rounded-md shadow-sm p-[28px] -space-y-px flex flex-col gap-4">
                    <div className='flex gap-1'>
                        <button
                            type="button"
                            onClick={() => setVisibleForm('login')}
                            className={`cursor-pointer group relative  w-full flex justify-center py-1  border border-transparent text-sm font-medium rounded-xl  ${visibleForm === 'registration' ? 'bg-gray-100 text-[#1a1a1a]' : 'bg-[#006633] text-white' } hover:bg-[#006633] hover:text-white focus:outline-none focus:ring-[2px] disabled:opacity-50`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => setVisibleForm('registration')}
                            className={`cursor-pointer group relative w-full flex justify-center py-1  border border-transparent text-sm font-medium rounded-xl ${visibleForm === 'login' ? 'bg-gray-100 text-[#1a1a1a]' : 'bg-[#006633] text-white' } hover:bg-[#006633] hover:text-white focus:outline-none focus:ring-2 disabled:opacity-50`}
                        >
                            Sign Up
                        </button>
                    </div>
                    {visibleForm === 'registration' ? <RegisterForm /> : <LoginForm />}
                </div>
            </>
    )
}