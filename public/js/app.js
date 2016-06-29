var app = angular.module('app', []);

var controller = app.controller('controller', function($scope, $http) {
    $scope.form = {};

    $scope.submitApplication = function() {
        $http.post('/applications', $scope.form).then(function(response) {
            console.log(response);
            $scope.form = {};
            $scope.submitMessage = "Successfully submitted application";
            $scope.submittedApplication = response.data;
            $scope.getApplications();
        }, function(response) {
            $scope.submitMessage = "Application submission failed with error" + JSON.stringify(response);
        });
    };

    $scope.getApplications = function() {
        $http.get('/applications').then(function(response) {
            $scope.applications = response.data.data;
        }, function(response) {
            $scope.getMessage = "Failed to get applications" + JSON.stringify(response);
        });
    };

    $scope.getApplicationStatus = function(application) {
        $http.get('/applications/' + application.id + '/status').then(function(response) {
            $scope.applicationStatus = application;
            $scope.applicationStatus['status'] = response.data;
        }, function(response) {
            $scope.getMessage = "Failed to get application status" + JSON.stringify(response);
        });
    };

    $scope.getApplications();
})
