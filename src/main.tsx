import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('reactroot')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
