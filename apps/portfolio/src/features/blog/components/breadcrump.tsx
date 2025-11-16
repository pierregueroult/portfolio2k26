import { capitalize } from '@/lib/capitalize';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import { SlashIcon } from 'lucide-react';
import { Fragment } from 'react';

type ArticleBreadcrumbProps = {
  path: string;
  title: string;
  className?: string;
};
export function ArticleBreadcrumb({ path, title, className }: ArticleBreadcrumbProps) {
  const steps = [...path.split('/'), title];
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <Fragment key={index}>
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{capitalize(step)}</BreadcrumbPage>
            </BreadcrumbItem>
            {index !== steps.length - 1 && <BreadcrumbSeparator></BreadcrumbSeparator>}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
