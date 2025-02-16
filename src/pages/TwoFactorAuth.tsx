import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import FormInput from '../components/FormInput';

const twoFactorSchema = z.object({
  code: z.string().length(6, 'Please enter a valid 6-digit code'),
});

type TwoFactorForm = z.infer<typeof twoFactorSchema>;

export default function TwoFactorAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TwoFactorForm>({
    resolver: zodResolver(twoFactorSchema),
  });

  const onSubmit = async (data: TwoFactorForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthCard title="Two-Factor Authentication">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm">
            Enter the 6-digit code sent to your email to verify your identity.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Verification Code"
            name="code"
            register={register}
            error={errors.code}
            placeholder="123456"
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
              "Verifying..."
            ) : (
              <>
                <Shield size={20} />
                Verify Code
              </>
            )}
          </motion.button>

          <div className="text-center text-sm text-gray-600">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              onClick={() => {/* Handle resend */}}
            >
              Resend Code
            </button>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}