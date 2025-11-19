'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { PrinterIcon } from 'lucide-react';
import { toast } from 'sonner';

export function PrintButton() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    if (isPrinting) return;

    setIsPrinting(true);
    try {
      window.print();
    } catch (err) {
      toast.error('An error occurred while printing');
    } finally {
      setTimeout(() => setIsPrinting(false), 500);
    }
  };

  const label = isPrinting ? 'Printing…' : 'Print';

  return (
    <Button variant="outline" onClick={handlePrint} disabled={isPrinting} aria-label={label}>
      <PrinterIcon />
      {label}
    </Button>
  );
}
