(function (document, window) {
    var scrollingHeaders = document.getElementsByClassName("scrolling-header");

    var headerItems = [
        "We made", "a scrolling library",
        "We used", "CSS3 animations"
    ];

    if (scrollingHeaders.length > 0)
    {
        console.log("Initializing Scrolling Header");
        var scrolling_header = new ScrollingHeader(headerItems, scrollingHeaders[0]);
    }
})(document, window);