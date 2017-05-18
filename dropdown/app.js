var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
    $scope.values = ['Chrome', 'Firefox', 'IE'];
    $scope.pick = function(value) {
        console.log('Picked', value)
    };
});

app.directive('inputDropdown', function($compile) {
    
    var template = 
        '<input ng-model="ngModel" ng-keydown="key($event)">' +
        '<div class="dropdown">' + 
            '<div id="option-"+$index ng-repeat="value in list" ng-class="{selected: ngModel==value ,keyActive: $index==keyActive}">' +
                '<div ng-mousedown="select($event, value)">{{value}}</div>' + 
            '</div>' +
        '</div>';
    
    return {
        restrict: 'EA',
        scope: {
            ngModel: '=',
            keyActive: '=',
            list: '=',
            onSelect: '&'       
        },
        template: template,
        link: function(scope, element, attrs) {
            element.addClass('input-dropdown');
            scope.keyActive=0;
            scope.select = function(e, value) {
                scope.ngModel = value;
                scope.onSelect({$event: e, value: value});
            };
            scope.key = function(value) {
             
              if(value.keyCode==40 && scope.keyActive<scope.list.length-1)
              scope.keyActive++;
              else if(value.keyCode==38 && scope.keyActive>0)
              scope.keyActive--;
              else  if(value.keyCode==13)
              scope.ngModel =scope.list[scope.keyActive];
            };
            
        }
    };
});