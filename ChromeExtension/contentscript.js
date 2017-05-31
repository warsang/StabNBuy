/**
**Sert à balancer le contenu dans popup.hmtl
**
**/
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "getSelection"){
            sendResponse({data: window.getSelection().toString()});
        }else if(request.method == "setPopup"){
            //alert(request.content);
        	var content = JSON.parse(request.content);
        	var text = '';
        	var text_final = '';
        	for (i = 0; i < content.length; i++) {
			    text = "<div class='post'><a target='_blank' href='" + content[i]["url"] + "'><div class='image' style='background-image: url(" + content[i]["image"] + ");'></div></a><div class='text'><p class='titre'><a target='_blank' href='" + content[i]["url"] + "'>" + content[i]["name"] + "</a></p><p class='price'>" + content[i]["price"] + " &euro;</p><p class='see_product'><a target='_blank' href='" + content[i]["url"] + "'>BUY</a></p></div></div>";
			    text_final += text;
			}
      		sendResponse({html_content: text_final});
        }else{
            sendResponse({});
        }

    }
);

// pas bon : end, myJsonString, request.content, result_search_container
