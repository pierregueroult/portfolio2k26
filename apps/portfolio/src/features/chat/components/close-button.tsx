"use client";

import { ComponentProps } from "react";
import { Button } from "@repo/ui/components/button";
import { XIcon } from "lucide-react";
import { useChatStore } from "../stores/chat-store";

type CloseButtonProps = ComponentProps<typeof Button>;

export function CloseButton({ ...props }: CloseButtonProps) {
    const { triggerChat } = useChatStore(value => value);
    return (
        <Button {...props} onClick={() => triggerChat()} >
            <XIcon />
        </Button>
    );
}