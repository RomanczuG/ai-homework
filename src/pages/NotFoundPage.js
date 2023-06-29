import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <div>
      <Helmet>
        <title>404 Page Not Found | Study Smarter Now</title>
        <meta name="description" content="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." />
        <link rel="canonical" href="https://studysmarternow.com/404" />
      </Helmet>
      <h1>404 Page Not Found</h1>
      <p>We're sorry, but the page you were looking for doesn't exist.</p>
      <p>You may have mistyped the address or the page may have moved.</p>
      <p><Link to="/">Go back to the homepage</Link></p>
    </div>
  );
};

export default NotFoundPage;
