import i18n from './i18n';
import fr from './locales/fr.json';
import { DEFAULT_LANG, defaultLocale } from './localeConfig';
import { UNSUPPORTED_LANG_CODE, TEST_LANG_FR, I18N_TRANSLATION_NAMESPACE } from '../config';

describe('i18n initialisation', () => {
  it('falls back to the default language for unsupported language', () => {
    expect(i18n.t('navigation.sections.skills', { lng: UNSUPPORTED_LANG_CODE })).toBe(
      defaultLocale.navigation.sections.skills,
    );
  });

  it('uses French translations when language is set to French', async () => {
    i18n.addResourceBundle(TEST_LANG_FR, I18N_TRANSLATION_NAMESPACE, {
      navigation: { sections: { skills: fr.navigation.sections.skills } },
    });
    await i18n.changeLanguage(TEST_LANG_FR);

    expect(i18n.t('navigation.sections.skills')).toBe(fr.navigation.sections.skills);

    await i18n.changeLanguage(DEFAULT_LANG);
  });
});
