import { useEffect } from "react";

const RedirectToCognito = () => {
  useEffect(() => {
    window.location.replace(
      "https://amalitech-task-manager.auth.eu-central-1.amazoncognito.com/login?client_id=4n4c0j24bn21uscu5k5qtb77j2&response_type=token&scope=email+openid+profile+phone+aws.cognito.signin.user.admin&redirect_uri=http://localhost:3000/dashboard/"
    );
  }, []);

  return <p>Redirecting to login...</p>;
};

export default RedirectToCognito;
