const slider2 = document.getElementById("slider2");
const thumb2 = document.getElementById("thumb2");
const valueDisplay2 = document.getElementById("lightTX");

const minVal2 = 0;
const maxVal2 = 63;
let isDragging2 = false;
let sliderValue2 = 0;

function updateSlider2(positionX) {
    let rect2 = slider2.getBoundingClientRect();
    let offsetX2 = positionX - rect2.left;
    let sliderWidth2 = rect2.width; // Get actual width

    // Clamp position within bounds
    offsetX2 = Math.max(0, Math.min(offsetX2, sliderWidth2));

    // Convert position to value
    sliderValue2 = Math.round((offsetX2 / sliderWidth2) * (maxVal2 - minVal2));
    valueDisplay2.textContent = sliderValue2; // Display value

    // Move the thumb
    thumb2.style.left = `${(sliderValue2 / maxVal2) * 100}%`;
}

function startDrag2(event) {
    isDragging2 = true;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider2(positionX);

    // Prevent scrolling on touch
    if (event.touches) event.preventDefault();
}

function moveDrag2(event) {
    if (!isDragging2) return;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider2(positionX);

    // Prevent scrolling
    if (event.touches) event.preventDefault();
}

function stopDrag2() {
    isDragging2 = false;
}

// Mouse Events
thumb2.addEventListener("mousedown", startDrag2);
document.addEventListener("mousemove", moveDrag2);
document.addEventListener("mouseup", stopDrag2);

// Touch Events (for mobile)
thumb2.addEventListener("touchstart", startDrag2);
document.addEventListener("touchmove", moveDrag2, { passive: false }); // Prevent scrolling
document.addEventListener("touchend", stopDrag2);

// Allow dragging by touching anywhere on the slider
slider2.addEventListener("touchstart", startDrag2);
slider2.addEventListener("mousedown", startDrag2);

// Example function to get the value
function useSliderValuelight() {
    return sliderValue2;
}
