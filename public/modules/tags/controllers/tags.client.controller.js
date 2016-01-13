'use strict';

angular.module('tags').controller('TagsCtrl', ['$scope', '$log', '$stateParams', '$location', 'Authentication', 'Tags',
		function($scope, $log, $stateParams, $location, Authentication, Tags) {

				$scope.authentication = Authentication;
				$scope.tag = {};

				// ui.select
				$scope.selected = {};

				// ui.bootstrap.alert
				$scope.alerts = [];
				$scope.closeAlert = function(index) {
						$scope.alerts.splice(index, 1);
				};

				// ui.bootstrap.collapse
				$scope.isCollapsed = true;

				// CRUD Operations
				$scope.create = function () {
						var tagObj = new Tags({
								content: this.tag.content,
								category: this.tag.category
						});
						tagObj.$save(function (response) {
								$scope.alerts.push({msg: 'Tag wurde erfolgreich gespeichert.', type: 'success'});

								$scope.tag.content = '';
								$scope.tag.category = '';
						}, function (errorResponse) {
								$log.debug(errorResponse);
								$scope.alerts.push({msg: errorResponse.data.message, type: 'danger'});
						});
				};

				$scope.remove = function (tagObj) {
						if (tagObj) {
								// Delete the object
								tagObj.$remove();

								// Take it out from the current view
								for (var i in $scope.tags) {
										if ($scope.tags[i] === tagObj) {
												$scope.tags.splice(i, 1);
										}
								}

								// Display an alert info
								$scope.selected = {};
								$scope.alerts.push({msg: 'Ihr Tag wurde gelöscht.', type: 'info'});
						} else {
								$scope.tag.$remove(function () {
										$location.path('tags');
										$scope.alerts.push({msg: 'Ihr Tag wurde gelöscht.', type: 'info'});

								});
						}
				};

				$scope.update = function () {
						var tagObj = $scope.selected.tag;

						tagObj.$update(function () {
								// Set $location path
								$location.path('tags');

								// Recollect the tags from the database
								$scope.find();

								// Unselect the selected tag
								$scope.selected = {};

								// Send an alert info message
								$scope.alerts.push({msg: 'Tag wurde erfolgreich bearbeitet.', type: 'info'});

						}, function (errorResponse) {
								$scope.alerts.push({msg: errorResponse.data.message, type: 'danger'});
						});
				};

				$scope.find = function () {
						$scope.tags = Tags.query();
				};

				$scope.findOne = function () {
						$scope.tag = Tags.get({
								tagId: $stateParams.tagId
						});
				};

		}]);