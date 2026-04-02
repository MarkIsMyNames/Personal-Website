import { statSync } from 'fs';
import { resolve } from 'path';
import { profile, skills, projects } from './portfolioData';

describe('Portfolio Data Structure', () => {
  describe('Profile', () => {
    it('has all required fields populated', () => {
      expect(profile.name).toBeTruthy();
      expect(profile.title).toBeTruthy();
      expect(profile.bio).toBeTruthy();
      expect(profile.image).toBeTruthy();
      expect(profile.email).toBeTruthy();
      expect(profile.github).toBeTruthy();
      expect(profile.university).toBeTruthy();
      expect(profile.graduationYear).toBeGreaterThan(0);
    });
  });

  describe('Skills', () => {
    it('has no duplicate names', () => {
      const names = skills.map((s) => s.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it('has no duplicate iconNames', () => {
      const iconNames = skills.map((s) => s.iconName);
      expect(new Set(iconNames).size).toBe(iconNames.length);
    });

    it('has no empty names or iconNames', () => {
      skills.forEach((skill) => {
        expect(skill.name).toBeTruthy();
        expect(skill.iconName).toBeTruthy();
      });
    });
  });

  describe('Projects', () => {
    it('has no duplicate project titles', () => {
      const titles = projects.map((p) => p.title);
      expect(new Set(titles).size).toBe(titles.length);
    });

    it('has no duplicate images across all projects', () => {
      const allImages = projects.flatMap((p) => p.images);
      expect(new Set(allImages).size).toBe(allImages.length);
    });

    it('every project has at least one highlight', () => {
      projects.forEach((project) => {
        expect(project.highlights.length).toBeGreaterThan(0);
      });
    });

    it('every project has at least one image', () => {
      projects.forEach((project) => {
        expect(project.images.length).toBeGreaterThan(0);
      });
    });

    it('every project has at least one tag', () => {
      projects.forEach((project) => {
        expect(project.tags.length).toBeGreaterThan(0);
      });
    });

    it('has no empty required fields on any project', () => {
      projects.forEach((project) => {
        expect(project.title).toBeTruthy();
        expect(project.role).toBeTruthy();
        expect(project.description).toBeTruthy();
      });
    });

    it('has no empty highlight text', () => {
      projects.forEach((project) => {
        project.highlights.forEach((highlight) => {
          expect(highlight.text).toBeTruthy();
        });
      });
    });

    it('has no duplicate highlights within a project', () => {
      projects.forEach((project) => {
        const texts = project.highlights.map((h) => h.text);
        expect(new Set(texts).size).toBe(texts.length);
      });
    });

    it('has no duplicate highlights across all projects', () => {
      const allTexts = projects.flatMap((p) => p.highlights.map((h) => h.text));
      expect(new Set(allTexts).size).toBe(allTexts.length);
    });

    it('has no duplicate tags within a project', () => {
      projects.forEach((project) => {
        expect(new Set(project.tags).size).toBe(project.tags.length);
      });
    });

    it('has no duplicate descriptions across projects', () => {
      const descriptions = projects.map((p) => p.description);
      expect(new Set(descriptions).size).toBe(descriptions.length);
    });

    it('has no duplicate images within a project', () => {
      projects.forEach((project) => {
        expect(new Set(project.images).size).toBe(project.images.length);
      });
    });

    it('all public images are under 200 KiB', () => {
      const publicDir = resolve(process.cwd(), 'public');
      const allImages = [profile.image, ...projects.flatMap((p) => p.images)];
      allImages.forEach((image) => {
        const { size } = statSync(resolve(publicDir, image));
        expect(
          size,
          `${image} is ${Math.round(size / 1024)} KiB — must be under 200 KiB`,
        ).toBeLessThan(200 * 1024);
      });
    });
  });
});
