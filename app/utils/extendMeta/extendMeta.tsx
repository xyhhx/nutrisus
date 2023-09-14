import { V2_MetaArgs, V2_MetaDescriptor } from '@remix-run/node'

/**
 * Extend the parent metas without boilerplate
 */
export const extendMeta = (
	matches: V2_MetaArgs['matches'],
	newMetas: V2_MetaDescriptor[],
) => {
	const parentMeta = matches
		.flatMap(match => match.meta ?? [])
		.filter(meta => !('title' in meta))
	return [...parentMeta, ...newMetas]
}

export default extendMeta
