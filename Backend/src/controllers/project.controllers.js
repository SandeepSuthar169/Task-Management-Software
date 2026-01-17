import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { ProjectMember } from "../models/projectmember.models.js"
import { User } from "../models/user.models.js"
import { Project } from "../models/project.models.js"
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import mongoose, { Mongoose } from "mongoose";
import redis from "../utils/redis.js";



const createProject = asyncHandler(async (req, res) => {

    const { name, description } = req.body
    if(!name || !description) throw new ApiError(401, "project info is required")

    const { userId } =  req.params 
    if(!userId) throw new ApiError(401, "user id is required")

    const user = await User.findById(userId)
    if(!user) throw new ApiError(401, "user  is required")

    const project = await Project.create({
        name,
        description,
        createdBy: user._id
    })

    if(!project)  throw new ApiError(404, "Project not found" )


    
    return res.status(200).json(new ApiResponse(200, project, "Project create successfully"))


});


const createProjectMenbers = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    if(!projectId) throw new ApiError(401, "user id is required")

    const { userId } =  req.params 
    if(!userId) throw new ApiError(401, "user id is required")

    const user = await User.findById(userId)
    if(!user) throw new ApiError(401, "user  is required")

    const { role } = req.body
    if(!role) throw new ApiError(401, "role  is required")

    if(!Object.values(UserRolesEnum).includes(role)) throw new ApiError(401, "User role is required")

    const projectMenbers = await ProjectMember.create({
        user: user._id,
        project: projectId,
        role: "project_admin"
    })
    console.log(projectMenbers);
    
    if(!projectMenbers) throw new ApiError(401, "project member  is required")

    return res.status(200).json(
        new ApiResponse(
            200,
            projectMenbers,
            "project member fetch successfully!"    
        )
    )
})

const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    const proiect = await Project.findById(projectId)

    if(!proiect)  throw new ApiError(401, "project not found")
    const projectIdInCach = await redis.get(`project:${projectId}`)
    // console.log(userIdInCach);
    
    
    if(projectIdInCach) {
        return res.status(200).json(new ApiResponse(
            200,
            JSON.parse(projectIdInCach),
            "project id cached successfully"
        ))
    }

    await redis.set(
        `book:${projectId}`,
        JSON.stringify(proiect),
        "EX",
        3600
    )   


    return res.status(200).json(
        new ApiResponse(
            200,
            proiect,
            "project fetch successfully!"

            
        )
    )

});



const getProjects = asyncHandler(async (req, res) => {
    const userCach = `user:${req.user._id}:projects`;

    const cachedProjects = await redisClient.get(userCach);

    if (cachedProjects) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { 
                    project: JSON.parse(cachedProjects) 
                },
                "project fetched successfully (from cache)"
            )
        );
    }

    const project = await ProjectMember.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project",
                pipeline: [
                    {
                        $lookup: {
                            from: "projectmembers",
                            localField: "_id",
                            foreignField: "project",
                            as: "projectmembers"
                        }
                    },
                    {
                        $addFields: {
                            members: { $size: "$projectmembers" }
                        }
                    }
                ]
            }
        },
        { $unwind: "$project" },
        {
            $project: {
                project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    members: 1,
                    createdAt: 1,
                    createdBy: 1
                },
                role: 1,
                _id: 0
            }
        }
    ]);

    if (!project || project.length === 0) {
        throw new ApiError(404, "Project is required!");
    }

    // 3️⃣ Store result in Redis (TTL = 5 minutes)
    await redisClient.setEx(
        userCach,
        3500,
        JSON.stringify(project)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            { 
                project 
            },
            "project fetched successfully"
        )
    );
});


const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    const { name, description } = req.body
    
    // console.log("project Id  ==>>", projectId);
    // console.log("project name  ==>>", name);
    // console.log("project description  ==>>", description);
    
    if(!projectId)  throw new ApiError(404, "Project Id is required")


    if(!name || !description)  throw new ApiError(404, "User info is required")

    const existingProject = await Project.findById(projectId)

    if(!existingProject) throw new ApiError(404, "existing project not found")

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            name, description
        },
        {
            new: true
        }
    )

    if(!project)  throw new ApiError(401, "Project not found")
    
    await redis.set(
        `book:${boardId}`,
        JSON.stringify(board),
        "EX",
        3600
    )

    return res.status(200).json(
        new ApiResponse(
            200, 
            project, 
            "project update successfully"
        )
    )

});


const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!projectId) {
        throw new ApiError(400, "Project Id is required");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(400, "Invalid Project ID format");
    }

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const delProject = await Project.findByIdAndDelete(projectId);

    if (!delProject) {
        throw new ApiError(404, "Project delete failed");
    }

    await redis.del(`user:${project.createdBy}:projects`);

    await redis.del(`project:${projectId}`);

    return res.status(200).json(
        new ApiResponse(
            200,
            { 
                project: delProject 
            },
            "Project deleted successfully"
        )
    );
});



const addMemberToProject = asyncHandler(async (req, res) => {
    const { email, username, role} = req.body
    console.log(email);
    console.log(username);
    console.log(role);
    
    
    if(!email || !username || !role){
        throw new ApiError(404, "User info is required")
    }
    
    const { projectId } = req.params
    console.log(projectId);
    
    
    if(!projectId){
        throw new ApiError(404, "Project Id is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    console.log(user._id);
    

    if(!user){
        throw new ApiError(404, "Project Id is required")
    }

    const projectMember = await ProjectMember.create({
        user: user._id,
        project: projectId,
        role: role
    });

    console.log("Created project member:", projectMember);
    
    
    if(!projectMember){
        throw new ApiError(404, "projectMember is required")
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            projectMember,
            "Project member added successfully" 
        )
    )
});



const getProjectMembers = asyncHandler(async (req, res) => {
    const { projectMemberId } =  req.params
    if(!projectMemberId)  throw new ApiError(404, "projectMamabersId Id not found")
        
    const projectMemberIdInCach = await redis.get(`projectMember:${projectMemberId}`)
    
    if(projectMemberIdInCach) {
        return res.status(200).json(
            new ApiResponse(
                200,
                JSON.parse(projectMemberIdInCach),
                "board id cached successfully"
        ))
    }
    const projectMembers = await ProjectMember.findById(projectMemberId).populate({
        path: "user",
        select: "username fullName avatar"
    }).select("project user role createdAt updateAt -_id")

    if(!projectMembers){
        throw new ApiError(404, "Project member is required")
    }    
    
    await redis.set(
        `book:${projectMemberId}`,
        JSON.stringify(projectMembers),
        "EX",
        3600
    )

    return res.status(200).json(
        new ApiResponse(
            200,
        projectMembers,
        "project member fetch successfully")
    )

});

const updateProjectMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    if(!projectId)  throw new ApiError(404, "Project member is required")

    const projectMembers = await ProjectMember.findById(projectId)
       
    if(!projectMembers)  throw new ApiError(404, "Project member is required")

    const { email, username, role } = req.body

    const user = User.findOne({
        $or: [{email}, username]
    })

    if(!user)  throw new ApiError(404, "user is required")


    const updateProjectMember =  await ProjectMember.findOneAndUpdate(
        {
            user: new mongoose.Types.ObjectId(req.user._id),
            project:  new Mongoose.Types.ObjectId(projectId),
            role: role
        },
        {
            new: true
        }
    );

    if(!updateProjectMember){
        throw new ApiError(404, "user is required")
    }

    await redis.set(
        `book:${projectId}`,
        JSON.stringify(updateProjectMember),
        "EX",
        3600
      )


    return res.status(200).json(
        new ApiResponse(
            200,
            updateProjectMember,
            "Project member update successfully"
        )
    )

    
});


const updateMemberRole = asyncHandler(async (req, res) => {
    const { newRole, projectId, userId } = req.body

    if(!newRole || !projectId || !userId){
        throw new ApiError(404, "project member info is  required")
    }
    
    if(!AvailableUserRoles.includes(newRole)){
        throw new ApiError(401, "Invalid role")
    }

    const projectmember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(req.user._id),
    })

    if(!projectmember){
        throw new ApiError(404, "project member is required")
    }

    ProjectMember.role = newRole

    await ProjectMember.save({ velidateBeforeSave: true })
    
    return res.status(200).json(new ApiResponse(
        200,
        {
            role: ProjectMember.newRole,
            project: ProjectMember.project,
            user: ProjectMember.user,
        }
    ))
});


const deleteMember = asyncHandler(async (req, res) => {
    const { projectMemberId } = req.params

    


    if(!projectMemberId){
        throw new ApiError(404, "project id is required")
    }

    const delProjectMember = await ProjectMember.findByIdAndDelete(projectMemberId)

    if(!delProjectMember){
        throw new ApiError(404, "delete Project member is required")
    }

    await redis.del(`projectMember:${projectMemberId}`)

    return res.status(201).json(
        new ApiResponse(201,
            {
                delProjectMember
            },    
            "delete project member successfully")
    )

});

export {
    getProjects,
    getProjectById,
    createProjectMenbers,
    createProject,
    updateProject,
    deleteProject,
    addMemberToProject,
    getProjectMembers,
    updateMemberRole,
    updateProjectMembers,
    deleteMember
}