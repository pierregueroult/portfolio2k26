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
};
export function ArticleBreadcrumb({ path, title }: ArticleBreadcrumbProps) {
  const steps = [...path.split('/'), title];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <Fragment key={index}>
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{step}</BreadcrumbPage>
            </BreadcrumbItem>
            {index !== steps.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
