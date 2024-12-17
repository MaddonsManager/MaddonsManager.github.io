export const releaseNotes = [
    {
        version: 'v1.0.0',
        date: '2024-06-19',
        extra: 'First release',
        features: ['First release']
    },
    {
        version: 'v1.0.2',
        date: '2024-06-19',
        extra: 'Auto updater is now available',
        features: ['Added some features', 'Added autoUpdater']
    },
    {
        version: 'v1.0.3',
        date: '2024-06-19',
        extra: 'some componentes are updated',
        features: [
            'Navbar is updated',
            'Scrollbar is updated',
            'update motion when install/uninstall',
            'update index.html',
            ' update some alerts'
        ]
    },
    {
        version: 'v1.0.4',
        date: '2024-06-19',
        extra: 'Fixed a critical bug.',
        fixed: ['Fixed a critical bug that caused it to not iterate correctly from main to master.']
    },
    {
        version: 'v1.0.5',
        date: '2024-06-20',
        extra: 'some componentes are updated',
        features: ['add scrollbar into addon-container', 'addon-container setup to 50 from 10'],
        fixed: [
            'Fix the window manager icons Minimize Maximize Close to stick in the same position'
        ]
    },
    {
        version: 'v1.0.6',
        date: '2024-06-21',
        extra: 'add filters',
        features: ['add filter by Installed addons and NonInstalled addons.']
    },
    {
        version: 'v1.0.7',
        date: '2024-07-08',
        extra: 'fixed some bugs',
        fixed: ['Fixed error when trying to update addons split with _ or -']
    },
    {
        version: 'v1.0.8',
        date: '2024-07-08',
        extra: 'fixed some bugs',
        fixed: [
            'Fixed error when trying to update addons split with _ or -',
            ' Fixed spanish words.'
        ]
    },
    {
        version: 'v1.0.9',
        date: '2024-07-14',
        extra: 'add new features',
        features: [
            'added an option in the logo menu to choose again the location of wow.exe',
            'added About me modal to see the version and some other things about the app'
        ]
    },
    {
        version: 'v1.1.0',
        date: '2024-07-14',
        extra: 'New logo hell yeah!',
        features: ['New logo']
    },
    {
        version: 'v1.1.1',
        date: '2024-07-15',
        extra: 'Prepare to incoming update',
        features: ['Prepare to incoming update']
    },
    {
        version: 'v1.1.2',
        date: '2024-07-15',
        extra: '...🥲',
        fixed: ['...']
    },
    {
        version: 'v1.1.3',
        date: '2024-07-17',
        extra: 'Fixed some bugs and add features',
        fixed: ['Fixed some error when try update addons. (not at all)'],
        features: ['Added alerts on update addon.']
    },
    {
        version: 'v1.1.4',
        date: '2024-07-18',
        extra: 'Fixed some bugs',
        fixed: [
            'Fixed some error when try update addons. (not at all)',
            'Fixed and Added alerts on update addon.',
            'Fixed and Added alerts on update addon.',
            'Fixed some emojis on modal'
        ]
    },
    {
        version: 'v1.1.5',
        date: '2024-07-18',
        extra: 'Fixed some bugs',
        fixed: ['ixed some folders were not deleted']
    },
    {
        version: 'v1.1.6',
        date: '2024-07-21',
        extra: 'Scaffolding all files and folders, fixes and features',
        fixed: ['Fixed windows when open any URL'],
        features: ['Move changelogs.md path', 'Move changelogs.md path']
    },
    {
        version: 'v1.1.7',
        date: '2024-09-22',
        extra: 'On this version jump to React, this version is now on Dev',
        features: ['React 18'],
        breakingChanges: ['it will be constantly updated and will receive several upgrades']
    },
    {
        version: 'v1.1.8',
        date: '2024-09-30',
        extra: 'Fixed some bugs',
        fixed: ['Fixed backend issues.'],
        features: [' Rename Window to Master Addon Manager']
    },
    {
        version: 'v1.1.9',
        date: '2024-10-01',
        extra: 'Hello, new factures and important bug fixes.',
        fixed: ['Fixed update notifications.', 'Fixed visual uninstall button on install addons.'],
        features: ['Progress bar to install/uninstall addon']
    },
    {
        version: 'v1.2.0',
        date: '2024-10-02',
        extra: 'Hello, new factures and important bug fixes.',
        fixed: [
            'some translates fixed.',
            'parse html fixed',
            'remove shadowscroll from modals, we need fix the new scroll'
        ],
        features: ['About content modal', 'Control toggle menu to close on click any item']
    },
    {
        version: 'v1.2.1',
        date: '2024-10-05',
        extra: 'Hello everyone in this update we bring',
        fixed: [' Cards in contentaddon is now fixed', ' some UI issue is now fixed'],
        features: ['New custom TitleBar.', ' New clean logo.']
    },
    {
        version: 'v1.2.2',
        date: '2024-10-06',
        extra: '🛠️ Fixeeees moment.',
        fixed: ['fixes the process of how the app recognized the installed'],
        features: [
            'addons now only deleting specific folders that are',
            '  written in the API no longer makes splits.'
        ]
    },
    {
        version: 'v1.2.3',
        date: '2024-10-07',
        extra: 'In this update... 🔥',
        fixed: [
            'fixes the unpacking and copying process of the addons folders for a better optimization in the process.'
        ],
        features: [
            'this will make the addon names more stylized.',
            'Change name to Maddons Manager.'
        ]
    },
    {
        version: 'v1.2.4',
        date: '2024-10-10',
        extra: 'Howdy, for this new update we fixed a few problems in the installation of the addons.',
        fixed: [
            'fixed the problem with the addon names when installing them is fixed.',
            'fixed the problem with the loading button being removed when there was a concurrent installation',
            'fixed the problem with the progress bar being removed during simultaneous installation'
        ],
        features: [
            'added a class to handle multiple downloads, now all downloads are queued and start when the previous one finishes.'
        ]
    },
    {
        version: 'v1.2.5',
        date: '2024-10-10',
        extra: '🚀 Patch Notes for Electron App Update',
        fixed: [
            'Complete refactor of the apps codebase to make it cleaner, more maintainable, and scalable.',
            'The Select component now supports multiple selections! You can easily filter addons by multiple types, making addon management more flexible and efficient.'
        ],
        features: [
            'The Select component now dynamically pulls all addon types directly from the APIs JSON files. These will now auto-update without manual intervention! 🎉'
        ]
    },
    {
        version: 'v1.2.6',
        date: '2024-10-12',
        extra: 'Loading page...',
        fixed: [
            ' 🐛 Fix: Ensure handleWowPathChange properly triggers addon refresh.',
            'Move useWowPath logic to its own hook for better structure.'
        ],
        features: [
            ' 🧹 Cleanup: Simplify path selection logic in handleMenuItemClick.',
            'Add success/error handling in Wow path selection with modals.',
            'Use modal context for error and success messages during path selection.',
            'Add openFileDialog handler in the main process for Wow expansions.',
            'Validate selected WoW paths for Interface and WTF directories.',
            'Update get-config and path handlers to return detailed error messages.'
        ]
    },
    {
        version: 'v1.2.7',
        date: '2024-10-14',
        extra: 'Several bug 🫥...',
        breakingChanges: [
            ' Fixed several bugs when trying to use the menu items and it bucle on Loading page..'
        ]
    },
    {
        version: 'v1.3.0',
        date: '2024-10-18',
        extra: '🆙Big Update!',
        fixed: [
            '🛠️ Enhanced transition durations for smoother UI experience',
            '🛠️ Refactor handling of addon actions',
            '🛠️ Improved styles and layout for addon details'
        ],
        features: [
            '✨ Updated updater timing and improved AppNavbar structure',
            '✨ Added delay for update checks.',
            '✨ Pass install/uninstall functions to AddonModal.',
            '✨ Added modal state management.',
            '🎨stylized second Card ui',
            '🖼️add more backgrounds',
            '😊change grid 3 to 6 on lg windows still 3 on md windows',
            '😊 two styles are implemented, simple and compact',
            '📸 Some logos are optimized',
            '🏜️ New fuction to implemented new UIX',
            '🍫Titlebar litle change',
            '🔗Modal to view more addon info are implemented'
        ]
    }
].reverse()
