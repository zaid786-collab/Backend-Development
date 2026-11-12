// Server ko create karna main kaam hai iss file ka.
const express = require("express");
const noteModel = require("./models/note.model")


const app = express();
app.use(express.json());

let count = 1;
app.post("/notes", async (req,res) => {
    const data = req.body;

    // sending it to mongodb via model and mongoose.
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message:  `Note ${count} created`
    })
    count = count + 1;

})

app.get("/notes", async(req,res) => {

    const notes = await noteModel.find({

        // title: "Complete MongoDB Tutorial"

    }); // Give data in the format of array.

    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })
})

app.delete("/notes/:id", async(req,res) => {
    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "Note Deleted Successfully"
    })

})

app.patch("/notes/:id", async(req,res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    await noteModel.findOneAndUpdate({_id: id}, {
        description: description
    })

    res.status(200).json({
        message: "Note Updated"
    })
})
 
// /dynamic part in routes is known as params,here it is index,use : to tell it to express.

// app.delete("/notes/:index", (req,res) => {

//     const index = req.params.index

//     delete notes[index]

//     res.status(200).json({
//         message: `Note ${index} deleted successfully.`
//     })
// })

// app.patch("/notes/:index",(req,res) => {

//     const index = req.params.index
//     const description = req.body.description
//     const title = req.body.title

//     notes[index].description = description
//     notes[index].title = title

//     res.status(200).json({
//         message: "note updated successfully"
//     })
// })

module.exports = app

// SGCy2eNMNK8wahk9
