# Where Water Runs Thin

An editorial, interactive world map of the 25 countries classified as having
extremely high baseline water stress in WRI Aqueduct 4.0.

Hover, focus, or tap a country marker to:

- read its WRI water stress score
- understand what the indicator means
- open a verified route supporting global safe water work
- check the recipient's independent charity rating

The giving route is intentionally labeled as globally allocated. The interface
does not claim that a gift will be restricted to the selected country.

## Data and verification

- [WRI Aqueduct 4.0 country rankings](https://www.wri.org/data/aqueduct-40-country-rankings)
- [WRI finding naming Oman among the most water-stressed countries](https://www.wri.org/insights/highest-water-stressed-countries)
- [Peer-reviewed Oman drought study, Atmospheric Research](https://doi.org/10.1016/j.atmosres.2020.105126)
- [UNICEF USA safe water projects](https://www.unicefusa.org/what-unicef-does/childrens-health/water-sanitation/safe-water-projects?form=donate)
- [UNICEF USA on Charity Navigator](https://www.charitynavigator.org/ein/131760110)

WRI data is used under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Local development

Requires Node.js 22.13 or newer.

```bash
pnpm install
pnpm dev
pnpm test
```

## GitHub Pages

Pushes to `main` run linting, build the app, test the rendered HTML, and publish
the static artifact through GitHub Actions.
