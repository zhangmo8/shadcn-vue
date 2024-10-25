import path from 'node:path'
import { transformerMetaWordHighlight } from '@shikijs/transformers'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vitepress'

import { siteConfig } from './theme/config/site'
import CodeWrapperPlugin from './theme/plugins/codewrapper'
import ComponentPreviewPlugin from './theme/plugins/previewer'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: siteConfig.name,
  titleTemplate: ':title - shadcn/vue',
  description: siteConfig.description,
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'shortcut icon', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],

    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: 'black' }],

    ['meta', { name: 'creator', content: 'radix-vue' }],
    ['meta', { name: 'theme-color', content: '#41b883' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: siteConfig.name }],
    ['meta', { name: 'og:image', content: siteConfig.ogImage }],
    ['meta', { name: 'twitter:image', content: siteConfig.ogImage }],
  ],

  sitemap: {
    hostname: 'https://www.shadcn-vue.com',
    transformItems(items) {
      return items.filter(item => !item.url.includes('migration'))
    },
  },

  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/:path',
      text: 'Edit this page on GitHub',
    },
    carbonAds: {
      code: 'CW7DK27U',
      placement: 'wwwshadcn-vuecom',
    },
  },

  srcDir: path.resolve(__dirname, '../src'),
  markdown: {
    codeTransformers: [
      transformerMetaWordHighlight(),
    ],
    config(md) {
      md.use(ComponentPreviewPlugin)
      md.use(CodeWrapperPlugin)
    },
  },
  rewrites: {
    'content/(.*)': '(.*)',
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwind() as any,
          autoprefixer(),
        ],
      },
    },
    plugins: [
      Icons({ compiler: 'vue3', autoInstall: true }) as any,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },
  },
})
