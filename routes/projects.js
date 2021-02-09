const mongoose = require("mongoose");
const express = require("express");
const router = express.Router({mergeParams: true});
const{body, validationResult} = require("express-validator")
const auth = require("../middleware/auth");
const Project = require("../models/project");
const File = require("../models/file");

//Get all my projects
router.get("/",auth, async(req,res)=>{
    try {
        const projects = await Project.find({"users.user": {$eq: req.user.id}}).populate({
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
        projects.map(project=>console.log(project.frontend))
        res.json(projects)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

//Create new project
router.post("/", auth,
    [
        body("title","Title is required").not().isEmpty(),
        body("purpose","Purpose is required").not().isEmpty(),
        body("goals","Add at least 3 goals").isLength({min:3}),
        body("stack","Stack is required").not().isEmpty()
    ], async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        //Retrieve data from body
        const{title,purpose,goals,stack} = req.body;

        //Create project object
        const projectObj = {};
        projectObj.goals = [];
        projectObj.users = [];
        projectObj.owner = req.user.id;
        projectObj.users.push({user: req.user.id})
        projectObj.title = title;
        projectObj.purpose = purpose;
        goals.map(goal=>projectObj.goals.push(goal));
        projectObj.stack = stack;

        try{
            let project = new Project(projectObj);
            await project.save();
            res.json(project);
            console.log(`New project ${project.title} has been created`);
        }catch (e) {
            console.log(e.message);
            res.status(500).json({msg: "Server error"});
        }

    }
)

//Find project by id
router.get("/:id", auth, async(req,res)=>{
    try {
        const project = await Project.findById(req.params.id).populate("frontend backend");
        res.json(project);
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

//Edit project
router.put("/:id", auth, [
    body("title","Title is required").not().isEmpty(),
    body("purpose","Purpose is required").not().isEmpty(),
    body("goals","Add at least 3 goals").isLength({min:3}),
    body("stack","Stack is required").not().isEmpty()
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate({
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
        await project.save()
        res.json(project);
        console.log(`Project ${project.title} is updated`)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

//Remove project
router.delete("/:id", auth, async(req,res)=>{
    try {
        await Project.findByIdAndRemove({
            owner:req.user.id,
            _id: req.params.id
        });
        console.log("Project has been successfully removed")
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})


module.exports = router
