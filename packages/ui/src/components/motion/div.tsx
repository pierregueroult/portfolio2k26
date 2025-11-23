'use client';

import { motion } from 'motion/react';
import { ComponentProps, useId } from 'react';

type MotionDivProps = ComponentProps<typeof motion.div>;

export const MotionDiv = ({ children, ...props }: MotionDivProps) => {
  const key = useId();

  return (
    <motion.div key={key} {...props}>
      {children}
    </motion.div>
  );
};
