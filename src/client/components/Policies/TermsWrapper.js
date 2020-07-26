import React from 'react';
import PropTypes from 'prop-types';

import './TermsWrapper.scss';

export default function TermsWrapper({ children }) {
	return (
		<section className="terms-wrapper">
			{ children }
		</section>
	);
}

TermsWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired
}