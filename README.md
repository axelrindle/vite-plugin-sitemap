[![CI](https://github.com/axelrindle/vite-plugin-sitemap/actions/workflows/ci.yml/badge.svg)](https://github.com/axelrindle/vite-plugin-sitemap/actions/workflows/ci.yml)

# vite-plugin-sitemap

> 🗺 Generate a sitemap

Generated sitemaps adhere to the protocol [described on sitemaps.org](https://www.sitemaps.org/protocol.html).

## Install

```
npm i @axelrindle/vite-plugin-sitemap
```

## Usage

```js
import sitemap from '@axelrindle/vite-plugin-sitemap'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        sitemap()
    ]
})
```

## Configuration

The `sitemap` function accepts an object with the following options:

### `pages`

An array of `Page` objects describing the basic structure you want your
sitemap to represent.

A `Page` has the following structure:

```ts
interface Page {
    // ------------------------------------
    // the relative path to the source file
    // this can be any type of file
    file: string

    // ------------------------------------
    // the relative url where the page
    // is accessible within your website
    route: string

    // ------------------------------------
    // a value between 0.0 and 1.0
    // defaults to 0.5
    priority?: number
}
```

### `output`

The output directory to place the sitemap in.

Defaults to `public`.

### `baseUrl`

A base url to prefix all pages with.

## TODO

- Automatic loading & processing of `react-router` route definitions

## License

[MIT](LICENSE)
