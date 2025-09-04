'use client';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from '../Input';
import Radio from '../radio-button';
import { useState } from 'react';
import { SignHeader } from '../SignHeader';

const registrationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  userType: Yup.string()
    .required('Please select a user type')
    .oneOf(['client', 'freelancer', 'supporter'], 'Please select a valid user type')
});

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  userType: string;
};

export default function RegistrationForm() {
  const initialValues: FormValues = {
    fullName: '',
    email: '',
    password: '',
    userType: ''
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log('Form submitted:', values);
    setSubmitting(false);
    // Here you would typically make an API call
  };

  const [visibleForm, setVisibleForm] =  useState<'registration' | 'login'>('registration');

  const [userType, setUserType] = useState<'client' | 'freelancer' | 'supporter'>('client');
  return (
        <>
          <SignHeader />
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
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
                  {visibleForm === 'registration' && (
                    <>
                     <div>
                       <Field name="fullName">
                         {({ field }: { field: any }) => (
                           <Input
                             {...field}
                             type="text"
                             placeholder="Full Name"
                             label='Full Name'
                             error={touched['fullName'] && errors.fullName}
                           />
                         )}
                       </Field>
                     </div>
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
                  <div>
                    <Field name="userType">
                      {({ field, form }: { field: any, form: any }) => (
                        <Radio
                          label="I am a:"
                          name="userType"
                          options={[
                            { value: 'client', label: 'Client', description: 'Showcase skills and find work' },
                            { value: 'freelancer', label: 'Freelancer', description: 'Post projects and hire talent' },
                            { value: 'supporter', label: 'Supporter', description: 'Support community development' },
                          ]}
                          onChange={(value) => {
                            form.setFieldValue('userType', value);
                            setUserType(value as 'client' | 'freelancer' | 'supporter');
                          }}
                          error={touched['userType'] && errors.userType}
                          value={field.value || userType}
                        />
                      )}
                    </Field>
                  </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#006633] hover:bg-[#006633]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Signing up...' : 'Sign up'}
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
