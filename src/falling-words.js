(function() {

    const HOVERED_CLASS_NAME = "hovered";

    document.querySelectorAll(".word").forEach(
	word => word.addEventListener("mouseenter", event => {
	    let el = event.target;

	    if (el.classList.contains(HOVERED_CLASS_NAME)) {
		// Nothing to do
		return;
	    }

	    // console.log("Hovered", el.innerText, el);
	    el.classList.add(HOVERED_CLASS_NAME);

	    makeFallingClone(el);
	})
    );

})();


function randomNumber(min, max) {
    return min + (Math.random() * (max - min));
}


function randomAnimationDuration(min, max) {
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
	// console.log(event);
	if (event.animationName === "fallingWord") {
	    // We're done -> remove it
	    document.body.removeChild(newElement);
	}
    });
    document.body.append(newElement);
    // console.log("Falling clone", newElement);
}
