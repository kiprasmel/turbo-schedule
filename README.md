# [turbo-schedule](https://ts.kipras.org)

<p align="left">

  <a href="https://circleci.com/gh/sarpik/turbo-schedule">
	<img alt="Circle CI" src="https://circleci.com/gh/sarpik/turbo-schedule.svg?style=shield" />
  </a>

  <a href="https://hub.docker.com/r/kipras/turbo-schedule">
    <img alt="Pulls from DockerHub" src="https://img.shields.io/docker/pulls/kipras/turbo-schedule.svg?style=shield" />
  </a>

<!--  TODO  -->
  <!-- <a href="https://github.com/sarpik/turbo-schedule/releases">
    <img alt="latest version" src="https://img.shields.io/github/v/tag/sarpik/turbo-schedule?include_prereleases&sort=semver" />
  </a> -->

  <a href="https://github.com/semantic-release/semantic-release">
	<img alt="Semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>

</p>

<p style="margin:1.5em 0;">
🎒 A better schedule web app than our school's one!
</p>

## Try it out!

Visit <a href="https://ts.kipras.org">ts.kipras.org</a>!

> there's also a public API available - docs are coming soon!

You can also run `turbo-schedule` locally:

* using docker:

```sh
sudo docker pull kipras/turbo-schedule
sudo docker run -p 5000:5000 --name turbo-schedule kipras/turbo-schedule
# to stop:  sudo docker stop turbo-schedule
```

& open <a href="http://localhost:5000">localhost:5000</a>

* or from source:

```sh
git clone https://github.com/sarpik/turbo-schedule.git
# or:  git clone git@github.com:sarpik/turbo-schedule.git
cd turbo-schedule/
yarn setup
yarn serve
```

& open <a href="http://localhost:5000">localhost:5000</a>

## Development

```sh
git clone https://github.com/sarpik/turbo-schedule.git
# or:  git clone git@github.com:sarpik/turbo-schedule.git
cd turbo-schedule
yarn setup
yarn dev
```

& open <a href="http://localhost:3000">localhost:3000</a> (note the port - it's `3000`, not `5000` like previously)

## Couple things to know:

* This is still a work-in-progress & we're continually working on improving the whole app!
* Projects are split up into the `scraper`, `server`, `client` and `common` folders

* <details> <summary>We're using <a href="https://yarnpkg.com/lang/en/docs/workspaces/"><code>yarn workspaces</code></a> + a little of <a href="https://github.com/lerna/lerna"><code>lerna</code></a> + TypeScript's <a href="https://www.typescriptlang.org/docs/handbook/project-references.html"><code>Project References</code></a>.</summary>

  * https://stackoverflow.com/questions/51631786/how-to-use-project-references-in-typescript-3-0
  * https://github.com/RyanCavanaugh/learn-a
</details>

* A mobile app with a very similar use case is being worked on by my friend - don't make a duplicate:D (more info soon, hopefully!)

## [Contributing](https://github.com/sarpik/turbo-schedule/issues/1)

Contributions are welcome! If you're having problems - feel free to [open an issue](https://github.com/sarpik/turbo-schedule/issues/new) - we're happy to help:)

For starters - you can check out our [Roadmap](https://github.com/sarpik/turbo-schedule/issues/1)!

If you're contributing code - take a look at [github's simple guide](https://guides.github.com/activities/forking/) on how to do so!

TL;DR:
* [fork the repository](https://github.com/sarpik/turbo-schedule/fork)
* get the app going locally, as explained in the [`Development` section above ☝](#Development)
* commit your changes & [create a pull request](https://github.com/sarpik/turbo-schedule/compare)

That's it!

## [License](./LICENSE)

> [AGPL-3.0-only](./LICENSE)

Copyright (C) 2019 [Kipras Melnikovas](https://github.com/sarpik)

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, version 3.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
