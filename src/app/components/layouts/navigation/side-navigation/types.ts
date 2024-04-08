import { Type } from '@angular/core';

export type SdwdsComponentResource = {
  link: string;
  description: string;
};

export type SdwdsComponentDependency = {
  link: string;
  description: string;
};

export type SdwdsComponentNotification = {
  type: 'info' | 'success' | 'warning' | 'danger';
  message: string;
};

export type SdwdsComponent = {
  name: string;
  description: string;
  image: string;
  link: string;
  guidelines?: string;
  storybook?: string;
  figma: string;
  notifications?: SdwdsComponentNotification[];
  component?: Type<any>;
  variants?: SdwdsComponentExample[];
  examples?: SdwdsComponentExample[];
  dependencies?: SdwdsComponentDependency[];
  resources?: SdwdsComponentResource[];
  hidden?: boolean;
  cssVariables?: boolean;
};

export type SdwdsComponentExample = {
  name: string;
  examples?: SdwdsComponentExample[];
};

export type SdwdsColorPalette = {
  name: string;
  color: SdwdsColor;
  shades: SdwdsColor[];
};

export type SdwdsColor = {
  name: string;
  hex: string;
};
