var wpm = 200;
var wps = wpm / 60;
var window_size = Math.floor(wps)   // number of words in the window at a time

// create delay function with default wait time of 1 second
function delay(waitTime) {
    return new Promise(resolve => setTimeout(resolve, waitTime));
}

function HighlightWord(word) {
    var span = document.createElement('span');
    span.innerHTML = word;
    span.style = "background-color: yellow;";
    return span;
}

function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
}

async function InitiateHighlightSequence() {

    // content = document.getElementById('article-content');

    content = document.querySelectorAll(`[id="*content"]`);

    console.log(content)

    // get paragraphs from content
    paragraphs = content.getElementsByTagName('p');

    // iterate through paragraphs
    for (var p = 0; p < paragraphs.length; p++) {

        // clean html
        paragraphs[p].innerHTML = removeTags(paragraphs[p].innerHTML);

        var words = paragraphs[p].innerHTML.split(" ");

        // iterate through words in paragraph
        for (var w = 0; w < words.length; w++) {
            if (words[w].length > 0) {

                // iterate through window
                var plain_words = []
                for (var i = w; i < Math.min(w + window_size, words.length); i++) {
                    plain_words.push(words[i]);
                    words[i] = HighlightWord(words[i]).outerHTML;
                }
                paragraphs[p].innerHTML = words.join(" ");

                await delay(1000);

                for (var i = w; i < Math.min(w + window_size, words.length); i++) {
                    words[i] = plain_words.shift()
                }
                paragraphs[p].innerHTML = words.join(" ");
                w = i - 1
            }

        }
    }

}

InitiateHighlightSequence();


// TODOs:
// -- read multiple words at the same time
// -- read at certain speed
// -- parse links, italics, and other formatting
// -- pause the highlight sequence
// -- resume the highlight sequence
// -- start the highlight sequence from a certain point

