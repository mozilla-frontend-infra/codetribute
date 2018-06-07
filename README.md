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

### Code Organization

- `src/`: source code
- `src/App`: top-level component
- `src/components`: generic components that can be used in any view (not view-specific)

### Tasks and Configuration

Building this project uses [Neutrino](https://github.com/mozilla-neutrino/neutrino),
[neutrino-preset-mozilla-frontend-infra](https://github.com/mozilla-frontend-infra/neutrino-preset-mozilla-frontend-infra)

### Testing changes

Install npm dependencies and start it up:

- `yarn`
- `yarn start`

This will start a local development server on port 5000 (http://localhost:5000).

### Contributing

This project welcomes contributors. If you are interested, please feel free to
join [the mailing list](https://mail.mozilla.org/listinfo/bugsahoy-devel)


