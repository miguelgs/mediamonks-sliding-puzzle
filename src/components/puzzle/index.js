import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './puzzle.routes';
import PuzzleController from './puzzle.controller';

export default angular.module('app.puzzle', [uirouter])
  .config(routing)
  .controller('PuzzleController', PuzzleController)
  .name;