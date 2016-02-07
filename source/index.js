import fs from 'fs';
import path from 'path';
import findConfig from 'find-config';


const CONFIG_FILENAME = '.ghkrc';


function initialize(gitroot) {
    let ghkhooks = path.join(__dirname, 'hooks');
    let githooks = path.join(gitroot, '.git', 'hooks');
    fs.readdir(ghkhooks, (error, files) => {
        files.forEach(file => {
            let githook = path.join(githooks, file);
            let ghkhook = path.join(ghkhooks, file);
            createHookIfNotExists(githook);
            if (!isHookAlreadyAdded(githook, ghkhook)) {
                fs.appendFile(githook,
                    `\n# run ghk "${file}" hook\n${ghkhook}\n`);
                console.log(`Added ghk ${file} hook to this repo.`);
            }
        });
    });
}


function activate(hook) {
    let hookPackages = getConfig(hook);
    for (let packageName of Object.keys(hookPackages)) {
        let githook = require(`ghk-${packageName}`);
        let githookConfig = hookPackages[packageName];
        let result = githook[hook](githookConfig);
        if (result !== true) {
            console.log(`${hook} hook failed: ${packageName}: ${result}`);
            process.exit(1);
        }
    }
}


function createHookIfNotExists(hook) {
    try {
        fs.accessSync(hook, fs.W_OK);
    } catch (e) {
        if (e.code === 'ENOENT') {
            fs.writeFileSync(hook, '');
            fs.chmodSync(hook, '755');
        }
    }
}


function isHookAlreadyAdded(githook, ghkhook) {
    let pattern = new RegExp(ghkhook);
    return pattern.test(fs.readFileSync(githook));
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
