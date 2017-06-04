/*
 |--------------------------------------------------------------------------
 | sport section serivce
 |--------------------------------------------------------------------------
 */
app.factory('achievements_service', function ($q, $http, appInfo) {
    return {
        add_athletic_type : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/achievements/add_athletic_type',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
    	},
        athletic_type_list : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/achievements/athletic_type_list',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        change_athletic_type_status : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/achievements/delete_athletic_type',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        sport_achievement_list : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/achievements/sport_achievement_list',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        get_sports_for_achievements : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport/getSports',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        add_achievement : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/achievements/add_achievement',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        change_achievement_status : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/achievements/delete_achievement',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        get_athletics_for_achievements : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/achievements/get_athletics_for_achievements',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});

