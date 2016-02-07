import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import findConfig from 'find-config';


const CONFIG_FILENAME = '.ghkrc';


function initialize(gitroot) {
    let templates = path.join(__dirname, 'templates');
    let hooks = path.join(gitroot, '.git', 'hooks');
    fs.readdir(templates, (error, files) => {
        files.forEach(file => {
            shell.cp(path.join(templates, file), hooks);
            fs.chmod(path.join(hooks, file), '755');
        });
    });
}


function activate(hook) {
    let config = getConfig(hook);
    for (let githook of config) {
        githook = require(githook);
        if (!githook[hook]()) {
            process.exit(1);
        }
    }
}


function readConfigFile() {
    let configfile = findConfig(CONFIG_FILENAME);
    if (configfile) {
        let config = fs.readFileSync(configfile);
        return JSON.parse(config);
    }
    return {};
}


function getConfig(hook) {
    let config = readConfigFile();
    return hook in config ? config[hook] : [];
}


exports.initialize = initialize;
exports.activate = activate;
