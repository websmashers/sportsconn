app.controller('homecoverimageCtrl', function ($scope, $rootScope, homecoverimage_service, $window) {


	$scope.initCropper = function () {
            $('#image-cropper').cropit({
                onFileChange: function () {
                    $('#image-cropper').show();
                    $('.default-photo').hide();
                    $scope.is_profile = true;
                }
            });
            // When user clicks select image button,
            // open select file dialog programmatically
            $('#prfImg').click(function () {
                $('#image-cropper').children('.cropit-image-input').click();
            });
            $('.image-cropper-close').click(function () {
                $('#image-cropper').hide();
                $('.default-photo').show();
                $('#image-cropper').cropit('destroy');
                var control = $('#image-cropper').children('.cropit-image-input');
                control.replaceWith(control = control.clone(true));
                //reinit
                $('#image-cropper').cropit({
                    onFileChange: function () {
                        $('#image-cropper').show();
                        $('.default-photo').hide();
                        $scope.is_profile = true;
                    }
                });
                $('#image-cropper').cropit('disable');
                $('#image-cropper').cropit('reenable');
                $scope.is_profile = false;
            });
            /////////
            $('#cover-image-cropper').cropit({
                onFileChange: function () {
                    //console.log('dasd');
                    $('#cover-image-cropper').show();
                    $('.default-cover-photo').hide();
                    $scope.is_banner = true;
                },
                onFileReaderError: function (e) {
                    $('#cover-image-cropper').hide();
                    $('.default-cover-photo').show();
                    $scope.is_banner = false;
                    alert('Invalid file selected.');
                }
            });
            $('#coverImg').click(function () {
                $('#cover-image-cropper').children('.cropit-image-input').trigger('click');
            });
           
            $('.banner-cropper-close').click(function () {
                $('#cover-image-cropper').hide();
                $('.default-cover-photo').show();
                $('#cover-image-cropper').cropit('disable');
                $('#cover-image-cropper').cropit('reenable');
                $scope.is_banner = false;

                $('#cover-image-cropper').cropit({
                    onFileChange: function () {
                        //console.log('dasd');
                        $('#cover-image-cropper').show();
                        $('.default-cover-photo').hide();
                        $scope.is_banner = true;
                    },
                    onFileReaderError: function (e) {
                        $('#cover-image-cropper').hide();
                        $('.default-cover-photo').show();
                        $scope.is_banner = false;
                        alert('Invalid file selected.');
                    }
                });
            });
        };
        $scope.initCropper();


});