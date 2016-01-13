'use strict';

angular.module('universities').controller('ViewUniversityCtrl', ['$scope', 'universityData', 'degreesData',
		function($scope, universityData, degreesData) {
				this.university = universityData;
				this.degrees = $scope.degrees = degreesData;

				// ui.grid: List of Degrees
				$scope.gridDegreesList = { enableRowSelection: true, enableRowHeaderSelection: false };
				$scope.gridDegreesList.columnDefs = [
						{ name: 'leads', width: '10%' },
						{ name: 'fullPath', minWidth: 100 },
						{ name: 'level' },
						{ name: 'updater.username', displayName: 'Last edited by', width: '15%'},
						{ name: 'updated', displayName: 'Last edited on', type: 'date', width: '15%'},
						{ name: '_id', width: '10%' }
				];
				$scope.gridDegreesList.multiSelect = false;
				$scope.gridDegreesList.modifierKeysToMultiSelect = false;
				$scope.gridDegreesList.noUnselect = true;

				$scope.gridDegreesList.data = 'degrees';
				$scope.gridDegreesList.onRegisterApi = function (gridApi) {
						//set gridApi on scope
						$scope.gridApi = gridApi;
						gridApi.selection.on.rowSelectionChanged($scope, function () {
								$scope.selectedRow = gridApi.selection.getSelectedRows();
						});
				};
		}]);
