"use client";

import { ComponentProps } from "react";
import { Button } from "@repo/ui/components/button";
import { BrushCleaningIcon } from "lucide-react";

type CleanButtonProps = ComponentProps<typeof Button> & {
    onClean: () => void;
};

export function CleanButton({ onClean, ...props }: CleanButtonProps) {
    return (
        <Button {...props} onClick={onClean} >
            <BrushCleaningIcon />
        </Button>
    );
}