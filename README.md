# Where Water Runs Thin

An editorial, interactive world map focused on household drinking water access.
It shows the 37 countries where at least 20% of people lacked even a basic
drinking water service in 2024.

Hover, focus, or tap a blue country marker to:

- see the share and estimated number of people without basic access
- understand what the WHO and UNICEF indicator includes
- learn when a well may be appropriate and when another solution may be better
- open a project page for work in the selected country
- check how the listed organization or project was reviewed

Each country has its own giving route. Most are active water projects run by
organizations vetted through GlobalGiving. When no current water only campaign
was available, the card says so and shows a country project without describing
it as water work. Every country points to its own donation destination.

## Data and verification

- [WHO and UNICEF JMP basic drinking water access data](https://data.worldbank.org/indicator/SH.H2O.BASW.ZS)
- [World Bank 2024 population data](https://data.worldbank.org/indicator/SP.POP.TOTL)
- [JMP 2025 household drinking water report](https://data.unicef.org/resources/jmp-report-2025/)
- [WHO drinking water service definitions](https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/monitoring-and-evidence/wash-monitoring)
- [WHO guidance for small water supplies](https://www.who.int/publications/i/item/9789240088740)
- [GlobalGiving vetting and due diligence](https://www.globalgiving.org/aboutus/how-it-works/vetting/)

The access indicator is published under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Selection method

The map uses the 2024 WHO and UNICEF estimate for people using at least basic
drinking water services. It subtracts that percentage from 100 and includes
countries where the remaining share is at least 20%.

The estimated number of people without basic access multiplies that share by
the country's 2024 population. Displayed counts are rounded and should be read
as estimates.

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
