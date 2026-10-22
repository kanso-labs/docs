# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

The source of [docs.kansolabs.org](https://docs.kansolabs.org): Mintlify builds
every MDX page here, with the theme and the navigation in `docs.json`, from
`main`. The deployment is the `kanso-labs` subdomain on Mintlify's Hobby plan,
which has no authentication, so **everything merged here is public**.

**Change the site here, never in Mintlify's web editor.** The site is built
from this repository, so an edit made there is overwritten by the next merge.

| Path                               | What it is                                                            |
| ---------------------------------- | --------------------------------------------------------------------- |
| `index.mdx`                        | The home page, and the table of what lives where                      |
| `projects.mdx`                     | Every public project, with its links and its roadmap                  |
| `principles.mdx`                   | The organization's three principles                                   |
| `kanso-ui/web/`                    | kanso-ui: installing, theming, rendering on the server, layout, icons |
| `kanso-ui/react-native/`           | react-native-kanso-ui: installing, theming, routing and localisation  |
| `kanso-ui/core/`                   | kanso-ui-core: the tokens, the glyphs and the demo schemes            |
| `style-dictionary/`                | unplugin-style-dictionary: getting started, guides and the reference  |
| `home-assistant/applications/`     | The applications repository, and installing from it                   |
| `home-assistant/robot-vacuum-map/` | The robot vacuum map integration                                      |
| `engineering/`                     | The conventions, commits and releases, the shared CI and Renovate     |
| `logo/`, `favicon.png`             | The mark, cropped from the organization's avatar                      |

`docs.json` sorts the pages into five tabs: Home, Kanso UI, Style Dictionary plugin,
Home Assistant and Engineering.

## Commands

| Task          | Command                 | Notes                                    |
| ------------- | ----------------------- | ---------------------------------------- |
| Preview       | `npx mint dev`          | http://localhost:3000                    |
| Check links   | `npx mint broken-links` | Every internal link and anchor           |
| Validate      | `npx mint validate`     | Builds the site; needs network access    |

## Conventions

### Shared with the other kanso-labs repositories

The canonical text is
[`CONVENTIONS.md`](https://github.com/kanso-labs/.github/blob/main/CONVENTIONS.md)
in `kanso-labs/.github`; this is a copy, kept in step by hand. Change that file
first, then every copy.

- **Keys in JSON and YAML are ordered by name.** Files whose order carries
  meaning are exempt: workflows, where step order is execution order;
  changelogs, which are chronological; and `package.json`, where the npm
  ecosystem expects `name` and `version` first.
- **A workflow's filename is the kebab-case of its `name:` field.** Reusable
  workflows, meaning those triggered only by `workflow_call`, take a leading
  underscore.
- **Job names and step names are imperative verb phrases.** Job ids, step ids,
  and matrix keys are exempt.
- **Actions are pinned to exact release tags**, `actions/checkout@v7.0.1`, never
  `@main` and never a tag the publisher moves — `@v7` and `@v7.0` both move.
  Renovate opens the bump pull requests, and it has nothing to open when the pin
  never changes: `frenck/action-app-linter@v2.21` sat still through a repository
  rename and a release that fixed something a consumer was working around,
  because the tag it named was moved onto both.
- **Dependency versions are pinned exactly.** Every `dependencies`,
  `devDependencies`, and `optionalDependencies` entry is a bare version,
  `1.2.3`, never `^1.2.3`, `~1.2.3`, `>=1.2.3`, `*`, `1.x`, or an `||` union.
  Renovate opens those bumps too. `peerDependencies` are the deliberate
  exception: they state what the consumer's own installed copy must satisfy, so
  ranges are correct there and stay.
- **`.tool-versions` pins a fully-specified version on every line**,
  `nodejs <major>.<minor>.<patch>`, never `nodejs 24` or `nodejs lts`.

Here only the first applies: `docs.json` is ordered by name, while its arrays
keep the order the sidebar shows them in. There is no workflow, package or
`.tool-versions` yet.

### Specific to this repository

- **Public repositories only.** A private repository is neither documented nor
  named: Daily appears as a link to the app and nothing more, and daily-core
  and react-native-daily appear nowhere.
- **Link rather than copy.** Each component's props and states are in the
  Storybooks, the community guidelines on kansolabs.org, and each Home
  Assistant application's own documentation on its **Documentation** tab. A
  page here links to them, so there is one copy of each to keep correct.
- **The words are the projects' own.** A page restates what its repository's
  README, `AGENTS.md` or source says, and changes when that does. A claim made
  here and nowhere in the repository is a claim nothing keeps true.
- **English, in the projects' voice**: plain sentences, sentence case for
  headings, and **bold** for anything a reader clicks.
- **The design system is called Material Design**, never a version or an
  edition name, as in the libraries.

## Adding a page

1. Write it as `<tab>/<project>/<page>.mdx`, with a `title`, a `description`
   and an `icon` from Font Awesome in its frontmatter.
2. Add its path, without `.mdx`, to its group in `docs.json`. A page left out
   of the navigation is still published at its path but cannot be reached.
3. Run `npx mint broken-links`, and `npx mint dev` to see it.

## Commits and pull requests

Pull requests are squash-merged, with the pull request title as the commit
subject, so that title is the one line that reaches `main`. Write it as a
Conventional Commit: `docs(kanso-ui): add the theming guide`. Nothing here is
released, so the type is for the reader.

Each pull request gets a Mintlify preview, linked from a comment by
`mintlify[bot]` a minute or so after a push. Its `Mintlify Deployment` check
reads "skipped" whatever happens, so wait for the comment rather than the check,
and read the changed pages there before merging.

## Traps

**MDX reads a bare `{` and `<` as code.** In prose, write them inside a code
span, or the page fails to build: a `{` opens a JavaScript expression and a `<`
a component. A comment is `{/* … */}`, never `<!-- … -->`.

**Mintlify publishes every Markdown file it is not told to ignore.** Its own
list skips `README.md` and `LICENSE.md` but not `AGENTS.md` or `CLAUDE.md`,
which is why `.mintignore` names both. A new Markdown file that is not a page
goes there too.

**`npx mint broken-links` checks links between pages, and nothing outside.** A
link to GitHub, a Storybook or kansolabs.org that has moved still passes.
