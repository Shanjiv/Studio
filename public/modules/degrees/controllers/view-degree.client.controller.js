'use strict';

angular.module('degrees').controller('ViewDegreeCtrl', ['$scope', 'degreeData', 'subjectsData',
		function($scope, degreeData, subjectsData) {
				this.degree = degreeData;
				this.subjects = $scope.subjects = subjectsData;

				// ui.grid: List of Subjects
				$scope.gridSubjectsList = { enableRowSelection: true, enableRowHeaderSelection: false };
				$scope.gridSubjectsList.columnDefs = [
						{ name: 'fullTitle', minWidth: 200 },
						{ name: 'semester', width: '10%' },
						{ name: 'updater.username', displayName: 'Last edited by', width: '15%'},
						{ name: 'updated', displayName: 'Last edited on', type: 'date', width: '15%'},
						{ name: '_id', width: '15%' }
				];
				$scope.gridSubjectsList.multiSelect = false;
				$scope.gridSubjectsList.modifierKeysToMultiSelect = false;
				$scope.gridSubjectsList.noUnselect = true;

				$scope.gridSubjectsList.data = 'subjects';
				$scope.gridSubjectsList.onRegisterApi = function (gridApi) {
						//set gridApi on scope
						$scope.gridApi = gridApi;
						gridApi.selection.on.rowSelectionChanged($scope, function () {
								$scope.selectedRow = gridApi.selection.getSelectedRows();
						});
				};


		}]);
