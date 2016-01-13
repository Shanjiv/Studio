'use strict';

angular.module('launch').controller('SandeepSliderCtrl', ['$scope', function ($scope) {
		$scope.images =	[
				{
						src: 'modules/launch/images/stepone_xs.png',
						title: 'Step 1'
				},
				{
						src: 'modules/launch/images/steptwo_xs.png',
						title: 'Step 2'
				},
				{
						src: 'modules/launch/images/stepthree_xs.png',
						title: 'Step 3'
				}
		];


}]);