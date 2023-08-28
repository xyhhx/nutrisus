import { NodePlopAPI } from 'plop'

import { componentGenerator, pageGenerator, utilGenerator } from './config/plop/generators';

module.exports = function Plopfile(plop: NodePlopAPI) {
	componentGenerator(plop)
	pageGenerator(plop)
	utilGenerator(plop)
};
