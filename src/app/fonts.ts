// app/fonts.ts
import localFont from 'next/font/local';

export const promptFont = localFont({
  src: [
    {
      path: '../../public/fonts/Prompt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Prompt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Prompt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-prompt',
  display: 'swap',
});
