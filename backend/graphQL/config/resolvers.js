const { tokenGuard } = require('@helpers/auth');

const protectedResolvers = {
    Query: {
        settings:               true,
        missingTranslations:    true,
        translatedStrings:      true,
        getAdminUser:           true,
    },
    Mutation: {
        putDetails:             true,
        putExperience:          true,
        removeExperience:       true,
        putInterest:            true, // to be implemented or removed
        removeInterest:         true, // to be implemented or removed
        putLanguages:           true,
        removeLanguage:         true,
        putLocale:              true, // to be implemented or removed  --> no hay efecto para este en BE-UI
        removeLocale:           true, // to be implemented or removed  --> no hay efecto para este en BE-UI
        putPortfolio:           true, // to be implemented or removed
        removePortfolio:        true, // to be implemented or removed
        putQuote:               true,
        removeQuote:            true,
        putReferences:          true,
        removeReference:        true,
        putResume:              true,
        removeResume:           true,
        putSettings:            true,
        putSkills:              true,
        removeSkill:            true,
        putSocialNetworks:      true,
        removeSocialNetwork:    true,
        putTrainings:           true,
        removeTraining:         true,
        putTranslation:         true,
        removeTranslation:      true
    },
}

const protectResolver = (type, name, resolverFn) => {
    const typeName = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    if (protectedResolvers[typeName][name]) {
        return async (parent, params, context, info) => {
            const { request } = context;
            await tokenGuard(request);
            return resolverFn(parent, params, context, info);
        }
    }

    return resolverFn;
}

module.exports = {
    protectResolver
}