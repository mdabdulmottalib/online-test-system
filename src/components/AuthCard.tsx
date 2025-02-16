import React from 'react';
import { motion } from 'framer-motion';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthCard({ children, title }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
    >
      <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">{title}</h1>
      {children}
    </motion.div>
  );
}