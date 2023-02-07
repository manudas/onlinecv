import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { DropDownPosition, MenuOptionType, MenuSelector } from "../menu/types";


export const messageMenu: MenuSelector = {
    handlerInline: true,
    icon: faEnvelope,
    position: DropDownPosition.down,
    title: 'Messages',
    urlSegments: ['mail'],
    options: [
        {
            title: 'New message',
            urlSegments: ['new-message'],
            type: MenuOptionType.option,
        },
        {
            title: 'Inbox',
            urlSegments: ['inbox'],
            type: MenuOptionType.option,
        },
        {
            title: 'Outbox',
            urlSegments: ['outbox'],
            type: MenuOptionType.option,
        },
        {
            title: 'Trash',
            urlSegments: ['trash'],
            type: MenuOptionType.option,
        }
    ]
}

export const userMenu = (userName: string): MenuSelector => {
    return {
        handlerInline: true,
        icon: faUser,
        position: DropDownPosition.down,
        title: userName,
        options: [
            {
                title: 'Edit Profile',
                urlSegments: ['edit-profile'],
                type: MenuOptionType.option,
            },
            {
                type: MenuOptionType.separator,
            },
            {
                title: 'Sign out',
                urlSegments: ['sign-out'],
                type: MenuOptionType.option,
            }
        ]
    }
}