import { ReleaseNotesTypes } from '@/types'

export const webReleaseNotes: ReleaseNotesTypes[] = [
    {
        version: 'v0.1.1',
        date: '2024-06-19',
        extra: 'First release',
        features: ['First release'],
        fixed: [],
        breakingChanges: []
    },
    {
        version: 'v0.1.2',
        date: '2024-06-19',
        extra: 'Auto updater is now available',
        features: ['Added some features', 'Added autoUpdater'],
        fixed: [],
        breakingChanges: []
    },
    {
        version: 'v0.1.3',
        date: '2024-06-19',
        extra: 'some componentes are updated',
        features: [
            'Navbar is updated',
            'Scrollbar is updated',
            'update motion when install/uninstall',
            'update index.html',
            ' update some alerts'
        ],
        fixed: [],
        breakingChanges: []
    },
    {
        version: 'v0.1.4',
        date: '2024-06-19',
        extra: 'Fixed a critical bug.',
        fixed: [
            'Fixed a critical bug that caused it to not iterate correctly from main to master.'
        ],
        features: [],
        breakingChanges: []
    },
    {
        version: 'v0.1.5',
        date: '2024-06-20',
        extra: 'some componentes are updated',
        features: ['add scrollbar into addon-container', 'addon-container setup to 50 from 10'],
        fixed: [
            'Fix the window manager icons Minimize Maximize Close to stick in the same position'
        ],
        breakingChanges: []
    },
    {
        version: 'v0.1.6',
        date: '2024-12-28',
        extra: 'Big update 👩🏽‍💻🎉',
        features: [
            'add ElvUI profiles',
            'add WeakAuras profiles',
            'add Guides',
            'Add Post component and implement blog post fetching; update Guides page to display posts with author and tags',
            'add markdown support on posts',
            'add some new components',
            'update some components',
            'update some styles',
            'add new class and role icons',
            'update routing and component exports.',
            'enhance ProfilesDetails component with syntax highlighting for code blocks'
        ],
        fixed: [
            'fix detailsProfiles component',
            'fix some bugs in the Addons page',
            'fix some bugs in the Guides page',
            'Refactor and enhance application structure'
        ],
        breakingChanges: []
    },
    {
        version: 'v0.1.7',
        date: '2024-12-30',
        extra: 'Big christmas update 🎉🎆',
        features: [
            'Add snow effect',
            'Add new year Countdown with confetti',
            'Add custom hooks for infinite scroll',
            'Add custom hooks for filtering',
            'refactor WeakAuras and ElvUI components to utilize new hooks',
            'Refactor DownloadAddon component to streamline download process',
            'Add Header component',
            'update ElvUI, WeakAuras and Addons pages to include Header enhance CSS for layout styling'
        ],
        fixed: [
            'improve user feedback with loading state and clickable download link',
            'fix component imports to utilize new path primitives module',
            'fix some bugs in the Addons page',
            'fix some bugs in the Guides page',
            'Refactor and enhance application structure',
            'fix version number in webReleaseNotes',
            'fix tailwind variants on Home page'
        ],
        breakingChanges: []
    },
    {
        version: 'v0.1.8',
        date: '2025-1-03',
        extra: 'Minimal update 🎉',
        features: ['Add new motion svg icons'],
        fixed: ['Fix download button', 'Fix text on input components'],
        breakingChanges: []
    },
    {
        version: 'v0.1.9',
        date: '2025-1-04',
        extra: 'Minimal update 🎉',
        features: ['added all context providers to enhance UX and performance'],
        fixed: ['Remove unused Loading page and related styles'],
        breakingChanges: []
    }
].reverse()
