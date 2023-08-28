import { NodePlopAPI } from "plop"

const pageGenerator = ({ setGenerator }: NodePlopAPI) => setGenerator('page', {
	prompts: [
		{
			type: 'input',
			name: 'name',
			message: 'name of the page'
		},
		{
			type: 'input',
			name: 'metaTitle',
			message: 'page title'
		},
		{
			type: 'input',
			name: 'metaDesc',
			message: 'page meta description'
		},
	],
	actions: [
		{
			type: 'add',
			path: 'app/routes/_{{ dashCase name }}.tsx',
			templateFile: 'config/plop/templates/page/page.tsx.hbs'
		},
	],
})

export default pageGenerator
