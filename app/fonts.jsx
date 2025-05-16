// app/fonts.ts

import localFont from 'next/font/local'

export const lato = localFont({
  src: [
    {
      path: '../assets/font/lato-v24-latin-regular.woff2',
      weight: '400', // Regular font weight
      style: 'normal',
    },
    {
      path: '../assets/font/lato-v24-latin-300.woff2',
      weight: '300', // Light font weight
      style: 'thin',
    },
    {
      path: '../assets/font/lato-v24-latin-700.woff2',
      weight: '700', // Bold font weight
      style: 'bold',
    },
  ],
  variable: "--font-lato"
});

