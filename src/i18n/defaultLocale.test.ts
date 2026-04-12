import { statSync } from 'fs';
import { resolve } from 'path';
import { defaultLocale, DEFAULT_LOCALE_FILENAME } from './localeConfig';
import { EnTopLevelKeys, Field } from '../types';
import {
  MAX_IMAGE_SIZE_BYTES,
  EMPTY_LENGTH,
  KIB_CONVERSION_FACTOR,
  PUBLIC_DIR,
  MSG_MUST_BE_NON_EMPTY,
  MAX_IMAGE_SIZE_KIB,
  MSG_KIB_LIMIT_SUFFIX,
  MSG_SKILL_AT_INDEX,
  MSG_PROJECT,
  KIB_UNIT,
  MSG_IS_UNDER,
} from '../config';

const expectNoDuplicates = (arr: string[]): void => {
  expect(new Set(arr).size).toBe(arr.length);
};

describe(DEFAULT_LOCALE_FILENAME, () => {
  it('has all required top-level keys', () => {
    EnTopLevelKeys.forEach((key) => {
      expect(defaultLocale).toHaveProperty(key);
    });
  });

  it('each skill has a non-empty name and iconName', () => {
    defaultLocale.skillsData.forEach((skill, i) => {
      expect(skill.name, `${MSG_SKILL_AT_INDEX} ${i} ${Field.Name}`).toBeTruthy();
      expect(skill.iconName, `${MSG_SKILL_AT_INDEX} ${i} ${Field.IconName}`).toBeTruthy();
    });
  });

  it('each project has all required non-empty fields', () => {
    defaultLocale.projectsData.forEach((project, i) => {
      expect(project.title, `${MSG_PROJECT} ${i} ${Field.Title}`).toBeTruthy();
      expect(project.role, `${MSG_PROJECT} ${i} ${Field.Role}`).toBeTruthy();
      expect(project.description, `${MSG_PROJECT} ${i} ${Field.Description}`).toBeTruthy();
      expect(project.highlights, `${MSG_PROJECT} ${i} ${Field.Highlights}`).toBeInstanceOf(Array);
      expect(
        project.highlights.length,
        `${MSG_PROJECT} ${i} ${Field.Highlights} ${MSG_MUST_BE_NON_EMPTY}`,
      ).toBeGreaterThan(EMPTY_LENGTH);
      expect(project.tags, `${MSG_PROJECT} ${i} ${Field.Tags}`).toBeInstanceOf(Array);
      expect(
        project.tags.length,
        `${MSG_PROJECT} ${i} ${Field.Tags} ${MSG_MUST_BE_NON_EMPTY}`,
      ).toBeGreaterThan(EMPTY_LENGTH);
      expect(project.images, `${MSG_PROJECT} ${i} ${Field.Images}`).toBeInstanceOf(Array);
      expect(
        project.images.length,
        `${MSG_PROJECT} ${i} ${Field.Images} ${MSG_MUST_BE_NON_EMPTY}`,
      ).toBeGreaterThan(EMPTY_LENGTH);
    });
  });

  it('profile has all required non-empty fields', () => {
    expect(defaultLocale.profile.name).toBeTruthy();
    expect(defaultLocale.profile.title).toBeTruthy();
    expect(defaultLocale.profile.bio).toBeTruthy();
    expect(defaultLocale.profile.image).toBeTruthy();
    expect(defaultLocale.profile.email).toBeTruthy();
    expect(defaultLocale.profile.github).toBeTruthy();
    expect(defaultLocale.profile.university).toBeTruthy();
    expect(defaultLocale.profile.graduationYear).toBeGreaterThan(EMPTY_LENGTH);
  });

  it('all navigation section names are non-empty', () => {
    Object.entries(defaultLocale.navigation.sections).forEach(([key, value]) => {
      expect(value, key).toBeTruthy();
    });
  });

  it('bio.education contains {{university}} and {{year}} placeholders', () => {
    expect(defaultLocale.bio.education).toContain('{{university}}');
    expect(defaultLocale.bio.education).toContain('{{year}}');
  });

  it('bio.ariaLabels.image contains {{name}} and {{title}} placeholders', () => {
    expect(defaultLocale.bio.ariaLabels.image).toContain('{{name}}');
    expect(defaultLocale.bio.ariaLabels.image).toContain('{{title}}');
  });

  it('skills.ariaLabels.card contains {{name}} placeholder', () => {
    expect(defaultLocale.skills.ariaLabels.card).toContain('{{name}}');
  });

  it('projects.ariaLabels.card contains {{title}} placeholder', () => {
    expect(defaultLocale.projects.ariaLabels.card).toContain('{{title}}');
  });

  it('projects.ariaLabels.viewImage contains {{index}} and {{title}} placeholders', () => {
    expect(defaultLocale.projects.ariaLabels.viewImage).toContain('{{index}}');
    expect(defaultLocale.projects.ariaLabels.viewImage).toContain('{{title}}');
  });

  it('contact.ariaLabels.email contains {{email}} placeholder', () => {
    expect(defaultLocale.contact.ariaLabels.email).toContain('{{email}}');
  });

  it('contact.ariaLabels.github contains {{username}} placeholder', () => {
    expect(defaultLocale.contact.ariaLabels.github).toContain('{{username}}');
  });

  it('imageModal has all required aria-label keys', () => {
    expect(defaultLocale.imageModal.ariaLabels.modal).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.close).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.previous).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.next).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.image).toContain('{{index}}');
  });

  it('skills have no duplicate names', () => {
    expectNoDuplicates(defaultLocale.skillsData.map((s) => s.name));
  });

  it('skills have no duplicate iconNames', () => {
    expectNoDuplicates(defaultLocale.skillsData.map((s) => s.iconName));
  });

  it('projects have no duplicate titles', () => {
    expectNoDuplicates(defaultLocale.projectsData.map((p) => p.title));
  });

  it('projects have no duplicate descriptions', () => {
    expectNoDuplicates(defaultLocale.projectsData.map((p) => p.description));
  });

  it('projects have no empty highlight text', () => {
    defaultLocale.projectsData.forEach((project) => {
      project.highlights.forEach((highlight) => {
        expect(highlight).toBeTruthy();
      });
    });
  });

  it('projects have no duplicate highlights within a project', () => {
    defaultLocale.projectsData.forEach((project) => {
      expectNoDuplicates(project.highlights);
    });
  });

  it('projects have no duplicate highlights across all projects', () => {
    expectNoDuplicates(defaultLocale.projectsData.flatMap((p) => p.highlights));
  });

  it('projects have no duplicate tags within a project', () => {
    defaultLocale.projectsData.forEach((project) => {
      expectNoDuplicates(project.tags);
    });
  });

  it('projects have no duplicate images within a project', () => {
    defaultLocale.projectsData.forEach((project) => {
      expectNoDuplicates(project.images);
    });
  });

  it('projects have no duplicate images across all projects', () => {
    expectNoDuplicates(defaultLocale.projectsData.flatMap((p) => p.images));
  });

  const allImages = [
    defaultLocale.profile.image,
    ...defaultLocale.projectsData.flatMap((p) => p.images),
  ];
  const publicDir = resolve(process.cwd(), PUBLIC_DIR);

  it.each(allImages)(`%s ${MSG_IS_UNDER} ${MAX_IMAGE_SIZE_KIB} ${KIB_UNIT}`, (image) => {
    const { size } = statSync(resolve(publicDir, image));
    expect(
      size,
      `${image} is ${Math.round(size / KIB_CONVERSION_FACTOR)}${MSG_KIB_LIMIT_SUFFIX} ${MAX_IMAGE_SIZE_KIB} ${KIB_UNIT}`,
    ).toBeLessThan(MAX_IMAGE_SIZE_BYTES);
  });

  it('has all keys used by components', () => {
    // Navigation
    expect(defaultLocale.navigation.ariaLabels.nav).toBeTruthy();
    expect(defaultLocale.navigation.ariaLabels.link).toContain('{{section}}');
    expect(defaultLocale.navigation.sections.about).toBeTruthy();
    expect(defaultLocale.navigation.sections.skills).toBeTruthy();
    expect(defaultLocale.navigation.sections.projects).toBeTruthy();
    expect(defaultLocale.navigation.sections.contact).toBeTruthy();
    // Common
    expect(defaultLocale.common.ariaLabels.section).toContain('{{title}}');
    // Bio
    expect(defaultLocale.bio.ariaLabels.biography).toBeTruthy();
    expect(defaultLocale.bio.ariaLabels.education).toBeTruthy();
    expect(defaultLocale.bio.ariaLabels.image).toBeTruthy();
    expect(defaultLocale.bio.education).toBeTruthy();
    // Skills
    expect(defaultLocale.skills.sectionTitle).toBeTruthy();
    expect(defaultLocale.skills.ariaLabels.list).toBeTruthy();
    expect(defaultLocale.skills.ariaLabels.card).toBeTruthy();
    // Projects
    expect(defaultLocale.projects.sectionTitle).toBeTruthy();
    expect(defaultLocale.projects.ariaLabels.list).toBeTruthy();
    expect(defaultLocale.projects.ariaLabels.card).toBeTruthy();
    expect(defaultLocale.projects.ariaLabels.viewImage).toBeTruthy();
    // ImageModal
    expect(defaultLocale.imageModal.ariaLabels.modal).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.close).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.previous).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.next).toBeTruthy();
    expect(defaultLocale.imageModal.ariaLabels.image).toContain('{{index}}');
    // Contact
    expect(defaultLocale.contact.sectionTitle).toBeTruthy();
    expect(defaultLocale.contact.ariaLabels.list).toBeTruthy();
    expect(defaultLocale.contact.ariaLabels.email).toBeTruthy();
    expect(defaultLocale.contact.ariaLabels.github).toBeTruthy();
    expect(defaultLocale.contact.githubUrl).toContain('{{username}}');
  });
});
