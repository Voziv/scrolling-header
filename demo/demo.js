(function (document, window) {
    var scrollingHeaders = document.getElementsByClassName("scrolling-header");

    var headerItems = [
        "We Are", "French",
        "They are", "English",
        "We like", "Sushi",
        "They like", "Crumpets"
    ];

    if (scrollingHeaders.length > 0)
    {
        console.log("Initializing Scrolling Header");
        var scrolling_header = new ScrollingHeader(headerItems, scrollingHeaders[0]);
    }
})(document, window);