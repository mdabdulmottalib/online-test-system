import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail } from 'lucide-react';

interface Props {
  email: string;
}

export default function SuccessPage({ email }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 text-green-500"
        >
          <CheckCircle size={80} />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Registration Successful!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Thank you for registering. Please verify your email address to complete the process.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-center gap-2 mb-6">
          <Mail size={20} className="text-blue-600" />
          <span className="text-blue-800 font-medium">{email}</span>
        </div>
        
        <p className="text-sm text-gray-500">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>
      </div>
    </motion.div>
  );
}
