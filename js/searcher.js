/**
 * Created by manze on 2017-05-12.
 */
document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("search-button");
    var field = document.getElementById("search-field");
    var colorData = [
        {
            name: "Red", rgb: "255, 0, 0", hex: "#FF0000", shades: [
            {name: "Light", rgb: "205, 92, 92", hex: "#CD5C5C"},
            {name: "Dark", rgb: "139, 0, 0", hex: "#8B0000"}
        ]
        },
        {
            name: "Green", rgb: "0, 255, 0", hex: "#00FF00", shades: [
            {name: "Light", rgb: "144, 238, 144", hex: "#90EE90"},
            {name: "Dark", rgb: "0, 100, 0", hex: "#006400"}
        ]
        },
        {
            name: "Blue", rgb: "0, 0, 255", hex: "#0000FF", shades: [
            {name: "Light", rgb: "173, 216, 230", hex: "#ADD8E6"},
            {name: "Dark", rgb: "0, 0, 139", hex: "#00008B"}
        ]
        },
        {
            name: "Yellow", rgb: "255, 255, 0", hex: "#FFFF00", shades: [
            {name: "Light", rgb: "255, 255, 224", hex: "#FFFFE0"},
            {name: "Gold", rgb: "255, 215, 0", hex: "#FFD700"}
        ]
        },
        {
            name: "Orange", rgb: "255, 140, 0", hex: "#FF8C00", shades: [
            {name: "Light", rgb: "255, 165, 0", hex: "#FFA500"},
            {name: "Dark", rgb: "255, 128, 0", hex: "#FF8000"}
        ]
        },
        {
            name: "Purple", rgb: "128, 0, 128", hex: "#800080", shades: [
            {name: "Light", rgb: "147, 112, 219", hex: "#9370DB"},
            {name: "Dark", rgb: "48, 25, 52", hex: "#301934"}
        ]
        },
        {
            name: "Pink", rgb: "255, 192, 203", hex: "#FFC0CB", shades: [
            {name: "Light", rgb: "255, 182, 193", hex: "#FFB6C1"},
            {name: "Deep", rgb: "255, 20, 147", hex: "#FF1493"}
        ]
        },
        {
            name: "Brown", rgb: "128, 64, 0", hex: "#804000", shades: [
            {name: "Light", rgb: "205, 133, 63", hex: "#CD853F"},
            {name: "Dark", rgb: "128, 0, 0", hex: "#800000"}
        ]
        },
        {
            name: "Black", rgb: "0, 0, 0", hex: "#000000", shades: [
            {name: "Charcoal", rgb: "54, 69, 79", hex: "#36454F"},
            {name: "Olive", rgb: "59, 60, 54", hex: "#3B3C36"}
        ]
        },
        {
            name: "Grey", rgb: "128, 128, 128", hex: "#808080", shades: [
            {name: "Light", rgb: "211, 211, 211", hex: "#D3D3D3"},
            {name: "Dark", rgb: "169, 169, 169", hex: "#A9A9A9"}
        ]
        },
        {
            name: "Gray", rgb: "128, 128, 128", hex: "#808080", shades: [
            {name: "Light", rgb: "211, 211, 211", hex: "#D3D3D3"},
            {name: "Dark", rgb: "169, 169, 169", hex: "#A9A9A9"}
        ]
        },
        {
            name: "White", rgb: "255, 255, 255", hex: "#FFFFFF", shades: [
            {name: "Beige", rgb: "245, 245, 220", hex: "#F5F5DC"},
            {name: "Smoke", rgb: "245, 245, 245", hex: "#F5F5F5"}
        ]
        }
    ];
    var searchClear = function() {
        field.value = "";
        field.removeEventListener("click", searchClear)
    };

    field.addEventListener("click", searchClear);

    // Trigger "button" when click enter when you're in field -> enables fast search.
    field.onkeypress = function(e) {
        if (e.keyCode === 13) {
            button.click();
        }
    };

    // Search-button.
    button.addEventListener("click", function() {
        displayColorInfo();
    });

    // Function to display all the color box-information.
    function displayColorInfo() {
        var value = field.value;
        var colorName;
        var colorRGB;
        var colorHex;
        var colorShades;
        for (var i = 0; i < colorData.length; i++) {
            if (value.toLowerCase() === colorData[i].name.toLowerCase()) {
                colorName = colorData[i].name;
                colorRGB = colorData[i].rgb;
                colorHex = colorData[i].hex;
                colorShades = colorData[i].shades;

                // Set header name
                document.getElementById("search-namefield").innerHTML = colorName;

                // Set color names above boxes
                document.getElementById("CT1").innerHTML = colorShades[0].name;
                document.getElementById("CT2").innerHTML = colorName;
                document.getElementById("CT3").innerHTML = colorShades[1].name;

                // Set background of each box
                document.getElementById("CB1").style.background = colorShades[0].hex;
                document.getElementById("CB2").style.background = colorHex;
                document.getElementById("CB3").style.background = colorShades[1].hex;

                // Set RGB-info of each box
                document.getElementById("CRGB1").value = colorShades[0].rgb;
                document.getElementById("CRGB2").value = colorRGB;
                document.getElementById("CRGB3").value = colorShades[1].rgb;

                // Set HEX-info of each box
                document.getElementById("CHEX1").value = colorShades[0].hex;
                document.getElementById("CHEX2").value = colorHex;
                document.getElementById("CHEX3").value = colorShades[1].hex;
            }
        }
    }

});
