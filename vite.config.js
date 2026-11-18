import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://gargpriyam21.github.io/Art-Gallery/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/Art-Gallery/',
  plugins: [react()],
});
