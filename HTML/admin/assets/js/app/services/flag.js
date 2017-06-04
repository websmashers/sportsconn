/*
 |--------------------------------------------------------------------------
 | sport section serivce
 |--------------------------------------------------------------------------
 */
app.factory('flag_service', function ($q, $http, appInfo) {
    return {
        FlaggedUserList : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/flag/flag_list',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
    	},
        view_flag_details : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/flag/view_flag_details',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        change_flagged_user_status : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/flag/delete_flagged_user',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        change_flag_status : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/flag/delete_flag',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});