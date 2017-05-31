// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
document.addEventListener('DOMContentLoaded', function(tabId, changeInfo, tab) {
	hello();
	//chrome.browserAction.setPopup({popup: ""});
});

/**
**Charge le listing des produits en html et les balance dans popup.html
**
**/

function hello() {
  chrome.runtime.sendMessage({
      greeting: "hello"
    },
    function(response) {
    	var message = response.msg;
		document.getElementById("container").innerHTML = message;
  });
  //document.removeEventListener("DOMContentLoaded", function(){});
}
