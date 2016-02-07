#!/usr/bin/env node
import shell from 'shelljs';
import meow from 'meow';
import ghk from './index';


const cli = meow('Usage: $ ghk init');


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
    if (cli.input[0] === 'init') {
        ghk.initialize(getGitRoot());
    } else {
        cli.showHelp(1);
    }
} else {
    console.log('You need to be inside a git repository.');
    process.exit(1);
}
