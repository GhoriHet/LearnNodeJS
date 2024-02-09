const express = require('express');

const app = express();
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
app.use(express.json())
let newInstitues = institues.map((value) => {
    return {
        id: value.id,
        name: value.name,
        seat: value.seat.map((value) => Object.fromEntries(Object.entries(value).filter(([key, value]) => value > 0)))
    }
}).filter((value) => Object.keys(value.seat[0]).length > 0)
app.get("/", (request, response) => {
    response.status(200).json({
        success: true,
        data: newInstitues,
        message: "Data fetched successfully!!"
    })
});

app.post("/", (request, response) => {
    let bodyData = request.body

    let newData = bodyData.seat.map((value) => Object.fromEntries(Object.entries(value).filter(([key, value]) => value > 0)));

    if (newData.length > 0) {
        let newPushData = {
            id: bodyData.id,
            name: bodyData.name,
            seat: newData
        };

        newInstitues.push(newPushData);
        response.status(200).json({
            success: true,
            data: newInstitues,
            message: "Data post successfully!!"
        })
    } else {
        response.status(400).json({
            success: false,
            message: "Invalid value"
        })
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})