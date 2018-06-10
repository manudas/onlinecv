import React, { Component } from 'react';

import './cvcontainer.css';

import ProfileResume from '../../containers/profileResume';
import ProfileDetail from '../../containers/profileDetails';
import Education from '../../containers/education';
import WorkExperience from '../../containers/work_experience';
import Skill from '../../containers/skills';
import Interest from '../../containers/interests';
import PortFolio from '../../containers/portfolio';
import ContactForm from '../../containers/contact_form';
import ThankYou from '../thank_you';
import Footer from '../footer';

class CVContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderHeaderColors() {
    /* Header Colors */
    return (
      <div className="col-md-10 col-sm-10  col-md-offset-2 col-sm-offset-1 clearfix top-colors">
        <div className="top-color top-color1"></div>
        <div className="top-color top-color2"></div>
        <div className="top-color top-color3"></div>
        <div className="top-color top-color1"></div>
        <div className="top-color top-color2"></div>
      </div>
    );
    /* /Header Colors */
  }

  renderHeaderButtons() {
    /* Header Buttons */
    return (
      <div className="row">
        <div className="header-buttons col-md-10 col-md-offset-1">
          {/* Download Resume Button */}
          <a href="#" className="btn btn-default btn-top-resume"><i className="fa fa-download"></i><span className="btn-hide-text">Download my resume</span></a>
          {/* /Download Resume Button */}
          {/* Mail Button */}
          <a href="#" className="btn btn-default btn-top-message"><i className="fa fa-envelope-o"></i><span className="btn-hide-text">Send me a message</span></a>
          {/* /Mail Button */}
        </div>
      </div>
    );
    /* /Header Buttons */
  }

  render() {
    /* CONTENT
    ========================================================= */
    return (
      <section id="content-body" className="container animated">
        <div className="row" id="intro">
          {this.renderHeaderColors()}
          {/* Beginning of Content */}
          <div className="col-md-10 col-sm-10 col-md-offset-2 col-sm-offset-1 resume-container">
            {this.renderHeaderButtons()}
            <ProfileResume />
            {/* ============  TIMELINE ================= */}
            <div className="timeline-wrap">
              <div className="timeline-bg">
                <ProfileDetail />
                <Education />
                <WorkExperience />
                <Skill />
                <Interest />
                <PortFolio />
                <ContactForm />
                <ThankYou />
              </div>
            </div>
            {/* ============  /TIMELINE ================= */}
            <Footer />
          </div>
        </div>
      </section>
    );
    /* /CONTENT
    ========================================================= */
  }
}

export default CVContainer;