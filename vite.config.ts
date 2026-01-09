import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'precise-survey-builder', // Add this line - use your actual repo name!
});
