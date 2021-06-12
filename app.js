// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs); // Prints ['Leslie', 'Web Developer'] if enter "node app 'Leslie' 'Web Developer'" into terminal
// const profileDataArgs = process.argv.slice(2);
// const [name, github] = profileDataArgs;

// const printProfileData = profileDataArr => {
//     // This code produces the same results as the code below
//     // for (let i = 0; i < profileDataArr.length; i++) {
//     //     console.log(profileDataArr[i]);
//     // }  
//     profileDataArr.forEach(profileItem => console.log(profileItem));  
// };

// printProfileData(profileDataArgs); // Prints Leslie and Web Developer on separate lines

// CODE START
// In order to use the fs (File Structure) module, need to include the following at the top of JS
const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));
    
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
