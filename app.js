const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs); // Prints ['Leslie', 'Web Developer']

const printProfileData = profileDataArr => {
    // This code produces the same results as the code below
    // for (let i = 0; i < profileDataArr.length; i++) {
    //     console.log(profileDataArr[i]);
    // }  
    profileDataArr.forEach(profileItem => console.log(profileItem));  
};

printProfileData(profileDataArgs); // Prints Leslie and Web Developer on separate lines
