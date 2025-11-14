import { Component, ComponentType, SVGProps } from 'react';

type NavIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  key: string;
  href: string;
  icon?: {
    icon: NavIconComponent;
    position: 'left' | 'right';
  };
  disabled?: true;
};

export type NavigationList = Array<NavigationItem | NavigationList>;
