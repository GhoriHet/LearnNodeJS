const rect = require("./rectangle");
const employee = require("./Employee")
const os = require("os");
const url = require("url");
const path = require("path");

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


// Salary........
// const totalSalary = (salary) => {
//     employee.employeeSalary(salary, (err, bonus) => {
//         if (err) {
//             console.error(err.message);
//         } else {
//             console.log(bonus);
//         }
//     })
// }

// totalSalary(31000)

// 4.OS Introduction
// console.log(os.userInfo());
// console.log(os.freemem());
// console.log(os.networkInterfaces()['Wi-Fi'][0].address);
// console.log(os.arch());
// console.log(os.platform());

//5.URL Introduction

// const parsedURL = url.parse("https://www.flipkart.com/callmate-30000-mah-15-w-power-bank/p/itmdbf7580046224?pid=PWBGFJPUHGXCDDY4&lid=LSTPWBGFJPUHGXCDDY4RQKELY&marketplace=FLIPKART&store=tyy%2F4mr%2Ffu6&srno=b_1_17&otracker=browse&fm=organic&iid=893267de-89d5-4539-b332-0f73d41ec0eb.PWBGFJPUHGXCDDY4.SEARCH&ppt=browse&ppn=browse&ssid=8fxfyf3low0000001707187954731",true)
// console.log(parsedURL.query.pid);

// const urlObj = {
//     protocol: "https:",
//     hostname: "nodejs.org",
//     pathname: "/api/os.html"
// }

// console.log(url.format(urlObj));

// //Method 1.
// console.log(url.resolve("https://www.google.com", '/example'));
// console.log(url.resolve("http://www.google.com/one/two/three/four", "/five"));

// //Method 2.
// console.log(url.resolve("http://www.google.com/one/two/three", "four"));

//5. Path Introduction

// console.log(__dirname); //F:\LearnNode\src
// console.log(__filename); //F:\LearnNode\src\index.js

// console.log(path.basename(__dirname))  //src
// console.log(path.basename(__filename)); //index.js
// console.log(path.extname(__filename));  //.js

// console.log(path.join(__dirname, "assets",'images','xyz.png')); //F:\LearnNode\src\assets\images\xyz.png
// console.log(path.join("assets",'images','xyz.png')); //assets\images\xyz.png
// console.log(path.join("assets",'/images/','/xyz.png')); //assets\images\xyz.png
// console.log(path.join("assets",'/images/','../xyz.png')); //assets\xyz.png

// console.log(path.resolve("assets",'/images/','../xyz.png')); //F:\xyz.png
// console.log(path.resolve("assets",'//images','xyz.png')); //F:\images\xyz.png
// console.log(path.resolve("assets",'//images','///xyz.png')); //F:\xyz.png