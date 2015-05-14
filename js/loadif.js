function loadif(selector, href, mq){

	if( !window.matchMedia || matchMedia(mq).matches || typeof(mq) === 'undefined' || mq === false || !matchMedia('(min-width:0px)').matches ){

		var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

		req.open('GET', href);

		req.onreadystatechange = function(){

			if( req.readyState > 3 && req.status == 200 ){

				var elements = document.querySelectorAll(selector);

				for( var i = 0; i < elements.length; i++ ){

					elements[i].innerHTML = req.responseText;

				}

			}

		};

		req.send(null);

    }

}