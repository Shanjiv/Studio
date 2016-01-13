'use strict';

angular.module('subjects').controller('ViewSubjectCtrl', ['subjectData',
		function(subjectData) {
				this.subject = subjectData;
		}]);