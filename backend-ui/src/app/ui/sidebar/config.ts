import {
	faTable,
	faFlagCheckered,
	faBookmark,
	faCog
} from '@fortawesome/free-solid-svg-icons';

export const MenuListItems = [{
		name: 'TrainingDropdown',
		start_icon: faTable,
		title: 'Training',
		caret: false,
		stylesStartIcon: `font-size: 2.7em;
        display:block;
        width:100%;`,
		stylesDropToggle: `
        padding:0;
        font-size: 0.8em;
        display: block;
        width: 100%;
        border-right: 5px solid transparent;
        color: #ecf0f1;
        box-sizing: content-box;
        `,
		dropDownActiveOrFocusedToggleStyles: {
			'transition-property': 'color',
			'transition-duration': '0.4s',
			'transition-timing-function': 'ease-in-out',
			'color': '#1abc9c'
		},
		options: [{
				name: 'Training',
				type: 'header',
			},
			{
				name: 'All',
				url: 'training',
				type: 'option',
			},
			{
				name: 'Official',
				url: 'training',
				urlSegments: 'official',
				type: 'option',
			},
			{
				name: 'Computer skills',
				url: 'training',
				urlSegments: 'computer',
				type: 'option',
			},
			{
				name: 'Other skills',
				url: 'training',
				urlSegments: 'other',
				type: 'option',
			}
		]
	},

	{
		name: 'ExperienceDropdown',
		start_icon: faFlagCheckered,
		title: 'Experience',
		caret: false,
		stylesStartIcon: `font-size: 2.8em;
        display:block;
        width:100%;`,
		stylesDropToggle: `
        padding:0;
        font-size: 0.8em;
        display: block;
        width: 100%;
        border-right: 5px solid transparent;
        color: #ecf0f1;
        box-sizing: content-box;
        `,
		dropDownActiveOrFocusedToggleStyles: {
			'transition-property': 'color',
			'transition-duration': '0.4s',
			'transition-timing-function': 'ease-in-out',
			'color': '#1abc9c'
		},
		options: [{
				name: 'Professional & others',
				type: 'header',
			},
			{
				name: 'All',
				url: 'experience',
				type: 'option',
			},
			{
				name: 'Professional',
				urlSegments: 'professional',
				url: 'experience',
				type: 'option',
			},
			{
				name: 'Ongs',
				url: 'experience',
				urlSegments: 'ong',
				type: 'option',
			},
			{
				name: 'Other experiences',
				url: 'experience',
				urlSegments: 'other',
				type: 'option',
			}
		]
	},

	{
		name: 'skillsDropdown',
		start_icon: faCog,
		title: 'Skills',
		caret: false,
		stylesStartIcon: `font-size: 2.8em;
        display:block;
        width:100%;`,
		stylesDropToggle: `
        padding:0;
        font-size: 0.8em;
        display: block;
        width: 100%;
        border-right: 5px solid transparent;
        color: #ecf0f1;
        box-sizing: content-box;
        `,
		dropDownActiveOrFocusedToggleStyles: {
			'transition-property': 'color',
			'transition-duration': '0.4s',
			'transition-timing-function': 'ease-in-out',
			'color': '#1abc9c'
		},
		options: [{
				name: 'Skills',
				type: 'header',
			},
			{
				name: 'All',
				url: 'skills',
				type: 'option',
			},
			{
				name: 'Skills',
				url: 'skills',
				urlSegments: 'skills',
				type: 'option',
			},
			{
				name: 'Computer skills',
				url: 'skills',
				urlSegments: 'computer-skills',
				type: 'option',
			},
			{
				name: 'Languages',
				url: 'skills',
				urlSegments: 'languages',
				type: 'option',
			}
		]
	},

	{
		name: 'OthersDropdown',
		start_icon: faBookmark,
		title: 'Others',
		caret: false,
		stylesStartIcon: `font-size: 2.8em;
        display:block;
        width:100%;`,
		stylesDropToggle: `
        padding:0;
        font-size: 0.8em;
        display: block;
        width: 100%;
        border-right: 5px solid transparent;
        color: #ecf0f1;
        box-sizing: content-box;
        `,
		dropDownActiveOrFocusedToggleStyles: {
			'transition-property': 'color',
			'transition-duration': '0.4s',
			'transition-timing-function': 'ease-in-out',
			'color': '#1abc9c'
		},
		options: [{
				name: 'Others',
				type: 'header',
			},
			{
				name: 'All',
				url: 'others',
				type: 'option',
			},
			{
				name: 'Resume summary',
				url: 'others',
				urlSegments: 'resume-summary',
				type: 'option',
			},
			{
				name: 'Merits',
				url: 'others',
				urlSegments: 'merits',
				type: 'option',
			},
			{
				name: 'Ongs',
				url: 'others',
				urlSegments: 'ongs',
				type: 'option',
			},
			{
				name: 'Professional archivements',
				url: 'others',
				urlSegments: 'professional-archivements',
				type: 'option',
			},
			{
				name: 'Professional references',
				url: 'others',
				urlSegments: 'professional-references',
				type: 'option',
			},
			{
				name: 'Other data',
				url: 'others',
				urlSegments: 'other-data',
				type: 'option',
			}
		]
	}
]