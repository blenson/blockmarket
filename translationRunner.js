const manageTranslations = require('react-intl-translations-manager').default;

// es2015 import
// import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
  messagesDirectory: 'src/i18n/messages',
  translationsDirectory: 'src/i18n/locales/',
  whitelistsDirectory: 'src/i18n/locales/whitelists/',
  languages: ['en-gb', 'fr', 'de', 'es', 'ja'], // any language you need
  singleMessagesFile: false,
  detectDuplicateIds: true,
  sortKeys: true,
  jsonOptions: {
    space: 4,
    trailingNewline: true
  },
  overridePrinters: {
    printDuplicateIds: duplicateIds => {
      console.log(`You have ${duplicateIds.length} duplicate IDs`);
    },
    printLanguageReport: report => {
      console.log('Log report for a language');
    },
    printNoLanguageFile: lang => {
      console.log(
        `No existing ${lang} translation file found. A new one is created.`
      );
    },
    printNoLanguageWhitelistFile: lang => {
      console.log(`No existing ${lang} file found. A new one is created.`);
    }
  }
});
