import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';

function NotFound() {
	return (
		<section className="not-found" role="alert">
            Sorry, we couldn't find the page you're looking for! <Link to="/">Go back to the homepage</Link>
		</section>
	);
}

export default NotFound;
