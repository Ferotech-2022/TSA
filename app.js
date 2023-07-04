function resizeImageTo20pxWidth(imageSrc, callback) {
    // Create a new image element
    const img = new Image();

    // Set the source URL of the image
    img.src = imageSrc;

    // When the image has finished loading
    img.onload = function () {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate the new height based on the desired width
        const aspectRatio = img.width / img.height;
        const newHeight = 10 / aspectRatio;

        // Set the canvas dimensions
        canvas.width = 10;
        canvas.height = newHeight;

        // Draw the image onto the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, 20, newHeight);

        // Get the resized image as a Data URL
        const resizedImageDataURL = canvas.toDataURL();

        // Invoke the callback with the resized image Data URL
        callback(resizedImageDataURL);
    };
}
var getLazyImage = (img) => {
    const imageSrc = img.getAttribute("data-src");
    if (imageSrc) {
        resizeImageTo20pxWidth(imageSrc, function (resizedImageDataURL) {
            img.src = resizedImageDataURL;
            // console.log(resizedImageDataURL);
            // Use the resizedImageDataURL as needed (e.g., assign to an <img> src attribute)
        });
    }
}
let ssjsImages = document.querySelectorAll("img");
ssjsImages.forEach(imageElement => {
    getLazyImage(imageElement)
});

window.onload = () => {

    // Hide Loader
    let loader=document.getElementById("Loader");
    if (loader) {
        loader.style.display="none";
    }

    // Function to check if the image is visible and update the src attribute
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkImageVisibilityAndLoad() {
        let ssjsImages = document.querySelectorAll("img");
        ssjsImages.forEach(imageElement => {
            let dataSrc = imageElement.getAttribute("data-src");
            if (dataSrc) {
                if (isElementInViewport(imageElement)) {
                    // Add your new URL here
                    const newImageUrl = imageElement.getAttribute("data-src");

                    // Update the src attribute with the new URL
                    imageElement.src = newImageUrl;

                    // Remove the scroll event listener after the image is loaded
                    window.removeEventListener('scroll', checkImageVisibilityAndLoad);
                }
            }
        });
    }
    checkImageVisibilityAndLoad()
    setTimeout(() => {
        checkImageVisibilityAndLoad()
        setTimeout(() => {
            checkImageVisibilityAndLoad()
            setTimeout(() => {
                checkImageVisibilityAndLoad()
            }, 1000);
        }, 100);
    }, 10);
    // Add the scroll event listener to check the image visibility
    window.addEventListener('scroll', () => {
        checkImageVisibilityAndLoad()
    });


    // Prevent Context Menue
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });

    const navLinks = document.querySelectorAll('nav ul li a');

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function (event) {
            event.preventDefault();

            const targetSectionId = navLinks[i].getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                scrollToSection(targetSection);
            }
        });
    }

    function scrollToSection(section) {
        const targetPosition = section.offsetTop;
        const currentPosition = window.pageYOffset;
        const distance = targetPosition - currentPosition;
        const duration = 1000; // Animation duration in milliseconds
        const increments = 20; // Number of increments for smooth scrolling animation

        let currentTime = 0;

        function animateScroll() {
            currentTime += increments;
            const newPosition = easeInOut(currentTime, currentPosition, distance, duration);
            window.scrollTo(0, newPosition);

            if (currentTime < duration) {
                setTimeout(animateScroll, increments);
            }
        }

        animateScroll();
    }

    // Easing function for smooth scrolling animation
    function easeInOut(currentTime, start, change, duration) {
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }
};