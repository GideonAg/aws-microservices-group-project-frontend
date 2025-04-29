import { useEffect } from "react";

const RedirectToCognito = () => {
  useEffect(() => {
    window.location.replace(
      "https://amalitech-task-manager-prod.auth.eu-central-1.amazoncognito.com/login?client_id=23lgp1hf1peqg8s988medcjd10&response_type=token&scope=email+openid+profile+phone+aws.cognito.signin.user.admin&redirect_uri=https://main.daqvdg9hz9mfz.amplifyapp.com/dashboard/"
    );
  }, []);

  return <p>Redirecting to login...</p>;
};

export default RedirectToCognito;
