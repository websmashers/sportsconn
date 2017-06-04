/*
 |--------------------------------------------------------------------------
 | sport section serivce
 |--------------------------------------------------------------------------
 */
app.factory('sport_service', function ($q, $http, appInfo) {
    return {
        Sportlist : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
    	},
        ChangeSportsStatus : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/deleteSport',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        update_sport : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/addSport',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        get_sports : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/getSports',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        SportPositionlist : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/sportPositionlist',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        add_sport_position : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/addSportPosition',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        ChangeSportsPositionStatus : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/deleteSportPosition',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        SportSkillslist : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/SportSkillslist',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        add_sport_skill : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/addSportSkill',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        ChangeSportsSkillStatus : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/deleteSportSkill',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});
