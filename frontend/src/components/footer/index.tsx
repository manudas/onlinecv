import React, { Component } from 'react';
import { connect } from 'react-redux';

import { propsDef, quoteDef } from './types';

import './footer.css';

class Footer extends Component<propsDef> {
    render() {
        const {
            quote = null,
            author = null
        } = this.props.quote
        /* ============  FOOTER ================= */
        return (
            <footer id="footer" className="row">
                {/* Put your Quote Here*/}
                <p className="quote">
                    { quote ? '“' + quote + '”' : ''}
                </p>
                {/* /Quote */}
                {/* Quote Autor */}
                <p className="author">
                    {
                        quote && author
                            ? author
                            : ''
                    }
                </p>
                {/* /Quote Autor */}
            </footer>
        );
        /* ============  /FOOTER ================= */
    }
}

function mapStateToProps(state: {
    language: string,
    data: {
        resume: {
            quote: quoteDef
        }
    },
    translations: Record<string, Record<string, string>>
}) {
    const language = state?.language
    const quote = state?.data?.resume?.quote ?? {}
    const translations = state?.translations?.[language]?.['Footer']

    return {
        language,
        quote,
        translations,
    };
}
export default connect(mapStateToProps)(Footer);
