/**
 * Color palette
 *
 * @author David Larsson
 * @credits to Flexi & Chirag for colorpicker library & NTC library.
 */

document.addEventListener('DOMContentLoaded', function() {
    ColorPicker.fixIndicators(
        document.getElementById('sliderIndicator'),
        document.getElementById('pickerIndicator'));

    ColorPicker(

        document.getElementById('slider'),
        document.getElementById('picker'),

        function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {

            ColorPicker.positionIndicators(
                document.getElementById('sliderIndicator'),
                document.getElementById('pickerIndicator'),
                sliderCoordinate, pickerCoordinate
            );
            // Auto-updated start
            // Removing the cursor while changing color
            document.addEventListener('mousedown', function() {
               document.getElementById("slider").style.cursor = "none";
               document.getElementById("picker").style.cursor = "none";
            });
            document.addEventListener('mouseup', function() {
                document.getElementById("slider").style.cursor = "default";
                document.getElementById("picker").style.cursor = "default";
            });


            // Changing background to color and adjusting hex RGB values
            document.getElementById("hexfield").value = hex;
            document.getElementById("rgbfield").value = "rgb(" + rgb.r + ", " +  rgb.g + ", " + rgb.b + ")";
            document.body.style.backgroundColor = hex;

            // Input hex and convert it to a name-value
            var colorName = ntc.name(hex);
            document.getElementById("namefield2").innerHTML = colorName[1];
            // Auto-updated end
        });



});
