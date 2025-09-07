'use client';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Input from './Input';

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

export default function LoginForm(){
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
                  <Input
                    {...field}
                    type={value === 'email' ? 'email' : 'password'}
                    placeholder={value[0].toUpperCase() + value.slice(1)}
                    label={value[0].toUpperCase() + value.slice(1)}
                    error={touched[value] && errors[value]}
                  />
                )}
              </Field>
            ))}

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