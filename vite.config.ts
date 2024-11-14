import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => { 
  const config: UserConfig = {
    plugins: [react()],
  }

  if (mode === 'production') {
    config.base = '/banner-3d/';
  }

  return config;
})
