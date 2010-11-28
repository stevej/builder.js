
var builder = {}

// The ID of the Element you wish to attach structure to.
// ex: <div id="placeholder" />
builder.placeholder = "placeholder"

// Set the placeholder for attaching structure.
builder.root = function f (name) {
    this.placeholder = name;
    return this;
}

// equivalent to ruby's method_missing
builder.__noSuchMethod__ = function f (id, args) {
    var div = document.getElementById(this.placeholder);

    if (!div) {
        alert("no placeholder found to attach innerHTML. please set one using the root() function");
        return this;
    }

    var out = [];
    out.push(div.innerHTML);
    // out.push("&lt;" + id + "&gt;"); // don't mind my debugging junk.
    out.push("<" + id + ">");

    if (args.length > 0 && typeof(args[0]) == "function") {
        args[0](this);
        out.push(div.innerHTML);
    } else {
        out.push(args);
    }

    // out.push("&lt;/" + id + "&gt;"); // don't mind my debugging junk.
    out.push("</" + id + ">");
    div.innerHTML = out.join("");

    return this;
}


var run = function () {
    // Example 1: a bold tag
    builder.root("blinktag").b("hello");

    // Example 2: nested elements with an unordered list
    builder.root("unordered").ul(function(b) { b.li("First").li("Second") } );
}
