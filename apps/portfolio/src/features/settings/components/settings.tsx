import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/popover';
import { renderBlurProps } from '@/features/navigation/lib/blur';
import { FontSwitch } from './font-switch';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@repo/ui/components/field';
import { ThemeSelect } from '@/features/themes/components/select';
import { LocaleSelect } from '@/features/internationalization/components/select';

type SettingsPopoverProps = {
  children: ReactNode;
};

export function SettingsPopover({ children }: SettingsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={32}
        {...renderBlurProps('relative right-2.5 w-[25rem] p-4')}
      >
        <FieldSet className="w-full gap-3">
          <Field orientation="horizontal">
            <FieldContent className="gap-1">
              <FieldLabel>Change theme</FieldLabel>
              <FieldDescription>More themes are coming soon.</FieldDescription>
            </FieldContent>
            <ThemeSelect />
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldContent className="gap-1">
              <FieldLabel>Change language</FieldLabel>
              <FieldDescription>More languages are coming soon.</FieldDescription>
            </FieldContent>
            <LocaleSelect />
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldContent className="gap-1">
              <FieldLabel htmlFor="font">Toggle dislexia mode</FieldLabel>
              <FieldDescription>Change the font to make it easier to read.</FieldDescription>
            </FieldContent>
            <FontSwitch id="font" />
          </Field>
        </FieldSet>
      </PopoverContent>
    </Popover>
  );
}
