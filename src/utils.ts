import { inputToRGB } from '@ctrl/tinycolor';
import {
  ThemeScene,
  IThemeColor,
  ICssVars,
  IPalette,
  IThemeColorSceneConfig,
  IHexToRgbFn,
  IColor,
} from './types';

type IGenerateThemeRelation = (
  palette: IPalette,
  scene: ThemeScene,
  cssVars: ICssVars,
  colorHandleFn?: IHexToRgbFn
) => IThemeColor[];

type IGetSetOfOneThemeColor = (
  colorConfig: IThemeColorSceneConfig,
  cssVars: ICssVars,
  paletteGenerateFn?: (hex: string) => string[],
  colorHandleFn?: IHexToRgbFn
) => IThemeColor[];

type IGetSetOfThemeVariable = (
  cssVars: ICssVars,
  variableName: string,
  color: IColor,
  colorHandleFn?: IHexToRgbFn
) => IThemeColor[];

interface IThemeRelation {
  index: number,
  variableName: string,
  scene: ThemeScene,
}

const themeRelation: IThemeRelation[] = [
  {
    index: 0,
    variableName: '$primary-100',
    scene: ThemeScene.DefaultHoverBackgroundColor,
  },
  {
    index: 1,
    variableName: '$primary-400',
    scene: ThemeScene.PrimaryHoverBackgroundColor,
  },
  {
    index: 2,
    variableName: '$primary-500',
    scene: ThemeScene.PrimaryBackgroundColor,
  },
  {
    index: 3,
    variableName: '$primary-600',
    scene: ThemeScene.PrimaryActiveBackgroundColor,
  },
];

interface ISceneVariableRelation {
  [key: number]: IThemeRelation
}

const sceneVariableRelation: ISceneVariableRelation = themeRelation.reduce((pre, item) => {
  pre[item.scene] = item;
  return pre;
}, {} as ISceneVariableRelation);

export const generateThemeRelation: IGenerateThemeRelation = (
  palette,
  scene,
  cssVars,
  colorHandleFn
) => {
  const sceneInfo = sceneVariableRelation[scene];
  if (!sceneInfo) return [];

  const cssVariableNames = cssVars?.[sceneInfo.variableName];
  if (!cssVariableNames) return [];
  const paletteIndex = sceneInfo.index;

  return cssVariableNames.map(cssVariableName => ({
    cssVariableName,
    color: colorHandleFn
      ? colorHandleFn(palette[paletteIndex])
      : palette[paletteIndex],
  }));
};

export const getSetOfOneThemeColor: IGetSetOfOneThemeColor = (
  colorConfig,
  cssVars,
  paletteGenerateFn,
  colorHandleFn
) => {
  const { baseColor, scene } = colorConfig;
  if (!baseColor || !paletteGenerateFn) return [];
  const palette: IPalette = paletteGenerateFn(baseColor);
  let currentColors: IThemeColor[] = [] as IThemeColor[];
  if (Array.isArray(scene)) {
    currentColors = scene.reduce((theme, currentScene) => {
      return theme.concat(
        generateThemeRelation(palette, currentScene, cssVars, colorHandleFn)
      );
    }, [] as IThemeColor[]);
  } else {
    currentColors = generateThemeRelation(
      palette,
      scene,
      cssVars,
      colorHandleFn
    );
  }
  return currentColors;
};

export const getSetOfThemeVariable: IGetSetOfThemeVariable = (
  cssVars,
  variableName,
  color,
  colorHandleFn
) => {
  return cssVars?.[variableName]?.map(cssVariableName => ({
    color: colorHandleFn ? colorHandleFn(color) : color,
    cssVariableName,
  }));
};

export const hexToRGBString: IHexToRgbFn = color => {
  const { r, g, b } = inputToRGB(color);
  return `${r}, ${g}, ${b}`;
};
