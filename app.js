// In order to use the fs (File Structure) module, need to include the following at the top of JS
const fs = require('fs');
const generatePage = require('./src/page-template.js');

// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs); // Prints ['Leslie', 'Web Developer'] if enter "node app 'Leslie' 'Web Developer'" into terminal
const profileDataArgs = process.argv.slice(2);
const [name, github] = profileDataArgs;

// const printProfileData = profileDataArr => {
//     // This code produces the same results as the code below
//     // for (let i = 0; i < profileDataArr.length; i++) {
//     //     console.log(profileDataArr[i]);
//     // }  
//     profileDataArr.forEach(profileItem => console.log(profileItem));  
// };

// printProfileData(profileDataArgs); // Prints Leslie and Web Developer on separate lines

fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);

    console.log('Portfolio complete! Check out index.html to see the output!');
});
