import { generateColorPalette } from './generator';
import {
  getSetOfOneThemeColor,
  getSetOfThemeVariable,
  hexToRGBString,
} from './utils';
import {
  IColor,
  IThemeColor,
  ITheme,
  ICssVars,
  IThemeConfig,
  IPalette,
  IHexToRgbFn,
  IThemeCssVars,
} from './types';

export class ThemeSdk {
  static generatePalette(baseColor: IColor): IPalette {
    if (!baseColor) return [];
    return generateColorPalette(baseColor);
  }

  static generateTheme(config: IThemeConfig, cssRefs: IThemeCssVars): ITheme {
    const { colors } = config;

    if (!cssRefs || !colors) {
      return { colors: [] as IThemeColor[] };
    }

    const getThemeColors = (
      cssVarRefs: ICssVars,
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

    const { hex, rgb } = cssRefs;

    const themeColors: IThemeColor[] = getThemeColors(hex).concat(
      getThemeColors(rgb, hexToRGBString)
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
