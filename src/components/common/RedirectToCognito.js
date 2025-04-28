import { useEffect } from "react";

const RedirectToCognito = () => {
  useEffect(() => {
    window.location.replace(
      process.env.COGNITO_REDIRECT_URL
    );
  }, []);

  return <p>Redirecting to login...</p>;
};

export default RedirectToCognito;
