import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import puzzle from '../components/puzzle';

import "../scss/app.scss";

angular.module('app', [uirouter, puzzle]).config(routing);
