import Typography from 'typography';
import '../src/components/font.css';

// This website uses the system font stack after the placed "Lora" font
// The scaleRatio will be overwritten for smaller breakpoints in src/components/Layout

const typography = new Typography({
  title: 'Pins | Desktop of Samuel',
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerFontFamily: [
    'Inter',
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  bodyFontFamily: [
    'Inter',
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  scaleRatio: 3.157,
  headerWeight: 700,
  overrideStyles: () => ({
    img: {
      marginBottom: 0,
    },
  }),
});

export default typography;
