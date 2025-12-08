import { ReactNode } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Link } from '@/features/internationalization/lib/navigation';
import { FloatingArrow } from '@/features/navigation/components/floating-arrow';

interface ErrorPageProps {
    code: string | number;
    title: string;
    description: string;
    actions?: ReactNode;
    icon?: ReactNode;
    withArrow?: boolean;
    className?: string;
    children?: ReactNode;
}

export function ErrorPage({
    code,
    title,
    description,
    actions,
    icon,
    withArrow = false,
    className,
    children,
}: ErrorPageProps) {
    return (
        <div
            className={cn(
                'min-h-[calc(100vh-6rem)] flex items-center justify-center relative bg-background text-foreground p-4',
                className,
            )}
        >
            {withArrow && <FloatingArrow message="Some articles have been moved" />}

            <div className="text-center space-y-8 max-w-lg mx-auto">
                <div className="space-y-4">
                    {icon ? (
                        <div className="flex justify-center mb-6">
                            {icon}
                        </div>
                    ) : (
                        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-primary/20 select-none font-mono">
                            {code}
                        </h1>
                    )}

                    <div className="space-y-2">
                        {!icon && <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>}
                        {icon && <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>}
                        <p className="text-lg text-muted-foreground">{description}</p>
                    </div>
                </div>

                {children}

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    {actions || (
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Go Home
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
