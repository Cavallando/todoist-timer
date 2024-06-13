# Todoist Timer Integration [![Continuous Deployment](https://github.com/Cavallando/todoist-timer/actions/workflows/cd.yml/badge.svg)](https://github.com/Cavallando/todoist-timer/actions/workflows/cd.yml)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/Cavallando)

## [Quick Install](https://app.todoist.com/app/install/28183_9f2d5d282ea6a000f3cc9d7f)

## Usage

The Todoist Timer Integration is a Todoist UI Extension that offers the following functionality:

- `/timers/start`: Starts a Timer and posts a comment on the Task
- `/timers/stop`: Stops a Timer and posts a comment on the Task

## Local Development

1. `yarn install`
2. `yarn dev` or `docker compose up -d --build`

## Deployment

The Todoist Timer Integration is hosted on Fly.io with a PostgreSQL Database.

It is accessible via https://todoist-timer.mike.fun or https://todoist-integration.fly.dev.

## TODO

- [ ] Setup Webhooks to automatically stop a timer when completed, possibly allow this as a Settings Extension
- [ ] Add Icons to README and App
- [ ] Decide on silly name for this
- [ ] Rename Fly.io configuration to new name
- [ ] Prepare for Open Source
