// Sport List Controller
app.controller('SportCtrl', function ($scope, $rootScope, sport_service, $window) {
    
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
    $scope.selectedSport = {};
    $scope.selectedSportIndex = {};
    $scope.selectedSportPosition = {};
    $scope.selectedSportPositionIndex = {};
    $scope.selectedSportSkill = {};
    $scope.selectedSportSkillIndex = {};
    $scope.SportPopUpName = 'ADD SPORTS';
    $scope.SportAddBtnTxt = 'SAVE';
    $scope.SportPositionPopUpName = 'ADD SPORTS POSITION';
    $scope.SportPositionAddBtnTxt = 'SAVE';
    $scope.UpdateSportFormError = {};
    $scope.sportpositionform = {};
    $scope.MediaName = ''; 
    $scope.showeditImage='';
    
    /* Send AdminLoginSessionKey in every request */
    $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
    // Function to fetch sport list
    $scope.Sportlist = function () {
        
        intilizeTooltip();
        showLoader();
        $scope.selectedSport = {};
        $scope.globalChecked        = false;
        $('#ItemCounter').fadeOut();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate    = $('#SpnFrom').val();
        $scope.endDate      = $('#SpnTo').val();
        $scope.searchKey = '';
        if ($('#searchSportField').val()) 
        {
            $scope.searchKey = $.trim($('#searchSportField').val());
            $('#searchSportButton').addClass('selected');
        }
      

        
        $scope.userStatus = '';
        if ($('#hdnUserStatus').val()) 
        {
            $scope.userStatus = $('#hdnUserStatus').val();
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
            begins = (($scope.currentPage - 1) * $scope.numPerPage)
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
        sport_service.Sportlist(reqData).then(function (response) {
            $scope.listData = [];
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
                    $('#SportCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>'+no_record+'</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                
                //Push data into Controller in view file
                $scope.listData.push({ObjPages: response.Data.results});
                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                $('.download_link,#selectallbox').hide();
                $('#SportCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>'+response.Message+'</p></div></td></tr>');
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
    $scope.isSelected = function (sport) {
        if (sport.SportID in $scope.selectedSport) {
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
            $scope.Sportlist();
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
        if($("#hdnSportPageType").val() == "Position"){
            $scope.SportPositionlist();
        }else if($("#hdnSportPageType").val() == "Sport"){
            $scope.Sportlist();
        }else if($("#hdnSportPageType").val() == "Skill"){
            $scope.SportSkillslist();
        }
    });

    $scope.ChangeSportsStatus = function(PopupID,Status){
        var SportID = $("#hdnSportID").val();
        var Status = Status;
        var status_action = Status;
        
        
        var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $('.button span').addClass('loading');
        
        var reqData = {
            SportID: SportID, //$scope.currentPage,
            Status: Status,
            AdminLoginSessionKey: AdminLoginSessionKey,
            status_action: status_action
        };
        sport_service.ChangeSportsStatus(reqData).then(function (response) {
            HideInformationMessage('change_user_status');
            if(response.ResponseCode == 200)
            {
                var message = '';
                if (Status == 3) {
                    message = "Sports Deleted successfully.";
                } 
                closePopDiv(PopupID,'bounceOutUp');

                ShowSuccessMsg(message);
                 $('.button span').removeClass('loading');
                $scope.Sportlist();
               /* setTimeout(function () {
                    location.reload();
                }, 1500);*/
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


   
    $scope.IconImagePath = '';
    $scope.SportIDForIcon = '';

     //Function for set sport id
    $scope.set_sport_data = function (sportData) {
       console.log(sportData);
        $('#sportsname').val(sportData.sportName);
        $('#hdnSportID').val(sportData.SportsID);
        $scope.SportPopUpName = 'UPDATE SPORTS';
        $scope.SportAddBtnTxt = 'UPDATE';
        $scope.showeditImage = 0;
        
        $scope.IconImagePath = sportData.IconImagePath;
        $scope.showeditImage = 1;
        $scope.SportIDForIcon = sportData.SportsID;
        $scope.MediaName = sportData.Icon;
       
        $scope.UpdateSportFormError = {};
    }


     
     $scope.setPopupName = function (sportData) {
        openPopDiv('sports_edit_popup', 'bounceOutDown'); 
        $scope.SportPopUpName = 'ADD SPORTS';
        $scope.SportAddBtnTxt = 'SAVE';
        $('#sportsname').val('');
        $('#hdnSportID').val('');
        $scope.UpdateSportFormError = {};
        $('.attached-media').html('');
        $scope.MediaName = '';
        $scope.showeditImage = 0;
        $scope.SportIDForIcon = '';
        
        
    }

    //Function for set sport id
    $scope.set_sport_position_data = function (sportPositionData) {
       
        $('#sportsPositionname').val(sportPositionData.positionName);
        $('hdnSportPositionID').val(sportPositionData.SportsPositionID);
        $scope.sportList.sportName = sportPositionData.SportsID;

        $scope.SportPositionID = sportPositionData.SportsPositionID;
        
        $scope.SportPositionPopUpName = 'UPDATE SPORTS POSITION';
        $scope.SportPositionAddBtnTxt = 'UPDATE';
        $scope.sportpositionform = {};
        
    }


    $scope.opensportPostionPopup = function (sportData) {
        openPopDiv('sports_position_popup', 'bounceOutDown'); 
        $scope.SportPositionPopUpName = 'ADD SPORTS POSITION';
        $scope.SportPositionAddBtnTxt = 'SAVE';
        $('hdnSportPositionID').val('');
        $scope.SportPositionID = '';
        $scope.sportList.sportName = '';
        $('#sportsPositionname').val('');
        $scope.sportpositionform = {};
    }

    $scope.set_sport_skill_data = function (sportSkillData) {
        
        $('#sportsSkillname').val(sportSkillData.skillName);
        $('hdnSportSkillID').val(sportSkillData.SportsPositionID);
        $scope.sportList.sportName = sportSkillData.SportsID;

        $scope.SportSkillID = sportSkillData.SkillID;
        
        $scope.SportSkillPopUpName = 'UPDATE SPORTS SKILL';
        $scope.SportSkillAddBtnTxt = 'UPDATE';
        $scope.sportskillform = {};
        
    }


    $scope.opensportSkillPopup = function (sportData) {
        openPopDiv('sports_skills_popup', 'bounceOutDown'); 
        $scope.SportSkillPopUpName = 'ADD SPORTS SKILL';
        $scope.SportSkillAddBtnTxt = 'SAVE';
        $scope.sportskillform = {};
        $scope.SportSkillID = '';
        $scope.sportList.sportName = '';
        $('#sportsSkillname').val('');
    }


    



    $scope.UpdateSportFormError = {};
     var media = [];
    $scope.update_sport_name = function (PopupID) {
         var isError = false;
         
         console.log($scope.MediaName);
         $scope.SportName =  $('#sportsname').val();
         $scope.SportID   =  $('#hdnSportID').val();
        if($scope.SportName==undefined || $scope.SportName==''){
            $scope.UpdateSportFormError.NameError = 'Please enter Sport Name';
            isError = true;
        }
        if($scope.MediaName==undefined || $scope.MediaName==''){
            $scope.UpdateSportFormError.ImageNameError = 'Please upload Image';
            isError = true;
        }
        if(!isError){
            showLoader();
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                SportID: $scope.SportID, //$scope.currentPage,
                Name: $scope.SportName,
                AdminLoginSessionKey: AdminLoginSessionKey,
                IconImage: $scope.MediaName
            };
            sport_service.update_sport(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    ShowSuccessMsg(response.Message);
                    hideLoader();
                    closePopDiv(PopupID,'bounceOutUp');
                }else{
                    $scope.UpdateSportFormError.NameError = response.Message;
                    //PermissionError(response.Message);
                }
                //hideLoader();
                //closePopDiv(PopupID,'bounceOutUp');
                $scope.Sportlist();
            })
        }

    }
    /**
     * Set li selected
     * @param {type} user
     * @returns {undefined}
     */
    $scope.selectCategory = function (sport) {
        if (sport.SportsID in $scope.selectedSport) {
            delete $scope.selectedSport[sport.SportsID];
        } else {
            $scope.selectedSport[sport.SportsID] = sport;            
        }
        if (Object.keys($scope.selectedSport).length > 0) {
            setTimeout(function(){ $scope.globalChecked == true; }, 1);
            $('#ItemCounter').fadeIn();            
        } else {
            $scope.showButtonGroup = false;
            $('#ItemCounter').fadeOut();
        }
        
        setTimeout(function(){
            if($(".universities tr.selected").length == $scope.listData[0].ObjUsers.length){
                setTimeout(function(){ $scope.globalChecked = true; }, 1);
                $("#selectallbox").addClass("focus").children("span").addClass("icon-checked");
            }else{
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");
            }
        }, 1);
        
        var ItemCount = Object.keys($scope.selectedSport).length;
        var txtCount = ItemsSelected;
        if(ItemCount == 1)
            txtCount = ItemSelected;
        $('#ItemCounter .counter').html(ItemCount+txtCount);
        //console.log($scope.selectedUsers);
    }

    // Function to fetch sport position list
    $scope.SportPositionlist = function () {
        
        intilizeTooltip();
        showLoader();
        $scope.selectedPages = {};
        $scope.globalChecked        = false;
        $('#ItemCounter').fadeOut();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate    = $('#SpnFrom').val();
        $scope.endDate      = $('#SpnTo').val();
        $scope.searchKey = '';
        if ($('#searchSportPositionField').val()) 
        {
            $scope.searchKey = $.trim($('#searchSportPositionField').val());
            $('#searchSportPositionButton').addClass('selected');
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
        sport_service.SportPositionlist(reqData).then(function (response) {
            $scope.PositionlistData = [];
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
                    $('#SportCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>'+no_record+'</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                
                //Push data into Controller in view file
                $scope.PositionlistData.push({ObjPages: response.Data.results});
                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                $('.download_link,#selectallbox').hide();
                $('#SportCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>'+response.Message+'</p></div></td></tr>');
                $('.simple-pagination').hide();
            }
            hideLoader();            
            
        }), function (error) {
            hideLoader();
        }
    };

    /**
     * Set li selected
     * @param {type} user
     * @returns {undefined}
     */
    $scope.selectPosition = function (sportPosition) {
        if (sportPosition.SportsPositionID in $scope.selectedSportPosition) {
            delete $scope.selectedSportPosition[sportPosition.SportsPositionID];
        } else {
            $scope.selectedSportPosition[sportPosition.SportsPositionID] = sportPosition;            
        }
        if (Object.keys( $scope.selectedSportPosition).length > 0) {
            setTimeout(function(){ $scope.globalChecked == true; }, 1);
            $('#ItemCounter').fadeIn();            
        } else {
            $scope.showButtonGroup = false;
            $('#ItemCounter').fadeOut();
        }
        
        setTimeout(function(){
            if($(".universities tr.selected").length == $scope.listData[0].ObjUsers.length){
                setTimeout(function(){ $scope.globalChecked = true; }, 1);
                $("#selectallbox").addClass("focus").children("span").addClass("icon-checked");
            }else{
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");
            }
        }, 1);
        
        var ItemCount = Object.keys($scope.selectedSportPosition).length;
        var txtCount = ItemsSelected;
        if(ItemCount == 1)
            txtCount = ItemSelected;
        $('#ItemCounter .counter').html(ItemCount+txtCount);
        //console.log($scope.selectedUsers);
    }


    $scope.ChangeSportsPositionStatus = function(PopupID,Status){
        var SportID = $("#hdnSportID").val();
        var Status = Status;
        var status_action = Status;
        
        
        var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $('.button span').addClass('loading');
        
        var reqData = {
            SportsPositionID:  $scope.SportPositionID, //$scope.currentPage,
            Status: Status,
            AdminLoginSessionKey: AdminLoginSessionKey,
            status_action: status_action
        };
        sport_service.ChangeSportsPositionStatus(reqData).then(function (response) {
            HideInformationMessage('change_user_status');
            if(response.ResponseCode == 200)
            {
                var message = '';
                if (Status == 3) {
                    message = "Sport Position Deleted successfully.";
                } 
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
                ShowSuccessMsg(message);
                $scope.SportPositionlist();
               /* setTimeout(function () {
                    location.reload();
                }, 1500);*/
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


    //Apply Sort by and mamke request data
    $scope.sortBYPosition = function (column_id) {
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
            $scope.SportPositionlist();
        }
    };

    /**
     * SHow selected css
     * @param {type} sport
     * @returns {undefined}
     */
    $scope.isSelectedPosition = function (sportPosition) {
        if (sportPosition.SportsPositionID in $scope.selectedSportPosition) {
            return true;
        } else {
            $scope.globalChecked = false;
            return false;            
        }        
    };

    //Apply Sort by and mamke request data
    $scope.sortBYSport = function (column_id) {
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
            $scope.SportSkillslist();
        }
    };


    $scope.get_sports = function () {
       
          
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                AdminLoginSessionKey: AdminLoginSessionKey
            };
            sport_service.get_sports(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    $scope.sportList = response.Data.results;
                    
                    $scope.sport = $scope.sportList[0];
                    setTimeout(function(){
                             

                            $('#SportP').val($scope.sportList.sportName).trigger("chosen:updated");
                            $('#SportP').val(response.Data.results.sportName).change();

                        },1000)
                }
                
            })
        

    }

    setTimeout(function(){
             $('#SportP').val('').trigger("chosen:updated");
             $('#SportP').val('').change();   
            },1000)
    
    $scope.Sport = {};
    $scope.sportpositionform = {};
    // function to add sport
    $scope.add_sport_position = function (PopupID) {
        var isError = false;
        $scope.SportPositionName =  $('#sportsPositionname').val();
        
       
        if($scope.SportPositionName==undefined || $scope.SportPositionName==''){
            $scope.sportpositionform.NameError = 'Please enter Position Name';
            isError = true;
        }
        if($scope.sportList.sportName==undefined || $scope.sportList.sportName=='')
        {
            $scope.sportpositionform.SportNameError = 'Please select Sport';
            isError = true;
        }
        console.log($scope.sportList.sportName);
       
        

        if(!isError){
            showLoader();
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                SportsID: $scope.sportList.sportName, //$scope.currentPage,
                Name: $scope.SportPositionName,
                SportsPositionID: $scope.SportPositionID,
                
            };
            sport_service.add_sport_position(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    ShowSuccessMsg(response.Message);
                    hideLoader();
                    closePopDiv(PopupID,'bounceOutUp');
                }else{
                    $scope.sportpositionform.NameError = 'Position Name already exist';
                    //PermissionError(response.Message);
                }
                
                $scope.SportPositionlist();
            })
        }
    };


    

    $scope.SportSkillslist = function () {
        
        intilizeTooltip();
        showLoader();
        $scope.selectedPages = {};
        $scope.globalChecked        = false;
        $('#ItemCounter').fadeOut();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate    = $('#SpnFrom').val();
        $scope.endDate      = $('#SpnTo').val();
        $scope.searchKey = '';
        if ($('#searchSportSkillField').val()) 
        {
            $scope.searchKey = $.trim($('#searchSportSkillField').val());
            $('#searchSportSkillButton').addClass('selected');
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
        sport_service.SportSkillslist(reqData).then(function (response) {
            $scope.SkillslistData = [];
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
                    $('#SportCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>'+no_record+'</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                
                //Push data into Controller in view file
                $scope.SkillslistData.push({ObjPages: response.Data.results});
                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                $('.download_link,#selectallbox').hide();
                $('#SportCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>'+response.Message+'</p></div></td></tr>');
                $('.simple-pagination').hide();
            }
            hideLoader();            
            
        }), function (error) {
            hideLoader();
        }
    };

    //Apply Sort by and mamke request data
    $scope.sortBYSport = function (column_id) {
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
            $scope.SportSkillslist();
        }
    };

    /**
     * SHow selected css
     * @param {type} sport
     * @returns {undefined}
     */
    $scope.isSelectedSkill = function (sportSkill) {
        if (sportSkill.SkillID in $scope.selectedSportSkill) {
            return true;
        } else {
            $scope.globalChecked = false;
            return false;            
        }        
    };

    /**
     * Set li selected
     * @param {type} user
     * @returns {undefined}
     */
    $scope.selectSkill = function (sportSkill) {
        if (sportSkill.SkillID in $scope.selectedSportSkill) {
            delete $scope.selectedSportSkill[sportSkill.SkillID];
        } else {
            $scope.selectedSportSkill[sportSkill.SkillID] = sportSkill;            
        }
        if (Object.keys( $scope.selectedSportSkill).length > 0) {
            setTimeout(function(){ $scope.globalChecked == true; }, 1);
            $('#ItemCounter').fadeIn();            
        } else {
            $scope.showButtonGroup = false;
            $('#ItemCounter').fadeOut();
        }
        
        setTimeout(function(){
            if($(".universities tr.selected").length == $scope.SkillslistData[0].ObjUsers.length){
                setTimeout(function(){ $scope.globalChecked = true; }, 1);
                $("#selectallbox").addClass("focus").children("span").addClass("icon-checked");
            }else{
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");
            }
        }, 1);
        
        var ItemCount = Object.keys($scope.selectedSportSkill).length;
        var txtCount = ItemsSelected;
        if(ItemCount == 1)
            txtCount = ItemSelected;
        $('#ItemCounter .counter').html(ItemCount+txtCount);
        //console.log($scope.selectedUsers);
    }

    $scope.Sport = {};
    $scope.sportskillform = {};
    $scope.SportSkillID = '';
    // function to add sport
    $scope.add_sport_skill = function (PopupID) {
        var isError = false;
        $scope.SportSkillName =  $('#sportsSkillname').val();
        
       
        if($scope.SportSkillName==undefined || $scope.SportSkillName==''){
            $scope.sportskillform.NameError = 'Please enter Skill Name';
            isError = true;
        }
        
        if(!isError){
            showLoader();
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                SportsID: $scope.sportList.sportName, //$scope.currentPage,
                Name: $scope.SportSkillName,
                SportsSkillID: $scope.SportSkillID,
                
            };
             
            sport_service.add_sport_skill(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    ShowSuccessMsg(response.Message);
                    hideLoader();
                    closePopDiv(PopupID,'bounceOutUp');
                }else{
                     $scope.sportskillform.NameError = 'Skill Name already exist';
                    //PermissionError(response.Message);
                }
                
                $scope.SportSkillslist();
            })
        }
    };

    $scope.ChangeSportsSkillStatus = function(PopupID,Status){
        var SportID = $("#hdnSportID").val();
        var Status = Status;
        var status_action = Status;
        
        
        var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $('.button span').addClass('loading');
        
        var reqData = {
            SportsSkillID: $scope.SportSkillID, //$scope.currentPage,
            Status: Status,
            AdminLoginSessionKey: AdminLoginSessionKey,
            status_action: status_action
        };
        
        sport_service.ChangeSportsSkillStatus(reqData).then(function (response) {
            HideInformationMessage('change_user_status');
            if(response.ResponseCode == 200)
            {
                var message = '';
                if (Status == 3) {
                    message = "Sport Skills Deleted successfully.";
                } 
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
                ShowSuccessMsg(message);
                $scope.SportSkillslist();
               /* setTimeout(function () {
                    location.reload();
                }, 1500);*/
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

$scope.initialize = function()
    {
        $scope.upload_image = new qq.FineUploaderBasic({
        multiple: false,
        autoUpload: true,
        title: "Attach Photos",
        button: $("#sports_icon_photo")[0],
        request: {
            endpoint: base_url + "api/upload_image/upload_sport_image",
           
            params: {
                Type: 'sporticon',
                unique_id: function() {
                    return '';
                },
                LoginSessionKey:$scope.AdminLoginSessionKey,
                DeviceType:'Native'
            }
        },

        validation: {
            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'svg' , 'JPEG', 'JPG', 'GIF', 'PNG', 'SVG'],
            sizeLimit: 4194304 // 4mb
        },
        callbacks: {
            onUpload: function(id, fileName) {
                var html = "<li id='dummy_img'><div class='loader-box'><div id='ImageThumbLoader' class='uplaodLoader'><img src='"+base_url+"assets/admin/img/loading22.gif' id='spinner'></div></div></li>";
                $('.attached-media').html(html);
            },
            onProgress: function(id, fileName, loaded, total) {
            },
            onComplete: function(id, fileName, responseJSON) {
                if (responseJSON.Message == 'Success') 
                {
                    $('#dummy_img').remove();
                    click_function = 'remove_image("'+responseJSON.Data.MediaGUID+'");';
                    $scope.MediaName = responseJSON.Data.ImageName;
                    $scope.showeditImage = 0;
                    $scope.$apply();

                    $('.profileImgThumb .attached-media').css("display", "none");
                   
                    var html = "<li ><a id='"+responseJSON.Data.MediaGUID+"' class='smlremove' onclick='"+click_function+"'></a>";
                        html+= "<figure><img alt='' class='img-full' media_type='IMAGE' is_cover_media='0' media_guid='"+responseJSON.Data.MediaGUID+"' src='"+responseJSON.Data.ImageServerPath +'/'+'org_'+responseJSON.Data.ImageName+"'></figure>";
                        html+= "<span class='radio'></span></li>";
                    $('.attached-media').html(html);
                    var $items = $('.img-full');
                    
                    $("#blog_video input[name='file']").prop("disabled", true);
                   
                } 
                else if(responseJSON.ResponseCode !== 200)
                {
                   
                }
                
            },

            onSubmit: function(id,fileName){
                //fileCount++;
            },

            onValidate: function(b) {
                var validExtensions = ['jpeg', 'jpg', 'gif', 'png', 'svg', 'JPEG', 'JPG', 'GIF', 'PNG', 'SVG']; //array of valid extensions
                var fileName = b.name;
                var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                if ($.inArray(fileNameExt, validExtensions) == -1) {
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    PermissionError('Allowed file types only jpeg, jpg, gif,svg and png.');
                    return false;
                }
                if (b.size > 4194304) {
                    $scope.ErrorStatus = true;
                    //$scope.Error.error_Schollyme_Thumbnail = required_song_thumb;
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    PermissionError('Image should be less than 4 MB.');                   
                }

            },

            onError: function(error){
                //alert(error);
            }
        }
    });
}

    
});


function remove_image (element)
{
    $('#'+element).parent().remove();
        var $items = $('.img-full');
        if($items.length<5)
        {
            $("#sports_icon_photo input[name='file']").prop("disabled", false);
        }
    
    var $items = $('.img-full');
    if($items.length<1)
    {
        $("#blog_photo input[name='file']").prop("disabled", false);
        $("#blog_video input[name='file']").prop("disabled", false);
        $("#embed_code").prop("disabled", false);
    }
}

function remove_sport_icon ()
{
    $('.attached-media').html('');
}




// Initialize Chosen Directive to update dynamic values.
app.directive('chosen', function() {
    var linker = function(scope, element, attr) {
    // update the select when data is loaded
    scope.$watch(attr.chosen, function(oldVal, newVal) {
        element.trigger('chosen:updated');
    });
    // update the select when the model changes
    scope.$watch(attr.ngModel, function() {
        element.trigger('chosen:updated');
    });
    element.chosen();
    };
    return {
        restrict: 'A',
        link: linker
    };
});