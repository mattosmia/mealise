import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';

function NotFound() {
	return (
		<section className="not-found" role="alert">
			<div>
            	<h2>Page not found</h2>
				<p>Sorry, we couldn't find the page you're looking for!<br/><Link to="/">Go back to the homepage</Link></p>
			</div>
		</section>
	);
}

export default NotFound;
