import { useEffect } from "react";

const RedirectToCognito = () => {
  useEffect(() => {
    window.location.replace(
      "https://testnameblahblah.auth.eu-central-1.amazoncognito.com/login?client_id=74rihsigpicvreq7m6o2vedkpg&redirect_uri=https://dev.daqvdg9hz9mfz.amplifyapp.com/dashboard&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile"
    );
  }, []);

  return <p>Redirecting to login...</p>;
};

export default RedirectToCognito;
