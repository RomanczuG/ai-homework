import { useEffect } from "react";

// This function checks if the URL includes "www" or isn't using "https"
function shouldRedirect() {
  if (window.location.protocol !== 'https:') {
    return true;
  }
  if (window.location.host.includes('www')) {
    return true;
  }
  return false;
}

// This function redirects the user to the preferred URL
function handleRedirect() {
  const { host, pathname, search } = window.location;
  const newHost = host.replace('www.', '');
  window.location.replace(`https://${newHost}${pathname}${search}`);
}

function Redirector() {
  useEffect(() => {
    if (shouldRedirect()) {
      handleRedirect();
    }
  }, []);

  return null;
}

export default Redirector;
