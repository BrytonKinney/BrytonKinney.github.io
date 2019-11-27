var createElement = function (el, props) {
    var createdElement = document.createElement(el);
    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            createdElement[prop] = props[prop];
        }
    }
    return createdElement;
};
var createForm = function (key, wish) {
    var form = createElement("div", {
        className: "form-group"
    });
    var check = createElement("input", {
        name: key,
        id: key,
        type: "checkbox"
    });
    var icon = createElement("i", {
        className: "form-icon"
    });
    var label = createElement("label", {
        className: "form-switch input-lg",
        htmlFor: key
    });
    var labelText = document.createTextNode(wish[key].name);
    form.appendChild(label);
    label.appendChild(check);
    label.appendChild(icon);
    label.appendChild(labelText);
    return form;
};

var tabs = document.getElementsByClassName('tab-item');
var tabContent = document.getElementsByClassName('tab-content');

var removeClass = function (el, classes) {
    el.className = el.className.slice(0, el.className.length - classes.length);
}
var addClass = function (el, classes) {
    el.className += " " + classes;
}

for (var tab in tabs) {
    if (tabs.hasOwnProperty(tab)) {
        tabs[tab].addEventListener('click', function (ev) {
            var selectedTabContent = document.querySelector('#' + this.attributes['tab-for'].value);
            var activeTabItem = document.querySelector('li.active');
            removeClass(activeTabItem, 'active');
            addClass(this, 'active');
            for (var tc in tabContent) {
                if (tabContent.hasOwnProperty(tc))
                    tabContent[tc].hidden = true;
            }
            selectedTabContent.hidden = false;
            ev.stopImmediatePropagation();
        });
    }
}

var hasSentRequest = false;
var container = document.getElementsByClassName('card-body')[0];
container.className = container.className + " loading loading-lg";
var ajaxWishlist = new XMLHttpRequest();
ajaxWishlist.onload = function () {
    if (this.status === 200) {
        var wishlistItems = JSON.parse(this.responseText);
        for (var wish in wishlistItems) {
            if (wishlistItems.hasOwnProperty(wish)) {
                container.appendChild(createForm(wish, wishlistItems));
            }
        }
        container.dispatchEvent(new CustomEvent('checkboxesLoaded'));
    }
};
// rendering
document.addEventListener('readystatechange', function (el) {
    if (!hasSentRequest) {
        ajaxWishlist.open("GET", "http://wishlist-api-dev.us-east-1.elasticbeanstalk.com/wishlist");
       //ajaxWishlist.open("GET", "https://localhost:44376/wishlist");
        //ajaxWishlist.setRequestHeader('Content-Type', 'application/json');
        ajaxWishlist.setRequestHeader('Access-Control-Allow-Origin', 'file:///C:/Users/Student/source/repos/BrytonKinney/BrytonKinney.github.io/index.html');
        ajaxWishlist.send();
        hasSentRequest = true;
    }
});

container.addEventListener('checkboxesLoaded', function (el) {
    container.className = container.className.slice(0, container.className.length - ' loading loading-lg'.length);
    var checkboxes = document.getElementsByClassName('form');
    for (var checkbox in checkboxes) {
        if (checkboxes.hasOwnProperty(checkbox)) {
            checkboxes[checkbox].addEventListener('click', function (e) {
                this.childNodes[0].checked = !this.childNodes[0].checked;
                e.stopImmediatePropagation();
            });
        }
    }
});