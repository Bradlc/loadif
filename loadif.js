!(function(window){

	window.loadif = function(selector, href, mq){

		if(
			!window.matchMedia || // browser doesn't support matchMedia
			matchMedia(mq).matches || // media query matches
			typeof(mq) === 'undefined' || // media query property omitted
			mq === false || // media query property explicitly set to false
			!matchMedia('(min-width:0px)').matches // needed to work with matchMedia polyfill
		){

			var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

			req.open('GET', href);

			req.onreadystatechange = function(){

				if( req.readyState > 3 && req.status == 200 ){

					var elements = [];

					if( typeof selector === 'string' ){

						elements = document.querySelectorAll(selector);

					} else if( selector.tagName ){

						elements.push( selector );

					} else {

						elements = selector;

					}

					for( var i = 0; i < elements.length; i++ ){

						elements[i].innerHTML = req.responseText;

					}

				}

			};

			req.send(null);

	    }

	}

	/**
	 * Search the document for elements with a data-load attribute
	 */

	var elements = document.querySelectorAll('[data-load*=" if "]');

	if(elements.length){

		for( var i = 0; i < elements.length; i++ ){

			var element = elements[i],
				vars = element.getAttribute('data-load').split(' if '),
				href = vars[0],
				mq = vars[1];

			loadif( element, href, mq );

		}

	}

}(window));