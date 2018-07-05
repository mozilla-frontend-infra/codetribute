# Codetribute

Codetribute is a site that guides contributors to
their first contribution. It helps new contributors 
find a project they want to work with, learn about 
that project, and then find a task that is suitable 
to their skills and interests and not already assigned to 
someone else.

## Development

### Prerequisites

- Node version v8+
- [Yarn](https://www.npmjs.com/package/yarn)

### Building

First, fork this repository to another GitHub account (your account).
Then you can clone and install:

```
git clone https://github.com/<YOUR_ACCOUNT>/codetribute.git
cd codetribute
yarn
```

### Environment variables

To get started with local development, create a file in the root of the repo named
`.env` with the following content. You can also set the variables in your shell environment.

```bash
GITHUB_PERSONAL_API_TOKEN=<your_github_api_token>
```

Generate a GitHub personal access token [here](https://github.com/settings/tokens). When prompted
about scopes, access to public repositories is the only one required.

### Code Organization

- `src/`: source code
- `src/App`: top-level component
- `src/components`: generic components that can be used in any view (not view-specific)

### Tasks and Configuration

Building this project uses [Neutrino](https://github.com/mozilla-neutrino/neutrino-dev),
[neutrino-preset-mozilla-frontend-infra](https://github.com/mozilla-frontend-infra/neutrino-preset-mozilla-frontend-infra)

### Testing changes

Install npm dependencies and start it up:

- `yarn`
- `yarn start`

This will start a local development server on port 5000 (http://localhost:5000).

## Adding a project

Each of the projects is a file in the [data](https://github.com/mozilla-frontend-infra/codetribute/tree/master/src/data)
folder - to add a new one, create a new file named after the project, ending in `.yaml`. Ensure all spaces and special
characters are replaced with `-`. Make sure too that the project hasn't already been inside the [data](https://github.com/mozilla-frontend-infra/codetribute/tree/master/src/data)
folder

Codetribute can read from both GitHub and Bugzilla. To add a new entry to the site, create a file `<project-name>.yml` 
in `src/data` using the [template example](#template-example) as the initial setup. For inspiration, check out the 
[Taskcluster](https://github.com/mozilla-frontend-infra/codetribute/blob/master/src/data/taskcluster.yaml) yaml file.

### Template Example

```yaml
name: <Project Name>
summary: A short summary of the project
introduction: |
  ## About <Project Name>

  ...

  ## Who Works on <Project Name>?

  ...

  ## How Do I Get Started?

  ...

  ### How Do I Write the Code?

  ...

  ## How Do I Get Help?

  ...

products:
 - <Bugzilla Product>
 - <Bugzilla Product>: [<Bugzilla Componet 1>, <Bugzilla Component 2>]
 repositories:
- <Organization Name>/<Repository Name> : <Label to get the issue>
[
    if there is more than one tag for a repository, list them in a different line, e.g
      repositories:
      - <Organization Name>/<Repository Name>: good-first-bug
      - <Organization Name>/<Repository Name>: easy-fix
]
```


### Contributing

This project welcomes contributors. If you are interested, please feel free to
join [the mailing list](https://mail.mozilla.org/listinfo/bugsahoy-devel)


