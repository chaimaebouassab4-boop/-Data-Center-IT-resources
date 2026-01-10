import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // Correction ici : on utilise un "glob" qui accepte jsx et tsx
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.{jsx,tsx}')
        ).catch(() =>
            resolvePageComponent(
                `./Pages/${name}.jsx`,
                import.meta.glob('./Pages/**/*.{jsx,tsx}')
            )
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});