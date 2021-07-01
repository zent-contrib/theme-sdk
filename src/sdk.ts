import { generateColorPalette } from './generator';
import {
  getSetOfOneThemeColor,
  getSetOfThemeVariable,
  hexToRGBString,
} from './utils';
import {
  ThemeScene,
  IColor,
  IThemeColor,
  ITheme,
  ICssVarRef,
  IThemeConfig,
  IPalette,
  IHexToRgbFn,
  ICssVarRefs,
} from './types';
import { getZentThemeRefs } from './refs';

const primaryColor = '#155bd4';

const ThemeScenes = [
  ThemeScene.DefaultHoverBackgroundColor,
  ThemeScene.PrimaryHoverBackgroundColor,
  ThemeScene.PrimaryBackgroundColor,
  ThemeScene.PrimaryActiveBackgroundColor,
];

export class ThemeSdk {
  static defaultTheme = ThemeSdk.generateTheme({
    colors: [{ baseColor: primaryColor, scene: ThemeScenes }],
  });

  static generatePalette(baseColor: IColor): IPalette {
    if (!baseColor) return [];
    return generateColorPalette(baseColor);
  }

  static generateTheme(config: IThemeConfig, cssRefs?: ICssVarRefs): ITheme {
    const { colors } = config;

    const getThemeColors = (
      cssVarRefs: ICssVarRef,
      colorHandleFn?: IHexToRgbFn
    ) => {
      return colors.reduce((preThemeColors, colorConfig) => {
        let currentColors: IThemeColor[] = [] as IThemeColor[];
        if ('scene' in colorConfig) {
          currentColors = getSetOfOneThemeColor(
            colorConfig,
            cssVarRefs,
            generateColorPalette,
            colorHandleFn
          );
        } else {
          currentColors = getSetOfThemeVariable(
            cssVarRefs,
            colorConfig.variableName,
            colorConfig.color,
            colorHandleFn
          );
        }

        return preThemeColors.concat(currentColors);
      }, [] as IThemeColor[]);
    };

    const zentDefaultRefs = getZentThemeRefs();
    const currentRefs: ICssVarRefs | null = cssRefs || zentDefaultRefs;

    if (!currentRefs) {
      return { colors: [] as IThemeColor[] };
    }

    const { cssVarRef, cssRgbVarRef } = currentRefs;

    const themeColors: IThemeColor[] = getThemeColors(cssVarRef).concat(
      getThemeColors(cssRgbVarRef, hexToRGBString)
    );

    return { colors: themeColors };
  }

  static applyTheme(theme: ITheme): void {
    const { colors } = theme;
    colors.forEach(item => {
      document.documentElement.style.setProperty(
        item.cssVariableName,
        item.color
      );
    });
  }
}
