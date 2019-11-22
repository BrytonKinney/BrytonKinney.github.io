var wishItem = function (isBought, labelValue) {
    return { bought: isBought, label: labelValue };
};
var wishlistItems = {
    jigSaw: wishItem(false, 'Jig Saw'),
    miterSaw: wishItem(false, 'Miter Saw'),
    redDead: wishItem(false, 'Red Dead Redemption (Computer Version)'),
    tipUps: wishItem(false, 'Tip-Up(s)'),
    socks: wishItem(false, 'Socks'),
    woodChisel: wishItem(false, 'Wood Chisel'),
    clamps: wishItem(false, 'Clamps'),
    woodworkingBench: wishItem(false, 'Woodworking Bench'),
    randomOrbitSander: wishItem(false, 'Random Orbital Sander'),
    cordlessDrill: wishItem(false, 'Cordless Drill'),
    woodworkingCarvingTools: wishItem(false, 'Woodworking Hand Tools (Carving knives, etc.)')
};

// rendering
var container = document.getElementsByClassName('form-container')[0];
document.addEventListener('readystatechange', function (el) {
    var htmlString = '';
    for (var wish in wishlistItems) {
        if (wishlistItems.hasOwnProperty(wish)) {
            htmlString +=
                "<div class='form'>" +
                    "<input name='" + wish + "' type='checkbox' id='" + wish + "' />" +
                    "<label for='" + wish + "'>" + wishlistItems[wish].label + "</label>" +
                "</div>";
        }
    }
    container.innerHTML = htmlString;
    container.dispatchEvent(new CustomEvent('checkboxesLoaded'));
});

container.addEventListener('checkboxesLoaded', function (el) {
    var checkboxes = document.getElementsByClassName('form');
    for (var checkbox in checkboxes) {
        if (checkboxes.hasOwnProperty(checkbox)) {
            checkboxes[checkbox].addEventListener('click', function (e) {
                e.target.childNodes[0].checked = !e.target.childNodes[0].checked;
            });
        }
    }
});