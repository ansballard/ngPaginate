angular.module("ngPaginate.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("ngPaginate.template.html","<div class=\"paginate-wrapper\">\r\n  <button class=\"paginate-btn paginate-btn-first\" ng-disabled=\"vm.paginateHandler.getIsFirstPage()\" ng-click=\"vm.paginateHandler.firstPage()\">First</button>\r\n  <button class=\"paginate-btn paginate-btn-prev\" ng-disabled=\"vm.paginateHandler.getIsFirstPage()\" ng-click=\"vm.paginateHandler.prevPage()\">Prev</button>\r\n  <div class=\"paginate-wrapper-state\">\r\n    <span class=\"paginate-state-current\">{{vm.paginateHandler.getPage()+1}}</span>\r\n    <span class=\"paginate-state-total\">{{vm.paginateHandler.getNumPages()}}</span>\r\n  </div>\r\n  <button class=\"paginate-btn paginate-btn-next\" ng-disabled=\"vm.paginateHandler.getIsLastPage()\" ng-click=\"vm.paginateHandler.nextPage()\">Next</button>\r\n  <button class=\"paginate-btn paginate-btn-last\" ng-disabled=\"vm.paginateHandler.getIsLastPage()\" ng-click=\"vm.paginateHandler.lastPage()\">Last</button>\r\n</div>\r\n");}]);
(function() {
  "use strict";

  angular.module("ngPaginate", ["ngPaginate.templates"]);

}());

(function() {
  "use strict";

  angular.module("ngPaginate")
    .controller("ngPaginateCtrl", ngPaginateCtrl);

  ngPaginateCtrl.$inject = [];

  function ngPaginateCtrl() {

    var vm = this;

  }

}());

(function() {
	"use strict";

	angular.module("ngPaginate")
		.directive("paginationNav", ngPaginateDirective);

	ngPaginateDirective.$inject = ["$templateCache"];

	function ngPaginateDirective($templateCache) {
		var directive = {
			link: link,
			scope: {
				paginateHandler: "=handler",
				listData: "&",
				visibleCount: "@count"
			},
			template: $templateCache.get("ngPaginate.template.html"),
			restrict: "EA",
			controller: "ngPaginateCtrl",
			controllerAs: "vm",
			bindToController: true
		};
		return directive;

		function link(scope, el, attrs, vm) {
			var count = vm.visibleCount ? +vm.visibleCount : 10;
			if (typeof vm.listData() === "undefined" || typeof vm.listData() !== "function") {
				throw "list-data attribute is required\nYou should be passing a reference to a function that returns an array\n";
			}
			vm.paginateHandler = paginate(count || 10, vm.listData());
		}
	}

}());
