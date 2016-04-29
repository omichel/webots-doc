if (typeof String.prototype.startsWith != "function")
    String.prototype.startsWith = function (prefix) {
        return this.slice(0, prefix.length) == prefix;
    };

if (typeof String.prototype.endsWith !== "function")
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

var local = location.href.indexOf('://www.cyberbotics.com/doc') == -1;

function setupUrlOnline(url) {
  setup.book = "";
  setup.page = "";
  setup.anchor = "";
  setup.tag = "";
  setup.branch = "";

  var m = url.match(new RegExp("/([^/]+)/([^/\\?#]+)([^/]*)$"));
  if (m) {
    setup.book = m[1];
    setup.page = m[2];
    var arguments = m[3];

    m = url.match(/version=([^&#]*)/);
    if (m) {
      var version = m[1];
      if (version.match(/^\d+\.\d*(.)+$/))
        setup.tag = version;
      else
        setup.branch = version;
    }

    m = arguments.match(/#([^&#]*)/);
    if (m)
      setup.anchor = m[1];
    else
      setup.anchor = "";
  }
}

function setupUrlLocal(url) {
    setup.tag = '';

    var m;

    m = url.match(/page=([^&#]*)/);
    if (m)
      setup.page = m[1].replace(/.md$/, "");
    else
      setup.page = "";

    m = url.match(/book=([^&#]*)/);
    if (m)
      setup.book = m[1];
    else
      setup.book = "";

    m = url.match(/#([^&#]*)/);
    if (m)
      setup.anchor = m[1];
    else
      setup.anchor = "";
}

function setupUrl(url) {
    if (local)
        setupUrlLocal(url);
    else
        setupUrlOnline(url);
    console.log("book="+setup.book+" page="+setup.page+" branch="+setup.branch+" tag="+setup.tag+" anchor="+setup.anchor);
}

function computeTargetPath() {
    var targetPath = "";
    if (setup.branch)
      branch = setup.branch;
    else
      branch = 'master';
    if (setup.url.startsWith("http"))
        targetPath = setup.url + branch + "/";
    targetPath += setup.book + "/";
    return targetPath;
}

function redirectUrls(node) {
    // redirect a's href
    var as = node.getElementsByTagName("a");
    var targetPath = computeTargetPath();
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        var href = a.getAttribute("href");
        if (!href)
            continue;
        if (href.startsWith("http")) // open external links in a new window
            a.setAttribute("target", "_blank");
        else if (href.endsWith(".md") || href.indexOf(".md#") > -1) {
            addDynamicLoadEvent(a);
            var match = /^([\w-]+).md(#[\w-]+)?$/.exec(href);
            if (match && match.length >= 2) {
                var newPage = match[1];
                var anchor = match[2];
                if (anchor)
                  anchor = anchor.substring(1); // remove the '#' character
                a.setAttribute("href", forgeUrl(newPage, anchor));
            }
        }
    }
}

function forgeUrl(page, anchor) {
  var anchorString = (anchor && anchor.length > 0) ? ("#" + anchor) : "";
  var currentUrl = location.href;
  var newUrl = currentUrl;
  if (!local) {
    newUrl = "https://www.cyberbotics.com/doc/" + setup.book + "/" + page;
    if (setup.tag!='')
      newUrl += "?version=" + setup.tag;
    else if (setup.branch!='')
      newUrl += "?version=" + setup.branch;
    newUrl += anchorString;
  } else {
      if (currentUrl.indexOf("page=") > -1)
          newUrl = currentUrl.replace(/page=([\w-]+)(#[\w-]+)?/, "page=" + page + anchorString);
      else
          newUrl = currentUrl + "&page=" + page + anchorString;
  }
  return newUrl;
}

function addDynamicLoadEvent(el) {
    if (el.classList.contains("dynamicLoad"))
        return;
    el.addEventListener("click",
        function (event) {
            aClick(event.target);
            event.preventDefault();
        },
        false
    );
    el.classList.add("dynamicLoad");
}

function aClick(el) {
    setupUrl(el.getAttribute('href'))
    getMDFile();
    updateBrowserUrl();
}

function redirectImages(node) {
    // redirect img's src
    var imgs = node.getElementsByTagName("img");
    var targetPath = computeTargetPath();
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var src = img.getAttribute("src");
        var match = /^(\w*)\/([\w-\.]*)$/.exec(src);
        if (match && match.length == 3)
            img.setAttribute("src", targetPath + match[1] + "/" + match[2]);
    }
}

function applyAnchor() {
    var anchors = document.getElementsByName(setup.anchor);
    if (anchors.length > 0)
        anchors[0].scrollIntoView(true);
}

function applyToTitleDiv() {
  var titleContentElement = document.getElementById("title-content");
  if (titleContentElement) {
    var newTitle;
    if (setup.book == "guide")
      newTitle = "Webots User Guide";
    else if (setup.book == "reference")
      newTitle = "Webots Reference Manual";
    else if (setup.book == "automobile")
      newTitle = "Webots for automobiles";
    else if (setup.book == "darwin-op")
      newTitle = "Webots for DARwIn-OP";
    else
      newTitle = "";
    if (newTitle.length > 0) {
      newTitle += " <div class='release-tag'>" + getWebotsVersion() + "</div>";
      titleContentElement.innerHTML = newTitle;
    }
  }
}

function getWebotsVersion() {
  // Get the Webots version from the showdown wbVariables extension
  var version = "{{ webots.version.major }}.{{ webots.version.minor }}.{{ webots.version.bugfix }}";
  var converter = new showdown.Converter({extensions: ["wbVariables"]});
  var html = converter.makeHtml(version);
  var tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function applyToPageTitle(mdContent) {
    var hashtagIndex = mdContent.indexOf("#");
    if (hashtagIndex >= 0) {
        while (hashtagIndex + 1 < mdContent.length && mdContent[hashtagIndex + 1] == "#") {
            hashtagIndex += 1;
        }
        var hashtagCarriageReturn = mdContent.indexOf("\n", hashtagIndex);
        if (hashtagCarriageReturn >= 0) {
            var title = mdContent.substring(hashtagIndex + 1, hashtagCarriageReturn).trim();
            document.title = "Webots documentation: " + title;
        }
    }
}

function populateViewDiv(mdContent) {
    var view = document.getElementById("view");
    while (view.firstChild)
        view.removeChild(view.firstChild);

    // console.log("Raw MD content:\n\n");
    // console.log(mdContent);

    applyToPageTitle(mdContent);

    // markdown to html
    var converter = new showdown.Converter({tables: "True", extensions: ["wbVariables", "wbAPI", "wbFigure", "wbAnchors"]});
    var html = converter.makeHtml(mdContent);

    // console.log("HTML content: \n\n")
    // console.log(html);

    view.innerHTML = html;

    redirectImages(view);
    redirectUrls(view);

    applyAnchor();

    applyAnchorIcons(view);
    highlightCode(view);

    updateSelection();
}

// replace the browser URL after a dynamic load
function updateBrowserUrl() {
    var url = forgeUrl(setup.page, setup.anchor)
    if (history.pushState)
        try {
            history.pushState({state:'new'}, null, url);
        } catch (err) {
        }
}

// Make in order that the back button is working correctly
window.onpopstate = function(event) {
    setupUrl(document.location.href);
    getMDFile();
};

function highlightCode(view) {
    var supportedLanguages = ['c', 'c++', 'java', 'python', 'matlab', 'bash', 'makefile', 'lua', 'xml'];

    for (var i = 0; i < supportedLanguages.length; i++) {
        var language = supportedLanguages[i];
        hljs.configure({languages: [ language ]});
        var codes = document.getElementsByClassName('language-' + language);
        for (var j = 0; j < codes.length; j++) {
            var code = codes[j];
            hljs.highlightBlock(code);
        }
    }
}

function applyAnchorIcons(view) {
    var elements = [];
    var tags = ["figcaption", "h1", "h2", "h3", "h4", "h5", "h6"];
    for (var i = 0; i < tags.length; i++) {
        var array = Array.prototype.slice.call(view.getElementsByTagName(tags[i]));
        elements = elements.concat(array);
    }
    for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var icon, id;
        var name = null;
        if (el.parentNode && el.tagName.toLowerCase() == "figcaption" && el.parentNode.tagName.toLowerCase() == "figure")
            name = el.parentNode.getAttribute("name");
        else
            name = el.getAttribute("name");
        if (name) {
            el.classList.add("anchor-header");
            var span = document.createElement("span");
            span.classList.add("anchor-link-image");
            var a = document.createElement("a");
            a.setAttribute("href", "#" + name);
            a.classList.add("anchor-link");
            a.appendChild(span);
            el.insertBefore(a, el.firstChild);
        }
    }
}

function receiveMenuContent(menuContent) {
    // console.log("Menu content:\n\n");
    // console.log(menuContent);

    var menu = null;

    var converter = new showdown.Converter();
    var html = converter.makeHtml(menuContent);
    var div = document.createElement("div");
    div.innerHTML = html;

    for (var i = 0; i < div.childNodes.length; i++) {
        var child = div.childNodes[i];
        if (child && child.tagName && child.tagName.length > 0 && child.tagName.toLowerCase() == "ul") {
            menu = child;
            break;
        }
    }

    if (!menu) {
        console.error("Cannot extract Menu.");
        return;
    }

    populateMenu(menu);
    redirectUrls(menu);
    updateSelection();
}

function updateMenuScrollbar() {
    var e = document.documentElement;
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    var p = e.scrollHeight - t - e.clientHeight;
    if (p < 244) // 244 is the height in pixels of the footer of Cyberbotics web page
        document.getElementById("left").style.height = (e.clientHeight - 290 + p) + "px";
    else // 46 is the height in pixels of the header of Cyberbotics web page (46 + 244 = 290)
        document.getElementById("left").style.height = "calc(100% - 46px)";
}

function updateSelection() {
    var selected = changeMenuSelection();
    populateNavigation(selected);
    if (!local)
        updateMenuScrollbar();
}

function getSelected() {
    var menu = document.getElementById("menu");
    var selecteds = menu.getElementsByClassName("selected");
    if (selecteds.length > 0)
        return selecteds[selecteds.length - 1];
    return null;
}

function changeMenuSelection() {
    var menu = document.getElementById("menu");
    var selecteds = [].slice.call(menu.getElementsByClassName("selected"));
    for (var i = 0; i < selecteds.length; i++) {
        var selected = selecteds[i];
        selected.classList.remove("selected");
    }
    var as = menu.getElementsByTagName("a");
    for (var i = 0; i < as.length; i++) {
        var a = as[i];
        var href = a.getAttribute("href");
        var selection;
        if (local) {
          if (href.indexOf("page=" + setup.page) > -1)
              selection = true;
          else
              selection = false;
        } else {
          var n = href.indexOf('?');
          if (n > -1)
              href = href.substring(0, n)
          n = href.indexOf('#');
          if (n > -1)
              href = href.substring(0, n)
          if (href.endsWith("/doc/" + setup.book + "/" + setup.page))
              selection = true;
          else
              selection = false;
        }
        if (selection) {
            var selected = a.parentNode;
            selected.classList.add("selected");
            if (selected.parentNode.parentNode.tagName.toLowerCase() == "li") {
                selected.parentNode.parentNode.classList.add("selected");
                var firstChild = selected.parentNode.parentNode.firstChild;
                if (firstChild.tagName.toLowerCase() == 'a')
                    showAccodionItem(firstChild);
            } else
                showAccodionItem(a);
            return selected;
        }
    }
}

function populateNavigation(selected) {
    var next = document.getElementById("next");
    var previous = document.getElementById("previous");
    var up = document.getElementById("up");
    var toc = document.getElementById("toc");

    toc.setAttribute("href", forgeUrl("menu"));
    addDynamicLoadEvent(toc);

    if (!selected) {
        next.classList.add("disabled");
        previous.classList.add("disabled");
        up.classList.add("disabled");
        return;
    }

    if (next) {
        var nextElement = null;

        var nextLiSibling = selected.nextSibling;
        while (nextLiSibling) {
            if (nextLiSibling.tagName && nextLiSibling.tagName.toLowerCase() == "li")
                break;
            nextLiSibling = nextLiSibling.nextSibling;
        }
        if (nextLiSibling) {
            var as = nextLiSibling.getElementsByTagName("a");
            if (as.length > 0)
                nextElement = as[0];
        }

        if (nextElement) {
            next.classList.remove("disabled");
            next.setAttribute("href", nextElement.getAttribute("href"));
            addDynamicLoadEvent(next);
        } else
            next.classList.add("disabled");
    }

    if (previous) {
        var previousElement = null;

        var previousLiSibling = selected.previousSibling;
        while (previousLiSibling) {
            if (previousLiSibling.tagName && previousLiSibling.tagName.toLowerCase() == "li")
                break;
            previousLiSibling = previousLiSibling.previousSibling;
        }
        if (previousLiSibling) {
            var as = previousLiSibling.getElementsByTagName("a");
            if (as.length > 0)
                previousElement = as[0];
        }

        if (previousElement) {
            previous.classList.remove("disabled");
            previous.setAttribute("href", previousElement.getAttribute("href"));
            addDynamicLoadEvent(previous);
        } else
            previous.classList.add("disabled");
    }

    if (up) {
        var upElement = null;
        var parentLi = null;
        if (selected.parentNode.parentNode.tagName.toLowerCase() == "li")
            parentLi = selected.parentNode.parentNode;
        if (parentLi) {
            var as = parentLi.getElementsByTagName("a");
            if (as.length > 0)
                upElement = as[0];
        }

        if (upElement) {
            up.classList.remove("disabled");
            up.setAttribute("href", upElement.getAttribute("href"));
            addDynamicLoadEvent(up);
        } else {
            up.setAttribute("href", forgeUrl(setup.book)); // FIXME: should be 'index' page
            addDynamicLoadEvent(up);
            up.classList.remove("disabled");
        }
    }
}

function populateMenu(menu) {
    // make in order that the <li> tags above the <a> are also clickable
    var lis = menu.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        li.addEventListener("click",
            function (event) {
                var as = event.target.getElementsByTagName("a");
                if (as.length > 0)
                    aClick(as[0]);
            }
        );
    }

    var menuDiv = document.getElementById("menu");
    menuDiv.appendChild(menu);

    menu.setAttribute("id", "accordion");
    $('#accordion > li > a').click(function() {
        showAccodionItem(this);
    });
}

function showAccodionItem(item) {
    if (! $(item).hasClass('active')) {
        $('#accordion li ul').slideUp();
        $(item).next().slideToggle();
        $('#accordion li a').removeClass('active');
        $(item).addClass('active');
    }
}

function getMDFile() {
    var target = computeTargetPath() + setup.page + '.md';
    console.log("Get MD file: " + target);
    $.ajax({
        type: "GET",
        url: target,
        dataType: "text",
        success: populateViewDiv,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
            var mainPage = setup.book; // FIXME: should 'index'
            // get the main page instead
            if (setup.page != mainPage) {
                setup.page = mainPage;
                getMDFile();
            }
        }
    });
}

function getMenuFile() {
    var target = computeTargetPath() + "menu.md";
    console.log("Get menu file: " + target);
    $.ajax({
        type: "GET",
        url: target,
        dataType: "text",
        success: receiveMenuContent,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}

function extractAnchor() {
    var currentUrl = location.href;
    var match = /#([\w-]+)/.exec(currentUrl);
    if (match && match.length == 2)
        return match[1];
    return '';
}

window.onscroll=function(){
    if (local)
        return;
    updateMenuScrollbar();
};

document.addEventListener("DOMContentLoaded", function() {
    if (local) {
        var url = "";
        if (location.href.indexOf("url=") > -1)
            url = getGETQueryValue("url", "https://raw.githubusercontent.com/omichel/webots-doc/master/");
        setup = {
            "book":   getGETQueryValue("book", "guide"),
            "page":   getGETQueryValue("page", "guide"),
            "anchor": extractAnchor(),
            "branch": getGETQueryValue("branch", "master"),
            "url":    url
        }
        console.log("Setup: " + JSON.stringify(setup));
    }
    applyToTitleDiv();
    getMDFile();
    getMenuFile();
});