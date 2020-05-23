export {
    default as Details
}
from './Details';
export {
    default as Image
}
from './Image';
export {
    default as Interests
}
from './Interests';
export {
    default as Languages
}
from './Languages';
export {
    default as Portfolio
}
from './Portfolio';
export {
    default as ProfileDetails
}
from './ProfileDetails';
export {
    default as RegulatedTraining
}
from './RegulatedTraining';
export {
    default as Resume
}
from './Resume';
export {
    default as Skills
}
from './Skills';
export {
    default as SocialNetworks
}
from './SocialNetworks';
export {
    default as Translations
}
from './Translations';
export {
    default as WorkExperience
}
from './WorkExperience';
const partialSchemas = [
    Details,
    Image,
    Interests,
    Languages,
    Portfolio,
    ProfileDetails,
    RegulatedTraining,
    Resume,
    Skills,
    SocialNetworks,
    Translations,
    WorkExperience
];
export default partialSchemas.join('\n');