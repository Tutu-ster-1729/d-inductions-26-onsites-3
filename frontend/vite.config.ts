import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_BASE = '/api';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/app',
})

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return res;
}