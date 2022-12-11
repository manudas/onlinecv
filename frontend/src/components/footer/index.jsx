import React, { Component } from 'react';

import { connect } from 'react-redux';

import { translateString } from '../../helpers/translations';

import './footer.css';

class Footer extends Component {
    render() {
        if (!this.props.data_is_loaded) {
            return null;
        }

        let quote = translateString('quote', this);
        if (quote === 'quote_translation') quote = null; // if default translation, there is no quote
        const quote_author =
            translateString('quote_author', this);

        /* ============  FOOTER ================= */
        return (
            <footer id="footer" className="row">
                {/* Put your Quote Here*/}
                <p className="quote">
                    {quote ? '“' + quote + '”' : ''}
                </p>
                {/* /Quote */}
                {/* Quote Autor */}
                <p className="author">
                    {quote && quote_author
                        ? quote_author
                        : ''}
                </p>
                {/* /Quote Autor */}
            </footer>
        );
        /* ============  /FOOTER ================= */
    }
}

function mapStateToProps(state) {
    const data = state && state.data ? state.data : null;
    const language =
        state && state.language ? state.language : null;
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
