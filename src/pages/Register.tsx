import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, UserPlus, UserCheck, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import FormInput from '../components/FormInput';

const studentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Please enter a valid zip code'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  guardianName: z.string().min(2, 'Guardian name is required'),
  guardianEmail: z.string().email('Please enter a valid guardian email'),
  guardianPhone: z.string().min(10, 'Please enter a valid guardian phone number'),
  relationship: z.string().min(2, 'Relationship is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type StudentForm = z.infer<typeof studentSchema>;

interface Props {
  onComplete: (email: string) => void;
}

const formSteps = ['Personal Information', 'Contact Details', 'Guardian Information'];

export default function StudentRegistration({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: StudentForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onComplete(data.email);
  };

  const nextStep = async () => {
    const fieldsToValidate = currentStep === 0 
      ? ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword']
      : currentStep === 1 
      ? ['address', 'city', 'state', 'zipCode', 'dateOfBirth']
      : ['guardianName', 'guardianEmail', 'guardianPhone', 'relationship'];

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Input
                label="First Name"
                {...register('firstName')}
                error={errors.firstName}
              />
              <Input
                label="Last Name"
                {...register('lastName')}
                error={errors.lastName}
              />
            </div>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email}
              />
              <Input
                label="Phone"
                type="tel"
                {...register('phone')}
                error={errors.phone}
              />
            </div>
            <div className="space-y-4 md:col-span-2">
              <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password}
              />
              <Input
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                error={errors.confirmPassword}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Address"
                {...register('address')}
                error={errors.address}
              />
            </div>
            <Input
              label="City"
              {...register('city')}
              error={errors.city}
            />
            <Input
              label="State"
              {...register('state')}
              error={errors.state}
            />
            <Input
              label="Zip Code"
              {...register('zipCode')}
              error={errors.zipCode}
            />
            <Input
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth')}
              error={errors.dateOfBirth}
            />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Guardian Name"
              {...register('guardianName')}
              error={errors.guardianName}
            />
            <Input
              label="Relationship"
              {...register('relationship')}
              error={errors.relationship}
            />
            <Input
              label="Guardian Email"
              type="email"
              {...register('guardianEmail')}
              error={errors.guardianEmail}
            />
            <Input
              label="Guardian Phone"
              type="tel"
              {...register('guardianPhone')}
              error={errors.guardianPhone}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Registration</h2>
          <div className="flex items-center justify-between">
            {formSteps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index < formSteps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < formSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > index ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderFormStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
            )}
            {currentStep < formSteps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <UserCheck size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Registration
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: { message?: string };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
          ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
          }`}
      />
      {error?.message && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
);
