angular.module('alurapic').controller('FotoController', function($scope, $http) {

  $scope.foto = {}

  $scope.submeter = function() {
    if ($scope.formulario.$valid) {
      $http.post('v1/fotos', $scope.foto)
    .success(function() {
      $scope.foto = {}
      console.log('Foto cadastrada')
    })
    .error(function(erro) {
      console.log(erro)
    })
    }
  }

})