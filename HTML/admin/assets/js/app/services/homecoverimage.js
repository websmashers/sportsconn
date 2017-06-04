/*
 |--------------------------------------------------------------------------
 | sport section serivce
 |--------------------------------------------------------------------------
 */
app.factory('homecoverimage_service', function ($q, $http, appInfo) {
    return {
        /*Sportlist : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/sport',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
    	}*/
    }
});