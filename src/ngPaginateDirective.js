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
