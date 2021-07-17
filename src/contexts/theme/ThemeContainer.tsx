import {
  CSSReset,
  ThemeProvider as ChakraThemeProvider,
} from '@chakra-ui/core';
import { ColorModeScript } from '@chakra-ui/react';

import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React from 'react';
import { theme, config } from '../../styles/theme';

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <EmotionThemeProvider theme={theme}>
        <CSSReset />
        {children}
      </EmotionThemeProvider>
    </ChakraThemeProvider>
  );
};

export default ThemeContainer;
