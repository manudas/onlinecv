import React, { Component } from 'react';

import './footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* ============  FOOTER ================= */
        return (
            <footer id="footer" className="row">
                {/* Put your Quote Here*/}
                <p className="quote">“Ideas are the beginning points of all fortunes”</p>
                {/* /Quote */}
                {/* Quote Autor */}
                <p className="author">Napoleon Hill</p>
                {/* /Quote Autor */}
            </footer>
        );
        /* ============  /FOOTER ================= */
    }
}

export default Footer;