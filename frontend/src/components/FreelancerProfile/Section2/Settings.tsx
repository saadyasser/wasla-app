'use client';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SettingsIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import { Title } from "./Title";
import Input from '@/components/Input';
import { FreelancerProfile } from '@/types/profile';

// Validation schema
const SettingsSchema = Yup.object({
  name: Yup.string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters'),
  professionalTitle: Yup.string()
    .required('Professional Title is required'),
  location: Yup.string()
    .required('Location is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
  website: Yup.string()
    .url('Invalid website URL')
    .required('Website is required'),
  hourlyRate: Yup.string()
    .required('Hourly Rate is required'),
  availability: Yup.string()
    .required('Availability is required'),
  bio: Yup.string()
    .required('Bio is required')
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must not exceed 500 characters')
});

type FormValues = {
  fullName: string;
  professionalTitle: string;
  location: string;
  email: string;
  phoneNumber: string;
  website: string;
  hourlyRate: string;
  availability: string;
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
    name: 'professionalTitle' as keyof FormValues, 
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

export const Settings = ({profile}: {profile:FreelancerProfile}) => {
  const initialValues: FormValues = {
    fullName: profile.user.name,
    professionalTitle: profile.title,
    location: profile.location,
    email: profile.user.email,
    phoneNumber: profile.phone_number,
    website: profile.website,
    hourlyRate: profile.hourly_rate ,
    availability: profile.available ? "Available" : "Not Available",
    bio: profile.bio
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log('Settings updated:', values);
    // Add your settings update logic here
    // updateSettingsHandler(values);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      alert('Settings saved successfully!'); // Replace with proper notification
    }, 1000);
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