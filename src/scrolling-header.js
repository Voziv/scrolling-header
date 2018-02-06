function ScrollingHeader(items, element)
{
    var ScrollingHeaderInstance = this;

    this.speed          = 2000;
    this.lineCount      = 2;
    this.items          = items;
    this.itemCount      = items.length;
    this.element        = element;
    this.lines          = [];

    // Validate input
    if (this.items.length < this.lineCount)
        throw "You must have at least two items.";

    if (this.items.length % this.lineCount)
        throw "Your items should be a multiple of 2";


    // Prune child elements
    while (this.element.firstChild)
    {
        this.element.removeChild(this.element.firstChild);
    }

    ScrollingHeaderInstance.currentLine = 0;
    for (var i = 0; i < ScrollingHeaderInstance.lineCount; i++)
    {
        ScrollingHeaderInstance.currentLine++;

        var newElement       = document.createElement('div');
        newElement.className = 'scrolling-header__item scrolling-header__item';

        var newText   = ScrollingHeaderInstance.items[ScrollingHeaderInstance.currentLine - 1];
        var line = new ScrollingHeaderItem(newElement, newText);

        ScrollingHeaderInstance.element.appendChild(newElement);
        ScrollingHeaderInstance.lines.push(line);

    }

    function resetText()
    {
        ScrollingHeaderInstance.currentLine = 0;
        for (var i = 0; i < ScrollingHeaderInstance.lineCount; i++)
        {
            ScrollingHeaderInstance.currentLine++;
            var newText   = ScrollingHeaderInstance.items[ScrollingHeaderInstance.currentLine - 1];
            var lineIndex = ScrollingHeaderInstance.currentLine % 2 === 0 ? 1 : 0;
            ScrollingHeaderInstance.lines[lineIndex].changeText(newText);
        }
    }

    function changeLines()
    {
        ScrollingHeaderInstance.currentLine++;
        if (ScrollingHeaderInstance.currentLine > ScrollingHeaderInstance.itemCount)
        {
            resetText();
        }

        var lineIndex = ScrollingHeaderInstance.currentLine % 2 === 0 ? 1 : 0;
        var newText   = ScrollingHeaderInstance.items[ScrollingHeaderInstance.currentLine - 1];
        ScrollingHeaderInstance.lines[lineIndex].changeText(newText);

        setTimeout(changeLines, ScrollingHeaderInstance.speed);
    }

    setTimeout(changeLines, ScrollingHeaderInstance.speed)
}

ScrollingHeader.prototype.getTextForLine = function (sentenceNumber, lineNumber) {
    var itemIndex = (sentenceNumber * this.lineCount) + (lineNumber % this.lineCount);
    return this.items[itemIndex];
};

function ScrollingHeaderItem(element, initialText)
{
    this.container = element;

    this.activeElement             = document.createElement('div');
    this.activeElement.className   = 'scrolling-header__item__text';
    this.activeElement.textContent = initialText;

    this.inactiveElement             = document.createElement('div');
    this.inactiveElement.className   = 'scrolling-header__item__text scrolling-header__item__text--hidden';
    this.inactiveElement.textContent = 'Inactive Item';

    this.container.appendChild(this.activeElement);
    this.container.appendChild(this.inactiveElement);
}

ScrollingHeaderItem.prototype.changeText = function (newText) {
    var inactiveElement = this.inactiveElement;
    var activeElement   = this.activeElement;

    inactiveElement.classList.remove('scrolling-header__item__text--hidden');
    inactiveElement.classList.remove('scrolling-header__item__text--hiding');
    inactiveElement.classList.add('scrolling-header__item__text--active');
    inactiveElement.textContent = newText;

    activeElement.classList.remove('scrolling-header__item__text--active');
    activeElement.classList.add('scrolling-header__item__text--hiding');

    this.activeElement   = inactiveElement;
    this.inactiveElement = activeElement

};