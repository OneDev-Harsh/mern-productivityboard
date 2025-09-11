const mongodb = require("mongodb");
const Note  = require("../model/Note")

async function getAllNotes(req, res) {
    try{
        const notes = await Note.find().sort({createdAt: -1}); // -1 will sort in descending order (newest first)
        res.json(notes);
    }catch(error){
        console.log("Error in getAllNotes", error)
        res.json({message: "Internal Server Error"})
    }
} 

async function createNote(req, res) {
    try{
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        const savedNote = await newNote.save()
        res.status(201).json({message: "Note Created Successfully", savedNote});
    }catch(error){
        console.error("Error in createNote:", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

async function updateNote(req, res) {
    try{
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true}
        );
        if(!updatedNote){
            return res.status(404).json({message: "Note Not Found"})
        }
        res.status(200).json({message:"Note Updated Successfully"}, updatedNote)
    }catch(error){
        console.error("Error in updateNote:", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

async function deleteNote(req, res) {
    try{
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id
        )
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note Deleted Successfully."}, deletedNote);
    }catch(error){
        console.error("Error in deleteNote:", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

async function getNoteById(req, res) {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found"})
        res.status(200).json(note)
    }catch(error){
        console.error("Error in getNoteById:", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote, getNoteById}