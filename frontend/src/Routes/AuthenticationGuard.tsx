import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Spinner from "../Components/Spinner/Spinner";


export const AuthenticationGuard = (Component: React.ComponentType) => {
    return withAuthenticationRequired(Component, {
        onRedirecting: () => (
            <div className="page-layout">
                <Spinner />
            </div>
        ),
    });
};