import i18n from './i18n';

describe('i18n initialisation', () => {
  it('initialises without errors', () => {
    expect(i18n.isInitialized).toBe(true);
  });

  it('has en as the fallback language', () => {
    expect(i18n.options.fallbackLng).toEqual(['en']);
  });

  it('returns correct English string for navigation links', () => {
    expect(i18n.t('navigation.sections.skills')).toBe('Skills');
    expect(i18n.t('navigation.sections.projects')).toBe('Projects');
    expect(i18n.t('navigation.sections.contact')).toBe('Contact');
    expect(i18n.t('navigation.sections.about')).toBe('About');
  });

  it('returns correct profile strings', () => {
    expect(i18n.t('profile.title')).toBe('Software Engineer');
  });

  it('interpolates bio.education correctly', () => {
    expect(i18n.t('bio.education', { university: 'University of Limerick', year: 2027 })).toBe(
      'University of Limerick • Class of 2027',
    );
  });

  it('interpolates skills.ariaLabels.card correctly', () => {
    expect(i18n.t('skills.ariaLabels.card', { name: 'React' })).toBe('React skill');
  });

  it('interpolates projects.ariaLabels.card correctly', () => {
    expect(i18n.t('projects.ariaLabels.card', { title: 'NASA' })).toBe('NASA project');
  });

  it('interpolates contact.ariaLabels.email correctly', () => {
    expect(i18n.t('contact.ariaLabels.email', { email: 'test@example.com' })).toBe(
      'Email test@example.com',
    );
  });

  it('interpolates contact.ariaLabels.github correctly', () => {
    expect(i18n.t('contact.ariaLabels.github', { username: 'testuser' })).toBe(
      'Visit GitHub profile of testuser',
    );
  });

  it('returns skillsData as array with returnObjects', () => {
    const skillsData = i18n.t('skillsData', { returnObjects: true });
    expect(Array.isArray(skillsData)).toBe(true);
    expect(skillsData).toHaveProperty('[0].name', 'Java');
  });

  it('returns projectsData as array with returnObjects', () => {
    const projectsData = i18n.t('projectsData', { returnObjects: true });
    expect(Array.isArray(projectsData)).toBe(true);
    expect(projectsData).toHaveProperty('[0].title', 'Intercom');
  });

  it('falls back to English for unsupported language', () => {
    expect(i18n.t('navigation.sections.skills', { lng: 'fr' })).toBe('Skills');
  });

  it('uses French translations when language is set to French', async () => {
    i18n.addResourceBundle('fr', 'translation', {
      navigation: { sections: { skills: 'Compétences' } },
    });
    await i18n.changeLanguage('fr');

    expect(i18n.t('navigation.sections.skills')).toBe('Compétences');

    await i18n.changeLanguage('en');
  });

  it('falls back to English for keys missing from the active language', async () => {
    i18n.addResourceBundle('fr', 'translation', {
      navigation: { sections: { skills: 'Compétences' } },
    });
    await i18n.changeLanguage('fr');

    // 'about' is not in the French bundle — must fall back to English
    expect(i18n.t('navigation.sections.about')).toBe('About');

    await i18n.changeLanguage('en');
  });
});
