export const colors = {
  background: 'hsl(218 33% 97%)',
  foreground: 'hsl(222 47% 11%)',
  subtle: 'hsl(215 24% 95%)',
  subtleForeground: 'hsl(220 15% 36%)',
  muted: 'hsl(216 20% 92%)',
  mutedForeground: 'hsl(222 14% 38%)',
  card: 'hsl(0 0% 100%)',
  cardForeground: 'hsl(222 47% 12%)',
  border: 'hsl(215 22% 82%)',
  divider: 'hsla(215, 24%, 70%, 0.7)',
  input: 'hsl(215 30% 94%)',
  ring: 'hsl(219 90% 56%)',
  primary: 'hsl(219 100% 56%)',
  primaryForeground: 'hsl(0 0% 100%)',
  primarySoft: 'hsla(219, 90%, 56%, 0.14)',
  accent: 'hsl(266 89% 63%)',
  accentForeground: 'hsl(0 0% 100%)',
  accentSoft: 'hsla(266, 88%, 63%, 0.18)',
  destructive: 'hsl(0 82% 56%)',
  destructiveForeground: 'hsl(0 0% 100%)',
  warning: 'hsl(37 94% 58%)',
  warningForeground: 'hsl(28 78% 14%)',
  success: 'hsl(148 58% 46%)',
  successForeground: 'hsl(151 85% 12%)'
};

export const typography = {
  fontFamilySans:
    "'Geist', 'Inter', 'SF Pro Display', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
  fontFamilyMono: "'Geist Mono', 'JetBrains Mono', 'SFMono-Regular', 'Menlo', monospace",
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeights: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5
  }
};

export const radii = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 28,
  pill: 999
};

export const shadows = {
  xs: '0 1px 2px rgba(15, 23, 42, 0.06)',
  sm: '0 8px 20px rgba(15, 23, 42, 0.08)',
  md: '0 18px 40px rgba(15, 23, 42, 0.12)',
  lg: '0 40px 70px rgba(15, 23, 42, 0.16)'
};

export const spacing = {
  xs: '0.4rem',
  sm: '0.75rem',
  md: '1.25rem',
  lg: '1.75rem',
  xl: '2.5rem',
  xxl: '3.5rem'
};

export const layout = {
  contentWidth: '1200px',
  gutter: 'clamp(1.5rem, 4vw, 3.5rem)'
};

export const transitions = {
  base: 'all 0.18s ease-out',
  bounce: 'all 0.22s cubic-bezier(0.33, 1, 0.68, 1)'
};

export const theme = {
  colors,
  typography,
  radii,
  shadows,
  spacing,
  layout,
  transitions
};

export default theme;


