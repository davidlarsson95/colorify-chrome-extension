/**
 * Created by manze on 2017-05-12.
 */
document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById("search-button");
  var field = document.getElementById("search-field");
  var colorData = [
      {name: "colorname", rgb: "rgb", hex: "hex", shades: []},
      {name: "Red", rgb: "255, 0, 0", hex: "#FF0000", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Green", rgb: "0, 255, 0", hex: "#00FF00", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Blue", rgb: "0, 0, 255", hex: "#0000FF", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Yellow", rgb: "255, 255, 0", hex: "#FFFF00", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Orange", rgb: "255, 128, 0", hex: "#FF8000", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Purple", rgb: "128, 0, 128", hex: "#800080", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Pink", rgb: "255, 192, 203", hex: "#FFC0CB", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Brown", rgb: "128, 64, 0", hex: "#804000", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Black", rgb: "0, 0, 0", hex: "#000000", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "Grey", rgb: "128, 128, 128", hex: "#808080", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "White", rgb: "255, 255, 255", hex: "#FFFFFF", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "colorname", rgb: "rgb", hex: "hex", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "colorname", rgb: "rgb", hex: "hex", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]},
      {name: "colorname", rgb: "rgb", hex: "hex", shades: [
          {name: "colorname", rgb: "rgb", hex: "hex"}
      ]}
  ];
    var searchClear = function() {
        field.value = "";
        field.removeEventListener("click", searchClear)
    };

    field.addEventListener("click", searchClear);
    button.addEventListener("click", function () {
        document.getElementById("main-wrapper").innerHTML = "COLOR INFO <br> NAME: COLOR <br> RGB: RGB <br> HEX: HEX"
    })




});