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

### Contributing

This project welcomes contributors. If you are interested, please feel free to
join [the mailing list](https://mail.mozilla.org/listinfo/bugsahoy-devel)

## Add a project

Each of the projects is a file in the [data](https://github.com/mozilla-frontend-infra/codetribute/tree/master/src/data)
folder - to add a new one, create a new file named after the project, ending in `.yaml`. Ensure all spaces and special
characters are replaced with `-`. Make sure too that the project hasn't already been inside the [data](https://github.com/mozilla-frontend-infra/codetribute/tree/master/src/data)
folder

The contents of the file are just some details about the project:

```yaml
name: [project name]
summary: [a brief description of the project]
[ The introduction contains more information about the projects in markdown format.
Below are the suggestions on how to write the introduction. ]
introduction: |
  ## About [project name]

  ...

  ## Who Works on [project name]?

  ...

  ## How Do I Get Started?

  ...

  ### How Do I Write the Code?

  ...

  ## How Do I Get Help?

  ...

products:
- [bugzilla product] OR
- [bugzilla product] : [bugzilla component, specify this if it is not going to be for all component]
repositories:
- [repository name] : [issues' tag / label to get the bug]
[
    if there is more than one tag for a repository, list them in a different line, e.g
    - taskcluster/taskcluster-queue: good-first-bug
    - taskcluster/taskcluster-queue: easy-fix
]
```

Check out the [Taskcluster](https://github.com/mozilla-frontend-infra/codetribute/blob/master/src/data/taskcluster.yaml)
file for an example of this project structure.

