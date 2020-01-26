/**
 * Created by karthick on 01/09/16.
 */

angular.module('routeService', ['ngResource']).factory('route', function ($resource) {
    return $resource('/:entity/:id/:action/:status/:process', {
        entity: '@entity',
        id: '@id',
        action: '@action',
        status: '@status',
        process: '@process'
    }, {
        post: {
            method: 'POST',
            params: {}
        },
        list: {
            method: 'GET',
            params: {},
            isArray: true
        },
        get: {
            method: 'GET',
            params: {}
        },
        update: {
            method: 'PUT',
            params: {}
        },
        delete: {
            method: 'DELETE',
            params: {}
        }

    });
});

var instaApp = angular.module('instaApp', ['routeService', 'localytics.directives', 'ui.bootstrap', 'ui.router', 'objectTable']);

function instaRouteConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/login').otherwise('/');

    var fileDir = "../pages/";

    $stateProvider.state('menu', {
        url: '/menu',
        controller: MenuCtrl,
        templateUrl: fileDir + 'general/menu.html',
        resolve: {
            userDetail: GetPreLoginUser
        }
    }).state('login', {
        url: '/login',
        controller: LoginCtrl,
        templateUrl: fileDir + 'general/login.html'
    }).state('menu.image', {
        url: '^/image',
        controller: ImageCtrl,
        templateUrl: fileDir + 'image/image.html'
    });
}

instaApp.config(instaRouteConfig);

function GetPreLoginUser($q, $state, route) {

    var deferred = $q.defer();
    route.get({
        entity: "loggedInUser"
    }, function (success) {
        deferred.resolve(success);
    }, function (error) {
        switch (error.status) {
            case 401 || 404:
                deferred.reject("Not found");
                alert("Session is expired. Please login to continue");
                $state.go("login")
        }
    });
    return deferred.promise;
}

function MenuCtrl($scope, $state, route, userDetail) {
    $scope.userInfo = userDetail;
    $scope.menuCtrlObj = {
        currentState: "users"
    };
    $scope.logout = function () {

        route.save({
            entity: "logout"
        }, function (response) {
            console.log(response);
            $state.go('login')
        }, function (error) {
            ErrorHandling1(error, $state)
        });
    }
}

function LoginCtrl($scope, $state, route) {

    $scope.login = function (user) {
        route.save({
            entity: "authenticate"
        }, user, function (response) {
            $state.go('menu.image')
        }, function (error) {
            ErrorHandling1(error, $state)
        });
    }
}

function ImageCtrl($scope, $state, route) {
 let getImage = $scope.getImage  = function (findParam) {
        route.get({
            entity: `image`,
            find:findParam
        }, function (response) {
            $scope.image = response;
        }, function (error) {
            ErrorHandling1(error, $state)
        });
    };

    getImage('')
}

var ErrorHandling1 = function (error, $state) {
    switch (error.status) {
        case 400:
            alert(error.data.error);
            break;
        case 401:
            alert(error.data.unAuthMsg);
            $state.go('login');
            break;
        case 500:
            alert("Internal server error. Please try again later.");
            break;
    }
};
