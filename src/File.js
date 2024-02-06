const fs = require('fs');

// fs.mkdir("./src/assets/file", {recursive: true} , (err) => {
//     if (err) {
//         console.log(err.message);
//         return;
//     }
//     console.log("Directory created!!");
// })

fs.writeFile("./src/assets/file/demo.txt", "Hello Node!", (err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("File created!!");
});

fs.appendFile("./src/assets/file/demo.txt", "How Are You??", (err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("File created!!");
})

fs.readFile("./src/assets/file/demo.txt", "utf-8", (err,data) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log(data);
})

fs.stat("./src/assets/file/demo.txt", "utf-8", (err,data) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log(data);
})

fs.unlink('./src/assets/file/demo.txt',(err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Deleted');
})