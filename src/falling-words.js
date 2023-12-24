(function() {

    // Name of the class we add to words once they have been hovered.
    // This makes them "disappear" from the page, while still filling up space.
    const HOVERED_CLASS_NAME = "hovered";

    // Get thext from the <script id="source-text"> tag
    const rawText = document.getElementById("source-text").textContent;
    const textContainer = document.getElementById("text");

    // Render the "plain" text obtained earlier into the appropriate markup for the animation.
    // Each line becomes a paragraph, and each word is wrapped in a <span class="word">.
    renderTextMarkup(rawText, textContainer);

    // Attach event handlers to each <span class="word"> tag
    textContainer.querySelectorAll(".word").forEach(word => {

	// On mouse hover, hide the word and create a falling "clone"
	word.addEventListener("mouseenter", event => {
	    let el = event.target;

	    if (el.classList.contains(HOVERED_CLASS_NAME)) {
		// We already processed this word, nothing to do here
		return;
	    }

	    // Mark the word as "hovered"
	    el.classList.add(HOVERED_CLASS_NAME);

	    // Create a falling clone of the word
	    makeFallingClone(el);
	});

	// Handle clicks on the word.
	// You can do various stuff, but in this example:
	// - A plain click restores the word to its original state
	// - Ctrl+click creates another falling clone of the word
	word.addEventListener("click", event => {
	    let el = event.target;
	    console.log("Click", event.ctrlKey);

	    if (event.ctrlKey) {
		makeFallingClone(el);
	    }
	    else {
		el.classList.remove(HOVERED_CLASS_NAME);
	    }

	});
    });

})();


function randomNumber(min, max) {
    // Generate a random number within range
    return min + (Math.random() * (max - min));
}


function randomAnimationDuration(min, max) {
    // Generate a random number in seconds
    return `${randomNumber(min, max)}s`;
}


function makeFallingClone(element) {
    let rect = element.getBoundingClientRect();
    let text = element.innerText;
    let { top, left } = rect;

    let newElement = document.createElement("span");
    newElement.classList.add("falling");
    newElement.style.top = top;
    newElement.style.left = left;
    newElement.style.animationDuration = randomAnimationDuration(2, 10);

    let wordElem = document.createElement("span");
    wordElem.classList.add("spinning");
    wordElem.innerText = text;
    wordElem.style.animationDuration = randomAnimationDuration(2, 10);
    newElement.append(wordElem);

    newElement.addEventListener("animationend", event => {

	// When the animation ends (and the element is outside the
	// page), destroy the element.
	if (event.animationName === "fallingWord") {
	    document.body.removeChild(newElement);
	}

    });

    document.body.append(newElement);
}


function splitText(text) {
    return text
    // Split each line of text
	.split(/\n/)
    // Remove white space at the beginning / end of each line,
    // then split each line into words.
	.map(para => para.trim(/\s+/).split(/\s+/))
    // Remove empty lines
	.filter(para => para.length > 0);
}


function renderTextMarkup(text, container) {
    let paras = splitText(text);
    paras.forEach(para => {
	let pEl = document.createElement("p");
	para.forEach(word => {
	    let wEl = document.createElement("span");
	    wEl.classList.add("word")
	    wEl.textContent = word;
	    pEl.append(wEl);
	    pEl.append(" ");
	});
	container.append(pEl);
    });
}
