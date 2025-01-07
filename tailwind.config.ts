import { nextui } from '@nextui-org/react'
import defaultTheme from 'tailwindcss/defaultTheme'
import { commonColors } from '@nextui-org/theme/colors'
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './src/*.{js,ts,jsx,tsx,mdx}',
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/hooks/**/*.{js,ts,jsx,tsx}',
        './src/utils/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'code-foreground': 'rgb(var(--code-foreground) / <alpha-value>)',
                'code-syntax1': 'rgb(var(--code-syntax1) / <alpha-value>)',
                'code-syntax2': 'rgb(var(--code-syntax2) / <alpha-value>)',
                'code-syntax3': 'rgb(var(--code-syntax3) / <alpha-value>)',
                'code-syntax4': 'rgb(var(--code-syntax4) / <alpha-value>)',
                'code-syntax5': 'rgb(var(--code-syntax5) / <alpha-value>)',
                'code-syntax6': 'rgb(var(--code-syntax6) / <alpha-value>)',
                'code-removed': 'rgb(var(--code-removed) / <alpha-value>)',
                'code-string': 'rgb(var(--code-string) / <alpha-value>)',
                'code-class': 'rgb(var(--code-class) / <alpha-value>)',
                'code-punctuation': 'rgb(var(--code-punctuation) / <alpha-value>)',
                'code-number': 'rgb(var(--code-number) / <alpha-value>)',
                'code-added': 'rgb(var(--code-added) / <alpha-value>)',
                'code-line-number': 'rgb(var(--code-line-number) / <alpha-value>)',
                'code-faded-line': 'rgb(var(--code-faded-line) / <alpha-value>)',
                'code-comment': 'rgb(var(--code-comment) / <alpha-value>)',
                'code-keyword': 'rgb(var(--code-keyword) / <alpha-value>)',
                'code-function': 'rgb(var(--code-function) / <alpha-value>)',
                'code-tag': 'rgb(var(--code-tag) / <alpha-value>)',
                'code-attr-name': 'rgb(var(--code-attr-name) / <alpha-value>)',
                'code-language-javascript': 'rgb(var(--code-language-javascript) / <alpha-value>)',
                'code-highlighted-word1-bg':
                    'rgb(var(--code-highlighted-word1-bg) / <alpha-value>)',
                'code-highlighted-word1-bg-active':
                    'rgb(var(--code-highlighted-word1-bg-active) / <alpha-value>)',
                'code-highlighted-word1-text':
                    'rgb(var(--code-highlighted-word1-text) / <alpha-value>)',
                'code-highlighted-word2-bg':
                    'rgb(var(--code-highlighted-word2-bg) / <alpha-value>)',
                'code-highlighted-word2-bg-active':
                    'rgb(var(--code-highlighted-word2-bg-active) / <alpha-value>)',
                'code-highlighted-word2-text':
                    'rgb(var(--code-highlighted-word2-text) / <alpha-value>)',
                'code-highlighted-word3-bg':
                    'rgb(var(--code-highlighted-word3-bg) / <alpha-value>)',
                'code-highlighted-word3-bg-active':
                    'rgb(var(--code-highlighted-word3-bg-active) / <alpha-value>)',
                'code-highlighted-word3-text':
                    'rgb(var(--code-highlighted-word3-text) / <alpha-value>)',
                customPink: '#ff005d',
                customDark: '#12000a',
                customBg: '#240015',
                customGradient: '#12000b'
            },
            boxShadow: {
                highlighted: `${commonColors.purple[500]} 1px 0 0, ${commonColors.purple[500]} -1px 0 0`
            },
            backgroundImage: {
                'maddons-bg': 'url(/background5.webp)',
                'maddons-light': 'url(/background1.webp)',
                'custom-radial':
                    'radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.6) 100%, rgba(0, 0, 0, 0.6) 100%)'
            },
            fontFamily: {
                sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
                serif: defaultTheme.fontFamily.serif,
                mono: defaultTheme.fontFamily.mono,
                audiowide: ["'Audiowide'", 'sans-serif']
            },
            keyframes: {
                fadeInText: {
                    '0%': { color: '#12000a', 'text-shadow': '0px 0px 4px #12000a' },
                    '70%': { color: '#ff005d', 'text-shadow': '0px 0px 14px #ff005d' },
                    '100%': { color: '#ff005d', 'text-shadow': '0px 0px 4px #ff005d' }
                },
                flicker4: {
                    '0%': { color: '#ff005d', 'text-shadow': '0px 0px 4px #ff005d' }
                },
                hueRotate: {
                    '0%': { filter: 'hue-rotate(0deg)' },
                    '50%': { filter: 'hue-rotate(-120deg)' },
                    '100%': { filter: 'hue-rotate(0deg)' }
                },
                heartbeat: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' }
                },
                levitate: {
                    '0%': {
                        transform: 'translateY(0)'
                    },
                    '30%': {
                        transform: 'translateY(-10px)'
                    },
                    '50%': {
                        transform: 'translateY(4px)'
                    },
                    '70%': {
                        transform: 'translateY(-15px)'
                    },
                    '100%': {
                        transform: 'translateY(0)'
                    }
                },
                expand: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' }
                },
                'expand-opacity': {
                    '0%': {
                        opacity: 0,
                        transform: 'scale(1)'
                    },
                    '50%': {
                        opacity: 1,
                        transform: 'scale(1.3)'
                    },
                    '100%': {
                        opacity: 0,
                        transform: 'scale(1.295)'
                    }
                },
                'text-gradient': {
                    to: {
                        backgroundPosition: '-200% center'
                    }
                }
            },
            animation: {
                heartbeat: 'heartbeat 1s ease-in-out infinite',
                levitate: 'levitate 5s ease infinite',
                expand: 'expand 6s ease-out infinite both',
                'expand-opacity': 'expand-opacity 6s linear infinite both',
                'text-gradient': 'text-gradient 4s linear 0s infinite normal forwards running',
                fadeInText: 'fadeInText 3s ease-in 3.5s forwards',
                flicker4: 'flicker4 5s linear 7.5s infinite',
                hueRotate: 'hueRotate 6s ease-in-out 3s infinite'
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: 'hsl(var(--nextui-foreground))',
                        maxWidth: 'none',
                        hr: {
                            marginTop: '2em',
                            marginBottom: '2em'
                        },
                        'h1, h2, h3': {
                            letterSpacing: '-0.025em'
                        },
                        h2: {
                            marginTop: '1.5em',
                            marginBottom: `${16 / 24}em`
                        },
                        h3: {
                            marginTop: '1.8em',
                            lineHeight: '1.4'
                        },
                        h4: {
                            marginTop: '2em',
                            fontSize: '1.125em'
                        },
                        'h2 a': {
                            fontSize: `${theme('fontSize.2xl')[0]} !important`,
                            fontWeight: theme('fontWeight.semibold'),
                            ...theme('fontSize.2xl')[1]
                        },
                        'h3 a': {
                            fontSize: '1.25rem !important',
                            fontWeight: theme('fontWeight.medium')
                        },
                        'h2 small, h3 small, h4 small': {
                            fontFamily: theme('fontFamily.mono').join(', '),
                            color: theme('colors.slate.500'),
                            fontWeight: 500
                        },
                        'h2 small': {
                            fontSize: theme('fontSize.lg')[0],
                            ...theme('fontSize.lg')[1]
                        },
                        'h3 small': {
                            fontSize: theme('fontSize.base')[0],
                            ...theme('fontSize.base')[1]
                        },
                        'h4 small': {
                            fontSize: theme('fontSize.sm')[0],
                            ...theme('fontSize.sm')[1]
                        },
                        'h2, h3, h4': {
                            'scroll-margin-top': 'var(--scroll-mt)'
                        },
                        ul: {
                            listStyleType: 'none',
                            paddingLeft: 0
                        },
                        'ul > li': {
                            marginTop: '0.1em',
                            marginBottom: '0.1em',
                            fontWeight: theme('fontWeight.normal')
                        },
                        'ul > li > *:last-child': {
                            marginTop: 0,
                            marginBottom: 0
                        },
                        'ul > li > a': {
                            marginTop: '0',
                            marginBottom: '0'
                        },
                        a: {
                            fontWeight: theme('fontWeight.normal')
                        },
                        'a code': {
                            color: 'inherit',
                            fontWeight: 'inherit'
                        },
                        strong: {
                            color: 'hsl(var(--nextui-strong))',
                            fontWeight: theme('fontWeight.semibold')
                        },
                        'a strong': {
                            color: 'inherit',
                            fontWeight: 'inherit'
                        },
                        kbd: {
                            fontSize: '0.875em',
                            fontVariantLigatures: 'none',
                            borderRadius: '4px',
                            margin: '0 1px'
                        },
                        code: {
                            fontWeight: theme('fontWeight.medium'),
                            fontVariantLigatures: 'none'
                        },
                        pre: {
                            display: 'flex',
                            fontSize: theme('fontSize.sm')[0],
                            backgroundColor: 'transparent',
                            fontWeight: theme('fontWeight.light'),
                            padding: 0,
                            margin: 0
                        },
                        p: {
                            marginTop: `${12 / 14}em`,
                            marginBottom: `${12 / 14}em`,
                            fontWeight: theme('fontWeight.normal')
                        },
                        'pre code': {
                            flex: 'none',
                            minWidth: '100%'
                        },
                        table: {
                            marginTop: '0px',
                            fontSize: theme('fontSize.sm')[0],
                            lineHeight: theme('fontSize.sm')[1].lineHeight
                        },
                        thead: {
                            border: 'none'
                        },
                        'thead th': {
                            paddingTop: 0,
                            fontWeight: theme('fontWeight.semibold')
                        },
                        'tbody tr': {
                            border: 'none'
                        },
                        'tbody tr:last-child': {
                            border: 'none'
                        },
                        'figure figcaption': {
                            textAlign: 'center',
                            fontStyle: 'italic'
                        },
                        'figure > figcaption': {
                            marginTop: `${12 / 14}em`
                        },
                        blockquote: {
                            fontWeight: theme('fontWeight.normal'),
                            fontStyle: 'font-normal'
                        },
                        'code::before': {
                            content: ''
                        },
                        'code::after': {
                            content: ''
                        },
                        'blockquote p:first-of-type::before': {
                            content: ''
                        },
                        'blockquote p:last-of-type::after': {
                            content: ''
                        }
                    }
                },
                dark: {
                    css: {
                        color: 'hsl(var(--nextui-default-700))',
                        strong: {
                            color: 'hsl(var(--nextui-cyan-500))'
                        }
                    }
                },
                neutral: {
                    css: {
                        '--tw-prose-body': 'hsl(var(--nextui-default-700))',
                        '--tw-prose-headings': 'hsl(var(--nextui-foreground))',
                        '--tw-prose-lead': 'hsl(var(--nextui-default-600))',
                        '--tw-prose-links': 'hsl(var(--nextui-default-900))',
                        '--tw-prose-bold': 'hsl(var(--nextui-default-900))',
                        '--tw-prose-counters': 'hsl(var(--nextui-default-500))',
                        '--tw-prose-bullets': 'hsl(var(--nextui-default-300))',
                        '--tw-prose-hr': 'hsl(var(--nextui-default-200))',
                        '--tw-prose-quotes': 'hsl(var(--nextui-default-900))',
                        '--tw-prose-quote-borders': 'hsl(var(--nextui-default-200))',
                        '--tw-prose-captions': 'hsl(var(--nextui-default-500))',
                        '--tw-prose-code': 'hsl(var(--nextui-default-900))',
                        '--tw-prose-pre-code': 'hsl(var(--nextui-default-200))',
                        '--tw-prose-pre-bg': 'hsl(var(--nextui-default-800))',
                        '--tw-prose-th-borders': 'hsl(var(--nextui-default-300))',
                        '--tw-prose-td-borders': 'hsl(var(--nextui-default-200))',
                        '--tw-prose-invert-body': 'hsl(var(--nextui-default-300))',
                        '--tw-prose-invert-headings': commonColors.white,
                        '--tw-prose-invert-lead': theme('twColors.neutral[400]'),
                        '--tw-prose-invert-links': commonColors.white,
                        '--tw-prose-invert-bold': commonColors.white,
                        '--tw-prose-invert-counters': theme('twColors.neutral[400]'),
                        '--tw-prose-invert-bullets': theme('twColors.neutral[600]'),
                        '--tw-prose-invert-hr': theme('twColors.neutral[700]'),
                        '--tw-prose-invert-quotes': theme('twColors.neutral[100]'),
                        '--tw-prose-invert-quote-borders': theme('twColors.neutral[700]'),
                        '--tw-prose-invert-captions': theme('twColors.neutral[400]'),
                        '--tw-prose-invert-code': commonColors.white,
                        '--tw-prose-invert-pre-code': 'hsl(var(--nextui-default-300))',
                        '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
                        '--tw-prose-invert-th-borders': theme('twColors.neutral[600]'),
                        '--tw-prose-invert-td-borders': theme('twColors.neutral[700]')
                    }
                }
            })
        }
    },
    plugins: [nextui(), require('@tailwindcss/typography')]
}
