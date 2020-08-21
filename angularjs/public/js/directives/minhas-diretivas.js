angular.module('minhasDiretivas', [])
.directive('meuPainel', function() {
  var ddo = {}

  ddo.scope = {
    titulo: '@'
  }

  ddo.transclude = true

  ddo.templateUrl = 'js/directives/meu-painel.html'

  ddo.restric = "AE"
  return ddo
})

