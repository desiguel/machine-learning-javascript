/**
 * Functions for returning information about data-sets.
 */

// Get list of unique class names.
function getClassNames(items) {
    var lookup = {};
    var result = [];

    for (var item, i = 0; item = items[i++];) {
        var name = item.class;

        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(name);
        }
    }
    return result;
}

// Get response.
function getResponse(responseClass, classNames) {
    var response = [];
    classNames.forEach(function(className) {
        if (responseClass == className) {
            response.push(1);
        } else {
            response.push(0);
        }
    });
    return response;
}