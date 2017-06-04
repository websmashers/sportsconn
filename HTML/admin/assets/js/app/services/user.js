/*
 |-------------------------------------------
 | Function for Get Data for a user profile
 | getUser
 |-------------------------------------------
 */
app.factory('userData', function ($q, $http, appInfo) {
    
    return {
        getUser: function (reqData) {
            var deferred = $q.defer();
            ShowInformationMessage('profile_info');
            /* Make HTTP request for user profile data */ //{UserGUID: UserGUID}
            $http.post(base_url + 'admin_api/user/profile_info', reqData).success(function (data) {
                HideInformationMessage('profile_info');
                deferred.resolve(data);
            }).error(function (data) {
                ShowWentWrongError();
                deferred.reject(data);
            });
            return deferred.promise;
        },
        autoLoginUser: function (reqData) {
            var deferred = $q.defer(reqData);
            ShowInformationMessage('autologin_user');
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/users/autologin_user', reqData).success(function (data) {
                HideInformationMessage('autologin_user');
                deferred.resolve(data);
            }).error(function (data) {
                ShowWentWrongError();
                deferred.reject(data);
            });
            return deferred.promise;
        },
        ChangeSingleUserStatus: function (reqData) {
            var deferred = $q.defer(reqData);
            ShowInformationMessage('update_status_user');
            /* Make HTTP request for user listing */
            $http.post(base_url + 'admin_api/user/change_user_status', reqData).success(function (data) {
                HideInformationMessage('update_status_user');
                deferred.resolve(data);
            }).error(function (data) {
                ShowWentWrongError();
                deferred.reject(data);
            });
            return deferred.promise;
        },
        get_user_types : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/user/get_user_types',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        add_user_type : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/user/add_user_type',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        user_types_list : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/user/user_types_list',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        },
        change_user_type_status : function(reqData,Url){ // Common Function to Call Api on given Url with request params
            var deferred = $q.defer();
            $http.post(base_url + 'admin_api/user/delete_user_type',reqData).success(function (data) {
                    deferred.resolve(data);
            }).error(function (data) {
                    deferred.reject(data);
            });
            return deferred.promise;
        }
    }
});