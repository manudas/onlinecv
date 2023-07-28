import { ExperienceType, OthersType, SkillsType, TrainingType, TranslationEnum } from '@app/types';
import { faLanguage, faBookmark, faCog, faFlagCheckered, faTable, faTachometerAlt, faFileAlt, faCloud, faBug } from '@fortawesome/free-solid-svg-icons';
import { DropDownPosition, MenuOptionType, MenuSelector } from '../menu/types';

export const MenuListItems: Array<MenuSelector> = [
	{
		icon: faTachometerAlt,
		iconSize: 2,
		position: DropDownPosition.right,
		title: 'Dashboard',
		urlSegments: ['dashboard'],
	},
	{
		icon: faFileAlt,
		iconSize: 2,
		title: 'Details',
		urlSegments: ['details'],
	},
	{
		icon: faTable,
		iconSize: 2,
		title: 'Training',
		urlSegments: ['training'],
		options: [{
				title: 'Training',
				type: MenuOptionType.header,
			},
			{
				title: 'All',
				urlSegments: [],
				type: MenuOptionType.option,
			},
			{
				title: 'Official',
				urlSegments: [TrainingType[TrainingType.official]],
				type: MenuOptionType.option,
			},
			{
				title: 'Computer skills',
				urlSegments: [TrainingType[TrainingType.computer]],
				type: MenuOptionType.option,
			},
			{
				title: 'Other skills',
				urlSegments: [TrainingType[TrainingType.other]],
				type: MenuOptionType.option,
			}
		]
	},
	{
		icon: faFlagCheckered,
		iconSize: 2,
		title: 'Experience',
		urlSegments: ['experience'],
		options: [{
				title: 'Professional & others',
				type: MenuOptionType.header,
			},
			{
				title: 'All',
				urlSegments: [],
				type: MenuOptionType.option,
			},
			{
				title: 'Professional',
				urlSegments: [ExperienceType[ExperienceType.professional]],
				type: MenuOptionType.option,
			},
			{
				title: 'Ongs',
				urlSegments: [ExperienceType[ExperienceType.ong]],
				type: MenuOptionType.option,
			},
			{
				title: 'Other experiences',
				urlSegments: [ExperienceType[ExperienceType.other]],
				type: MenuOptionType.option,
			}
		]
	},
	{
		icon: faCog,
		iconSize: 2,
		title: 'Skills',
		urlSegments: ['skills'],
		options: [{
				title: 'Skills',
				type: MenuOptionType.header,
			},
			{
				title: 'All',
				urlSegments: [],
				type: MenuOptionType.option,
			},
			{
				title: 'Skills',
				urlSegments: [SkillsType[SkillsType.general]],
				type: MenuOptionType.option,
			},
			{
				title: 'Computer skills',
				urlSegments: [SkillsType[SkillsType.computer]],
				type: MenuOptionType.option,
			},
			{
				title: 'Languages',
				urlSegments: [SkillsType[SkillsType.language]],
				type: MenuOptionType.option,
			}
		]
	},
	{
		icon: faBookmark,
		iconSize: 2,
		title: 'Others',
		urlSegments: ['others'],
		options: [{
				title: 'Others',
				type: MenuOptionType.header,
			},
			{
				title: 'All',
				urlSegments: [],
				type: MenuOptionType.option,
			},
			{
				title: 'Professional references',
				urlSegments: [OthersType[OthersType['references']]],
				type: MenuOptionType.option,
			},
			{
				title: 'Attach resume document',
				urlSegments: [OthersType[OthersType['upload-resume']]],
				type: MenuOptionType.option,
			},
			{
				title: 'Resume quote',
				urlSegments: [OthersType[OthersType.quote]],
				type: MenuOptionType.option,
			},
		]
	},
	{
		icon: faLanguage,
		iconSize: 2,
		title: 'Translations',
		urlSegments: ['translations'],
		options: [{
				title: 'Translations',
				type: MenuOptionType.header,
			},
			{
				title: 'All',
				urlSegments: [],
				type: MenuOptionType.option,
			},
			{
				title: 'Missing translations',
				urlSegments: [TranslationEnum[TranslationEnum.missing]],
				type: MenuOptionType.option,
			},
			{
				title: 'Translated strings',
				urlSegments: [TranslationEnum[TranslationEnum.translated]],
				type: MenuOptionType.option,
			},
		]
	},
	{
		icon: faCloud,
		iconSize: 2,
		title: 'Backup',
	},
	{
		icon: faBug,
		iconSize: 2,
		title: 'Feedback',
	},
]