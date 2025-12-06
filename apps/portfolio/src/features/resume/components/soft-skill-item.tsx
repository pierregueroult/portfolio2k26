import { Badge } from '@repo/ui/components/badge';

interface SoftSkillItemProps {
    label: string;
}

export function SoftSkillItem({ label }: SoftSkillItemProps) {
    return <Badge variant="secondary" className="text-sm py-1 px-3 hover:bg-secondary/80 transition-colors cursor-default">{label}</Badge>;
}
