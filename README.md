# docs

The source of [docs.kansolabs.org](https://docs.kansolabs.org), the guides for
the open-source projects [Kanso Labs](https://kansolabs.org) makes: Kanso UI on
the web and on React Native, the Style Dictionary plugin, the Home Assistant
applications and robot vacuum map, and the conventions and shared CI every
repository follows.

The site is built by [Mintlify](https://mintlify.com) from this repository's
`main` branch. Every page is an MDX file, and `docs.json` holds the theme and
the navigation.

## Previewing

Run the Mintlify CLI from the repository root, where `docs.json` is:

```shell
npx mint dev
```

The preview is at http://localhost:3000. Before opening a pull request, check
the links as well:

```shell
npx mint broken-links
```

## Publishing

Merging a pull request into `main` publishes the site within a minute or so. Nothing else deploys it, so a change made in Mintlify's web
editor would be overwritten by the next merge: change the site here.

## Licence

[MIT](LICENSE.md).
