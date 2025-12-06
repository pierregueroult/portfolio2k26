'use client';

import { ComponentProps } from 'react';
import { AnimatePresence as AnimatePresenceBase } from 'motion/react';

type AnimatePresenceProps = ComponentProps<typeof AnimatePresenceBase>;

export const AnimatePresence = (props: AnimatePresenceProps) => {
  return <AnimatePresenceBase {...props} />;
};
