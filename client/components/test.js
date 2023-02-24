import React from "react";

const Test = (userDetails) => {
  const user = userDetails.user;
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <main>
      <div>Successfully singed in or logged in</div>
      <div>
        <h1>Log Out</h1>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div>
        <button onClick={logout}>Log Out</button>
      </div>
    </main>
  );
};

export default Test;
