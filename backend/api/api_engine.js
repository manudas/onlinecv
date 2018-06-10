var mongoose = require('mongoose');
var { Schema, Model } = require('mongoose');
var promisedProperties = require('../helpers/promisedProperties');

const mongodb_settings = require('./mongo_settings');
// console.log(mongodb_settings);

const { user, password, host, database } = mongodb_settings;
const credentials_str = (user && user.length > 0
    && password && password.lenght > 0)
    ? `${user}:${password}@`
    : '';
const connetion_string = `mongodb://${credentials_str}${host}/${database}`;

//mongoose.connect('mongodb://localhost/test');
//mongoose.connect('mongodb://username:password@host:port/database?options...');

class api_engine {
    constructor() {
        console.log("Connection string to MongoDB", connetion_string);
        mongoose.connect(connetion_string);
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
        let result_promises = new Object();
        // check if string is defined altough empty
        if (typeof query_parameters.first_time_load !== 'undefined') {
            var load_images = true;
            var images = this.load_images();
            result_promises['images'] = images;
        }
        else {
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
        let resume = this.getResume(language);
        result_promises['resume'] = resume;

        let details = this.getDetails(language);
        result_promises['details'] = details;

        let education = this.getEducation(language);
        result_promises['education'] = education;

        let work_experience = this.getWorkExperience(language);
        result_promises['work_experience'] = work_experience;

        let computer_knowledge = this.getComputerKnowledge(language);
        result_promises['computer_knowledge'] = computer_knowledge;

        let knowledge = this.getKnowledge(language);
        result_promises['knowledge'] = knowledge;

        let languages = this.getLanguages(language);
        result_promises['languages'] = languages;

        let interests = this.getInterests(language);
        result_promises['interests'] = interests;

        // let portfolio = this.getPorfolio(language);
        let portfolio = 'think what mongo collections to include in portfolio';
        result_promises['portfolio'] = portfolio;

        return promisedProperties(result_promises)
            .catch(console.error);
    }

    load_images() {
        let image_schema = api_engine.image_schema;
        let config_model = mongoose.model('config', image_schema);
        return config_model.find({$or:[ {'key': 'bgimage'}, {'key': 'profile_picture'}]}).then((result) => {
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
        return resume_model.findOne({ language: _language }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getDetails(_language) {
        console.log('API: remember to implement an "on the fly" qr generator. remove from mongodb');
        let details_schema = api_engine.details_schema;
        let details_model = mongoose.model('personal_details', details_schema);
        return details_model.findOne({ language: _language }).then((result) => {
            result.qr_code = 'remember to implement an "on the fly" qr generator, remove from mongodb';
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getEducation(_language) {
        let education_schema = api_engine.education_schema;
        let education_model = mongoose.model('regulated_training', education_schema);
        return education_model.find({ language: _language }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getWorkExperience(_language) {
        let work_experience_schema = api_engine.work_experience_schema;
        let work_experience_model = mongoose.model('professional_experience', work_experience_schema);
        return work_experience_model.find({ language: _language }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getComputerKnowledge(_language) {
        let computer_knowledge_schema = api_engine.computer_knowledge_schema;
        let computer_knowledge_model = mongoose.model('computer_knowledge', computer_knowledge_schema);
        return computer_knowledge_model.find({ language: _language }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getKnowledge(_language) {
        let knowledge_schema = api_engine.knowledge_schema;
        let knowledge_model = mongoose.model('knowledge', knowledge_schema);
        return knowledge_model.find({ language: _language }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getLanguages(_language) {
        let languages_schema = api_engine.languages_schema;
        let languages_model = mongoose.model('languages', languages_schema);
        return languages_model.find({ language: _language }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }

    getInterests(_language) {
        let hobbies_schema = api_engine.hobbies_schema;
        let hobbies_model = mongoose.model('hobbies', hobbies_schema);
        return hobbies_model.find({ language: _language }).then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
    }
}

api_engine.command_list = {
    get_content: 'getcontent'
}

// config collection but using buffer / binary schema
api_engine.image_schema = new Schema(
    {
        value: Buffer,
        key: String
    },
    {
        collection: 'config'
    });
api_engine.resume_schema = new Schema(
    {
        resume: String,
        keywords: [],
        language: String
    },
    {
        collection: 'resume'
    });
api_engine.details_schema = new Schema(
    {
        name: String,
        surname: String,
        address: String,
        // phone_number could be a number but it could include digits shuch as + or -
        phone_number: String,
        birth_date: Date, // date
        email: String,
        // qr_code: String, // qr_code will be made on the fly
        keywords: [],
        language: String
    },
    {
        collection: 'personal_details'
    });
api_engine.education_schema = new Schema(
    {
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
    },
    {
        collection: 'regulated_training'
    });
api_engine.work_experience_schema = new Schema(
    {
        name: String,
        description: String,
        start_date: Date,
        finish_date: Date,
        post: String,
        company: String,
        company_url: String,
        keywords: [],
        language: String
    },
    {
        collection: 'professional_experience'
    });
api_engine.computer_knowledge_schema = new Schema(
    {
        name: String,
        description: String,
        skill_level: Number,
        related_knowledge: {}, // subquery ?
        type: String,
        developed_projects: [],
        keywords: [],
        language: String
    },
    {
        collection: 'computer_knowledge'
    });
api_engine.knowledge_schema = new Schema(
    {
        name: String,
        description: String,
        acquisition_date: Date,
        skill_level: Number,
        related_knowledge: {}, // subquery ?
        type: String,
        keywords: [],
        language: String
    },
    {
        collection: 'knowledge'
    });
api_engine.languages_schema = new Schema(
    {
        name: String,
        certification: String,
        type: String,
        school: String,
        school_url: String,
        written_level: String,
        spoken_level: String,
        keywords: [],
        language: String
    },
    {
        collection: 'languages'
    });
api_engine.hobbies_schema = new Schema(
    {
        name: String,
        description: String,
        keywords: [],
        language: String
    },
    {
        collection: 'hobbies'
    });

module.exports = new api_engine();