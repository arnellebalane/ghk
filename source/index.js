import fs from 'fs';
import path from 'path';
import shell from 'shelljs';


function initialize(gitroot) {
    const templates = path.join(__dirname, 'templates');
    const hooks = path.join(gitroot, '.git', 'hooks');
    fs.readdir(templates, (error, files) => {
        files.forEach(file => {
            shell.cp(path.join(templates, file), hooks);
            fs.chmod(path.join(hooks, file), '755');
        });
    });
}


module.exports = initialize;
