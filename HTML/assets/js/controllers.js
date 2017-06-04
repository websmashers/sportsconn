"use strict";

/*===============Controller(s)=======================*/
app.controller('mainCtrl', ['$scope', 'screenSize', function($scope, screenSize) {
  $scope.formOpen = false;
  $scope.signupLoginForm = function(){
    $scope.formOpen = true;
  };
  $scope.formClose = function(){
    $scope.formOpen = false;
	$scope.formFlip = false;
  };
  
  /* Edit Profile */
  $scope.userName = {first:"Jason", last:"Thomas"};
  $scope.editorEnabled = false;
  
  $scope.enableEditor = function() {
    $scope.editorEnabled = true;
    $scope.editFirstName = $scope.userName.first;
	  $scope.editLastName = $scope.userName.last;
  };
  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  };
  $scope.save = function() {
    $scope.userName.first = $scope.editFirstName;
	  $scope.userName.last = $scope.editLastName;
    $scope.disableEditor();
  };
  
  /* Switch class according to screen */
  $scope.switchClass = "edit-hover";
  if (screenSize.is('xs, sm')) {
    $scope.switchClass = "";

    $scope.modalOpen = function() {
    	$('#endorsersModal').modal();
     };
  }
  else {
    $scope.switchClass = "edit-hover";
  }
  
  $scope.btnText  = "EDIT";
  $scope.editProfile = function() {
	  if ($scope.btnText ==="EDIT") {
		$scope.switchClass = "touch-edit";
		$scope.btnText = "UPDATE";
	  } else {
		$scope.switchClass = "";
		$scope.btnText = "EDIT";
	  }
  };
  
  $scope.categories = [
  	{
		"Name":"AMERICAN FOOTBALL",
		"Icon":"american-football",
		"selected":true
	 },
	 {
		"Name":"AUSTRALIAN FOOTBALL",
		"Icon":"australian-football",
		"selected":false
	 },
	 {
		"Name":"BASEBALL",
		"Icon":"baseball",
		"selected":false
	 },
	 {
		"Name":"BASKETBALL",
		"Icon":"basketball",
		"selected":false
	 },
	 {
		"Name":"BODYBUILDING",
		"Icon":"bodybuilding",
		"selected":false
	 },
	 {
		"Name":"BOXING",
		"Icon":"boxing",
		"selected":false
	 },
	 {
		"Name":"CROSSFIT",
		"Icon":"crossfit",
		"selected":false
	 },
	 {
		"Name":"CYCLING",
		"Icon":"cycling",
		"selected":false
	 },
	 {
		"Name":"GOLF",
		"Icon":"golf",
		"selected":false
	 },
	 {
		"Name":"MIXED MARTIAL ARTS",
		"Icon":"mixed-martial-arts",
		"selected":false
	 },
	 {
		"Name":"POWERLIFTING",
		"Icon":"power-lifting",
		"selected":false
	 },
	 {
		"Name":"RUGBY LEAGUE",
		"Icon":"rugby-league",
		"selected":false
	 },
	 {
		"Name":"RUNNING",
		"Icon":"running",
		"selected":false
	 },
	 {
		"Name":"SOCCER",
		"Icon":"soccer",
		"selected":false
	 },
	 {
		"Name":"TENNIS",
		"Icon":"tennis",
		"selected":false
	 },
	 {
		"Name":"TRACK & FIELD",
		"Icon":"track-field",
		"selected":false
	 },
	 {
		"Name":"WEIGHTLIFTING",
		"Icon":"weightlifting",
		"selected":false
	 }
  ];
  
  $scope.checkAll = function () {
	  angular.forEach($scope.categories, function(item){
		item.selected = $scope.selectedAll;
	  });
  };
  
  $scope.checkOption = function () {
	  $scope.selectedAll = $scope.categories.every(function(item){
		 return item.selected;
	  });
  }; 

//Polls Filter 
$scope.dropdownval = ['All Polls', 'My Polls', 'By User', 'Anonymus','By Post Date', 'Expired', 'My Voted']
$scope.pollExpiryday = ['1', '2', '3', '4','5', '6', '7', '8','9','10']
  
}]).directive('onFocus', function() {
  return {
    restrict: 'A',   
    link: function ($scope, $element) {
      $element.on('focus', function () {
		  $element.closest('.form-group').addClass('form-focus');
	  }).on('blur', function(){
		  $element.closest('.form-group').removeClass('form-focus');
	  });
    }
  };
}).directive('readMore', function() {
  return {
    restrict: 'A',
    transclude: true,
    /*replace: true,
    template: '<p></p>',*/
    scope: {
      moreText: '@',
      lessText: '@',
      words: '@',
      ellipsis: '@',
      char: '@',
      limit: '@',
      content: '@'
    },
    link: function(scope, elem, attr, ctrl, transclude) {
      var moreText = angular.isUndefined(scope.moreText) ? '<span class="dots">...</span><a class="read-more"> see more</a>' : '<span class="dots">...</span><a class="read-more">' + scope.moreText + '</a>',
        lessText = angular.isUndefined(scope.lessText) ? '<a class="read-less"> see less</a>' : ' <a class="read-less">' + scope.lessText + '</a>',
        ellipsis = angular.isUndefined(scope.ellipsis) ? '' : scope.ellipsis,
        limit = angular.isUndefined(scope.limit) ? 290 : scope.limit;
      attr.$observe('content', function(str) {
        readmore(str);
      });
      transclude(scope.$parent, function(clone, scope) {
        readmore(clone.text().trim());
      });
      function readmore(text) {
        var text = text,
          orig = text,
          regex = /\s+/gi,
          charCount = text.length,
          wordCount = text.trim().replace(regex, ' ').split(' ').length,
          countBy = 'char',
          count = charCount,
          foundWords = [],
          markup = text,
          more = '';
        if (!angular.isUndefined(attr.words)) {
          countBy = 'words';
          count = wordCount;
        }
        if (countBy === 'words') {
          foundWords = text.split(/\s+/);
          if (foundWords.length > limit) {
            text = foundWords.slice(0, limit).join(' ') + ellipsis;
            more = foundWords.slice(limit, count).join(' ');
            markup = text + moreText + '<span class="more-text hide">' + more + lessText + '</span>';
          }
        } else {
          if (count > limit) {
            text = orig.slice(0, limit) + ellipsis;
            more = orig.slice(limit, count);
            markup = text + moreText + '<span class="more-text hide">' + more + lessText + '</span>';
          }
        }
        elem.append(markup);
        elem.find('.read-more').on('click', function(e) {
          $(this).hide();
		  elem.find('.dots').hide();
          elem.find('.more-text').removeClass('hide');
		  e.stopPropagation();
        });
        elem.find('.read-less').on('click', function(e) {
          elem.find('.read-more').show();
		  elem.find('.dots').show();
          elem.find('.more-text').addClass('hide');
		  e.stopPropagation();
        });
      }
    }
  };
}).controller('signupCtrl',['$scope', '$window', 'WizardHandler', function ($scope, $window, WizardHandler) {
  $scope.profiletypes = [
  	{
		"type":"Fan",
		"description":"You enjoy watching sport, but never play",
		"icon":"fansIco"
	},
	{
		"type":"Athlete",
		"description":"You participate in sport at any level",
		"icon":"athleteIco"
	},
	{
		"type":"Organization",
		"description":"ou are a sports organisation (e.g. club, league), or a commercial, educational or charitable organisation that is involved in the sport industry in some way (e.g. apparel, sponsorship, media).",
		"icon":"organizationIco"
	},
	{
		"type":"Professional",
		"description":"You work in sport but you are not an athlete",
		"icon":"sportIco"
	}
  ];
  
  $scope.orgtypeOpt = ["Club", "Company", "School", "University", "Charity", "League", "Institute"];
  $scope.onChecked = function(index){
	$scope.ProfileChecked = $scope.profiletypes[index].type;
	$scope.profiledata = $scope.profiletypes[index];
  };
  $scope.submitSignup = function(){
	  if($scope.profiledata.type==="Fan"){
		$window.location.href = 'fan/complete-your-profile.html';
	  } else if($scope.profiledata.type==="Athlete"){
		WizardHandler.wizard().next();
	  } else if($scope.profiledata.type==="Organization"){
		$window.location.href = 'company/complete-your-profile.html';
	  } else if($scope.profiledata.type==="Professional"){
		$window.location.href = 'sport/complete-your-profile.html';
	  } else{
		alert("Please select profile type");
	  }
  };
}]).directive('headerAfterLogin', function () {
    return {
        restrict: 'A',
        replace: true,
		templateUrl: function() {
		  return basePath + "template/header-after-login.html";
		},
        controller: ['$scope', '$filter', function ($scope, $filter) {
            $('[data-dropdown="onhold"] .dropdown-menu').on('click touchstart', function(e) {
				e.stopPropagation();
			});
			$('[data-dropdown="onhold"]').on('shown.bs.dropdown', function() {
				$('[data-toggle="dropdown"]').dropdown();
				$('[data-dropdown="onhold"] .dropdown-menu [data-toggle="dropdown"]').on('click', function(){
					$(this).closest('[data-dropdown="onhold"]').addClass('open');
				});
			});
      	  scrollbox();
          navbarMobile();
          globalSearch();
        }]
    };
}).directive('headerBeforeLogin', function () {
    return {
        restrict: 'A',
        replace: true,
		templateUrl: function() {
		  return basePath + "template/header-before-login.html";
		},
        controller: ['$scope', function ($scope) {
			backToTop();
			headerFixed();
        }]
    };
}).directive('footer', function () {
    return {
        restrict: 'A',
        replace: true,
		templateUrl: function() {
		  return basePath + "template/footer.html";
		},
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
        }]
    };
}).directive("ngToggleClass", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function () {
				var classes = attr.ngToggleClass.split(',');
                angular.forEach(classes, function (value) {
					if(!element.closest('[data-addclass]').hasClass(value)){
						element.closest('[data-addclass]').addClass(value);
					} else {
						element.closest('[data-addclass]').removeClass(value);
					}
                });
            });
        }
    };
}).filter('strLimit', ['$filter', function($filter) {
   return function(input, limit) {
     if (! input) return;
     if (input.length <= limit) {
          return input;
      }
    
      return $filter('limitTo')(input, limit) + '...';
   };
}]).directive('chosen', function() {
	return {
		priority:1,
		restrict:'A',
		link : {
			pre : function(scope, element, attr, ngModel) {
				var defaultText = attr.placeholder;
				angular.element(element[0]).attr('data-placeholder', defaultText);
			}
		}
	};
});