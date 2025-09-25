'use client';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SettingsIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import { Title } from "./Title";
import Input from '@/components/Input';
import { FreelancerProfile } from '@/types/profile';
import { updateFreelancerProfile } from '@/actions/upateFreelanceProfile';

// Validation schema
const SettingsSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Full Name must be at least 2 characters'),
  title: Yup.string()
    ,
  location: Yup.string()
    ,
  email: Yup.string()
    .email('Invalid email address')
   ,

  hourly_rate: Yup.string()
    ,
    available: Yup.string()
   ,
  bio: Yup.string()
    
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must not exceed 500 characters')
});

export type FormValues = {
  name: string;
  title: string;
  location: string;
  email: string;
  hourly_rate: string;
  available: string;
  bio: string;
};

// Field configuration
const fields = [
  { 
    name: 'fullName' as keyof FormValues, 
    label: "Full Name", 
    type: 'text',
    gridSize: 6 
  },
  { 
    name: 'title' as keyof FormValues, 
    label: "Professional Title", 
    type: 'text',
    gridSize: 6 
  },
  { 
    name: 'location' as keyof FormValues, 
    label: "Location", 
    type: 'text',
    gridSize: 6 
  },
  { 
    name: 'email' as keyof FormValues, 
    label: "Email", 
    type: 'email',
    gridSize: 6 
  },
  { 
    name: 'phoneNumber' as keyof FormValues, 
    label: "Phone Number", 
    type: 'tel',
    gridSize: 6 
  },
  { 
    name: 'website' as keyof FormValues, 
    label: "Website", 
    type: 'url',
    gridSize: 6 
  },
  { 
    name: 'hourlyRate' as keyof FormValues, 
    label: "Hourly Rate", 
    type: 'text',
    gridSize: 6 
  },
  { 
    name: 'availability' as keyof FormValues, 
    label: "Availability", 
    type: 'text',
    gridSize: 6 
  },
  { 
    name: 'bio' as keyof FormValues, 
    label: "Bio", 
    type: 'textarea',
    gridSize: 12 
  }
];

export const Settings = ({profile, token}: {profile:FreelancerProfile, token?: string}) => {
console.log(profile, 'profileeeeeeeeeeee')
  const initialValues: FormValues = {
    name: profile.user.name,
    title: profile.title,
    location: profile.location,
    email: profile.user.email,
    hourly_rate: profile.hourly_rate ,
    available: profile.available ? "Available" : "Not Available",
    bio: profile.bio
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const response = await fetch("http://127.0.0.1:6565/api/v1/freelancer/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
        body: JSON.stringify(values), // Convert form data to JSON
      });
    await updateFreelancerProfile(values, token)
    setSubmitting(false);
   
  };

  return (
    <>
      <Title Icon={SettingsIcon} text="Account Settings"/>
      <Typography pb={1} sx={{color: 'black'}}>
        <b>Profile Information</b>
      </Typography>
      
      <Formik
        initialValues={initialValues}
        validationSchema={SettingsSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              {fields.map(({ name, label, type, gridSize }) => (
                <Grid 
                  key={`${name}-field`} 
                  item 
                  xs={12} 
                  sm={gridSize}
                  display={'grid'}
                >
                  <Field name={name}>
                    {({ field }: { field: any }) => (
                      <Input
                        className='text-black'
                        {...field}
                        type={type}
                        placeholder={label}
                        label={label}
                        error={touched[name] && errors[name]}
                        multiline={type === 'textarea'}
                        rows={type === 'textarea' ? 4 : undefined}
                      />
                    )}
                  </Field>
                </Grid>
              ))}
              
              <Grid 
                item 
                xs={12} 
                display={'flex'} 
                justifyContent={'flex-end'} 
                mt={3}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 text-sm font-medium rounded-md text-white bg-[#006633] hover:bg-[#006633]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};