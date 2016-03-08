'use strict';

/**
 * @author Avinash Verma < avinashverma.it@gmail.com >
 *
 * This simple utility lets you retrieve the selected text from an HTML element.
 *
 * @example <div select-and-tag>Some content<div>
 */


function SelectAndTag (options) {
	var ATTR_NAME = 'select-and-tag';

	var elements,
		element,
		selection,
		text,
		start,
		end,
		selectedText,
		i,
		iL,
		options;

	options = options || {};
	options.onSelect = options.onSelect || function (selectedText) {
		console.log(selectedText);
	}
	//Get all elements with attribute name 'select-and-tag'
	elements = document.querySelectorAll('[' + ATTR_NAME + ']');

	//For each element, add a onmouseup event
	for ( i = 0, iL = elements.length; i < iL; i++) {
		element = elements[i];

		element.onmouseup = function (event) {
			//Get the selection Object
			selection = window.getSelection();

			//Get the complete text
			text = selection.anchorNode.data;

			//Get the start index
			start = selection.anchorOffset;

			//Get the end index
			end = selection.focusOffset;

			//Get the Selected Text
			selectedText = text.substring(start, end).trim();

			//Check if selection is invalid or if it contains just blank spaces
			if (start !== end && selectedText.length > 0) {

				//Set the attribute value
				element.setAttribute(ATTR_NAME, selectedText);
				options.onSelect.call(null, selectedText);
			}
		}
	}
}