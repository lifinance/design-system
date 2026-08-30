# Contributing

## Propose a component or a token

Open a [new component request](.github/ISSUE_TEMPLATE/new-component-request.md) or a [new token request](.github/ISSUE_TEMPLATE/new-token-request.md) GitHub issue.

## Open a pull request from a branch in this repository

Push your branch to this repository, then open the pull request from that branch. A pull request from a branch in this repository receives the full check set: `Lint and types`, `Story tests`, `Registry build`, and `chromatic`.

[GETTING_STARTED.md](GETTING_STARTED.md) covers the dev, design, prototyping, Figma, and AI workflows.

## Contribute from a fork

A fork pull request receives the `Lint and types`, `Story tests`, and `Registry build` checks, but no `chromatic` check. The design system requires a visual test for every change. A maintainer therefore mirrors the branch into this repository and does not merge the fork pull request.

The `Chromatic` workflow builds Storybook with the `CHROMATIC_PROJECT_TOKEN` repository secret. GitHub withholds a repository secret from a workflow that a fork pull request triggers. The workflow therefore runs on the `push` event. Only a branch in this repository triggers that event. A fork branch triggers the `push` event in the fork, so this repository builds no Storybook for the fork pull request. The [Chromatic documentation for forked repositories](https://www.chromatic.com/docs/github-actions/#forked-repositories) gives one alternative: publish the project token in the workflow file. This repository keeps the token secret and does not publish it.

A maintainer mirrors the branch as follows:

1. Fetch the pull request head: `gh pr checkout <number>`.
2. Push the commits to a branch in this repository: `git push origin HEAD:contrib/<number>-<topic>`.
3. Open a pull request from `contrib/<number>-<topic>`. Credit the author and link the fork pull request.
4. Close the fork pull request and link the mirrored pull request.

Each commit keeps its author, so the contributor keeps the credit for the work.
