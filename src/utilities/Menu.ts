export const menu = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        items: [{ label: 'Dashboard', icon: 'pi pi-home', to: '/' }]
    },
    {
        label: 'Dictionary Listing',
        icon: 'pi pi-th-large',
        items: [
            { label: 'Profile type', icon: 'pi pi-id-card', to: '/dictionary-listing/profile-type' },
            { label: 'Ethnicity', icon: 'pi pi-users', to: '/dictionary-listing/ethnicity' },
            { label: 'Sexuality', icon: 'pi pi-heart', to: '/dictionary-listing/sexuality' },
            {
                label: 'Keen on meeting',
                icon: 'pi pi-comments',
                to: '/dictionary-listing/keen-on-meeting'
            },
            {
                label: 'Interest topics',
                icon: 'pi pi-book',
                to: '/dictionary-listing/interest-topics',
                className: 'rotated-icon'
            },
        ]
    },
    {
        label: 'Notification management',
        icon: 'pi pi-flag-fill',
        items: [
            {
                label: 'Welcome message',
                icon: 'pi pi-thumbs-up',
                to: '/blocks',
            },
            {
                label: 'Pop-up ads manager',
                icon: 'pi pi-th-large',
                url: 'https://www.primefaces.org/primeblocks-react',
            },
            {
                label: 'Communication manager',
                icon: 'pi pi-users',
                to: '/blocks',
            },
            {
                label: 'User criterias',
                icon: 'pi pi-check',
                to: '/blocks',
            },
        ]
    },
    {
        label: 'Content management',
        icon: 'pi pi-list',
        items: [
            { label: 'Content', icon: 'pi pi-list', to: '/icons' },
            {
                label: 'Reported content',
                icon: 'pi pi-list',
                url: 'https://www.primefaces.org/primeflex'
            }
        ]
    },
    {
        label: 'Chat management',
        icon: 'pi pi-comments',
        items: [
            { label: 'Single chat - Content related', icon: 'pi pi-comment', to: '/crud' },
            { label: 'Group chat - Content related', icon: 'pi pi-comments', to: '/calendar' },
            { label: 'Single chat - Directly', icon: 'pi pi-send', to: '/timeline' },
            {
                label: 'Group chat - Directly',
                icon: 'pi pi-globe',
                url: 'assets/pages/landing.html',
            }
        ]
    },
    {
        label: 'User management',
        icon: 'pi pi-id-card',
        items: [
            {
                label: 'Users',
                icon: 'pi pi-user',

            },
            {
                label: 'User permission',
                icon: 'pi pi-key',
            }
        ]
    },
    {
        label: 'Team management',
        icon: 'pi pi-users',
        items: [
            {
                label: 'Team members',
                icon: 'pi pi-user',
                to: '/documentation'
            },
            {
                label: 'Team permission',
                icon: 'pi pi-key',
                to: '/documentation'
            }
        ]
    }
];