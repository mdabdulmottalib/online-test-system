import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import FormInput from '../components/FormInput';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard title="Reset Password">
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="your@email.com"
          />

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:ring-offset-2 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Sending instructions..."
            ) : (
              <>
                <KeyRound size={20} />
                Send Reset Instructions
              </>
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}