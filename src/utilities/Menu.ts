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
        label: 'Content management',
        icon: 'pi pi-bookmark',
        items: [
            { label: 'Content', icon: 'pi pi-book', to: '/content-management/content' }
        ]
    },
    {
        label: 'Reported management',
        icon: 'pi pi-info-circle',
        items: [
            { label: 'Reported', icon: 'pi pi-times-circle', to: '/reported-management/reported' }
        ]
    },
    {
        label: 'User management',
        icon: 'pi pi-id-card',
        items: [
            {
                label: 'Users',
                icon: 'pi pi-user',
                to: 'user-management/user'

            }
        ]
    },
    {
        label: 'Activities management',
        icon: 'pi pi-history',
        items: [
            {
                label: 'Admin members',
                icon: 'pi pi-history',
                to: '/activities-management/admin-activies'
            }
        ]
    },
    {
        label: 'Team management',
        icon: 'pi pi-users',
        items: [
            {
                label: 'Team members',
                icon: 'pi pi-users',
                to: '/documentation'
            },

        ]
    },
    {
        label: 'Chat management',
        icon: 'pi pi-comments',
        items: [
            {
                label: 'Single chat - Content related',
                icon: 'pi pi-comment',
                to: '/chat-management/single'
            },
            {
                label: 'Group chat - Content related',
                icon: 'pi pi-comments',
                to: '/chat-management/group'
            },
            {
                label: 'Single chat - Directly',
                icon: 'pi pi-send',
                to: '/chat-management/single-directly'
            },
            {
                label: 'Group chat - Directly',
                icon: 'pi pi-globe',
                to: '/chat-management/group-directly',
            }
        ]
    },
    {
        label: 'Notification management',
        icon: 'pi pi-flag',
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
];

