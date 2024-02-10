// const express = require('express');

// const app = express();
// let institues = [
//     {
//         id: 1,
//         name: 'ABC IT Institute',
//         seat: [
//             {
//                 react: 15,
//                 node: 20,
//                 full_stack: 10,
//                 ui_ux: 0
//             },
//         ]
//     },
//     {
//         id: 2,
//         name: 'XYZ IT Institute',
//         seat: [
//             {
//                 react: 0,
//                 node: 70,
//                 full_stack: 0,
//                 ui_ux: 10
//             },
//         ]
//     },
//     {
//         id: 3,
//         name: 'PQR IT Institute',
//         seat: [
//             {
//                 react: 7,
//                 node: 0,
//                 full_stack: 0,
//                 ui_ux: 0
//             },
//         ]
//     },
//     {
//         id: 4,
//         name: 'MNP IT Institute',
//         seat: [
//             {
//                 react: 0,
//                 node: 0,
//                 full_stack: 0,
//                 ui_ux: 0
//             },
//         ]
//     }
// ];
// app.use(express.json())
// let newInstitues = institues.map((value) => {
//     return {
//         id: value.id,
//         name: value.name,
//         seat: value.seat.map((value) => Object.fromEntries(Object.entries(value).filter(([key, value]) => value > 0)))
//     }
// }).filter((value) => Object.keys(value.seat[0]).length > 0)
// app.get("/", (request, response) => {
//     response.status(200).json({
//         success: true,
//         data: newInstitues,
//         message: "Data fetched successfully!!"
//     })
// });

// app.post("/", (request, response) => {
//     let bodyData = request.body

//     let newData = bodyData.seat.map((value) => Object.fromEntries(Object.entries(value).filter(([key, value]) => value > 0)));
//     console.log(newD);
//     if (newData.length > 0) {
//         let newPushData = {
//             id: bodyData.id,
//             name: bodyData.name,
//             seat: newData
//         };

//         newInstitues.push(newPushData);
//         // response.status(200).json({
//         //     success: true,
//         //     data: newInstitues,
//         //     message: "Data post successfully!!"
//         // })
//         console.log(newInstitues)
//     } else {
//         return data
//     }
// })

// app.listen(3000, () => {
//     console.log("Server started on port 3000");
// })

const express = require('express')
const app = express();

let userData = [
    {
        "_id": 1,
        "name": "John Doe",
        "age": 28,
        "city": "New York",
        "gender": "Male",
        "posts": [
            { "title": "Post 1", "likes": 15, "comments": ["Great post!", "Interesting"] },
            { "title": "Post 2", "likes": 20, "comments": ["Well done"] }
        ],
        "friends": [2, 3],
        "skills": ["JavaScript", "React", "Node.js"],
        "isActive": true
    },
    {
        "_id": 2,
        "name": "Alice Johnson",
        "age": 32,
        "city": "Los Angeles",
        "gender": "Female",
        "posts": [
            { "title": "Post 3", "likes": 10, "comments": ["Nice!", "Awesome"] },
            { "title": "Post 4", "likes": 25, "comments": ["Impressive"] }
        ],
        "friends": [1, 3],
        "skills": ["Python", "Django", "JavaScript"],
        "isActive": true
    },
    {
        "_id": 3,
        "name": "Bob Williams",
        "age": 24,
        "city": "New York",
        "gender": "Male",
        "posts": [
            { "title": "Post 5", "likes": 18, "comments": ["Keep it up"] },
            { "title": "Post 6", "likes": 22, "comments": ["Awesome"] }
        ],
        "friends": [1, 2],
        "skills": ["Java", "Spring Boot", "JavaScript"],
        "isActive": false
    },
    {
        "_id": 4,
        "name": "Diana Brown",
        "age": 30,
        "city": "San Francisco",
        "gender": "Female",
        "posts": [
            { "title": "Post 7", "likes": 12, "comments": ["Interesting"] },
            { "title": "Post 8", "likes": 30, "comments": ["Well done", "Great post!"] }
        ],
        "friends": [5, 6],
        "skills": ["React", "Node.js", "MongoDB"],
        "isActive": true
    },
    {
        "_id": 5,
        "name": "Elijah Wilson",
        "age": 26,
        "city": "Los Angeles",
        "gender": "Male",
        "posts": [
            { "title": "Post 9", "likes": 14, "comments": ["Nice!"] },
            { "title": "Post 10", "likes": 18, "comments": ["Impressive"] }
        ],
        "friends": [4, 6],
        "skills": ["JavaScript", "Vue.js", "Express.js"],
        "isActive": false
    },
    {
        "_id": 6,
        "name": "Fiona Miller",
        "age": 29,
        "city": "San Francisco",
        "gender": "Female",
        "posts": [
            { "title": "Post 11", "likes": 22, "comments": ["Awesome"] },
            { "title": "Post 12", "likes": 25, "comments": ["Great post!"] }
        ],
        "friends": [4, 5],
        "skills": ["React", "Angular", "Node.js"],
        "isActive": true
    },
    {
        "_id": 7,
        "name": "George Taylor",
        "age": 35,
        "city": "Los Angeles",
        "gender": "Male",
        "posts": [
            { "title": "Post 13", "likes": 18, "comments": ["Keep it up"] },
            { "title": "Post 14", "likes": 20, "comments": ["Awesome"] }
        ],
        "friends": [8, 9],
        "skills": ["Python", "Flask", "Django"],
        "isActive": false
    },
    {
        "_id": 8,
        "name": "Hannah Robinson",
        "age": 27,
        "city": "San Francisco",
        "gender": "Female",
        "posts": [
            { "title": "Post 15", "likes": 15, "comments": ["Nice!", "Interesting"] },
            { "title": "Post 16", "likes": 28, "comments": ["Well done"] }
        ],
        "friends": [7, 9],
        "skills": ["JavaScript", "React", "Vue.js"],
        "isActive": true
    },
    {
        "_id": 9,
        "name": "Isaac Moore",
        "age": 31,
        "city": "Portland",
        "gender": "Male",
        "posts": [
            { "title": "Post 17", "likes": 10, "comments": ["Nice!", "Impressive"] },
            { "title": "Post 18", "likes": 22, "comments": ["Great post!"] }
        ],
        "friends": [7, 8],
        "skills": ["Node.js", "Express.js", "MongoDB"],
        "isActive": false
    },
    {
        "_id": 10,
        "name": "Jasmine Hill",
        "age": 23,
        "city": "Portland",
        "gender": "Female",
        "posts": [
            { "title": "Post 19", "likes": 18, "comments": ["Keep it up", "Awesome"] },
            { "title": "Post 20", "likes": 25, "comments": ["Interesting"] }
        ],
        "friends": [9, 7],
        "skills": ["Java", "Spring Boot", "JavaScript"],
        "isActive": true
    }
]

app.use(express.json());

app.get("/users/:id", (req, res) => {
    let id = req.params.id;
    let user = userData.find(user => user._id == id);
    console.log(id, user);

    if (!user) {
        res.status(404).json({
            success: false,
            message: "Data fetched failed"
        })
    } else {
        res.status(200).json({
            success: true,
            data: user,
            message: "Data fetched successfully!!"
        })
    }
});

app.post('/users', (req, res) => {
    let bodyData = req.body;

    if (bodyData.posts.length > 0 && bodyData.skills.length > 0) {
        let pushData = {
            id: bodyData._id,
            name: bodyData.name,
            age: bodyData.age,
            city: bodyData.city,
            gender: bodyData.gender,
            posts: bodyData.posts,
            friends: bodyData.friends,
            skills: bodyData.skills
        }
        userData.push(pushData);
        res.status(200).json({
            success: true,
            data: userData,
            message: "Data posted successfully!"
        })
        console.log(userData);
    } else {
        res.status(404).json({
            success: false,
            message: "Invalid Input..."
        })
    }
});

app.put("/users/:id", (req, res) => {
    
});

app.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    let bodyData = req.body;
    console.log(id, bodyData);

    let index = userData.find((value) => value._id == id)
    console.log(index);
    userData.splice(index, 1);
    if (index) {
        res.status(200).json({
            success: true,
            data: userData,
            message: "Data deleted successfully!"
        })
    } else {
        res.status(404).json({
            success: false,
            message: "Invalid Input..."
        })
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})