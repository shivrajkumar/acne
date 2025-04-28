// app/fonts.ts

import { Plus_Jakarta_Sans, Nunito_Sans, Lato } from 'next/font/google';

export const lato = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
    display: 'swap',
    variable: '--font-lato',
});

export const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-plus-jakarta',
});

export const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-nunito',
});

