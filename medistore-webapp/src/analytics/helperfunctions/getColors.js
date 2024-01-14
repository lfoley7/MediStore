/**
 * @summary creates a segmented gradient for a chart
 * @param {object} yValues the data to be colored
 * @param {object} startColor the rgb code of the initial color in array format
 * @param {object} endColor the rgb code of the final color in array format
 * @param {number} transparency the strength of the color from 0 to 1
 * @returns {object} the array of gradient rgb codes to be used in a chart
 */
export const getColors = (yValues, startColor, endColor, transparency) => {
    if (typeof yValues == 'undefined' || yValues.length <= 1) {
        return ["rgba(" + startColor[0] + ", " + startColor[1] + ", " + startColor[2] + ")"];
    }
    var selectedColors = [];
    // Creating segmented gradient
    for (let x = 0; x < yValues.length; x++) {
        let color = new Array();
        color[0] = ((startColor[0] / (yValues.length - 1)) * ((yValues.length - 1) - x)) + ((endColor[0] / (yValues.length - 1)) * x);
        color[1] = ((startColor[1] / (yValues.length - 1)) * ((yValues.length - 1) - x)) + ((endColor[1] / (yValues.length - 1)) * x);
        color[2] = ((startColor[2] / (yValues.length - 1)) * ((yValues.length - 1) - x)) + ((endColor[2] / (yValues.length - 1)) * x);
        selectedColors.push(color);
    }
    // Reformatting colors into rbg codes
    for (let y = 0; y < selectedColors.length; y++) {
        selectedColors[y] = "rgba(" + selectedColors[y][0] + ", " + selectedColors[y][1] + ", " +
            selectedColors[y][2] + ", " + transparency + ")";
    }
    return selectedColors;
}