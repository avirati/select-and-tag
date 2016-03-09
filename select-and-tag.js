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
		tagList,
		tagElement,
		sentenceIndex = 0


	var sanitizeOptions = function (_options) {
		//Add Fallbacks
		_options = _options || {};
		_options.onSelect = _options.onSelect || function (selectedText) {
					console.log(selectedText);
				};
		_options.onTag = _options.onTag || function (selectedText, tag) {
					console.log(selectedText, tag);
				};
		_options.tags = _options.tags || [];
		_options.sentences = _options.sentences || [];
		_options.submitBtn = document.querySelector(_options.submitBtn);
	}

	var updateSentence = function () {
		sentenceIndex++;
		if(sentenceIndex >= options.sentences.length) {
			element.innerHTML = 'You have reached the end :)';
			return;
		}

		for ( i = 0, iL = elements.length; i < iL; i++) {
			element = elements[i];

			element.innerHTML = options.sentences[sentenceIndex];
		}
	}

	var attachSubmitEvent = function () {
		options.submitBtn.addEventListener('click', updateSentence);
	}

	var setupTagList = function () {
		tagList = document.querySelector('tagList');

		if(tagList === null) {
			tagList = document.createElement('div');
			tagList.className = ['tag-list'];

			options.tags.forEach(function (tag) {
				tagElement = document.createElement('span');
				tagElement.innerHTML = tag;
				tagElement.addEventListener('click', function () {
					options.onTag.call(null, selectedText, tag);
					tagList.style.display = 'none';
				})
				tagList.appendChild(tagElement);
			})

			document.body.appendChild(tagList);
		}
	};

	var setupSentences = function () {
		//Get all elements with attribute name 'select-and-tag'
		elements = document.querySelectorAll('[' + ATTR_NAME + ']');

		//For each element, add a onmouseup event
		for ( i = 0, iL = elements.length; i < iL; i++) {
			element = elements[i];

			element.innerHTML = options.sentences[sentenceIndex];

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

	function init () {
		sanitizeOptions(options);
		setupSentences();
		attachSubmitEvent();
		setupTagList();
	}

	init();
}