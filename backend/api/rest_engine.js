const {
    DetailsModel,
    ImageModel,
    InterestsModel,
    LanguagesModel,
    PortfolioModel,
    ProfileDetailsModel,
    RegulatedTrainingModel,
    ResumeModel,
    SkillsModel,
    SocialNetworksModel,
    TranslationsModel,
    WorkExperienceModel,
} = require('@models');

const resolvedObjectPromises = require('@helpers/utils').resolvedObjectPromises;

class api_engine {
    constructor() {}
    get(command, parameter, query_parameters) {
        let return_val = null;
        switch (command) {
            case api_engine.command_list.get_content:
                return_val = this.getContent(parameter, query_parameters);
                break;
            case api_engine.command_list.get_details:
                const details = this.getDetails(parameter);
                const result_promises = new Object();
                result_promises['details'] = details;
                return_val = resolvedObjectPromises(result_promises).catch(
                    console.error);
                break;
        }
        return return_val;
    }
    getContent(language, query_parameters) {
        const result_promises = new Object();
        // check if string is defined or empty
        if (typeof query_parameters.load_images !== 'undefined') {
            let images = this.load_images();
            result_promises['images'] = images;
        }
        /* DATA TO SEND TO REACT FRONTEND:
        <ProfileResume />
        <ProfileDetail />
        <Education />
        <WorkExperience />
        <Skill />
        <Interest />
        <PortFolio />
        */
        const resume = this.getResume(language);
        result_promises['resume'] = resume;
        const details = this.getDetails(language);
        result_promises['details'] = details;
        const regulated_training = this.getRegulatedTraining(language);
        result_promises['regulated_training'] = regulated_training;
        const work_experience = this.getWorkExperience(language);
        result_promises['work_experience'] = work_experience;
        const skills = this.getSkills(language);
        result_promises['skills'] = skills;
        const languages = this.getLanguages(language);
        result_promises['languages'] = languages;
        const interests = this.getInterests(language);
        result_promises['interests'] = interests;
        const portfolio = this.getPortfolio(language);;
        result_promises['portfolio'] = portfolio;
        const translations = this.getTranslations(language);
        result_promises['translations'] = translations;
        const profile_details = this.getProfileDetails(language);
        result_promises['profile_details'] = profile_details;
        const contact_details = this.getContactDetails(language);
        result_promises['contact_details'] = contact_details;
        const social_networks = this.getSocialNetworks(language);
        result_promises['social_networks'] = social_networks;
        return resolvedObjectPromises(result_promises)
            .catch(console.error);
    }
    getTranslations(_language, _module, tag) {
        const _module_ = _module || null;
        const _tag_ = tag || null;
        const filter = {
            language: _language
        };
        if (_module_) {
            filter.module = _module_;
        }
        if (_tag_) {
            filter.tag = _tag_;
        }
        return TranslationsModel.find(filter).lean().then((
            promise_resolution) => {
            const _translations_ = {};
            promise_resolution.forEach(function(value, index) {
                const current_module = value.module;
                const current_tag = value.tag;
                if (!_translations_[_language]) {
                    _translations_[_language] = {};
                }
                if (!_translations_[_language][
                        current_module
                    ]) {
                    _translations_[_language][
                        current_module
                    ] = {};
                }
                if (!_translations_[_language][
                        current_module
                    ][current_tag]) {
                    _translations_[_language][
                        current_module
                    ][current_tag] = {};
                }
                Object.assign(_translations_[_language][
                    current_module
                ][current_tag], value);
            });
            return _translations_;
        }).catch((error) => {
            console.log(error);
        });
    }
    load_images() {
        return ImageModel.find({
            $or: [{
                'key': 'bgimage'
            }, {
                'key': 'profile_picture'
            }]
        }).lean().then((result) => {
            if (result && result.length > 0) {
                let named_result = {};
                result.forEach((row) => {
                    named_result[row.key] = row;
                });
                return named_result;
            }
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getResume(_language) {
        return ResumeModel.findOne({
            language: _language
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getDetails(_language) {
        console.log(
            'API: remember to implement an "on the fly" qr generator. remove from mongodb'
        );
        return DetailsModel.findOne({
            language: _language
        }).lean().then((result) => {
            if (result) {
                result.qr_code =
                    'remember to implement an "on the fly" qr generator, remove from mongodb';
            }
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getRegulatedTraining(_language) {
        return RegulatedTrainingModel.find({
            language: _language
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getWorkExperience(_language) {
        return WorkExperienceModel.find({
            language: _language
        }).sort({
            start_date: -1
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getSkills(_language) {
        return SkillsModel.aggregate([{
            $lookup: {
                from: "skill_type",
                localField: "type",
                foreignField: "type_id",
                as: "tmp_type"
            }
        }, {
            $unwind: "$tmp_type"
        }, {
            $match: {
                $and: [{
                    "tmp_type.language": {
                        $eq: 'en'
                    }
                }, {
                    "language": {
                        $eq: 'en'
                    }
                }]
            }
        }, {
            $project: {
                "type": {
                    "type_name": "$tmp_type.name",
                    "type_order": "$tmp_type.order"
                },
                document: "$$ROOT"
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: ["$type", "$document"]
                }
            }
        }, {
            $project: {
                "tmp_type": 0
            }
        }, {
            $group: {
                "_id": "$type_name",
                "value": {
                    $push: "$$ROOT"
                }
            }
        }, {
            $sort: {
                "type_order": 1,
                "order": 1
            }
        }]).exec(); // no need to lean() as aggregated objects are already plain javascript objects
    }
    getLanguages(_language) {
        return LanguagesModel.find({
            language: _language
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getInterests(_language) {
        return InterestsModel.find({
            language: _language
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getPortfolio(_language) {
        return PortfolioModel.find({
            language: _language
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getProfileDetails(_language) {
        return ProfileDetailsModel.find({
            language: _language,
            profile: {
                $eq: true
            }
        }).sort({
            order: 1
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getContactDetails(_language) {
        return ProfileDetailsModel.find({
            language: _language,
            contact: {
                $eq: true
            }
        }).sort({
            order: 1
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    getSocialNetworks(_language) {
        return SocialNetworksModel.find({
            language: _language
        }).sort({
            order: 1
        }).lean().then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
    static command_list = {
        get_content: 'getcontent',
        get_details: 'getdetails'
    }
}

module.exports = new api_engine();