'use client';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import { useState } from 'react';
import { SignHeader } from '../SignHeader';

const LoginSchema = Yup.object({
    //--> INCOMPLETE ** check from data base if email exists & password matches email
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
});

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const initialValues ={
    email: '',
    password: ''
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log('Form submitted:', values);
    setSubmitting(false);
    // Here you would typically make an API call
  };

  const [visibleForm, setVisibleForm] =  useState<'registration' | 'login'>('login');

  return (
        <>
            <SignHeader />
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => {
                return (
                <Form className="mt-8">
                  <div className="rounded-md shadow-sm p-[28px] -space-y-px flex flex-col gap-4">
                    <div className='flex '>
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
                    {visibleForm === 'login' && (
                      <>
                       <div>
                         <Field name="email">
                           {({ field }: { field: any }) => (
                             <Input
                               {...field}
                               type="email"
                               placeholder="Email"
                               label='Email'
                               error={touched['email'] && errors.email}
                             />
                           )}
                         </Field>
                       </div>
                       <div>
                         <Field name="password">
                           {({ field }: { field: any }) => (
                             <Input
                               {...field}
                               type="password"
                               placeholder="Password"
                               label='Password'
                               error={touched['password'] && errors.password}
                             />
                           )}
                         </Field>
                       </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#006633] hover:bg-[#006633]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                      </button>
                      </>
                    )}
                  </div>
                </Form>
              )}}
            </Formik>
        </>
  );
}
