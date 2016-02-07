#!/usr/bin/node
import shell from 'shelljs';
import meow from 'meow';
import ghk from './index';


const cli = meow('Usage: $ ghk');


function getGitRoot() {
    if (isInsideGitRepo) {
        return shell.exec('git rev-parse --show-toplevel',
            { silent: true }).output.trim();
    }
    return null;
}


function isInsideGitRepo() {
    return shell.exec('git status', { silent: true }).code === 0;
}


if (isInsideGitRepo()) {
    ghk(getGitRoot());
} else {
    console.log('You need to be inside a git repository.');
    process.exit(1);
}
