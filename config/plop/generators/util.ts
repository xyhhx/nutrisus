import { NodePlopAPI } from "plop"

const indexFile = './app/utils/index.ts'

const utilGenerator = ({ setGenerator }: NodePlopAPI) => setGenerator('util', {
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'name of the util'
		}
	],
	actions: [
		{
			type: 'add',
			path: 'app/utils/{{ camelCase name }}/{{ camelCase name }}.tsx',
			templateFile: 'config/plop/templates/util/util.tsx.hbs'
		},
		{
			type: 'add',
			path: 'app/utils/{{ camelCase name }}/{{ camelCase name }}.test.tsx',
			templateFile: 'config/plop/templates/util/util.test.tsx.hbs'
		},
		{
			type: 'add',
			path: 'app/utils/{{ camelCase name }}/index.ts',
			templateFile: 'config/plop/templates/util/index.ts.hbs'
		},
		{
			path: indexFile,
			pattern: /\/\* @plop import injection \*\//g,
			template: 'import {{ camelCase name }} from \'./{{ camelCase name }}\'',
			type: 'append',
		},
		{
			path: indexFile,
			pattern: /\/\* @plop export injection \*\//g,
			template: '\t{{ camelCase name }},',
			type: 'append',
		},
	],
})

export default utilGenerator
