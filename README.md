# Theme SDK for Zent

## 使用方法

 ⚠️ 必须在先安装zent，且版本`>9.8.0`

```
yarn add @zent/theme-sdk
```

### API

| 属性 / 方法            | 说明                                                          | 类型                                                                       |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| defaultTheme          | 获取当前主题下的所有css variable和值                             | () => ITheme                                                             |
| generatePalette       | 根据基础色获取所有生成的色值                                      | (baseColor: string) => string[]                                          |
| generateTheme         | 根据语义场景和基准值获取所有css variable和值                       | (config: IThemeConfig) => ITheme                                           |
| applyTheme            | 应用主题的值                                                   | (theme: ITheme)  => void                                                 |
