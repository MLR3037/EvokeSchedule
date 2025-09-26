import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/EvokeSchedule/', // Replace with your actual repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
