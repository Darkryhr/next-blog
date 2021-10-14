import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: {
      base: '#181818',
      darker: '#000000',
      lighter: '#2b2b2b',
    },
    accent: {
      base: '#fb8b24',
      darker: '#f7760d',
      lighter: '#f9923e',
    },
    text: {
      base: '#f4f4f4',
      darker: '#efefef',
      lighter: '#ffffff',
    },
  },
  fontSizes: {
    small: '1.1em',
    medium: '2em',
    large: '3.3em',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
