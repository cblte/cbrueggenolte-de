/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-lead': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-medium': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-hr': 'inherit',
            '--tw-prose-quotes': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-captions': 'inherit',
            '--tw-prose-code': 'inherit',
            '--tw-prose-pre-code': 'inherit',
            '--tw-prose-pre-bg': 'inherit',
            '--tw-prose-th-borders': 'inherit',
            '--tw-prose-td-borders': 'inherit',
            strong: {
              fontWeight: '600',
            },
            b: {
              fontWeight: '600',
            },
            blockquote: {
              fontWeight: '400',
            },
            h1: {
              fontWeight: '600',
              color: 'var(--color-stone-800)',
              fontSize: '1.5rem',
            },
            h2: {
              fontWeight: '600', // medium instead of bold
              color: 'var(--color-stone-800)',
              fontSize: '1.25rem',
            },
            h3: {
              fontWeight: '600', // medium instead of bold
              color: 'var(--color-stone-800)',
              fontSize: '1.1rem',
            },
          },
        },
      }),
    },
  },
};
