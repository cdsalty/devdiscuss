import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div>AuthLayout</div>; would only return the word, "AuthLayout"; we need SignInPage and SignUpPage to return the word, "SignInPage" and "SignUpPage" respectively--> We need the children.
    <main className="flex min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
