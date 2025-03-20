import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { FC } from "react";
import Spinner from "../Components/Spinner/Spinner";

interface AuthenticationGuardProps {
  component: React.ComponentType;
}

export const AuthenticationGuard: FC<AuthenticationGuardProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <Spinner />
      </div>
    ),
  });

  return <Component />;
};
