const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');
const FILE_PATH = './data.json';

const makeCommit = async (n) => {
    if (n === 0) {
        await simpleGit().push();
        return;
    }

    const x = random.int(0, 54); 
    const y = random.int(0, 6);  
    const DATE = moment().subtract(1, 'y').add(1, 'd')
        .add(x, 'w').add(y, 'd').format();

    const data = { date: DATE };

    console.log(DATE);
    await jsonfile.writeFile(FILE_PATH, data);
    await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });

    await makeCommit(n - 1);
};

makeCommit(100)
    .then(() => console.log('Finished making commits'))
    .catch(err => console.error('Error during commits:', err));
