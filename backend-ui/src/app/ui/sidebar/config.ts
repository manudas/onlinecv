import { ExperienceType, OthersType, SkillsType, TrainingType, TranslationEnum } from '@app/types';
import {
	faLanguage,
	faBookmark,
	faCog,
	faFlagCheckered,
	faTable,
} from '@fortawesome/free-solid-svg-icons';

const stylesDropToggle = `
	padding:0;
	font-size: 0.8em;
	display: block;
	width: 100%;
	border-right: 5px solid transparent;
	color: #ecf0f1;
	box-sizing: content-box;
`;

const dropDownActiveOrFocusedToggleStyles = {
	'transition-property': 'color',
	'transition-duration': '0.4s',
	'transition-timing-function': 'ease-in-out',
	'color': '#1abc9c'
};

const stylesStartIcon = `
	font-size: 2.8em;
	display:block;
	width:100%;
`;

export const MenuListItems = [{
		name: 'TrainingDropdown',
		start_icon: faTable,
		title: 'Training',
		caret: false,
		stylesStartIcon,
		stylesDropToggle,
		dropDownActiveOrFocusedToggleStyles,
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
				urlSegments: TrainingType[TrainingType.official],
				type: 'option',
			},
			{
				name: 'Computer skills',
				url: 'training',
				urlSegments: TrainingType[TrainingType.computer],
				type: 'option',
			},
			{
				name: 'Other skills',
				url: 'training',
				urlSegments: TrainingType[TrainingType.other],
				type: 'option',
			}
		]
	},

	{
		name: 'ExperienceDropdown',
		start_icon: faFlagCheckered,
		title: 'Experience',
		caret: false,
		stylesStartIcon,
		stylesDropToggle,
		dropDownActiveOrFocusedToggleStyles,
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
				url: 'experience',
				urlSegments: ExperienceType[ExperienceType.professional],
				type: 'option',
			},
			{
				name: 'Ongs',
				url: 'experience',
				urlSegments: ExperienceType[ExperienceType.ong],
				type: 'option',
			},
			{
				name: 'Other experiences',
				url: 'experience',
				urlSegments: ExperienceType[ExperienceType.other],
				type: 'option',
			}
		]
	},
	{
		name: 'SkillsDropdown',
		start_icon: faCog,
		title: 'Skills',
		caret: false,
		stylesStartIcon,
		stylesDropToggle,
		dropDownActiveOrFocusedToggleStyles,
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
				urlSegments: SkillsType[SkillsType.general],
				type: 'option',
			},
			{
				name: 'Computer skills',
				url: 'skills',
				urlSegments: SkillsType[SkillsType.computer],
				type: 'option',
			},
			{
				name: 'Languages',
				url: 'skills',
				urlSegments: SkillsType[SkillsType.language],
				type: 'option',
			}
		]
	},
	{
		name: 'OthersDropdown',
		start_icon: faBookmark,
		title: 'Others',
		caret: false,
		stylesStartIcon,
		stylesDropToggle,
		dropDownActiveOrFocusedToggleStyles,
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
				name: 'Professional references',
				url: 'others',
				urlSegments: OthersType[OthersType['professional-references']],
				type: 'option',
			},
			{
				name: 'Attach resume document',
				url: 'others',
				urlSegments: OthersType[OthersType['upload-resume']],
				type: 'option',
			}
		]
	},
	{
		name: 'TranslationsDropdown',
		start_icon: faLanguage,
		title: 'Translations',
		caret: false,
		stylesStartIcon,
		stylesDropToggle,
		dropDownActiveOrFocusedToggleStyles,
		options: [{
				name: 'Translations',
				type: 'header',
			},
			{
				name: 'All',
				url: 'translations',
				type: 'option',
			},
			{
				name: 'Missing translations',
				url: 'translations',
				urlSegments: TranslationEnum[TranslationEnum.missing],
				type: 'option',
			},
			{
				name: 'Translated strings',
				url: 'translations',
				urlSegments: TranslationEnum[TranslationEnum.translated],
				type: 'option',
			},
		]
	}
]