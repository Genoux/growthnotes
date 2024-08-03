import localFont from "next/font/local";

export const larsRegular = localFont({
  src: '../fonts/Lars-Regular.woff',
  variable: '--font-lars-regular',
});

export const larsBold = localFont({
  src: '../fonts/Lars-Bold.woff',
  variable: '--font-lars-bold',
});

export const larsBoldCondensed = localFont({
  src: '../fonts/Lars-BoldCondensed.woff',
  variable: '--font-lars-bold-condensed',
});

export const larsMedium = localFont({
  src: '../fonts/Lars-Medium.woff',
  variable: '--font-lars-medium',
});

export const larsMono = localFont({
  src: '../fonts/Lars-Mono.woff',
  variable: '--font-lars-mono',
});

export const fontVariables = `
  ${larsRegular.variable}
  ${larsBold.variable}
  ${larsBoldCondensed.variable}
  ${larsMedium.variable}
  ${larsMono.variable}
`;