import { describe, expect, it } from 'vitest'

import extendMeta from './extendMeta'
import { V2_MetaArgs } from '@remix-run/node'

describe('extendMeta', async () => {
	it('adds new metas to parent metas properly with one parent', async () => {
		const matches: V2_MetaArgs['matches'] = [
			{
				id: 'root',
				data: null,
				meta: [
					{ name: 'meta1', value: 'meta1' },
					{ name: 'meta2', value: 'meta2' },
				],
				params: {},
				pathname: '/',
			},
		]

		expect(extendMeta(matches, [{ name: 'meta3', value: 'meta3' }])).toEqual([
			{ name: 'meta1', value: 'meta1' },
			{ name: 'meta2', value: 'meta2' },
			{ name: 'meta3', value: 'meta3' },
		])
	})

	it('adds new metas to parent metas properly with numerous parents', async () => {
		const matches: V2_MetaArgs['matches'] = [
			{
				id: 'root',
				data: null,
				meta: [{ name: 'meta1', value: 'meta1' }],
				params: {},
				pathname: '/',
			},
			{
				id: 'routes/_index',
				data: null,
				meta: [{ name: 'meta2', value: 'meta2' }],
				params: {},
				pathname: '/',
			},
		]

		expect(extendMeta(matches, [{ name: 'meta3', value: 'meta3' }])).toEqual([
			{ name: 'meta1', value: 'meta1' },
			{ name: 'meta2', value: 'meta2' },
			{ name: 'meta3', value: 'meta3' },
		])
	})

	it("doesn't overwrite overlapping metas", async () => {
		const matches: V2_MetaArgs['matches'] = [
			{
				id: 'root',
				data: null,
				meta: [
					{ name: 'meta1', value: 'meta1' },
					{ name: 'meta2', value: 'meta2' },
				],
				params: {},
				pathname: '/',
			},
		]

		expect(extendMeta(matches, [{ name: 'meta2', value: 'new' }])).toEqual([
			{ name: 'meta1', value: 'meta1' },
			{ name: 'meta2', value: 'meta2' },
			{ name: 'meta2', value: 'new' },
		])
	})

	it('does overwrite overlapping titles', async () => {
		const matches: V2_MetaArgs['matches'] = [
			{
				id: 'root',
				data: null,
				meta: [{ name: 'meta1', value: 'meta1' }, { title: 'title1' }],
				params: {},
				pathname: '/',
			},
		]

		expect(extendMeta(matches, [{ title: 'new' }])).toEqual([
			{ name: 'meta1', value: 'meta1' },
			{ title: 'new' },
		])
	})
})
