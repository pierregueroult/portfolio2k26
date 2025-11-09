import type { NavigationItem, NavigationList } from '../types/items';
import { Link } from '@/features/internationalization/lib/navigation';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { Separator } from '@repo/ui/components/separator';
import { cn } from '@repo/ui/lib/utils';

type NavigationNodeProps = {
  node: NavigationItem | NavigationList;
  depth: number;
  className?: string;
};

export function NavigationNode({ node, depth, className }: NavigationNodeProps) {
  if (depth > 3) return null;

  if (Array.isArray(node)) {
    return (
      <li
        className={cn(
          "flex gap-2 h-full last:[&>[data-slot='separator']]:hidden w-full @min-[406px]/header:w-auto",
          className,
        )}
      >
        <ul
          className="flex items-center gap-2 @min-[406px]/flex-wrap flex-col w-full @min-[406px]/header:flex-row @min-[406px]/header:w-auto"
          data-depth={depth}
        >
          {node.map((child, i) => (
            <NavigationNode key={i} node={child} depth={depth + 1} />
          ))}
        </ul>
        <Separator orientation="vertical" className="hidden @min-[406px]/box" />
      </li>
    );
  }

  return (
    <li className={cn('w-full @min-[406px]/header:w-auto', className)}>
      {node.disabled ? (
        <Button disabled={true} variant="outline" className="w-full @min-[406px]/w-auto">
          {node.icon && node.icon.position === 'left' && <node.icon.icon />}
          {node.label}
          {node.icon && node.icon.position === 'right' && <node.icon.icon />}
        </Button>
      ) : (
        <Link
          href={node.href}
          className={cn(buttonVariants({ variant: 'outline' }), 'w-full @min-[406px]/w-auto')}
        >
          {node.icon && node.icon.position === 'left' && <node.icon.icon />}
          {node.label}
          {node.icon && node.icon.position === 'right' && <node.icon.icon />}
        </Link>
      )}
    </li>
  );
}
