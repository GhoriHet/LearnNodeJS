// const area = (l, w) => "Area of rectangle is: " + l * w;
// const perimeter = (l, w) => "Perimeter of rectangle is: " + 2 * (l + w);

// module.exports = {
//     area,
//     perimeter
// }

const rectOperation = (l, w, callback) => {
    if (l <= 0 || w <= 0) {
        callback(new Error("Length and width must be greter than zero."), null);
    } else {
        callback(null, {
            area: () => l * w,
            perimeter: () => 2 * (l + w)
        })
    }
}

module.exports = {
    rectOperation
}