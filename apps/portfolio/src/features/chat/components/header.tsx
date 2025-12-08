import { CloseButton } from "./close-button";
import { CleanButton } from "./clean-button";


type ChatHeaderProps = {
    onClean: () => void;
};

export function ChatHeader({ onClean }: ChatHeaderProps) {
    return (
        <div className="px-2 pt-2">
            <div className="bg-input/30 w-full rounded-md border-input border p-2 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold">Chat with this portfolio</p>
                    <p className="text-xs text-muted-foreground">It can respond, until it's out of free tokens</p>
                </div>
                <div className="flex items-center gap-2">
                    <CleanButton variant="outline" size="icon-sm" onClean={onClean} />
                    <CloseButton variant="default" size="icon-sm" />
                </div>
            </div>
        </div>
    );
}