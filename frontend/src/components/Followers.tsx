// import React, { useEffect, useState } from "react";
import shouldBeLoggedIn from "./Authenticate";

function Followers() {
  shouldBeLoggedIn(true);

  return <div></div>;
}

export default Followers;
