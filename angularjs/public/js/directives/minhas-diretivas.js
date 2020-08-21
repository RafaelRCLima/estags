angular.module('minhasDiretivas', [])
.directive('meuPainel', function() {
  var ddo = {}

  ddo.scope = {
    titulo: '@'
  }

  ddo.transclude = true

  ddo.template = 
      '<div class="panel panel-default">'
    + ' <div class="panel-heading">'
    + '   <h3 class="panel-title text-center">{{titulo}}</h3>'
    + ' </div>'
    + ' <div class="panel-body" ng-transclude>'
    + ' </div>'
    + '</div>'

  ddo.restric = "AE"
  return ddo
})

