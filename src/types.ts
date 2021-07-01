export type IColor = string;

export enum ThemeScene {
  DefaultHoverBackgroundColor,
  PrimaryHoverBackgroundColor,
  PrimaryBackgroundColor,
  PrimaryActiveBackgroundColor,
}

export interface ICssVarRef {
  [key: string]: string[];
}

export interface IThemeColor {
  cssVariableName: string;
  color: IColor;
}

export interface IThemeColorSceneConfig {
  baseColor: IColor;
  scene: ThemeScene[] | ThemeScene;
}

export interface IThemeColorVarConfig {
  color: IColor;
  variableName: string;
}

export type IThemeColorConfig = IThemeColorSceneConfig | IThemeColorVarConfig;

export interface IThemeConfig {
  colors: IThemeColorConfig[];
}

export interface ITheme {
  colors: IThemeColor[];
}

export type IPalette = IColor[];

export type IHexToRgbFn = (color: string) => string;

export interface ICssVarRefs  {
  cssVarRef: ICssVarRef,
  cssRgbVarRef: ICssVarRef
}
