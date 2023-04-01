export interface Page {
    file: string
    route: string
    priority?: number
}

export interface SitemapItem {
    loc: URL
    lastmod: string
    changefreq?: string
    priority?: number
}

export interface SitemapOptions {
    pages: Page[]
    baseUrl: string
    output?: string
}
