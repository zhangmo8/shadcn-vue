import type { HighlighterCore } from 'shiki/core'
import type { ThemeOptions } from 'vitepress'
import { computedAsync } from '@vueuse/core'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export const shikiThemes: ThemeOptions = {
  light: 'vitesse-light',
  dark: 'vitesse-dark',
}

export const highlighter = computedAsync<HighlighterCore>(async (onCancel) => {
  const shiki = await createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    themes: [
      () => import('shiki/themes/dark-plus.mjs'),
      () => import('shiki/themes/light-plus.mjs'),
    ],
    langs: [
      () => import('shiki/langs/javascript.mjs'),
      () => import('shiki/langs/vue.mjs'),
    ],
  })

  onCancel(() => shiki?.dispose())
  return shiki
})

export function highlight(code: string, lang: string) {
  if (!highlighter.value)
    return code

  return highlighter.value.codeToHtml(code, {
    lang,
    defaultColor: false,
    themes: {
      dark: 'dark-plus',
      light: 'light-plus',
    },
  })
}
