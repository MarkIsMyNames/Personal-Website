import { writeFileSync } from 'fs';
import { profile } from '../src/data/portfolioData';

const manifest = {
  short_name: profile.name,
  name: `${profile.name} - ${profile.title}`,
  icons: [],
  start_url: '.',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff',
};

writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
