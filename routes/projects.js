const express = require("express");
const router = express.Router({mergeParams: true});
const{body, validationResult} = require("express-validator")
const auth = require("../middleware/auth");
const Project = require("../models/project");
const File = require("../models/file");
const Checklist = require("../models/checklist")

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
        body("goals","Add at least 3 goals").isArray({min:3}),
        body("frontArch","Please choose front-end architecture").not().isEmpty(),
        body("backArch","Please choose back-end architecture").not().isEmpty()
    ], async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        //Retrieve data from body
        const{title,purpose,goals,frontArch, backArch} = req.body;

        //Create project object
        const projectObj = {};
        projectObj.goals = [];
        projectObj.users = [];
        projectObj.frontend = {};
        projectObj.backend = {};
        projectObj.projectView = [];
        projectObj.checklist = [];
        projectObj.owner = req.user.id;
        projectObj.users.push({user: req.user.id})
        projectObj.title = title;
        projectObj.purpose = purpose;
        goals.map(goal=>projectObj.goals.push(goal));
        projectObj.frontend.archType = frontArch;
        projectObj.backend.archType = backArch;
        projectObj.workingTime = 0;
        projectObj.theme = "dark"

        try{
            let checklist = await Checklist.findOne({backArch: backArch, frontArch: frontArch});
            checklist.items.map(item=>{
                projectObj.checklist.push(item)
            })

            console.log(projectObj)

            let project = new Project(projectObj).populate({
                path:"users",
                populate:[{
                    path: "user",
                    model: "User"
                }]
            });
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
router.get("/:id", async(req,res)=>{
    try {
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
            path: "frontend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    populate:{
                        path:"folder"
                    }
                }]

            }
        }).populate({
            path: "backend",
            populate: {
                path: "files",
                populate:[{
                    path: "file",
                    populate:{
                        path:"folder"
                    }
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
        res.status(500).json({msg: "Server error"});
    }
})

//Edit project
router.put("/:id", auth, [
    body("title","Title is required").not().isEmpty(),
    body("purpose","Purpose is required").not().isEmpty(),
    body("goals","Add at least 3 goals").isLength({min:3})
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate({
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
                path: "sender",
                populate:{
                    path: "file",
                    model: "File"
                }
            }]
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
        await project.save()
        res.json(project);
        console.log(`Project ${project.title} is updated`)
        console.log(project)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})

//Remove project
router.delete("/:id", auth, async(req,res)=>{
    try {
        await File.deleteMany({project: req.params.id})
        await Project.findByIdAndRemove({
            owner:req.user.id,
            _id: req.params.id
        });
        console.log("Project has been successfully removed")
        res.json({status:"deleted"})
    }catch (e) {
        console.log(e.message);
        res.status(500).json({msg: "Server error"});
    }
})


module.exports = router
