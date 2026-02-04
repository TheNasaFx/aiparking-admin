import mn from "./mn";

const locales = { mn };
let currentLocale = "mn";

export function setLocale(locale) {
  if (locales[locale]) {
    currentLocale = locale;
  }
}

export function t(key) {
  const keys = key.split(".");
  let value = locales[currentLocale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  return value;
}

export function useLocale() {
  return {
    t,
    setLocale,
    currentLocale: () => currentLocale,
  };
}

export default { t, setLocale, useLocale };
