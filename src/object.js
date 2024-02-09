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
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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

let newInstitues = institues.map((value) => {
    return {
        id: value.id,
        name: value.name,
        seat: value.seat.map((value) => Object.fromEntries(Object.entries(value).filter(([key, value]) => value > 0)))
    }
}).filter((value) => Object.keys(value.seat[0]).length > 0)
console.log(newInstitues) 