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
    console.log(newData);
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
        console.log(newInstitues)
    } else {
        response.status(404).json({
            success: false,
            message: "Invalid inputt"
        })
    }
});

app.put("/:id/:tech", (request,response) => {
    const instId = request.params.id;
    const tech = request.params.tech;

    const inst = newInstitues.find((d) => d.id == instId);
    console.log(inst);

    if (!inst) {
        return response.status(404).json({
            success: false,
            message: "Institute not found"
        });
    }
    console.log("inst available");

    const techAva = inst.seat.findIndex((t) => t.hasOwnProperty(tech))
    console.log(techAva);

    // if (!techAva) {
    //     return response.status(404).json({
    //         success: false,
    //         message: "Technology not found"
    //     });
    // } 

    if (techAva) {
        return response.status(404).json({
            success: false,
            message: "Technology not found"
        });
    } 


    let seatAdd = request.body;

    inst.seat[0][tech] = seatAdd.seat;
    response.status(200).json({
        success: true,
        data: newInstitues,
        message: "Data updated successfully!!"
    })

    console.log("Technology available");
})

app.listen(5500, () => {
    console.log("Server started on port 5500");
})