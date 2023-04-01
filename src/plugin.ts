import chalk from 'chalk'
import { stat, unlink, writeFile } from 'fs/promises'
import { join } from 'path'
import { Plugin, ResolvedConfig } from 'vite'
import { json2xml } from 'xml-js'
import { SitemapOptions } from './types'
import { getDate } from './utils'
import mkdirp from 'mkdirp'

export default function sitemap(options: SitemapOptions): Plugin {
    let viteOptions: ResolvedConfig

    return {
        name: 'sitemap',
        apply: 'build',
        configResolved(config: ResolvedConfig) {
            viteOptions = config
            options = {
                output: 'public',
                ...options
            }
        },
        async buildEnd() {
            const pages = options.pages
            const sitemapItems = []

            for await (const page of pages) {
                sitemapItems.push({
                    loc: new URL(page.route, options.baseUrl),
                    lastmod: await getDate(page.file),
                    priority: page.priority ?? 0.5
                })
            }

            const sitemap = {
                urlset: {
                    '_attributes': {
                        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                    },
                    url: sitemapItems
                }
            }

            const xml = json2xml(JSON.stringify(sitemap), {
                compact: true,
                spaces: 4,
            })

            const file = join(options.output!, 'sitemap.xml')
            try {
                await unlink(file)
            } catch (error) {
                // ¯\_(ツ)_/¯
            }
            await mkdirp(options.output!)
            await writeFile(file, '<?xml version="1.0" encoding="UTF-8"?>\n' + xml)

            const stats = await stat(file)
            viteOptions.logger.info(`
                ${chalk.cyan(sitemap)}
                ${chalk.gray(` - generated ${file} with ${pages.length} entries (${stats.size}B)`)}
            `.trim())
        }
    }
}
