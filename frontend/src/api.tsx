

// const fetchData = async (): Promise<string> => {
//     try {
//       const response = await fetch('http://localhost:5001/TestData/user');
//       const json = await response.json() as User;
//       console.log("setting URL to " + json.firstName);
//       setURL(json.firstName);
//       return json.firstName;
//       // console.log(json.firstName);
//     } catch (error) {
//       console.error(error);
//       throw new Error("This is a custom error message");
//       }
    
//   }