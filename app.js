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
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username (Required)',
            validate: gitUserInput => {
                if (gitUserInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a project description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: gitLinkInput => {
                if (gitLinkInput) {
                    return true;
                } else {
                    console.log('Please enter the GitHub link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);

        // Removed so could make code consistently use Promises instead of a mixture of Promises and Callbacks (what is below)
        // const pageHTML = generatePage(portfolioData);

        // fs.writeFile('./dist/index.html', pageHTML, err => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log('Portfolio complete! Check out index.html to see the output!');

        //     fs.copyFile('./src/style.css', './dist/style.css', err => {
        //         if (err) {
        //             console.log(err);
        //             return;
        //         }
        //         console.log('Style sheet copied successfully!');
        //     }); 
        // });
    });
