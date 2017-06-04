// User Controller for Profile Page
app.controller('userCtrl', function ($scope, userData, $rootScope, $window) {
    $rootScope.overviewTabLoad = '1';
    $rootScope.communicateTabLoad = '0';
    $rootScope.mediaTabLoad = '0';
    $scope.user = {};

    // Initialize scope variables
    $scope.totalRecord = 0;
    $scope.filteredTodos = [],
    $scope.currentPage = 1,
    $scope.numPerPage = pagination,
    $scope.maxSize = pagination_links;
    $scope.orderByField = '';
    $scope.reverseSort = false;
    $scope.searchKey = '';
    $scope.numPerPage = 10,
    $scope.selectedUserType = {};
    $scope.selectedUserTypeIndex = {};
    
    $scope.ChangeSingleUserStatus = function(PopupID,Status){
        var UserID = $("#hdnUserID").val();
        var Status = Status;
        var status_action = Status;
        if(PopupID == "approve_popup")
            status_action = 1;
        
        var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $('.button span').addClass('loading');
        
        var reqData = {
            UserID: UserID, //$scope.currentPage,
            Status: Status,
            AdminLoginSessionKey: AdminLoginSessionKey,
            status_action: status_action
        };
        userData.ChangeSingleUserStatus(reqData).then(function (response) {
            HideInformationMessage('change_user_status');
            if(response.ResponseCode == 200)
            {
                var message = '';
                if (Status == 3) {
                    message = "Deleted successfully.";
                } else if (Status == 4) {
                    message = "Blocked successfully.";
                }
                else if (Status == 2) {
                    message = "Approved successfully.";
                }
                else if (Status == 2) {
                    message = "Unblocked successfully.";
                }
                closePopDiv(PopupID,'bounceOutUp');

                ShowSuccessMsg(message);
                setTimeout(function () {
                    location.reload();
                }, 1500);
            }else if(response.ResponseCode == 598){
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
                //Show error message
                PermissionError(response.Message);
            }else if(checkApiResponseError(response)){
                ShowWentWrongError();
            }else{
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
            }
        }), function (error) {
            ShowWentWrongError();
        }
    };
    
    $scope.getUser = function () {
        //get starting date and end date from top selected date and apply in query
        $scope.startDate = $('#SpnFrom').val();
        $scope.endDate = $('#SpnTo').val();
        $scope.userID = $('#hdnUserID').val();
        
        /* Send AdminLoginSessionKey in every request */
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        //Make requestData in JSON and send it in service.js
        var reqData = {
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            UserID: $scope.userID,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        userData.getUser(reqData).then(function (response) {
            if(response.ResponseCode == 200){
                $scope.user = response.Data;
                if($rootScope.tabSelected != "media"){
                    $rootScope.$broadcast('getUserEvent', response.Data);
                }
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(checkApiResponseError(response)){
                ShowWentWrongError();
            }else{
                ShowErrorMsg(response.Message);
            }
        });
    };
    //Function for set StatusClass, Tooltip on profile page
    $scope.statusClass = function (id) {
        var cls = 'verified';
        switch (id) {
            case '1':
                cls = 'pending';
                break;
            case '4':
                cls = 'blocked';
                break;
            case '2':
            case '5':
                cls = 'verified';
                break;
            case '3':
                cls = 'deleted';
                break;
            default :
                cls = 'verified';
        }
        return cls;
    };
    
    $scope.statusTitle = function (id) {
        var title = 'Verified';
        switch (id) {
            case '1':
                title = 'Pending';
                break;
            case '4':
                title = 'Blocked';
                break;
            case '2':
            case '5':
                title = 'Verified';
                break;
            case '3':
                title = 'Deleted';
                break;
            default :
                title = 'Verified';
        }
        return title;
    };
    
    //Function for view user profile of a particular user
    $scope.autoLoginUser = function (userid) {
        
        //If UserID is Undefined
        if (typeof userid === 'undefined') {
            userid = $('#hdnUserID').val();
        }
        
        /* Send AdminLoginSessionKey in every request */
        $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();

        var reqData = {
            userid: userid,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        };
        
        //Call autoLoginUser in services.js file
        userData.autoLoginUser(reqData).then(function (response) {
            
            if (response.ResponseCode == 200) {
                $window.open(base_url + 'usersite/signin','_blank');
                //$window.location.href = base_url + 'usersite/signin';
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                //Show error message
                PermissionError(response.Message);                
            }else if(checkApiResponseError(response)){
                ShowWentWrongError();
            }else{
                ShowErrorMsg(response.Message);
            }

        }), function (error) {
            hideLoader();
        }
    }

    //Function for open user type popup and set values.
    $scope.openuserTypePopup = function () {
        openPopDiv('user_type_popup', 'bounceOutDown'); 
        $scope.UserTypePopUpName = 'ADD USER TYPE';
        $scope.UserTypeAddBtnTxt = 'SAVE';
        $scope.userTypesform = {};
        $('#userTypename').val('');
        $scope.userTypeList.userTypeName = '';
    }
    //Function for set sport id
    $scope.set_user_type_data = function (userTypeData) {
       
        $('#userTypename').val(userTypeData.UserTypeName);
        $('hdnUserTypesTypeID').val(userTypeData.UserTypesTypeID);
        $scope.userTypeList.userTypeName = userTypeData.UserTypeID;

        $scope.UserTypesType = userTypeData.UserTypesTypeID;
        
        $scope.UserTypePopUpName = 'UPDATE USER TYPE';
        $scope.UserTypeAddBtnTxt = 'UPDATE';
        $scope.userTypesform = {};
        
    }



    // Function to fetch sport position list
    $scope.UserTypeslist = function () {
        
        intilizeTooltip();
        showLoader();
        $scope.selectedPages = {};
        $scope.globalChecked        = false;
        $('#ItemCounter').fadeOut();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate    = $('#SpnFrom').val();
        $scope.endDate      = $('#SpnTo').val();
        $scope.searchKey = '';
        if ($('#searchUserTypeField').val()) 
        {
            $scope.searchKey = $.trim($('#searchUserTypeField').val());
            $('#searchUserTypeButton').addClass('selected');
        }
      
        /* Here we check if current page is not equal 1 then set new value for var begin */
        
        var begins = '';
        
        if ($scope.currentPage == 1) 
        {
            //Make request data parameter for university listing
            begins = 0;//$scope.currentPage;
        } 
        else 
        {
            begins = (($scope.currentPage - 1) * $scope.numPerPage);
        }

        var reqData = {
            Begin: begins, //$scope.currentPage,
            End: $scope.numPerPage,
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            SearchKey: $scope.searchKey,
            UserStatus: $scope.userStatus,
            SortBy: $scope.orderByField,
            OrderBy: $scope.reverseSort,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }

        var reqUrl = reqData[1]
        //Call getUniversitylist in services.js file
        userData.user_types_list(reqData).then(function (response) {
            $scope.UserTypelistData = [];
            //If no. of records greater then 0 then show
            $('.download_link,#selectallbox').show();
            $('#noresult_td').remove();
            $('.simple-pagination').show();

            //$scope.showButtonGroup = false;
            $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");            
            
            if(response.ResponseCode == 200){
                $scope.noOfObj = response.Data.total_records;
                $scope.total_pages = $scope.total_records = $scope.noOfObj;

                //If no of records equal 0 then hide
                if ($scope.noOfObj == 0) {
                    $('.download_link,#selectallbox').hide();
                    $('#userCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>'+no_record+'</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                
                //Push data into Controller in view file
                $scope.UserTypelistData.push({ObjPages: response.Data.results});
                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                $('.download_link,#selectallbox').hide();
                $('#userCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>'+response.Message+'</p></div></td></tr>');
                $('.simple-pagination').hide();
            }
            hideLoader();            
            
        }), function (error) {
            hideLoader();
        }
    };

    /**
     * SHow selected css
     * @param {type} sport
     * @returns {undefined}
     */
    $scope.isSelected = function (userType) {
        if (userType.UserTypesTypeID in $scope.selectedUserType) {
            return true;
        } else {
            $scope.globalChecked = false;
            return false;            
        }        
    };
   
    //Apply Sort by and mamke request data
    $scope.sortBY = function (column_id) {
        if($("table.users-table #noresult_td").length == 0)
        {
            $(".shortdiv").children('.icon-arrowshort').addClass('hide');
            $(".shortdiv").parents('.ui-sort').removeClass('selected');
            if($scope.reverseSort == true){
                $("#"+column_id).addClass('selected').children('.shortdiv').removeClass('sortedDown').addClass('sortedUp').children('.icon-arrowshort').removeClass('hide');
            }else{
                $("#"+column_id).addClass('selected').children('.shortdiv').removeClass('sortedUp').addClass('sortedDown').children('.icon-arrowshort').removeClass('hide');                
            }
            
            reqData = {
                Begin: $scope.currentPage,
                End: $scope.numPerPage,
                StartDate: $scope.startDate,
                EndDate: $scope.endDate,
                SearchKey: $scope.searchKey,
                UserStatus: $scope.userStatus,
                SortBy: $scope.orderByField,
                OrderBy: $scope.reverseSort,
                //Send AdminLoginSessionKey
                AdminLoginSessionKey :$scope.AdminLoginSessionKey
            }
            $scope.UserTypeslist();
        }
    };
    
    //Get no. of pages for data
    $scope.numPages = function () {
        return Math.ceil($scope.noOfObj / $scope.numPerPage);
    };
    
    //Call function for get pagination data with new request data
    $scope.$watch('currentPage + numPerPage', function () {
        begins = (($scope.currentPage - 1) * $scope.numPerPage)
        reqData = {
            Begin: begins,
            End: $scope.numPerPage,
            StartDate: $scope.startDate,
            EndDate: $scope.endDate,
            SearchKey: $scope.searchKey,
            SortBy: $scope.sort_by,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }
        $scope.UserTypeslist();
    });
    //Function to get user types
    $scope.get_user_types = function () {
       
          
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                AdminLoginSessionKey: AdminLoginSessionKey
            };
            userData.get_user_types(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    $scope.userTypeList = response.Data.results;
                    
                    $scope.userType = $scope.userTypeList[0];
                    setTimeout(function(){
                             

                            $('#UserTypeP').val($scope.userTypeList.userTypeName).trigger("chosen:updated");
                            $('#UserTypeP').val(response.Data.results.userTypeName).change();

                        },1000)
                }
                
            })
        

    }
    setTimeout(function(){
             $('#UserTypeP').val('').trigger("chosen:updated");
             $('#UserTypeP').val('').change();   
            },1000)
    
    $scope.userType = {};
    $scope.userTypesform = {};
    // function to add sport
    $scope.add_user_type = function (PopupID) {
        var isError = false;
        $scope.UserTypeName =  $('#userTypename').val();
        
       
        if($scope.UserTypeName==undefined || $scope.UserTypeName==''){
            $scope.userTypesform.NameError = 'Please enter User Type Name';
            isError = true;
        }
        if($scope.userTypeList.userTypeName==undefined || $scope.userTypeList.userTypeName=='')
        {
            $scope.userTypesform.UserTypeError = 'Please select User Type';
            isError = true;
        }
        
       if(!isError){
            showLoader();
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                UserTypeID: $scope.userTypeList.userTypeName, //$scope.currentPage,
                Name: $scope.UserTypeName,
                UserTypesTypeID: $scope.UserTypesType,
                
            };

            userData.add_user_type(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    ShowSuccessMsg(response.Message);
                }else{
                    PermissionError(response.Message);
                }
                hideLoader();
                closePopDiv(PopupID,'bounceOutUp');
                $scope.UserTypeslist();
            })
        }
    };

    $scope.ChangeUserTypeStatus = function(PopupID,Status){
        
        var Status = Status;
        var status_action = Status;
        
        
        var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $('.button span').addClass('loading');
        
        var reqData = {
            UserTypesTypeID:  $scope.UserTypesType, //$scope.currentPage,
            Status: Status,
            AdminLoginSessionKey: AdminLoginSessionKey,
            status_action: status_action
        };
        userData.change_user_type_status(reqData).then(function (response) {
            HideInformationMessage('change_user_status');
            if(response.ResponseCode == 200)
            {
                var message = '';
                if (Status == 3) {
                    message = "User Type Deleted successfully.";
                } 
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
                ShowSuccessMsg(message);
                $scope.UserTypeslist();
               
            }else if(response.ResponseCode == 598){
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
                //Show error message
                PermissionError(response.Message);
            }else if(checkApiResponseError(response)){
                ShowWentWrongError();
            }else{
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
            }
        }), function (error) {
            ShowWentWrongError();
        }
    };
});

app.controller('usrTabController', function ($scope, $rootScope) {
    $scope.tabSelected = null;
    
    $scope.loadUserProfileTab = function(tabl_id){
        if(tabl_id != ""){
            setTimeout(function(){
                $("#"+tabl_id).trigger("click");
            }, 500);
        }
    };
    
    $scope.selectTab = function (tabSelected) {
        changeTabs(tabSelected);
        $rootScope.tabSelected = tabSelected;
        
        if($rootScope.tabSelected == "overview" && $rootScope.overviewTabLoad == 0){
            $rootScope.overviewTabLoad = 1;
        }
        
        if($rootScope.tabSelected == "communicate" && $rootScope.communicateTabLoad == 0){
            $rootScope.communicateTabLoad = 1;
            if($("#allowCommunicationTab").val() != 0){
                angular.element(document.getElementById('communicationTabCtrl')).scope().userCommunication();
            }
        }
        
        if($rootScope.tabSelected == "media" && $rootScope.mediaTabLoad == 0){
            $rootScope.mediaTabLoad = 1;
            angular.element(document.getElementById('mediaCtrl')).scope().getMediaSummary();
            angular.element(document.getElementById('mediaCtrl')).scope().getSearchBox();
        }
        $rootScope.$emit('getTabEvent', tabSelected);
    }


});