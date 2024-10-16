const shouldBeLoggedIn = (shouldBeLoggedIn: boolean) => {
  const getUser = localStorage.getItem("user");
  let loggedIn = false;
  if (getUser) {
    loggedIn = true;
  }
  if (loggedIn != shouldBeLoggedIn) {
    window.location.href = "/";
  }
};

export default shouldBeLoggedIn;
