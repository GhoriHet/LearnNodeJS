const rect = require("./rectangle");
const employee = require("./Employee")

//1.
// console.log(rect.area(10, 20));
// console.log(rect.perimeter(10, 30));

//2.
// const solveRectangle = (l, w) => {
//     if (l <= 0 || w <= 0) {
//         console.log(new Error("Length and width must be greter than zero."));
//     } else {
//         console.log(rect.area(l, w));
//         console.log(rect.perimeter(l, w));
//     }
// }

// solveRectangle(10, 20)

//3.
// const solveRectangle = (l, w) => {
//     rect.rectOperation(l, w, (err, obj) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             console.log("Area of circle is: " + obj.area());
//             console.log("Area of circle is: " + obj.perimeter());
//         }
//     })
// }

// solveRectangle(10, -20)

const totalSalary = (salary) => {
    employee.employeeSalary(salary, (err, bonus) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(bonus);
        }
    })
}

totalSalary(31000)