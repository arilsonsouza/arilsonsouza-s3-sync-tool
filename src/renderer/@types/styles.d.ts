import 'styled-components';
import { defaultTheme } from 'renderer/styles/themes/default';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof defaultTheme.colors;
    backgrounds: typeof defaultTheme.backgrounds;
    fonts: typeof defaultTheme.fonts;
  }
}
