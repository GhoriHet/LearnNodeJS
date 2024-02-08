const obj = {
    id: 101,
    name: "John",
    city: "New York"
}

console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));
console.log(Object.hasOwnProperty('age'));
console.log(Object.assign({}, obj, {age: 18}));
console.log(Object.fromEntries(Object.entries(obj)));

// Object.freeze(obj);

//update
obj.city = 'vapi';
console.log(obj);

//add
obj.age = 25;
console.log(obj);

//delete
delete obj.age
console.log(obj);