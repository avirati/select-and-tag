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
		options,
		tagList,
		tagElement;

	//Add Fallbacks
	options = options || {};
	options.onSelect = options.onSelect || function (selectedText) {
		console.log(selectedText);
	};
	options.onTag = options.onTag || function (selectedText, tag) {
		console.log(selectedText, tag);
	};
	options.tags = options.tags || [];

	//Get all elements with attribute name 'select-and-tag'
	elements = document.querySelectorAll('[' + ATTR_NAME + ']');

	tagList = document.querySelector('tagList');

	if(tagList === null) {
		tagList = document.createElement('div');
		tagList.className = ['tag-list'];

		options.tags.forEach(function (tag) {
			tagElement = document.createElement('span');
			tagElement.innerHTML = tag;
			tagElement.addEventListener('click', function () {
				options.onTag.call(null, selectedText, tag)
			})
			tagList.appendChild(tagElement);
		})

		document.body.appendChild(tagList);
	}

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

				//show the tag list
				tagList.style.display = 'block';
				tagList.style.top = event.clientY + 30 + 'px';
				tagList.style.left = event.clientX - 100 + 'px';
			}
			else {
				//hide the tag list
				tagList.style.display = 'none';
			}
		}
	}
}