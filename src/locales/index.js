import { createI18n } from "vue-i18n";

import ru from "@/locales/ru.locale";
import uz from "@/locales/uz.locale";

export const i18n = createI18n({
  locale: "uz",
  legacy: false,
  globalInjection: true,
  messages: {
    uz,
    ru,
  },
});

export function setupI18n(options = { locale:'uz' }) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */

  document.querySelector("html").setAttribute("lang", locale);
}
