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
} from './types';

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

  static generateTheme(config: IThemeConfig, cssRefs?: ICssVarRef[]): ITheme {
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

    if (!cssRefs) {
      return { colors: [] as IThemeColor[] };
    }

    const themeColors: IThemeColor[] = getThemeColors(cssRefs[0]).concat(
      getThemeColors(cssRefs[1], hexToRGBString)
    );

    return { colors: themeColors };
  }

  static applyTheme(theme: ITheme) {
    const { colors } = theme;
    colors.forEach(item => {
      document.documentElement.style.setProperty(
        item.cssVariableName,
        item.color
      );
    });
  }
}
