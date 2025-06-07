/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'system-ui', 'sans-serif'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-stone-200)',
            '--tw-prose-headings': 'var(--color-stone-100)',
            '--tw-prose-lead': 'var(--color-stone-300)',
            '--tw-prose-links': 'var(--color-green-500)',
            '--tw-prose-medium': 'var(--color-stone-100)',
            '--tw-prose-bold': 'var(--color-stone-100)',
            '--tw-prose-counters': 'var(--color-stone-400)',
            '--tw-prose-bullets': 'var(--color-stone-500)',
            '--tw-prose-hr': 'var(--color-slate-700)',
            '--tw-prose-quotes': 'var(--color-stone-200)',
            '--tw-prose-quote-borders': 'var(--color-slate-700)',
            '--tw-prose-captions': 'var(--color-stone-400)',
            '--tw-prose-code': 'var(--color-stone-100)',
            '--tw-prose-pre-code': 'var(--color-stone-200)',
            '--tw-prose-pre-bg': 'var(--color-slate-800)',
            '--tw-prose-th-borders': 'var(--color-slate-600)',
            '--tw-prose-td-borders': 'var(--color-slate-700)',
            // Set strong/bold elements to medium weight instead of heavy
            strong: {
              fontWeight: '500', // medium instead of 600-700
            },
            b: {
              fontWeight: '500', // medium instead of 600-700
            },
            // Set blockquotes to normal weight instead of bold
            blockquote: {
              fontWeight: '400', // normal instead of bold
            },
          },
        },
      }),
    },
  },
};
