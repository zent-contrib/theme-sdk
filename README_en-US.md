# Theme SDK for Zent

## Usage

 ⚠️ Must be used with Zent version `>=9.8.0`

```
yarn add @zent/theme-sdk
```

### API

| Attributes / Methods  | Description                                                                       | Type                                                 |
| --------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- |
| getThemeColor         | get all the css variables and values of the current theme                         | () => ITheme                                         |
| generatePalette       | get all the theme colors, base on the base color                                  | (baseColor: string) => string[]                      |
| generateTheme         | get all the css variables and values of the theme by the semantic scene and value | (config: IThemeConfig) => ITheme                       |
| applyTheme            | apply the theme                                                                   | (theme: ITheme)  => void                             |
