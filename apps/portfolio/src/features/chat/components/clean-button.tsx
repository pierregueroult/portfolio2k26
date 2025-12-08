"use client";

import { ComponentProps } from "react";
import { Button } from "@repo/ui/components/button";
import { BrushCleaningIcon } from "lucide-react";
import { useChatStore } from "../stores/chat-store";

type CleanButtonProps = ComponentProps<typeof Button>;

export function CleanButton({ ...props }: CleanButtonProps) {
    const { cleanMessages } = useChatStore(value => value);
    return (
        <Button {...props} onClick={() => cleanMessages()} >
            <BrushCleaningIcon />
        </Button>
    );
}