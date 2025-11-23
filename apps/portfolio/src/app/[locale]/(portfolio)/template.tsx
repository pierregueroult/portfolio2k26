'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type PortfolioTemplateProps = Readonly<{
  children: ReactNode;
}>;

export default function Template({ children }: PortfolioTemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
