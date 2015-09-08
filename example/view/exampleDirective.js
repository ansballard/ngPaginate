(function() {
  "use strict";

  angular.module("example")
      .directive("exampleDirective", ExampleDirective);

  function ExampleDirective() {
      var directive = {
          link: link,
          scope: {},
          templateUrl: "view/example.template.html",
          restrict: "EA",
          controller: "ExampleCtrl",
          controllerAs: "vm",
          bindToController: true
      };
      return directive;

      function link() {

      }
  }

}());
