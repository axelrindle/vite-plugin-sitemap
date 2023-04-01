import { existsSync, rmSync } from 'fs'
import { resolve } from 'path'
import { build } from 'vite'
import { beforeEach, expect, test } from 'vitest'
import sitemap from '../src'

const fixtures = resolve(__dirname, 'fixtures')
const output = resolve(__dirname, 'output')

beforeEach(() => rmSync(output, { recursive: true, force: true }))

test('it compiles', async() => {
	expect(existsSync(output)).toBe(false)

	await build({
		root: fixtures,
		logLevel: 'silent',
		plugins: [
			sitemap({
                output,
                baseUrl: 'http://example.org',
                pages: [
                    {
                        file: resolve(fixtures, 'index.html'),
                        route: '/',
                        priority: 1.0,
                    },
                    {
                        file: resolve(fixtures, 'test.html'),
                        route: '/test',
                        priority: 0.7,
                    },
                ],
            }),
		],
	})

	expect(existsSync(resolve(output, 'sitemap.xml'))).toBe(true)
})
