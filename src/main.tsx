import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@fontsource/figtree/500.css'
import '@fontsource/figtree/600.css'
import '@fontsource/figtree/700.css'
import '@fontsource/figtree/800.css'

createRoot(document.getElementById('reactroot')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
