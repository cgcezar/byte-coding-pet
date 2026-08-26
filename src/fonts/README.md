# Fonts

These fonts are self-hosted (bundled in the repo, no CDN or external request).
They're declared with `@font-face` at the top of `../styles.css` and referenced
by relative path, so Vite fingerprints and serves them with the app.

| File | Family | Role | Weights | License |
| --- | --- | --- | --- | --- |
| `Satoshi-Variable.woff2` | Satoshi | display (brand, titles, buttons) | 300–900 (variable) | ITF Free Font License — see `Satoshi-LICENSE.txt` |
| `InstrumentSans-Variable.woff2` | Instrument Sans | UI text and numbers | 400–700 (variable) | SIL Open Font License — see `InstrumentSans-OFL.txt` |

Both are free for personal and commercial use. Each is a single variable-weight
WOFF2, so one small file covers every weight the app uses.

## Where they came from

- **Instrument Sans** — from the [Fontsource](https://fontsource.org) package
  `@fontsource-variable/instrument-sans` (which mirrors Google Fonts).
- **Satoshi** — the official family from
  [Fontshare](https://www.fontshare.com/fonts/satoshi). The bundled file came
  from a public mirror of that distribution.

## Replacing or updating a font

Drop a new WOFF2 into this folder with the same filename, or change the
`@font-face` `src` in `../styles.css` to point at your file. If you add a new
family, add a matching `@font-face` block and reference it via the `--display`,
`--body`, or `--code` CSS variables.
