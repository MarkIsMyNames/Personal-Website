import { statSync } from 'fs';
import { resolve } from 'path';
import en from './en.json';
import { MAX_IMAGE_SIZE_BYTES, EMPTY_LENGTH, KIB_CONVERSION_FACTOR } from '../../config';

describe('en.json structure', () => {
  it('has all required top-level keys', () => {
    expect(en).toHaveProperty('navigation');
    expect(en).toHaveProperty('bio');
    expect(en).toHaveProperty('skills');
    expect(en).toHaveProperty('projects');
    expect(en).toHaveProperty('imageModal');
    expect(en).toHaveProperty('contact');
    expect(en).toHaveProperty('profile');
    expect(en).toHaveProperty('skillsData');
    expect(en).toHaveProperty('projectsData');
  });

  it('each skill has a non-empty name and iconName', () => {
    en.skillsData.forEach((skill, i) => {
      expect(skill.name, `skill at index ${i} name`).toBeTruthy();
      expect(skill.iconName, `skill at index ${i} iconName`).toBeTruthy();
    });
  });

  it('each project has all required non-empty fields', () => {
    en.projectsData.forEach((project, i) => {
      expect(project.title, `project ${i} title`).toBeTruthy();
      expect(project.role, `project ${i} role`).toBeTruthy();
      expect(project.description, `project ${i} description`).toBeTruthy();
      expect(project.highlights, `project ${i} highlights`).toBeInstanceOf(Array);
      expect(
        project.highlights.length,
        `project ${i} highlights must be non-empty`,
      ).toBeGreaterThan(EMPTY_LENGTH);
      expect(project.tags, `project ${i} tags`).toBeInstanceOf(Array);
      expect(project.tags.length, `project ${i} tags must be non-empty`).toBeGreaterThan(
        EMPTY_LENGTH,
      );
      expect(project.images, `project ${i} images`).toBeInstanceOf(Array);
      expect(project.images.length, `project ${i} images must be non-empty`).toBeGreaterThan(
        EMPTY_LENGTH,
      );
    });
  });

  it('profile has all required non-empty fields', () => {
    expect(en.profile.name).toBeTruthy();
    expect(en.profile.title).toBeTruthy();
    expect(en.profile.bio).toBeTruthy();
    expect(en.profile.image).toBeTruthy();
    expect(en.profile.email).toBeTruthy();
    expect(en.profile.github).toBeTruthy();
    expect(en.profile.university).toBeTruthy();
    expect(en.profile.graduationYear).toBeGreaterThan(EMPTY_LENGTH);
  });

  it('all navigation section names are non-empty', () => {
    Object.entries(en.navigation.sections).forEach(([key, value]) => {
      expect(value, `navigation.sections.${key}`).toBeTruthy();
    });
  });

  it('bio.education contains {{university}} and {{year}} placeholders', () => {
    expect(en.bio.education).toContain('{{university}}');
    expect(en.bio.education).toContain('{{year}}');
  });

  it('bio.ariaLabels.image contains {{name}} and {{title}} placeholders', () => {
    expect(en.bio.ariaLabels.image).toContain('{{name}}');
    expect(en.bio.ariaLabels.image).toContain('{{title}}');
  });

  it('skills.ariaLabels.card contains {{name}} placeholder', () => {
    expect(en.skills.ariaLabels.card).toContain('{{name}}');
  });

  it('projects.ariaLabels.card contains {{title}} placeholder', () => {
    expect(en.projects.ariaLabels.card).toContain('{{title}}');
  });

  it('projects.ariaLabels.viewImage contains {{index}} and {{title}} placeholders', () => {
    expect(en.projects.ariaLabels.viewImage).toContain('{{index}}');
    expect(en.projects.ariaLabels.viewImage).toContain('{{title}}');
  });

  it('contact.ariaLabels.email contains {{email}} placeholder', () => {
    expect(en.contact.ariaLabels.email).toContain('{{email}}');
  });

  it('contact.ariaLabels.github contains {{username}} placeholder', () => {
    expect(en.contact.ariaLabels.github).toContain('{{username}}');
  });

  it('imageModal has all required aria-label keys', () => {
    expect(en.imageModal.ariaLabels.modal).toBeTruthy();
    expect(en.imageModal.ariaLabels.close).toBeTruthy();
    expect(en.imageModal.ariaLabels.previous).toBeTruthy();
    expect(en.imageModal.ariaLabels.next).toBeTruthy();
    expect(en.imageModal.ariaLabels.image).toContain('{{index}}');
  });

  it('skills have no duplicate names', () => {
    const names = en.skillsData.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('skills have no duplicate iconNames', () => {
    const iconNames = en.skillsData.map((s) => s.iconName);
    expect(new Set(iconNames).size).toBe(iconNames.length);
  });

  it('projects have no duplicate titles', () => {
    const titles = en.projectsData.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('projects have no duplicate descriptions', () => {
    const descriptions = en.projectsData.map((p) => p.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it('projects have no empty highlight text', () => {
    en.projectsData.forEach((project) => {
      project.highlights.forEach((highlight) => {
        expect(highlight).toBeTruthy();
      });
    });
  });

  it('projects have no duplicate highlights within a project', () => {
    en.projectsData.forEach((project) => {
      expect(new Set(project.highlights).size).toBe(project.highlights.length);
    });
  });

  it('projects have no duplicate highlights across all projects', () => {
    const allHighlights = en.projectsData.flatMap((p) => p.highlights);
    expect(new Set(allHighlights).size).toBe(allHighlights.length);
  });

  it('projects have no duplicate tags within a project', () => {
    en.projectsData.forEach((project) => {
      expect(new Set(project.tags).size).toBe(project.tags.length);
    });
  });

  it('projects have no duplicate images within a project', () => {
    en.projectsData.forEach((project) => {
      expect(new Set(project.images).size).toBe(project.images.length);
    });
  });

  it('projects have no duplicate images across all projects', () => {
    const allImages = en.projectsData.flatMap((p) => p.images);
    expect(new Set(allImages).size).toBe(allImages.length);
  });

  const allImages = [en.profile.image, ...en.projectsData.flatMap((p) => p.images)];
  const publicDir = resolve(process.cwd(), 'public');

  it.each(allImages)('%s is under 120 KiB', (image) => {
    const { size } = statSync(resolve(publicDir, image));
    expect(
      size,
      `${image} is ${Math.round(size / KIB_CONVERSION_FACTOR)} KiB — must be under 120 KiB`,
    ).toBeLessThan(MAX_IMAGE_SIZE_BYTES);
  });

  it('has all keys used by components', () => {
    // Navigation
    expect(en.navigation.ariaLabels.nav).toBeTruthy();
    expect(en.navigation.ariaLabels.link).toContain('{{section}}');
    expect(en.navigation.sections.about).toBeTruthy();
    expect(en.navigation.sections.skills).toBeTruthy();
    expect(en.navigation.sections.projects).toBeTruthy();
    expect(en.navigation.sections.contact).toBeTruthy();
    // Common
    expect(en.common.ariaLabels.section).toContain('{{title}}');
    // Bio
    expect(en.bio.ariaLabels.biography).toBeTruthy();
    expect(en.bio.ariaLabels.education).toBeTruthy();
    expect(en.bio.ariaLabels.image).toBeTruthy();
    expect(en.bio.education).toBeTruthy();
    // Skills
    expect(en.skills.sectionTitle).toBeTruthy();
    expect(en.skills.ariaLabels.list).toBeTruthy();
    expect(en.skills.ariaLabels.card).toBeTruthy();
    // Projects
    expect(en.projects.sectionTitle).toBeTruthy();
    expect(en.projects.ariaLabels.list).toBeTruthy();
    expect(en.projects.ariaLabels.card).toBeTruthy();
    expect(en.projects.ariaLabels.viewImage).toBeTruthy();
    // ImageModal
    expect(en.imageModal.ariaLabels.modal).toBeTruthy();
    expect(en.imageModal.ariaLabels.close).toBeTruthy();
    expect(en.imageModal.ariaLabels.previous).toBeTruthy();
    expect(en.imageModal.ariaLabels.next).toBeTruthy();
    expect(en.imageModal.ariaLabels.image).toContain('{{index}}');
    // Contact
    expect(en.contact.sectionTitle).toBeTruthy();
    expect(en.contact.ariaLabels.list).toBeTruthy();
    expect(en.contact.ariaLabels.email).toBeTruthy();
    expect(en.contact.ariaLabels.github).toBeTruthy();
    expect(en.contact.githubUrl).toContain('{{username}}');
  });
});
