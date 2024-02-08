// const obj = {
//     id: 101,
//     name: "John",
//     city: "New York"
// }

// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// console.log(Object.entries(obj));
// console.log(Object.hasOwnProperty('age'));
// console.log(Object.assign({}, obj, {age: 18}));
// console.log(Object.fromEntries(Object.entries(obj)));

// // Object.freeze(obj);

// //update
// obj.city = 'vapi';
// console.log(obj);

// //add
// obj.age = 25;
// console.log(obj);

// //delete
// delete obj.age
// console.log(obj);

let institues = [
    {
        name: 'ABC IT Institute',
        seat: [
            {
                react: 15,
                node: 20,
                full_stack: 10,
                ui_ux: 0
            },
        ]
    },
    {
        name: 'XYZ IT Institute',
        seat: [
            {
                react: 0,
                node: 70,
                full_stack: 0,
                ui_ux: 10
            },
        ]
    },
    {
        name: 'PQR IT Institute',
        seat: [
            {
                react: 7,
                node: 0,
                full_stack: 0,
                ui_ux: 0
            },
        ]
    },
    {
        name: 'MNP IT Institute',
        seat: [
            {
                react: 0,
                node: 0,
                full_stack: 0,
                ui_ux: 0
            },
        ]
    }
];


let newInstitues;
let array;
newInstitues = institues.map((value) => {
    value.seat.map((seat) => {
        array = Object.entries(seat).filter((value) => value[1] > 0);
    })
    value.seat = Object.fromEntries(array)
    return value;
})
console.log(newInstitues)