export const menu = [
    {
        label: 'Import Template',
        icon: 'pi pi-th-large',
        items: [
            { label: 'Import Template', icon: 'pi pi-cloud-upload', to: '/template/import' },
        ]
    },
    {
        label: 'Config ',
        icon: 'pi pi-th-large',
        items: [
            { label: 'Upload config', icon: 'pi pi-cloud-upload', to: '/config/upload-config' },
            { label: 'List configs', icon: 'pi pi-list', to: '/config/list-config' },
            { label: 'List models', icon: 'pi pi-list', to: '/config/list-style' }
        ]
    },
    {
        label: 'Prompt Customize ',
        icon: 'pi pi-th-large',
        items: [
            { label: 'List customize', icon: 'pi pi-list', to: '/custom-prompt/list-prompt' }
        ]
    },
    {
        label: 'Pose ',
        icon: 'pi pi-th-large',
        items: [
            { label: 'List Pose', icon: 'pi pi-list', to: '/pose/list-pose' }
        ]
    }
];

