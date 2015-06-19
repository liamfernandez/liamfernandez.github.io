var firebase=new Firebase("https://mymapmarker.firebaseio.com/");

//adding locations to firebase
$('#addlocation').click(function(e){
  e.preventDefault();
  var name=myForm.nameoflocation.value;
  var longitude=myForm.longitude.value;
  var latitude=myForm.latitude.value;

  addlocation(name,longitude,latitude);

});


var addlocation = function(name, longitude, latitude) {
  var locationdata = {
    "name":name,
    "longitude":longitude,
    "latitude":latitude
  };
  firebase.push(locationdata);
  var form = document.getElementById("myForm");
  form.reset();
  alert("You've successfully added a location.")
}

var getlocations = function() {
  var count = 0;
  firebase.on('value', function(snapshot) {
    // code to handle new value.
    snapshot.forEach(function(data) {
      count++;
      showMapMarker(data.val()['name'],data.val()['longitude'],data.val()['latitude']);
    });
  });
}

var showMapMarker = function() {
  var mapProp = {
    center:new google.maps.LatLng(6.5097,3.3863),
    zoom:2,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var count = 0;
  firebase.on('value', function(snapshot) {
    // code to handle new value.
    snapshot.forEach(function(data) {
      count++;
      var infowindow1 = new google.maps.InfoWindow({
      content: data.val()['name']
      });
      var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(data.val()['latitude'],data.val()['longitude']),
        title: data.val()['name']
      });

      google.maps.event.addListener(marker1, 'click', function() {
        infowindow1.open(map,marker1);
      });

      marker1.setMap(map);
    });
  });

}


google.maps.event.addDomListener(window, 'load', showMapMarker);
