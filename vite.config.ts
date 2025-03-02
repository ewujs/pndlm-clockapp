import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			// NOTE: Possibly better dev performance if babel plugins are
			// disabled: https://vitejs.dev/plugins/
			// "Uses esbuild and Babel, achieving fast HMR with a small package
			// footprint and the flexibility of being able to use the Babel
			// transform pipeline. Without additional Babel plugins, only
			// esbuild is used during builds."
			babel: {
				plugins: ["@emotion"],
			},
		})
	],
})
