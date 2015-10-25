var app = angular.module('codecraft', [
    'ngResource',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda'
]);

app.config(function ($httpProvider, $resourceProvider, laddaProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Token 8a325e6a164fe85bb3bdaba54a707bf05623e6e3';
    $resourceProvider.defaults.stripTrailingsSlashes = false;
    laddaProvider.setOption({
        style: 'expand-right'
    });
});

app.controller('PersonDetailController', function ($scope, ContactService) {
    $scope.contacts = ContactService;
    $scope.save = function () {
        $scope.contacts.updateContact($scope.contacts.selectedPerson);
    };
    $scope.remove = function(){
        $scope.contacts.removeContact ($scope.contacts.selectedPerson);
    }
});

app.factory("Contact", function ($resource) {
    return $resource("http://codecraftpro.com/api/samples/v1/contact/:id/", {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

app.controller('PersonListController', function ($scope, ContactService) {

    $scope.search = "";
    $scope.order = "email";
    $scope.contacts = ContactService;

    $scope.$watch('search', function (newVal, oldval) {
        if (angular.isDefined(newVal)) {
            $scope.contacts.doSearch(newVal);
        }
    });

    $scope.$watch('order', function (newVal, oldval) {
        if (angular.isDefined(newVal)) {
            $scope.contacts.doOrder(newVal);
        }
    });

});

app.service('ContactService', function (Contact) {

    var self = {
        'addPerson': function (person) {
            this.person.push(person);
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'isSaving': false,
        'isDeleting':false,
        'selectedPerson': null,
        'persons': [],
        'search': null,
        'doSearch': function (search) {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.search = search;
            self.loadContacts();
        },
        'doOrder': function (order) {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.ordering = order;
            self.loadContacts();
        },
        'loadContacts': function () {
            if (self.hasMore && !self.isLoading) {
                self.isLoading = true;
                var params = {
                    'page': self.page,
                    'search': self.search,
                    'order': self.ordering
                };
                Contact.get(params, function (data) {
                    angular.forEach(data.results, function (person) {
                        self.persons.push(new Contact(person));
                    });
                    if (!data.next) {
                        self.hasMore = false;
                    }
                    self.isLoading = false;
                });
            }
        },
        'loadMore': function () {
            self.page += 1,
                self.loadContacts();
        },
        'updateContact': function (person) {
            self.isSaving = true;
            console.log('Called Update');
            person.$update().then(function(){
               self.isSaving = false;
            });
        },
        'removeContact' : function (person){
            self.isDeleting = true;
            console.log('Called Delete');
            person.$remove().then(function(){
               self.isDeleting = false;
                var index = self.persons.indexOf(person);
                self.persons.splice(index,1);
                self.selectedPerson = null;
            });
        }
    };

    self.loadContacts();
    return self;
});