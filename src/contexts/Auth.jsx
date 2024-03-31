import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);

  const handlePermissions = async (_id) => {
    const res = await window.api.UserPermission({ _id });
    const parseResult = JSON.parse(res);
    if (parseResult.error) {
      setErrors(parseResult.error);
    }

    if (parseResult.data) {
      localStorage.setItem("_permissions", JSON.stringify(parseResult.data));
      setPermissions(parseResult.data);
      setErrors(null);
    }
  };

  const handleSignin = async (props) => {
    const res = await window.api.SigninUser(props);
    const parseResult = JSON.parse(res);

    if (parseResult.error) {
      setErrors(parseResult.error);
    }

    if (parseResult.data) {
      localStorage.setItem("_user", JSON.stringify(parseResult.data));
      setAccount(parseResult.data);
      handlePermissions(parseResult.data.permissions);
      setErrors(null);
    }
  };

  const handleSignout = async (props) => {
    localStorage.clear();
    setAccount(null);
    setPermissions(null);
    setErrors(null);
  };

  useEffect(() => {
    setErrors(null);
    const _user = localStorage.getItem("_user");
    const _permissions = localStorage.getItem("_permissions");

    if (!_user && !account) {
      handleSignout();
    }

    if (_permissions) setPermissions(JSON.parse(_permissions));
    if (_user) setAccount(JSON.parse(_user));
  }, []);

  const authValue = {
    error,
    loading,
    account,
    permissions,
    signin: handleSignin,
    signout: handleSignout,
  };

  console.log({ at: permissions });
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
