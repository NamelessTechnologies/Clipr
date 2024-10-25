//For every page you can visit, run this function at the beginning and input 'true' as the parameter if the user must be logged in to see it
//or false if it can only be viewed logged out
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
