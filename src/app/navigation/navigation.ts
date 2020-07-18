import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                translate: 'DASHBOARD',
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
    },
    {
        id       : 'documentation',
        title    : 'Documentation',
        translate: 'DOCUMENTATION',
        type     : 'group',
        children : [
            {
                id       : 'changelog',
                title    : 'Changelog',
                translate: 'CHANGELOG',
                type     : 'item',
                icon     : 'track_changes',
                url      : 'documentation/changelog',
                badge: {
                    title: '0.0.1',
                    bg   : '#EC0C8E',
                    fg   : '#FFFFFF'
                }
            }
        ]
    }
];
