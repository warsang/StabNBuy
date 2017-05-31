/*chrome.windows.create({'url': chrome.extension.getURL("popup.html"),'type': "detached_panel",'focused': true}, function(){
    //created newPage.html which has newPage.js
});*/

//stabnbuy.cloudapp.net:3000/api/text

var result_search_container = "<p class='no_answer'>Aucun produit ne correspond à votre sélection.</p>";

/**
**Sert de test
**
**/

var myJsonArray = {
  "ErrorMessage": null,
  "ItemCount": "53",
  "PageCount": "53",
  "PageNumber": "0",
  "Products": [
    {
      "AssociatedProducts": null,
      "BestOffer": {
        "Condition": "New",
        "Id": "90NP0233",
        "IsAvailable": true,
        "PriceDetails": {
          "Discount": {
            "EndDate": "2015-11-29T23:00:00+01:00",
            "StartDate": "2015-11-28T08:00:00+01:00",
            "Type": "FLASHSALE"
          },
          "ReferencePrice": "399.00",
          "Saving": {
            "Type": "Amount",
            "Value": "219.0"
          }
        },
        "ProductURL": "http://www.cdiscount.com/opa.aspx/?trackingid=dPRMjA8PaQZjDBul4LvQiZlzglQ9hCyB8Vxhk1WVsCFsQN9Di9MidOYwd9ROVd7O&action=product&id=90NP0233",
        "SalePrice": "179.99",
        "Seller": {
          "Id": "0",
          "Name": "Cdiscount"
        },
        "Shippings": null,
        "Sizes": null
      },
      "Brand": "ASUS",
      "Description": "Tablette tactile Z300C-1B085A avec écran 10.1\" IPS - Processeur Intel  Atom x3-C3200 Quad Core - Mémoire 2Go - Stockage 64Go - Lecteur de cartes micro SD - Webcam avant 0,3Mpixels, arrière 2Mpixels - WiFi - Bluetooth 4.0 - Double Haut-parleurs en face avant - Android 5.0 Lollipop - Garantie 1 an",
      "Ean": null,
      "Id": "90NP0233",
      "Images": null,
      "MainImageUrl": "http://i2.cdscdn.com/pdt2/2/3/3/1/300x300/90NP0233.jpg",
      "Name": "Asus ZenPad Z300C 10\" 64Go Blanc",
      "Offers": null,
      "OffersCount": "2",
      "Rating": "5"
    }
  ]
};

/**
** Sert si on a par exemple des requetes AJAX sur la page
**
**/

// chrome.pageAction.onClicked.addListener(chrome_tabs_query_sendMessage_tab);
chrome.browserAction.onClicked.addListener(chrome_tabs_query_sendMessage);
chrome.tabs.onUpdated.addListener(chrome_tabs_query_sendMessage);
chrome.tabs.onHighlighted.addListener(chrome_tabs_query_sendMessage);
chrome.tabs.onHighlightChanged.addListener(chrome_tabs_query_sendMessage);
chrome.windows.onFocusChanged.addListener(chrome_tabs_query_sendMessage);
// chrome.contextMenus.onClicked.addListener(chrome_tabs_query_sendMessage);
// chrome.windows.onClick(chrome_tabs_query_sendMessage);
// chrome.tabs.onClick(chrome_tabs_query_sendMessage);
// chrome.browserAction.onClick.addListener(chrome_tabs_query_sendMessage);
// chrome.browserAction.onClick(chrome_tabs_query_sendMessage);


/**
**Récupérer la selection et appeler la fonction sendserviceRequest
**
**/

function chrome_tabs_query_sendMessage(){
  chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, function(response){
      if(response.data.length > 0){
        sendServiceRequest(tab, response.data);
      }
    });
  });
}

/**
**AJAX NoT USED
**/

function getXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}

/**
**Envoi une requete à l'API avec le tab du navigateur
**
*/

function sendServiceRequest(tab, selectedText) {
	//alert(selectedText);
  //formData = new FormData();
  //formData.append("txt", selectedText);

  var data_array = selectedText;

  myJsonArray = sendServiceResponse(tab, data_array);
  //alert("end : " + JSON.stringify(myJsonArray));
}

function afficherData(tab, text){
	chrome.browserAction.setPopup({
		tabId: tab.id,
	    popup: "popup.html"
	});
	chrome.browserAction.getPopup({
		tabId: tab.id
	}, function(data){
	});

	/*var container = document.createElement('div');
  	container.setAttribute('id',"cdiscount_container");
  	alert(container);
	alert(document.getElementById('cdiscount_container'));*/
}

/**
**
**
**/

function sendServiceResponse(tab, data_array){
  var data;
  var xhr = new XMLHttpRequest();
  //xhr.open("POST", "https://api.cdiscount.com/OpenApi/json/Search", true);
//  xhr.open("POST","http://stabnbuy.cloudapp.net:3000/api/text", true); Ce qu'il y avait avant modif par Théo
  xhr.open("POST", "http://localhost:3000/api/text", true);
  var data_array_string = data_array;
  formData = new FormData();
  formData.append("txt", data_array);
  xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200){
            string=xhr.responseText;
            //alert(string);
            myJsonArray = JSON.parse(string);
            //Envoyer la popup
            chrome.browserAction.setPopup({
                tabId: tab.id,
                popup: "popup.html"
            });
            var myJsonString = JSON.stringify(myJsonArray);
            //Envoyer la réponse du serveur à Setpopup
            chrome.tabs.sendMessage(tab[0].id, {method: "setPopup", content: myJsonString}, function(response) {
                  result_search_container = response.html_content;
            });
            data = JSON.parse(string);
        }
        else{
            string=xhr.responseText;
            if(string && string > ""){
              console.log("error : " + string);
            }
            result_search_container = "<p class='no_answer'>Aucun produit ne correspond à votre sélection.</p>";
        }
  }
  xhr.send(formData);
  return data;
}
//Si récupère le hello de popup.js => Popup ok
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello"){
      sendResponse({
        msg: result_search_container
      });
      chrome.browserAction.setPopup({popup: ""});//Vide la popup pour changer ce qu'il y a dedans si on reclique
    }
});
