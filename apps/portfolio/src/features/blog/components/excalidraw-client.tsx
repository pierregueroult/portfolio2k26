'use client';

import { Excalidraw } from '@excalidraw/excalidraw';

import { ComponentProps } from 'react';

type ExcalidrawClientProps = ComponentProps<typeof Excalidraw>;

const ExcalidrawClient: React.FC<ExcalidrawClientProps> = (props) => {
  return <Excalidraw {...props} />;
};

export default ExcalidrawClient;
