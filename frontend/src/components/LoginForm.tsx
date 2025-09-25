'use client';

import { Formik, Form, Field, FormikHelpers, FieldProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import { loginHandler } from '@/actions/login.action';
import { useState } from 'react';
import Radio from './radio-button';

const LoginSchema = Yup.object({
    //--> INCOMPLETE ** check from data base if email exists & password matches email
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
    userType: Yup.string()
      .required('Please select a user type')
      .oneOf(['client', 'freelancer', 'supporter'], 'Please select a valid user type')
    });

type FormValues = {
  email: string;
  password: string;
  userType: string;
};

export default function LoginForm(){
    const initialValues ={
    email: '',
    password: '',
    userType: ''
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log('Form submitted:', values);
    loginHandler(values)
    console.log('Form submitted:', values);
  };

    const [userType, setUserType] = useState<'client' | 'freelancer' | 'supporter'>('client');
  

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="mt-8 flex flex-col gap-4">
            {(Object.keys(initialValues) as (keyof typeof initialValues)[]).map(value => (
              <Field name={value} key={`login-${value}-field`}>
                {({ field }: { field: any }) => (
                 value !== 'userType' && <Input
                    {...field}
                    type={value === 'email' ? 'email' : 'password'}
                    placeholder={value[0].toUpperCase() + value.slice(1)}
                    label={value[0].toUpperCase() + value.slice(1)}
                    error={touched[value] && errors[value]}
                  /> 
                )}
              </Field>
            ))}
   <div>
              <Field name="userType">
                {({ field, form }: FieldProps & { form: FormikProps<FormValues> }) => (
                  <Radio
                    label="I am a:"
                    name="userType"
                    options={[
                      { value: 'client', label: 'Client', description: 'Showcase skills and find work' },
                      { value: 'freelancer', label: 'Freelancer', description: 'Post projects and hire talent' },
                      { value: 'supporter', label: 'Supporter', description: 'Support community development' }
                    ]}
                    onChange={value => {
                      form.setFieldValue('userType', value);
                      setUserType(value as 'client' | 'freelancer' | 'supporter');
                    }}
                    error={touched.userType ? (errors.userType as string | undefined) : undefined}
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
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}