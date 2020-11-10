//variable that locates the elements in the HTML that needs to have stuff added to it
var incidentContainer = document.getElementById("incident-info");

//variables for the buttons
var next = document.getElementById("next");
var prev = document.getElementById("prev");

//HTTP request
var ourRequest = new XMLHttpRequest();

//Counter for accessing object in the JSON
var counter = 0;

//disables the back button at the start
prev.disabled = true;


//MAKES THE FIRST INCIDENT VISIBLE WHEN WITHOUT HAVING TO CLICK BUTTON--------------------------------------------------
//Go to this URL and get the JSON data
ourRequest.open('GET', 'https://fb-stop-racism.maps.arcgis.com/sharing/rest/content/items/dcc4f4f6e60b4b8cad1517074d3adaa0/data?f=json');
ourRequest.onload = function () {

    //JSON.parse lets the code know to interpret the data from the request into JSON data
    var ourData = JSON.parse(ourRequest.responseText);

    renderHTML(ourData, counter);

};
//Now we're sending the request
ourRequest.send();


//EVENT LISTENER FOR THE "NEXT" BUTTON ---------------------------------------------------------------------------------
next.addEventListener("click", function () {
    //Go to this URL and get the JSON data
    ourRequest.open('GET', 'https://fb-stop-racism.maps.arcgis.com/sharing/rest/content/items/dcc4f4f6e60b4b8cad1517074d3adaa0/data?f=json');

    //What should happen once the data is loaded
    ourRequest.onload = function () {

        //JSON.parse lets the code know to interpret the data from the request into JSON data
        var ourData = JSON.parse(ourRequest.responseText);

        renderHTML(ourData, counter);
    };

    //Sending the request
    ourRequest.send();
    counter++;

    //disables the previous button when the user returns to the start of the object array and enables it again too
    if(counter > 0){
        prev.disabled = false;
    } else {
        prev.disabled = true;
    }
});

//EVENT LISTENER FOR THE "BACK" BUTTON ---------------------------------------------------------------------------------
prev.addEventListener("click", function () {
    //Go to this URL and get the JSON data
    ourRequest.open('GET', 'https://fb-stop-racism.maps.arcgis.com/sharing/rest/content/items/dcc4f4f6e60b4b8cad1517074d3adaa0/data?f=json');

//What should happen once the data is loaded
    ourRequest.onload = function () {

        //JSON.parse lets the code know to interpret the data from the request into JSON data
        var ourData = JSON.parse(ourRequest.responseText);

        renderHTML(ourData, counter);
    };
    //Sending the request
    ourRequest.send();
    counter--;

    //disables the previous button when the user returns to the start of the object array and enables it again too
    if(counter > 0){
        prev.disabled = false;
    } else {
        prev.disabled = true;
    }
});

//Function meant to add HTML to the page -------------------------------------------------------------------------------
function renderHTML(data, counter) {
    //created a variable for the source link so that I could make it a clickable link
    var sourceLink = data.operationalLayers[0].featureCollection.layers[0].featureSet.features[counter].attributes.News_Source;

    //variable meant to store the HTML string that will go on the HTML
    var htmlString = "<p><b>Date of Incident: </b><br>" + data.operationalLayers[0].featureCollection.layers[0].featureSet.features[counter].attributes.Date_of_incident +
        "<br><b>Place of Incident: </b><br>" + data.operationalLayers[0].featureCollection.layers[0].featureSet.features[counter].attributes.Place_of_Incident +
        "<br><b>Summary: </b><br>" + data.operationalLayers[0].featureCollection.layers[0].featureSet.features[counter].attributes.Summary +
        "<br><b>Source: </b><br>" + sourceLink.link(data.operationalLayers[0].featureCollection.layers[0].featureSet.features[counter].attributes.News_Source);
        +"<br></p>";

    //adds HTML right before the end of the animalContainer element
    incidentContainer.innerHTML = htmlString;
}