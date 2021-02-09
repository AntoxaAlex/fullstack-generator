const express = require("express");
const router = express.Router({mergeParams: true});
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const {body, validationResult} = require("express-validator");
const Project = require("../models/project");
const File = require("../models/file");


//Create new file
router.post("/",auth,[
    body("type", "File type is required").not().isEmpty(),
    body("purpose", "File purpose is required").not().isEmpty()
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {section,type, purpose} = req.body;
    const fileObj = {};
    fileObj.section = section;
    fileObj.type = type;
    fileObj.purpose = purpose;
    try {
        const file = new File(fileObj);
        await file.save();
        console.log(file)
        console.log("File is created");

        const project = await Project.findById(req.params.id).populate({
            path: "frontend",
            populate: [{
                path: "file",
                model: "File"
            }]
        }).populate({
            path: "backend",
            populate: [{
                path: "file",
                model: "File"
            }]
        });
        if(section === "frontend"){
            project.frontend.unshift(file);
        }else if(section === "backend") {
            project.backend.unshift(file);
        }
        await project.save();
        res.json(project);
        console.log("File is added to project");

    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

//Delete file
router.delete("/:file_id", auth, async(req,res)=>{
    try{
        const project = await Project.findById(req.params.id);
        if(project.frontend.filter((file)=>file._id.toString() === req.params.file_id).length === 1){
            const removeIndex = project.frontend.map(file=>file._id.toString().indexOf(req.params.file_id));
            project.frontend.splice(removeIndex,1);
        } else if(project.backend.filter((file)=>file._id.toString() === req.params.file_id).length === 1){
            const removeIndex = project.backend.map(file=>file._id.toString().indexOf(req.params.file_id));
            project.backend.splice(removeIndex,1);
        }
        await project.save();
        await File.findByIdAndRemove(req.params.file_id);
        res.json(project);
        console.log()
        console.log("File is deleted");

    }catch (e) {
        console.log(e);
        res.status(500).json({msg: "Server error"});
    }
})

//Create subfile
router.post("/:file_id", auth,[
    body("type", "File type is required").not().isEmpty(),
    body("purpose", "File purpose is required").not().isEmpty()
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {type, purpose} = req.body;
    const subfileObj = {};
    subfileObj.type = type;
    subfileObj.purpose = purpose;

    try {
        const file = await File.findById(req.params.file_id);
        file.subfiles.unshift(subfileObj);
        await file.save();

        const project = await Project.findById(req.params.id).populate({
            path: "frontend",
            populate: [{
                path: "file",
                model: "File"
            }]
        }).populate({
            path: "backend",
            populate: [{
                path: "file",
                model: "File"
            }]
        });
        await project.save();
        res.json(project)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

//Remove subfile
router.delete("/:file_id/subfile/:subfile_id", auth, async(req, res)=>{
    try {
        const file = await File.findById(req.params.file_id).populate("subfiles");
        file.subfiles.filter(subfile=>subfile._id.toString() === req.params.subfile_id).map(subfile=>{
            file.subfiles.splice(file.subfiles.indexOf(subfile),1);
        })
        await file.save();
        console.log("Subfile is deleted")
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

module.exports = router;
