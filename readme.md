ghk
===

write git hooks using nodejs


#### installation

to use **ghk**, you need to install it globally

```
$ npm install -g ghk
```

as well as locally in your project directory

```
$ npm install --save ghk
```


#### usage

`cd` into your git repository and run

```
$ ghk init
```

to setup default git hooks for that repository


#### plugins

what **ghk** does not actually do anything rather than to setup git hooks and
call the appropriate ghk plugins. its the plugins that do the actual processing

currently, these plugins are available:

- **[ghk-branch-nocommit](https://www.npmjs.com/package/ghk-branch-nocommit)**
- **[ghk-jshint](https://www.npmjs.com/package/ghk-jshint)**

to use a plugin, you need to install them locally in your project:

```
$ npm install --save PACKAGENAME
```

and then specify in your `.ghkrc` file (can be located in your project's root
directory or your home directory):

```
{
    "pre-commit": {
        "branch-nocommit": {
            "branches": ["master"]
        },
        "jshint": {}
    }
}
```


#### `.ghkrc`

the keys of the `.ghkrc` file corresponds to the names of the git hooks in
which they will be executed. the available git hooks are:

- `applypatch-msg`
- `commit-msg`
- `post-update`
- `pre-applypatch`
- `pre-commit`
- `pre-push`
- `pre-rebase`
- `prepare-commit-msg`
- `update`

if you want a package to execute at a certain git hook, simply add it and its
configuration to the appropriate key in `.ghkrc`. generally, the format of the
`.ghkrc` file looks like this:

```
{
    "git-hook-name": {
        "package-name": {
            "package-config": "value",
            "package-config": "value"
        },
        "package-name": {}
    }
}
```


#### creating plugins

**ghk** plugins are just npm modules which exposes an API corresponding to
the git hook names that it supports. for example, if a **ghk** plugin supports
a `pre-commit` hook, its API would look like this:

```
exports['pre-commit'] = function() {
    // plugin implementation here
};
```

the plugin should return `true` if it succeeds. otherwise, it should return an
error message explaining why it failed.
