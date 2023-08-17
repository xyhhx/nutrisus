import { NodePlopAPI } from 'plop'
import componentGenerator from './config/plop/generators/component';

module.exports = function Plopfile(plop: NodePlopAPI) {
	componentGenerator(plop)
};
