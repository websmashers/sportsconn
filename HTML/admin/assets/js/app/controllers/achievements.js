// Sport List Controller
app.controller('achievementsCtrl', function ($scope, $rootScope, achievements_service, $window) {
    
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
    $scope.selectedAthleticType = {};
    $scope.selectedAchievement = {};

    /* Send AdminLoginSessionKey in every request */
    $scope.AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
    $scope.achievementtype = $('#hdnachievementType').val();
    $scope.athletictype = $('#hdnathleticType').val();

    // Function to fetch sport list
    $scope.AthleticTypelist = function () {
        
        intilizeTooltip();
        showLoader();
        $scope.selectedSport = {};
        $scope.globalChecked        = false;
        $('#ItemCounter').fadeOut();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate    = $('#SpnFrom').val();
        $scope.endDate      = $('#SpnTo').val();
        $scope.searchKey = '';
        if ($('#searchAthleticField').val()) 
        {
            $scope.searchKey = $.trim($('#searchAthleticField').val());
            $('#searchAthleticButton').addClass('selected');
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
            SortBy: $scope.orderByField,
            OrderBy: $scope.reverseSort,
            AthleticType: $scope.athletictype,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
            
        }

        var reqUrl = reqData[1]
        //Call getAthleticTypelist in services.js file
        achievements_service.athletic_type_list(reqData).then(function (response) {
            $scope.AthleticTypelistData = [];
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
                    $('#achievementsCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>'+no_record+'</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                
                //Push data into Controller in view file
                $scope.AthleticTypelistData.push({ObjPages: response.Data.results});
                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                $('.download_link,#selectallbox').hide();
                $('#achievementsCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>'+response.Message+'</p></div></td></tr>');
                $('.simple-pagination').hide();
            }
            hideLoader();            
            
        }), function (error) {
            hideLoader();
        }
    };

    // Function to fetch sport achievements list
    $scope.SportAchievementlist = function () {
        
        intilizeTooltip();
        showLoader();
        $scope.selectedSport = {};
        $scope.globalChecked        = false;
        $('#ItemCounter').fadeOut();
        
        //get starting date and end date from top selected date and apply in query
        $scope.startDate    = $('#SpnFrom').val();
        $scope.endDate      = $('#SpnTo').val();
        $scope.searchKey = '';
        if ($('#searchachievementsField').val()) 
        {
            $scope.searchKey = $.trim($('#searchachievementsField').val());
            $('#searchachievementsButton').addClass('selected');
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
            SortBy: $scope.orderByField,
            OrderBy: $scope.reverseSort,
            AchievementType : $scope.achievementtype,
            //Send AdminLoginSessionKey
            AdminLoginSessionKey :$scope.AdminLoginSessionKey
        }

        var reqUrl = reqData[1]
        //Call getAthleticTypelist in services.js file
        achievements_service.sport_achievement_list(reqData).then(function (response) {
            $scope.SportAchievementlistData = [];
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
                    $('#achievementsCtrl table>tbody').append('<tr id="noresult_td"><td colspan="7"><div class="no-content text-center"><p>'+no_record+'</p></div></td></tr>');
                    $('.simple-pagination').hide();
                }
                
                //Push data into Controller in view file
                $scope.SportAchievementlistData.push({ObjPages: response.Data.results});
                
            }else if(response.ResponseCode == 517){
                redirectToBlockedIP();
            }else if(response.ResponseCode == 598){
                $('.download_link,#selectallbox').hide();
                $('#achievementsCtrl table>tbody').append('<tr id="noresult_td"><td center" colspan="7"><div class="no-content text-center"><p>'+response.Message+'</p></div></td></tr>');
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
    $scope.isSelected = function (athleticTypeData) {
        if (athleticTypeData.AthleticAchievementTypeID in $scope.selectedAthleticType) {
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
                AthleticType: $scope.athletictype,
                //Send AdminLoginSessionKey
                AdminLoginSessionKey :$scope.AdminLoginSessionKey
            }
            $scope.AthleticTypelist();
        }
    };

    /**
     * Set li selected
     * @param {type} user
     * @returns {undefined}
     */
    $scope.selectAthleticType = function (athleticData) {
        if (athleticData.AthleticAchievementTypeID in $scope.selectedAthleticType) {
            delete $scope.selectedAthleticType[athleticData.AthleticAchievementTypeID];
        } else {
            $scope.selectedAthleticType[athleticData.AthleticAchievementTypeID] = athleticData;            
        }
        if (Object.keys( $scope.selectedAthleticType).length > 0) {
            setTimeout(function(){ $scope.globalChecked == true; }, 1);
            $('#ItemCounter').fadeIn();            
        } else {
            $scope.showButtonGroup = false;
            $('#ItemCounter').fadeOut();
        }
        
        setTimeout(function(){
            if($(".universities tr.selected").length == $scope.AthleticTypelistData[0].ObjUsers.length){
                setTimeout(function(){ $scope.globalChecked = true; }, 1);
                $("#selectallbox").addClass("focus").children("span").addClass("icon-checked");
            }else{
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");
            }
        }, 1);
        
        var ItemCount = Object.keys($scope.selectedAthleticType).length;
        var txtCount = ItemsSelected;
        if(ItemCount == 1)
            txtCount = ItemSelected;
        $('#ItemCounter .counter').html(ItemCount+txtCount);
        //console.log($scope.selectedUsers);
    }
    
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
        if($("#hdnAchievementPageType").val() == "AtheticType"){
            $scope.AthleticTypelist();
        }else if($("#hdnAchievementPageType").val() == "SportAchievement"){
            $scope.SportAchievementlist();
        }else if($("#hdnAchievementPageType").val() == "Skill"){
            $scope.SportSkillslist();
        }
    });

    //Function for open user type popup and set values.
    $scope.openAthleticPopup = function () {
        openPopDiv('athletic_type_popup', 'bounceOutDown'); 
        if($scope.athletictype=='2')
        {
            $scope.AthleticPopupName = 'ADD ATHLETIC TYPE';
        }else{
            $scope.AthleticPopupName = 'ADD MEASUREMENT TYPE';
        }
        
        $scope.AthleticAddBtnTxt = 'SAVE';
        $scope.athleticTypeform = {};
        $('#athleticTpeName').val('');
        $('#hdnAthleticAchievementTypeID').val('');
       
    }
    
    //Function for open user type popup and set values.
    $scope.openAchivementPopup = function () {
        openPopDiv('achievement_popup', 'bounceOutDown'); 
        if($scope.achievementtype==1)
        {
            $scope.sportList.sportName = '';
            $scope.AchievementPopupName = 'ADD SPORTS ACHIEVEMENT';
        }else if($scope.achievementtype==2){
            $scope.ddlplacename = 'Select athletic';
            $scope.AchievementPopupName = 'ADD ATHLETIC ACHIEVEMENT';
            $scope.athleticList.athleticName = '';
        }else{
            $scope.ddlplacename = 'Select measurement';
            $scope.AchievementPopupName = 'ADD MEASUREMENT ACHIEVEMENT';
            $scope.athleticList.athleticName = '';
        }
        $scope.AchievementAddBtnTxt = 'SAVE';
        $scope.achievementform = {};
        $scope.AchievementMasterID = '';
        
        $('#achievementName').val('');
        
        $('#UnitType').val('').trigger("chosen:updated");
        $('#UnitType').val('').change();    
         
    }

    /**
     * SHow selected css
     * @param {type} sport
     * @returns {undefined}
     */
    $scope.isSelectedAchievement = function (achievementData) {
        if (achievementData.AchievementMasterID in $scope.selectedachievement) {
            return true;
        } else {
            $scope.globalChecked = false;
            return false;            
        }        
    };
   
    //Apply Sort by and mamke request data
    $scope.sortBYAchievement = function (column_id) {
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
                AchievementType : $scope.achievementtype,
                //Send AdminLoginSessionKey
                AdminLoginSessionKey :$scope.AdminLoginSessionKey
            }
            $scope.SportAchievementlist();
        }
    };

    /**
     * Set li selected
     * @param {type} user
     * @returns {undefined}
     */
    $scope.selectAchievement = function (achievementData) {
        if (achievementData.AchievementMasterID in $scope.selectedAchievement) {
            delete $scope.selectedAchievement[achievementData.AchievementMasterID];
        } else {
            $scope.selectedAchievement[achievementData.AchievementMasterID] = achievementData;            
        }
        if (Object.keys( $scope.selectedAchievement).length > 0) {
            setTimeout(function(){ $scope.globalChecked == true; }, 1);
            $('#ItemCounter').fadeIn();            
        } else {
            $scope.showButtonGroup = false;
            $('#ItemCounter').fadeOut();
        }
        
        setTimeout(function(){
            if($(".universities tr.selected").length == $scope.SportAchievementlistData[0].ObjUsers.length){
                setTimeout(function(){ $scope.globalChecked = true; }, 1);
                $("#selectallbox").addClass("focus").children("span").addClass("icon-checked");
            }else{
                $("#selectallbox").removeClass("focus").children("span").removeClass("icon-checked");
            }
        }, 1);
        
        var ItemCount = Object.keys($scope.selectedAchievement).length;
        var txtCount = ItemsSelected;
        if(ItemCount == 1)
            txtCount = ItemSelected;
        $('#ItemCounter .counter').html(ItemCount+txtCount);
        //console.log($scope.selectedUsers);
    }

    //Function for set achievement id
    $scope.set_achievement_data = function (achievementData) {
       
        $('#achievementName').val(achievementData.Name);
        //$('hdnSportPositionID').val(sportPositionData.SportsPositionID);
        console.log($scope.achievementtype);

        $scope.AchievementMasterID = achievementData.AchievementMasterID;
        if($scope.achievementtype==1)
        {

            $scope.AchievementPopupName = 'UPDATE SPORTS ACHIEVEMENT';
            $scope.sportList.sportName = achievementData.TypeID;
        }else if($scope.achievementtype==2){
            $scope.ddlplacename         = 'Select athletic';
            $scope.AchievementPopupName = 'UPDATE ATHLETIC ACHIEVEMENT';
            $scope.athleticList.athleticName = achievementData.TypeID;
        }else{
            $scope.ddlplacename         = 'Select measurement';
            $scope.AchievementPopupName = 'UPDATE MEASUREMENT ACHIEVEMENT';
            $scope.athleticList.athleticName = achievementData.TypeID;
        }
        console.log($scope.athleticList.athleticName);
        
        
        $scope.AchievementAddBtnTxt = 'UPDATE';
        $scope.achievementform = {};
        $('#UnitType').val(achievementData.Unit).trigger("chosen:updated");
        $('#UnitType').val(achievementData.Unit).change();

        
    }

    $scope.get_sports_for_achievements = function () {
       
          
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                AdminLoginSessionKey: AdminLoginSessionKey
            };
            achievements_service.get_sports_for_achievements(reqData).then(function (response){
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

    $scope.get_athletics_for_achievements = function () {
       
          
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                AdminLoginSessionKey: AdminLoginSessionKey,
                Type: $scope.achievementtype,
            };
            achievements_service.get_athletics_for_achievements(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    $scope.athleticList = response.Data.results;
                    
                    $scope.Athletic = $scope.athleticList[0];
                    setTimeout(function(){
                            $('#AthleticP').val($scope.athleticList.athleticName).trigger("chosen:updated");
                            $('#AthleticP').val(response.Data.results.athleticName).change();

                        },1000)
                }
                
            })
    }
    
    $scope.change_achievement_status = function(PopupID,Status){
        
        var Status = Status;
        var status_action = Status;
        
        
        var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $('.button span').addClass('loading');
        
        var reqData = {
            AchievementMasterID: $scope.AchievementMasterID, //$scope.currentPage,
            Status: Status,
            Type: $scope.achievementtype,
            AdminLoginSessionKey: AdminLoginSessionKey,
            status_action: status_action
        };
        achievements_service.change_achievement_status(reqData).then(function (response) {
            HideInformationMessage('change_user_status');
            if(response.ResponseCode == 200)
            {
                var message = '';
                if (Status == 3) {
                    message = "Achievement Deleted successfully.";
                } 
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
                ShowSuccessMsg(response.Message);
                $scope.SportAchievementlist();
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

    setTimeout(function(){
             $('#SportP').val('').trigger("chosen:updated");
             $('#SportP').val('').change();  
             $('#UnitType').val('').trigger("chosen:updated");
             $('#UnitType').val('').change();    
            },1000)
    
    $scope.Sport = {};
    $scope.achievementform = {};
    var TypeID = '';
    // function to add achievement
    $scope.add_achievement = function (PopupID) {
        var isError = false;
        $scope.AchievementName =  $('#achievementName').val();
        $scope.Units =$('#UnitType').val();

        
        if($scope.achievementtype==1)
        {
            if($scope.sportList.sportName==undefined || $scope.sportList.sportName=='')
            {
                $scope.achievementform.SportNameError = 'Please select Sport';
                isError = true;
            }
            var TypeID = $scope.sportList.sportName;
        }else if($scope.achievementtype==2){
            if($scope.athleticList.athleticName==undefined || $scope.athleticList.athleticName=='')
            {
                $scope.achievementform.AthleticNameError = 'Please select Athletic';
                isError = true;

            }
            var TypeID = $scope.athleticList.athleticName;
        }else{
            if($scope.athleticList.athleticName==undefined || $scope.athleticList.athleticName=='')
            {
                $scope.achievementform.AthleticNameError = 'Please select Measurement';
                isError = true;

            }
            var TypeID = $scope.athleticList.athleticName;
        }
        if($scope.AchievementName==undefined || $scope.AchievementName==''){
            $scope.achievementform.NameError = 'Please enter Achievement Name';
            isError = true;
        }
        
        if($scope.Units==undefined || $scope.Units=='')
        {
            $scope.achievementform.UnitsError = 'Please select Units';
            isError = true;
        }

       
       if(!isError){
            showLoader();
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                TypeID: TypeID, //$scope.currentPage,
                Name: $scope.AchievementName,
                Type: $scope.achievementtype,
                AchievementMasterID: $scope.AchievementMasterID,
                Unit: $scope.Units
                
            };
          
           achievements_service.add_achievement(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    ShowSuccessMsg(response.Message);
                }else{
                    PermissionError(response.Message);
                }
                hideLoader();
                closePopDiv(PopupID,'bounceOutUp');
                $scope.SportAchievementlist();
            })
        }
    };
    
    //Function for set sport id
    $scope.set_athletic_type_data = function (athleticData) {

        $('#athleticTpeName').val(athleticData.athleticTypeName);
        $('#hdnAthleticAchievementTypeID').val(athleticData.AthleticAchievementTypeID);
        if($scope.athletictype=='2')
        {
            $scope.AthleticPopupName = 'UPDATE ATHLETIC TYPE';
        }else{
            $scope.AthleticPopupName = 'UPDATE MEASUREMENT TYPE';
        }
        
        $scope.AthleticAddBtnTxt = 'UPDATE';
        $scope.athleticTypeform = {};
        
    }

    $scope.athleticTypeform = {};

    $scope.add_athletic_type = function (PopupID) {
         var isError = false;
         $scope.AthleticTypeName =  $('#athleticTpeName').val();

         $scope.AthleticAchievementTypeID   =  $('#hdnAthleticAchievementTypeID').val();
        if( $scope.AthleticTypeName==undefined ||  $scope.AthleticTypeName==''){
            if($scope.athletictype=='2')
            {
                $scope.athleticTypeform.NameError = 'Please enter athletic type name';
            }else{
                $scope.athleticTypeform.NameError = 'Please enter measurement type name';
            }
            
            isError = true;
        }

        if(!isError){
            showLoader();
            var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
            var reqData = {
                AthleticAchievementTypeID: $scope.AthleticAchievementTypeID, //$scope.currentPage,
                Name: $scope.AthleticTypeName,
                AdminLoginSessionKey: AdminLoginSessionKey,
                AthleticType: $scope.athletictype
            };

            
            achievements_service.add_athletic_type(reqData).then(function (response){
                if(response.ResponseCode == 200)
                {
                    ShowSuccessMsg(response.Message);
                }else{
                    PermissionError(response.Message);
                }
                hideLoader();
                closePopDiv(PopupID,'bounceOutUp');
                $scope.AthleticTypelist();
            })
        }

    }

    $scope.change_athletic_type_status = function(PopupID,Status){
        var AthleticAchievementTypeID =  $('#hdnAthleticAchievementTypeID').val();
        var Status = Status;
        var status_action = Status;
        
        
        var AdminLoginSessionKey = $('#AdminLoginSessionKey').val();
        $('.button span').addClass('loading');
        
        var reqData = {
            AthleticAchievementTypeID: AthleticAchievementTypeID, //$scope.currentPage,
            Status: Status,
            AdminLoginSessionKey: AdminLoginSessionKey,
            status_action: status_action,
            AthleticType: $scope.athletictype
        };
        achievements_service.change_athletic_type_status(reqData).then(function (response) {
            HideInformationMessage('change_user_status');
            if(response.ResponseCode == 200)
            {
                var message = '';
                /*if (Status == 3) {
                    message = "Athletic Type Deleted successfully.";
                }*/ 
                closePopDiv(PopupID,'bounceOutUp');
                $('.button span').removeClass('loading');
                ShowSuccessMsg(response.Message);
                $scope.AthleticTypelist();
               
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