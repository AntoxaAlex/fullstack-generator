const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../middleware/auth");
const {body, validationResult} = require("express-validator");
const Project = require("../models/project");
const File = require("../models/file");


//Create new file
router.post("/",auth,[
    body("section", "Choose front-end section or back-end section").not().isEmpty(),
    body("type", "File type is required").not().isEmpty(),
    body("title", "File title is required").not().isEmpty()
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {folderIndex,section, type, title, features} = req.body;
    const fileObj = {};
    fileObj.features = [];
    fileObj.project = req.params.id
    fileObj.section = section;
    fileObj.type = type;
    fileObj.title = title;
    features.map(feature=>fileObj.features.push({text:feature}))
    try {
        let file = await new File(fileObj);
        await file.save();
        console.log("File is created")

        let project = await Project.findById(req.params.id);
        project[section].files.push(file)
        project.folders[folderIndex].files.push({file:file._id})
        await project.save();
        project = await Project.findById(req.params.id).populate({
            path: "frontend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    model: "File"
                }]

            }
        }).populate({
            path: "backend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    model: "File"
                }]

            }
        }).populate({
            path: "interdependence",
            populate:[{
                path: "receiver",
                populate:{
                    path: "file",
                    model: "File"
                }
            }]
        }).populate({
            path: "interdependence",
            populate:[{
                path: "sender",
                populate:{
                    path: "file",
                    model: "File"
                }
            }]
        }).populate({
            path:"users",
            populate:[{
                path: "user",
                model: "User"
            }]
        }).populate({
            path: "folders",
            populate: [{
                path: "files",
                populate: [{
                    path: "file",
                    model: "File"
                }]
            }]
        }).populate("owner");
        res.json(project);
        console.log("File is added to project");

    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

//EditFile
router.put("/:file_id",auth,[
    body("section", "Choose front-end section or back-end section").not().isEmpty(),
    body("type", "File type is required").not().isEmpty(),
    body("title", "File title is required").not().isEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const file =await File.findByIdAndUpdate(req.params.file_id, req.body)
        await file.save()
        let project = await Project.findById(req.params.id).populate({
            path: "frontend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    model: "File"
                }]

            }
        }).populate({
            path: "backend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    model: "File"
                }]

            }
        }).populate({
            path: "interdependence",
            populate:[{
                path: "receiver",
                populate:{
                    path: "file",
                    model: "File"
                }
            }]
        }).populate({
            path: "interdependence",
            populate:[{
                path: "sender",
                populate:{
                    path: "file",
                    model: "File"
                }
            }]
        }).populate({
            path:"users",
            populate:[{
                path: "user",
                model: "User"
            }]
        }).populate({
            path: "folders",
            populate: [{
                path: "files",
                populate: [{
                    path: "file",
                    model: "File"
                }]
            }]
        }).populate("owner");
        res.json(project);
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"})
    }
})

//Delete file
router.delete("/:file_id", auth, async(req,res)=>{
    try{
        const project = await Project.findById(req.params.id).populate({
            path: "frontend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    model: "File"
                }]

            }
        }).populate({
            path: "backend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    model: "File"
                }]

            }
        }).populate({
            path: "interdependence",
            populate:[{
                path: "receiver",
                populate:{
                    path: "file",
                    model: "File"
                }
            }]
        }).populate({
            path: "interdependence",
            populate:[{
                path: "sender",
                populate:{
                    path: "file",
                    model: "File"
                }
            }]
        }).populate({
            path:"users",
            populate:[{
                path: "user",
                model: "User"
            }]
        }).populate({
            path: "folders",
            populate: [{
                path: "files",
                populate: [{
                    path: "file",
                    model: "File"
                }]
            }]
        }).populate("owner");
        if(project.frontend.files.filter((file)=>file._id.toString() === req.params.file_id).length === 1){
            const removeIndex = project.frontend.files.map(file=>file._id.toString().indexOf(req.params.file_id));
            project.frontend.files.splice(removeIndex,1);
        } else if(project.backend.files.filter((file)=>file._id.toString() === req.params.file_id).length === 1){
            const removeIndex = project.backend.files.map(file=>file._id.toString().indexOf(req.params.file_id));
            project.backend.files.splice(removeIndex,1);
        }

        project.interdependence = project.interdependence.filter(file=>file.sender._id.toString() !== req.params.file_id && file.receiver._id.toString() !== req.params.file_id);
        console.log(project.interdependence)

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
