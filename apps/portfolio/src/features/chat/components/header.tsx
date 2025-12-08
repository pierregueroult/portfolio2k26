import { CloseButton } from "./close-button";
import { CleanButton } from "./clean-button";

export function ChatHeader() {
    return (
        <div className="px-2 pt-2">
            <div className="bg-input/30 w-full rounded-md border-input border p-2 flex items-center justify-between">
                <p className="text-sm">Chat with this portfolio</p>
                <div className="flex items-center gap-2">
                    <CleanButton variant="outline" size="icon-sm" />
                    <CloseButton variant="default" size="icon-sm" />
                </div>
            </div>
        </div>
    );
}