var mongoose = require('mongoose');
var {
    Schema,
    Model
} = require('mongoose');
var promisedProperties = require('../helpers/promisedProperties');

const mongodb_settings = require('./mongo_settings');
// console.log(mongodb_settings);

const {
    user,
    password,
    host,
    database
} = mongodb_settings;
const credentials_str = (user && user.length > 0 &&
        password && password.lenght > 0) ?
    `${user}:${password}@` :
    '';
const connetion_string = `mongodb://${credentials_str}${host}/${database}`;

//mongoose.connect('mongodb://localhost/test');
//mongoose.connect('mongodb://username:password@host:port/database?options...');

class api_engine {
    constructor() {
        console.log("Connection string to MongoDB", connetion_string);
        mongoose.connect(connetion_string, {
            useNewUrlParser: true
        });
    }

    get(command, parameter, query_parameters) {
        let return_val = null;
        switch (command) {
            case api_engine.command_list.get_content:
                return_val = this.getContent(parameter, query_parameters);
                break;
        }
        return return_val;
    }

    getContent(language, query_parameters) {
        const result_promises = new Object();
        // check if string is defined altough empty
        if (typeof query_parameters.first_time_load !== 'undefined') {
            var load_images = true;
            var images = this.load_images();
            result_promises['images'] = images;
        } else {
            var load_images = false;
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


        return promisedProperties(result_promises)
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
        let translations_schema = api_engine.translations_shema;
        let translations_model = mongoose.model('translations', translations_schema);
        return translations_model.find(filter).then((promise_resolution) => {
            const _translations_ = {};
            promise_resolution.forEach(function (value, index) {
                const current_module = value.module;
                const current_tag = value.tag;
                if (!_translations_[_language]) {
                    _translations_[_language] = {};
                }
                if (!_translations_[_language][current_module]) {
                    _translations_[_language][current_module] = {};
                }
                if (!_translations_[_language][current_module][current_tag]) {
                    _translations_[_language][current_module][current_tag] = {};
                }
                Object.assign(_translations_[_language][current_module][current_tag], value.toObject());
            });
            return _translations_;
        }).catch((error) => {
            console.log(error);
        });
    }

    load_images() {
        const image_schema = api_engine.image_schema;
        const config_model = mongoose.model('config', image_schema);
        return config_model.find({
            $or: [{
                'key': 'bgimage'
            }, {
                'key': 'profile_picture'
            }]
        }).then((result) => {
            if (result && result.length > 0) {
                let named_result = {};
                result.forEach((row) => {
                    //row.value = row.value.toString('base64');
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
        let resume_schema = api_engine.resume_schema;
        let resume_model = mongoose.model('resume', resume_schema);
        return resume_model.findOne({
            language: _language
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getDetails(_language) {
        console.log('API: remember to implement an "on the fly" qr generator. remove from mongodb');
        let details_schema = api_engine.details_schema;
        let details_model = mongoose.model('personal_details', details_schema);
        return details_model.findOne({
            language: _language
        }).then((result) => {
            if (result) {
                result.qr_code = 'remember to implement an "on the fly" qr generator, remove from mongodb';
            }
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getRegulatedTraining(_language) {
        let regulated_training_schema = api_engine.regulated_training;
        let regulated_training_model = mongoose.model('regulated_training', regulated_training_schema);
        return regulated_training_model.find({
            language: _language
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getWorkExperience(_language) {
        let work_experience_schema = api_engine.work_experience_schema;
        let work_experience_model = mongoose.model('professional_experience', work_experience_schema);
        return work_experience_model.find({
            language: _language
        }).sort({
            start_date: -1
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getSkills(_language) {
        let skills_schema = api_engine.skills_schema;
        let skills_model = mongoose.model('skills', skills_schema);
        /*
        var o = {};
        o.map = function () { emit(this.type, this) }
        o.reduce = function (k, vals) {
            return {array: vals}
        }
        o.finalize = function (index, value) {
            // return index;
            if (!value.array) {
                return [value];
            }
            else { 
                return value.array
            }
        }
        o.query = {language : _language};
        // o.out = { replace: 'createdCollectionNameForResults' }
        // o.verbose = true;
        let returned_result = skills_model.mapReduce(o).then(result => result.results);
        return returned_result;
        /*
        return skills_model.aggregate(
            {"$group" : {_id:{type:"$type"}}},
            {$sort:{"_id.source":1}}
        ) .catch((error) => {
            console.log(error);
        });
*/
        /*
        // find({ language: _language }).sort({order:1}).then((result) => {
            return result;
        })
        */


        return skills_model.aggregate([{
                $lookup: {
                    from: "skill_type",
                    localField: "type",
                    foreignField: "type_id",
                    as: "tmp_type"
                }
            },

            {
                $unwind: "$tmp_type"
            },
            {
                $match: {
                    $and: [{
                            "tmp_type.language": {
                                $eq: 'en'
                            }
                        },
                        {
                            "language": {
                                $eq: 'en'
                            }
                        }
                    ]

                }


            },
            {
                $project: {
                    "type": {
                        "type_name": "$tmp_type.name",
                        "type_order": "$tmp_type.order"
                    },
                    document: "$$ROOT"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$type", "$document"]
                    }
                }
            },
            {
                $project: {
                    "tmp_type": 0
                }
            },
            {
                $group: {
                    "_id": "$type_name",
                    "value": {
                        $push: "$$ROOT"
                    }
                }
            },
            {
                $sort: {
                    "type_order": 1,
                    "order": 1
                }
            }
        ]).exec();
    }

    getLanguages(_language) {
        let languages_schema = api_engine.languages_schema;
        let languages_model = mongoose.model('languages', languages_schema);
        return languages_model.find({
            language: _language
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getInterests(_language) {
        let interests_schema = api_engine.interests_schema;
        let interests_model = mongoose.model('interests', interests_schema);
        return interests_model.find({
            language: _language
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getPortfolio(_language) {
        let portfolio_schema = api_engine.portfolio_schema;
        let portfolio_model = mongoose.model('portfolio', portfolio_schema);
        return portfolio_model.find({
            language: _language
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getProfileDetails(_language) {
        let profile_details_schema = api_engine.profile_details_schema;
        let profile_details_model = mongoose.model('profile', profile_details_schema);
        return profile_details_model.find({
            language: _language, profile: {$eq: true}
        }).sort({
            order: 1
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
	}
	
	getContactDetails(_language) {
        let profile_details_schema = api_engine.profile_details_schema;
        let profile_details_model = mongoose.model('profile', profile_details_schema);
        return profile_details_model.find({
            language: _language, contact: {$eq: true}
        }).sort({
            order: 1
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getSocialNetworks(_language) {
        let social_networks_schema = api_engine.social_networks_schema;
        let social_networks_model = mongoose.model('social_networks', social_networks_schema);
        return social_networks_model.find({
            language: _language
        }).sort({
            order: 1
        }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

}

api_engine.command_list = {
    get_content: 'getcontent'
}

api_engine.social_networks_schema = new Schema({
    language: String,
    label: String,
    text: String,
    order: Number
}, {
    collection: 'social_networks'
});

api_engine.profile_details_schema = new Schema({
    language: String,
    label: String,
    text: String,
    order: Number
}, {
    collection: 'profile'
});
// config collection but using buffer / binary schema
api_engine.image_schema = new Schema({
    value: Buffer,
    key: String
}, {
    collection: 'config'
});
api_engine.resume_schema = new Schema({
    resume: String,
    keywords: [],
    language: String
}, {
    collection: 'resume'
});
api_engine.details_schema = new Schema({
    name: String,
    surname: String,
    address: String,
    // phone_number could be a number but also include digits shuch as + or -
    phone_number: String,
    birth_date: Date, // date
    email: String,
    // qr_code: String, // qr_code will be made on the fly
    keywords: [],
    language: String
}, {
    collection: 'personal_details'
});
api_engine.regulated_training = new Schema({
    name: String,
    description: String,
    type: String,
    school: String,
    start_date: Date,
    finish_date: Date,
    final_project: String,
    school_url: String,
    average_school: Number,
    keywords: [],
    language: String
}, {
    collection: 'regulated_training'
});
api_engine.work_experience_schema = new Schema({
    name: String,
    description: String,
    start_date: Date,
    finish_date: Date,
    post: String,
    company: String,
    company_url: String,
    keywords: [],
    language: String
}, {
    collection: 'professional_experience'
});
api_engine.skills_schema = new Schema({
    name: String,
    description: String,
    skill_level: Number,
    related_knowledge: {}, // subquery ?
    type: String,
    developed_projects: [],
    keywords: [],
    language: String
}, {
    collection: 'skills'
});
api_engine.languages_schema = new Schema({
    name: String,
    certification: String,
    type: String,
    school: String,
    school_url: String,
    written_level: String,
    spoken_level: String,
    keywords: [],
    language: String
}, {
    collection: 'languages'
});
api_engine.interests_schema = new Schema({
    name: String,
    description: String,
    keywords: [],
    language: String
}, {
    collection: 'interests'
});
api_engine.portfolio_schema = new Schema({
    name: String,
    description: String,
    keywords: [],
    language: String,
    url: String,
    picture: Buffer
}, {
    collection: 'portfolio'
});
api_engine.translations_shema = new Schema({
    language: String,
    module: String,
    tag: String,
    text: String
}, {
    collection: 'translations'
});

module.exports = new api_engine();