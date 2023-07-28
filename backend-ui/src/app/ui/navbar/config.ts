import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { DropDownPosition, MenuOptionType, MenuSelector } from "../menu/types";


export const messageMenu = (elements: string[]): MenuSelector  => {
    return {
        handlerInline: true,
        icon: faEnvelope,
        position: DropDownPosition.down,
        title: 'Messages',
        zIndex: 2,
        urlSegments: ['messaging'],
        options: elements?.map(messageType => {
            return {
                title: messageType[0].toUpperCase() + messageType.slice(1),
                urlSegments: [messageType],
                type: MenuOptionType.option,
            }
        })
    }
}

export const userMenu = (userName: string, logOut: Function): MenuSelector => {
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
                onClick: logOut,
                type: MenuOptionType.option,
            }
        ]
    }
}