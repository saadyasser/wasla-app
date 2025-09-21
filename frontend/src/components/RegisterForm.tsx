// 'use client';

// import { Formik, Form, Field, FormikHelpers, type FieldProps, type FormikProps } from 'formik';
// import * as Yup from 'yup';
// import Input from './Input';
// import Radio from './radio-button';
// import { useState } from 'react';
// import { registerHandler } from '../actions/register.action';

// const registrationSchema = Yup.object({
//   fullName: Yup.string()
//     .required('Full name is required')
//     .min(3, 'Full name must be at least 3 characters'),
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(8, 'Password must be at least 8 characters')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
//       'Password must contain at least one uppercase letter, one lowercase letter, and one number'
//     ),
//   userType: Yup.string()
//     .required('Please select a user type')
//     .oneOf(['client', 'freelancer', 'supporter'], 'Please select a valid user type')
// });

// type FormValues = {
//   fullName: string;
//   email: string;
//   password: string;
//   userType: string;
// };

// export default function RegisterForm() {
//   const initialValues: FormValues = {
//     fullName: '',
//     email: '',
//     password: '',
//     userType: ''
//   };

//   const handleSubmit = async (
//     values: FormValues,
//     { setSubmitting }: FormikHelpers<FormValues>
//   ) => {
//     try {
//       const result = await registerHandler({
//         name: values.fullName,
//         email: values.email,
//         password: values.password,
//         password_confirmation: values.password,
//         role: values.userType,
//       });
//       alert('Account created successfully');
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Registration failed';
//       console.error(error);
//       alert(message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const [userType, setUserType] = useState<'client' | 'freelancer' | 'supporter'>('client');

//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={registrationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, errors, touched }) => (
//           <Form className="mt-[28px] flex flex-col gap-4">
//             {initialValues &&
//               (Object.keys(initialValues) as (keyof typeof initialValues)[])
//                 .filter(value => value !== 'userType')
//                 .map(value => (
//                   <Field name={value} key={`register-${value}-field`}>
//                     {({ field }: FieldProps) => (
//                       <Input
//                         {...field}
//                         type={
//                           value === 'email' ? 'email'
//                             : value === 'password' ? 'password'
//                             : 'text'
//                         }
//                         placeholder={
//                           value === 'fullName' ? 'Full Name': value[0].toUpperCase() + value.slice(1)
//                         }
//                         label={
//                           value === 'fullName'? 'Full Name': value[0].toUpperCase() + value.slice(1)
//                         }
//                         error={touched[value] ? (errors[value] as string | undefined) : undefined}
//                       />
//                     )}
//                   </Field>
//                 ))}

//             <div>
//               <Field name="userType">
//                 {({ field, form }: FieldProps & { form: FormikProps<FormValues> }) => (
//                   <Radio
//                     label="I am a:"
//                     name="userType"
//                     options={[
//                       { value: 'client', label: 'Client', description: 'Showcase skills and find work' },
//                       { value: 'freelancer', label: 'Freelancer', description: 'Post projects and hire talent' },
//                       { value: 'supporter', label: 'Supporter', description: 'Support community development' }
//                     ]}
//                     onChange={value => {
//                       form.setFieldValue('userType', value);
//                       setUserType(value as 'client' | 'freelancer' | 'supporter');
//                     }}
//                     error={errors.userType}
//                     value={field.value || userType}
//                   />
//                 )}
//               </Field>
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#006633] hover:bg-[#006633]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//             >
//               {isSubmitting ? 'Signing up...' : 'Sign up'}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// }
