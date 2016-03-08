(function () {
	var ATTR_NAME = 'data-select-and-tag';
	var elements = document.querySelectorAll('[' + ATTR_NAME + ']');

	for(var i = 0, iL = elements.length; i < iL; i++) {
		var element = elements[i];
		element.onmouseup = function (event) {
			var selection = window.getSelection();
			var text = selection.anchorNode.data;
			var start = selection.anchorOffset;
			var end = selection.focusOffset;

			if(start !== end) {
				var selectedText = text.substring(start, end);
				element.setAttribute(ATTR_NAME, selectedText);
			}
		}
	}
})()