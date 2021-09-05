# [turbo-schedule](https://tvarkarastis.com)

<p align="left">

  <a href="https://github.com/kiprasmel/turbo-schedule/actions">
	<img alt="GitHub Actions CI" src="https://github.com/kiprasmel/turbo-schedule/workflows/install-build-test-deploy/badge.svg" />
  </a>

  <a href="https://hub.docker.com/r/kipras/turbo-schedule">
    <img alt="Pulls from DockerHub" src="https://img.shields.io/docker/pulls/kipras/turbo-schedule.svg?style=shield" />
  </a>

<!--  TODO  -->
  <!-- <a href="https://github.com/kiprasmel/turbo-schedule/releases">
    <img alt="latest version" src="https://img.shields.io/github/v/tag/kiprasmel/turbo-schedule?include_prereleases&sort=semver" />
  </a> -->

  <a href="https://github.com/semantic-release/semantic-release">
	<img alt="Semantic release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>

</p>

<p style="margin:1.5em 0;">
🎒 A better schedule web app than our school's one!
</p>

## Try it out!

Visit <a href="https://tvarkarastis.com">tvarkarastis.com</a>!

> there's also a public API available - <a href="https://tvarkarastis.com/api/v1/docs">tvarkarastis.com/api/v1/docs</a> 🚀

You can also run `turbo-schedule` locally:

* using docker:

```sh
docker pull kipras/turbo-schedule
docker run -d -p 5000:5000 -e NO_SCRAPE=1 --name turbo-schedule kipras/turbo-schedule
# to stop:  docker stop turbo-schedule
```

& open <a href="http://localhost:5000">localhost:5000</a>

* or from source:

```sh
git clone https://github.com/kiprasmel/turbo-schedule.git
# or:  git clone git@github.com:kiprasmel/turbo-schedule.git

cd turbo-schedule

# note: you must not have `--ignore-scripts` enabled (default)
# note: scraping might fail due to upstream, see https://github.com/kiprasmel/turbo-schedule/pull/94
yarn setup:prod
yarn serve
```

& open <a href="http://localhost:5000">localhost:5000</a>

## Development

```sh
git clone https://github.com/kiprasmel/turbo-schedule.git
# or:  git clone git@github.com:kiprasmel/turbo-schedule.git

cd turbo-schedule

# note: you must not have `--ignore-scripts` enabled (default)
yarn setup
yarn dev
```

& open <a href="http://localhost:3000">localhost:3000</a> for the client; <a href="http://localhost:5000">localhost:5000</a> for the server.

## Contributing

Contributions are welcome! If you're having problems - feel free to [open an issue](https://github.com/kiprasmel/turbo-schedule/issues/new) - we're happy to help:)

For starters - you can check out our [Roadmap](https://github.com/kiprasmel/turbo-schedule/issues/1)!

If you're contributing code - take a look at [github's simple guide](https://guides.github.com/activities/forking/) on how to do so!

TL;DR:
* [fork the repository](https://github.com/kiprasmel/turbo-schedule/fork)
* get the app going locally, as explained in the [`Development` section above ☝](#Development)
* commit your changes & [create a pull request](https://github.com/kiprasmel/turbo-schedule/compare)

That's it!

See also [CONTRIBUTING.md](./CONTRIBUTING.md), especially [#known-issues](./CONTRIBUTING.md#known-issues)!

## Deploying

### Automatic

Once a PR is merged into the `master` branch, the deployment procedure will automatically begin in the CI suite (assuming the previous steps - installation, building and testing - pass).

It will create & push a new docker image, who's deployment one should complete via `./deploy.sh`.

See [./.github/workflows/main.yaml](./.github/workflows/main.yaml)

### Manual

However, sometimes one might want to deploy from a specific version they are currently developing, even though it's still not merged into `master`.

In this case, there's a script ready:

```sh
yarn docker:deploy:my-current-workspace
```

#### Requirements:
  - dockerhub login and access to the `kipras/turbo-schedule` image
  - ssh access to the production server

#### It will:
  - build the project from your current workspace (note - uncommited changes **will be** included),
  - create a docker image with a tag pointing to the latest commit,
  - push the image to dockerhub,
  - ssh into the production server,
  - pull the docker image from the specific tag and
  - deploy it

## Other accomplishments alongside this project

> Some interesting stuff I've gone through thanks to this project

### Contributing to [express-oas-generator](https://github.com/mpashkovskiy/express-oas-generator)

I found a tool that could generate API documentation automatically for my `express` server - it was `express-oas-generator`. I've started using it here - it worked! However, I've encountered various issues with it, and thus [I've contributed to the project](https://github.com/mpashkovskiy/express-oas-generator/pulls?q=author%3Akiprasmel+).

### Using github actions (CI) with `semantic-release` & `lerna` and finding the deeply hidden bug

https://github.com/lerna/lerna/issues/2542

## License

[./use-fetched-state](./use-fetched-state) is [MIT](./use-fetched-state/LICENSE) © 2021-present [Kipras Melnikovas](https://github.com/kiprasmel)

everything else is [AGPL-3.0-only](./LICENSE) © 2019-present [Kipras Melnikovas](https://github.com/kiprasmel)

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, version 3.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
