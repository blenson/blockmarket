import locales from "../locales";

export function translate (locale, key) {
    return (locales[locale][key]);
}
