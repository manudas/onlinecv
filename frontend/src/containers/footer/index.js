import React, { Component } from 'react';

import { connect } from 'react-redux';

import './footer.css';

class Footer extends Component {
	
    translateString(string) {
        let translations = this.props.translations
            ? this.props.translations
            : null;
        let result = translations && translations[string] ? translations[string] : null;
        if (result) {
            return result["text"];
        } else {
            return string + "_translation";
        }
    }
	
    render() {
		if (!this.props.data_is_loaded) {
			return null;
		}

		let quote = this.translateString('quote');
		if (quote === 'quote_translation') quote = null; // if default translation, there is no quote
		const quote_author = this.translateString('quote_author');

        /* ============  FOOTER ================= */
        return (
            <footer id="footer" className="row">
                {/* Put your Quote Here*/}
                <p className="quote">
					{
						quote ?
							'“' + quote + '”':
							''
					}
				</p>
                {/* /Quote */}
                {/* Quote Autor */}
                <p className="author">
					{
						quote && quote_author ?
							quote_author :
							''
					}
				</p>
                {/* /Quote Autor */}
            </footer>
        );
        /* ============  /FOOTER ================= */
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const language = (state && state.language) ? state.language : null;
    const translations =
        data &&
        data.translations &&
        data.translations[language] &&
        data.translations[language]['Footer']
            ? data.translations[language]['Footer']
            : null;
	const data_is_loaded = data !== null;		
    return {
		data_is_loaded: data_is_loaded,
        translations: translations,
        language: language
    };
}
export default connect(mapStateToProps)(Footer);