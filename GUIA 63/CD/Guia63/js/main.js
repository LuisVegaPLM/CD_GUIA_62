
var GUIAProveedoresPLM = angular.module('GUIAProveedoresPLM',['ngRoute','ngSanitize','ui.bootstrap','ngMap']);

	GUIAProveedoresPLM.config(function($routeProvider){

	  $routeProvider
	  .when("/home",{
	    controller:"homeCtrl",
	    templateUrl:"view/home.html"
	  })

	  /*Buscadores*/
	  .when("/buscadores",{
	    controller:"buscadoresCtrl",
	    templateUrl:"view/buscadoresView.html"
	  })

	   /*Produto*/
	  .when("/producto/:productName-:productId",{
	    controller:"productoCtrl",
	    templateUrl:"view/productoView.html"
	  })

	  /*Produto detalle*/
	  .when("/producto-informacion/:productName-:productId",{
	    controller:"productoInformacionCtrl",
	    templateUrl:"view/productoInformacionView.html"
	  })

	   /*Empresa*/
	  .when("/directorio-comercial-mexico/:letter",{
	    controller:"directorioMexicoCtrl",
	    templateUrl:"view/directorioMexicoView.html"
	  })
      
	  .when("/empresa/:clientName-:clientId",{
	    controller:"empresaCtrl",
	    templateUrl:"view/empresaView.html"
	  })

	  /*localizacion */

	  .when("/localizacion/:clientName-:clientId",{
	    controller:"localizacionCtrl",
	    templateUrl:"view/localizacionView.html"
	  })

	   /*localizacion */

	  .when("/hospitales",{
	    controller:"hospitalesCtrl",
	    templateUrl:"view/hospitalesView.html"
	  })

	  .when("/hospital-informacion/:hospitalName:hospitalId",{
	    controller:"hospitalInformacionCtrl",
	    templateUrl:"view/hospitalInformacionView.html"
	  })


	    .otherwise({
	    redirectTo:"/home"
	  });

	});


	GUIAProveedoresPLM.run(['$rootScope', function($rootScope) {

       
		 $rootScope.$on('$routeChangeStart', function(){
		 	

		 });


		 $("#nav-accordion li").click(function(){

		 	
		 	var widthBosy= $( window ).width();

		 	if(widthBosy < 768){

				    $("#container").addClass("sidebar-closed");
		              
		            var op= $(".sidebar-menu").css("display");

		               if(op=='block'){
		               	   $(".sidebar-menu").css("display","none");

		               }

		            console.log(op);

		        }
		  
		});

	}]);

	//Controllers


    GUIAProveedoresPLM.controller('MainSearchCtrl', function ($scope, filterFilter) {
		  $scope.selectedUser = '';
		  
		  var users = [{
		      name: 'Abatelenguas',
		      group: 'Produtos',
		      Id:1
		    }, {
		      name: 'Acabados interiores',
		      group: 'Produtos',
		      Id:2
		    }, {
		      name: 'Accesorios para baño',
		      group: 'Produtos',
		      Id:3
		    }, {
		      name: 'Accesorios plomados',
		      group: 'Produtos',
		      Id:4
		    }, {
		      name: 'Acupuntura',
		      group: 'Produtos',
		      Id:5
		    },{
		     name: 'AP IMPLANTE AG',
		      group: 'Marcas',
		      Id:1
		    }, {
		      name: 'ACMI',
		      group: 'Marcas',
		      Id:2
		    }, {
		      name: 'ABAXIS',
		      group: 'Marcas',
		      Id:3
		    }, {
		      name: 'ABBOT SPINE',
		      group: 'Marcas',
		      Id:4
		    }, {
		      name: 'ABLEWARE',
		      group: 'Marcas',
		      Id:5
		    },
		  ];

	        
 

  
				    
		  
		  $scope.getUsers = function (search) {
		    var filtered = filterFilter(users, search);
		    
		    var results = _(filtered)
		      .groupBy('group')
		      .map(function (g) {
		        g[0].firstInGroup = true;  // the first item in each group
		        return g;
		      })
		      .flatten()
		      .value();
		      
		    console.log(results);
		    
		    return results;
		  }


            $scope.onSelectProduct = function ($item, $model, $label) {

            
             window.location.href="#/producto/"+$item.name+"-"+$item.Id;
          
        
		 };





		});


	GUIAProveedoresPLM.controller("homeCtrl",function($scope,$rootScope){



		

	});

	GUIAProveedoresPLM.controller("buscadoresCtrl",function($scope,$rootScope,Products,Brands){

		  $scope.products = Products;
		  $scope.brands = Brands;

		  $scope.onSelectProduct = function ($item, $model, $label) {
            
            console.log($item);
           
		  	window.location.href="#/producto/"+$item.Name+"-"+$item.Id;
        
		 };

		$scope.onSelectBrand = function ($item, $model, $label) {

		};

  

	});

	GUIAProveedoresPLM.controller("productoCtrl",function($scope,$rootScope,$routeParams){
        
         var _productName=$routeParams.productName;
         var _productName=$routeParams.productId;
         
		

	});

	GUIAProveedoresPLM.controller("productoInformacionCtrl",function($scope,$rootScope,$routeParams){
        
         var _productName=$routeParams.productName;
         var _productName=$routeParams.productId;


         
		

	});

	GUIAProveedoresPLM.controller("directorioMexicoCtrl",function($scope,$rootScope,$routeParams){

	 var _letterSelect=$routeParams.letter;

	 console.log(_letterSelect);

	 $scope.letters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	 $scope.letterSelect=_letterSelect;
   


         
		

	});

	GUIAProveedoresPLM.controller("empresaCtrl",function($scope,$rootScope,$routeParams){


	 var _clientName=$routeParams.clientName;
	 var _clientId=$routeParams.clientId;
	 console.log(_clientName);

	});

	GUIAProveedoresPLM.controller("localizacionCtrl",function($scope,$rootScope,$routeParams,$http, $interval){

	 var _clientName=$routeParams.clientName;
	 var _clientId=$routeParams.clientId;

	 $scope.clientId=_clientId

   

	  // $scope.map .. this exists after the map is initialized
	    var markers = [];
	    for (var i=0; i<8 ; i++) {
	      markers[i] = new google.maps.Marker({
	        title: "Hi marker " + i
	      })
	    }
	    $scope.GenerateMapMarkers = function() {
	        $scope.date = Date(); // Just to show that we are updating
	        
	        var numMarkers = Math.floor(Math.random() * 4) + 4;  // betwween 4 & 8 of them
	        for (i = 0; i < numMarkers; i++) {
	            var lat =   19.364168+ (Math.random()/100);
	            var lng = -99.1846588+ (Math.random()/100);
	            // You need to set markers according to google api instruction
	            // you don't need to learn ngMap, but you need to learn google map api v3
	            // https://developers.google.com/maps/documentation/javascript/markers
	            var latlng = new google.maps.LatLng(lat, lng);
	            markers[i].setPosition(latlng);
	            markers[i].setMap($scope.map);
	        }      
	    };  
	    
	    $interval( $scope.GenerateMapMarkers, 2000);
		 



	});

   
   GUIAProveedoresPLM.controller("hospitalesCtrl",function($scope,$rootScope,$routeParams){



         
	
	});

    GUIAProveedoresPLM.controller("hospitalInformacionCtrl",function($scope,$rootScope,$routeParams){


	});


	//Factories

	GUIAProveedoresPLM.factory("Products", function(){

      var products = [ {"Name": "Abatelenguas","Id": 1},{ "Name": "Acabados interiores","Id": 2},{ "Name": "Accesorios para baño","Id": 3},{ "Name": "Accesorios plomados","Id": 4},{ "Name": "Acupuntura","Id": 5},{ "Name": "Adhesivos","Id": 6},{ "Name": "Aislantes","Id": 7},{ "Name": "Aislantes retardadores","Id": 8}]
				        
				       
      return products;


   });

	GUIAProveedoresPLM.factory("Brands", function(){

	  var brands = [ {"Name": "AAP IMPLANTE AG","Id": 1},{ "Name": "AARON","Id": 2},{ "Name": "ABAXIS","Id": 3},{ "Name": "ABBOT SPINE","Id": 4},{ "Name": "ABBOTT","Id": 5},{ "Name": "ABLEWARE","Id": 6},{ "Name": "ACCU-CHEK","Id": 7},{ "Name": "ACCURAY","Id": 8}]
				        
 
      return brands;
  
   });


	  /********************************************************************************************
    DIRECTIVES
   *********************************************************************************************/

	   GUIAProveedoresPLM.directive('backButton', function(){
		    return {
		      restrict: 'A',

		      link: function(scope, element, attrs) {
		        element.bind('click', goBack);

		        function goBack() {
		          history.back();
		          scope.$apply();
		        }
		      }
		    }
		});


 $('.fa-bars').click(function () {
	  if ($('#sidebar > ul').is(":visible") === true) { 	 
	      $('#main-content').css({
	          'margin-left': '0px'
	      });
	      $('#sidebar').css({
	          'margin-left': '-240px'
	      });
	      $('#sidebar > ul').hide();
	      $("#container").addClass("sidebar-closed");
	  } else {
	      $('#main-content').css({
	          'margin-left': '240px'
	      });
	      $('#sidebar > ul').show();
	      $('#sidebar').css({
	          'margin-left': '0'
	      });
	      $("#container").removeClass("sidebar-closed");
	  }
	});

 $(function() {
  function responsiveView() {
      var wSize = $(window).width();
      if (wSize <= 768) {
          $('#container').addClass('sidebar-close');
          $('#sidebar > ul').hide();
      }

      if (wSize > 768) {
          $('#container').removeClass('sidebar-close');
          $('#sidebar > ul').show();


      }
  }
  $(window).on('load', responsiveView);
  $(window).on('resize', responsiveView);
});


function stickyMenu() {

	var scrollTop = $(window).scrollTop();
	var offset = 0;

	if (scrollTop > offset) {
	
		$('#navbar').addClass('navbar-small');
		
	} else {
		
		$('#navbar').removeClass('navbar-small');
	}
}


$(window).on("scroll", function (e) {

	setTimeout(function () {
		stickyMenu();
	}, 300)
});




