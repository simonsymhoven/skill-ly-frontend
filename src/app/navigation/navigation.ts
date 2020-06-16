import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'SAMPLE',
                type     : 'item',
                icon     : 'dashboard',
                url      : 'pages/dashboard'
            },
            {
                id       : 'profile',
                title    : 'Profile',
                translate: 'PROFILE',
                type     : 'item',
                icon     : 'person',
                url      : 'pages/profile'
            },

        ]
    }
];
