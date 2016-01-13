'use strict';

angular.module('universities').controller('ListUniversitiesCtrl', ['$scope', 'universitiesData',
		function($scope, universitiesData) {
				// We do this double assignment for ui.grid to be accessible this data
				this.universities = $scope.universities = universitiesData;

				// ui.grid: List of Universities
				$scope.gridUniversitiesList = { enableRowSelection: true, enableRowHeaderSelection: false };
				$scope.gridUniversitiesList.columnDefs = [
						{ name: 'leads', width: '10%'},
						{ name: 'fullName', minWidth: 100, width: '35%' },
						{ name: 'abbreviation' },
						{ name: 'updater.username', displayName: 'Last edited by', width: '10%'},
						{ name: 'updated', displayName: 'Last edited on', type: 'date', width: '15%'},
//						{ name: 'updated', displayName: 'Last edited on', type: 'date', cellFilter: 'date:"dd-MM-yyyy"', width: '20%'},
						{ name: '_id', width: '10%' }
				];
				$scope.gridUniversitiesList.multiSelect = false;
				$scope.gridUniversitiesList.modifierKeysToMultiSelect = false;
				$scope.gridUniversitiesList.noUnselect = true;

				$scope.gridUniversitiesList.data = 'universities';
				$scope.gridUniversitiesList.onRegisterApi = function (gridApi) {
						//set gridApi on scope
						$scope.gridApi = gridApi;
						gridApi.selection.on.rowSelectionChanged($scope, function () {
								$scope.selectedRow = gridApi.selection.getSelectedRows();
						});
				};
		}]);
