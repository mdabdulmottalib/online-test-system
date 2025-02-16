import React, { useState } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
}

export default function FormInput({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-900 mb-1">{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          {...register(name)}
          placeholder={placeholder}
          className={clsx(
            "w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-blue-200 focus:border-blue-500 focus:ring-blue-200",
            isPassword && "pr-12"
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-red-500 mt-1"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}