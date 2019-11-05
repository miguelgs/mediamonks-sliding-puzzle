routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider

    .state('puzzle', {
      url: '/',
      template: require('./puzzle.html').default,
      controller: 'PuzzleController',
      controllerAs: 'puzzle'
    })
}