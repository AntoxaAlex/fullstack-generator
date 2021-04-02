import React,{useContext,useState} from 'react';

const ProjectContext = React.createContext()

export const useProjectContext = () => {
    return useContext(ProjectContext)
}

const ProjectProvider = ({children}) => {

    const[activeTabs, setActiveTabs] = useState({
        generalInfo: true,
        checklist: false,
        decomposition: false,
        ui: false
    })

    const[formData, setFormData] = useState({
        title: "",
        purpose: "",
        frontend: {},
        backend: {},
        checklist: null,
        lastReloadDate: Date.now,
        workingTime: 0,
        date: null,
        theme:null
    })
    const[goals,setGoals] = useState([]);
    const[folders,setFolders] = useState([]);
    const[users,setUsers] = useState([]);
    const[projectViewState,setProjectView] = useState([])
    const[workingTime,setWorkingTime] = useState(null);
    const[modalForm, setModal] = useState({
        editGeneralInfo:{
            isModalActive:false,
            name: "",
        },
        fileCreateModal: {
            isModalActive: false
        },
        fileModal:{
            isModalActive:false,
            file: null
        },
        viewModal:{
            isModalActive:false,
            view: null,
            index:null
        },
        addUserModal:{
            isModalActive: false,
            index:""
        },
        addFolderModal:{
            isModalActive: false,
            index: null
        }
    })

    const[intedepData,setIntedepData] = useState([])

    const changeProjectSection = (sectionName) => {
        if(sectionName === "generalInfo"){
            setActiveTabs({generalInfo: true, checklist: false, ui: false, decomposition: false})
        }else if(sectionName === "checklist"){
            setActiveTabs({generalInfo: false, checklist: true, ui: false, decomposition: false})
        }else if(sectionName === "ui"){
            setActiveTabs({generalInfo: false, checklist: false, ui: true, decomposition: false})
        }else if(sectionName === "decomposition"){
            setActiveTabs({generalInfo: false, checklist: false, ui: false, decomposition: true})
        }
    }

    const editContent = (name) =>{
        setModal({...modalForm,editGeneralInfo: {isModalActive: true,name: name}})
    }

    const onChangeValue = (e) => {
        const{name, value} = e.target;
        setFormData({...formData,[name]: value});
    }
    const onChangeGoals = (e,i) => {
        const goalsArr = [...goals];
        goalsArr[i] = e.target.value;
        setGoals(goalsArr);
    }

    const onChangeUsers = (e,i) => {
        const{value} = e.target;
        const usersArr = [...users]
        usersArr[i].user = value
        setUsers(usersArr);
    }

    const openFileCreateModal = () =>{
        setModal({...modalForm, fileCreateModal:{isModalActive: true}})
    }
    const addNewDep = () =>{
        const newInterdep = [...intedepData]
        newInterdep.push({
            sender: "",
            receiver: "",
            action: ""
        })
        setIntedepData(newInterdep)
    }
    const addNewView = () => {
        const viewsArr = [...projectViewState]
        viewsArr.push({
            src: "",
            title: ""
        })
        setProjectView(viewsArr)
    }

    const addNewFolder = () => {
        const foldersArr = [...folders]
        foldersArr.push({
            section:"",
            title:"",
            files:[]
        })
        setFolders(foldersArr)
        setModal({...modalForm,addFolderModal: {isModalActive: true,index:folders.length === 0 ? 0 : folders.length-1}})
    }

    const removeTextView = (index) => {
        const viewsArr = [...projectViewState]
        viewsArr.splice(index,1)
        setProjectView(viewsArr)
    }

    const openFileModal = (file) =>{
        setModal({...modalForm, fileModal:{isModalActive: true,file: file}})
    }

    const openProjectView = (view,index) => {
        setModal({...modalForm,viewModal: {isModalActive: true,view: view,index: index}})
    }

    const onChangeFolder = (e,i) => {
        const{name,value} = e.target;
        const foldersArr = [...folders]
        foldersArr[i][name] = value
        setFolders(foldersArr)
    }

    const onChangeFolderFiles = (value,i) => {
        const foldersArr = [...folders]
        const filesArr = [...folders[i].files];
        filesArr.push({
            file:value
        });
        foldersArr[i].files = filesArr
        setFolders(foldersArr)
    }

    const openUserModal = () => {
        setUsers([...users,{
            user: ""
        }])
        setModal({...modalForm,addUserModal: {isModalActive: true,index:users.length}})
    }

    const deleteDepFile = (id) => {
        console.log(id)
        const array = [...intedepData]
        const newInterDep = array.filter(file=>file._id !== id)
        console.log(newInterDep)
        setIntedepData(newInterDep)

    }


    const onChangeInterdep = (e,index,id) => {
        const{name,value} = e.target;
        const newInterdep = [...intedepData]
        newInterdep[index][name] = value
        newInterdep[index].sender = id
        setIntedepData(newInterdep);
    }

    const onChangeViewTitle = (title,i) => {
        const viewsArr = [...projectViewState];
        viewsArr[i].title = title;
        setProjectView(viewsArr)
    }

    const onChangeProjectView = (src,i) => {
        const viewsArr = [...projectViewState];
        viewsArr[i].src = src;
        setProjectView(viewsArr)
    }


    return (
        <ProjectContext.Provider value={{
            activeTabs,
            formData,
            goals,
            folders,
            users,
            projectViewState,
            workingTime,
            modalForm,
            intedepData,
            setFormData,
            setWorkingTime,
            setIntedepData,
            setGoals,
            setProjectView,
            setUsers,
            setFolders,
            setModal,
            changeProjectSection,
            editContent,
            onChangeGoals,
            onChangeValue,
            onChangeUsers,
            openFileCreateModal,
            addNewDep,
            addNewView,
            addNewFolder,
            removeTextView,
            openFileModal,
            openProjectView,
            onChangeFolder,
            onChangeFolderFiles,
            openUserModal,
            deleteDepFile,
            onChangeInterdep,
            onChangeViewTitle,
            onChangeProjectView,

        }}>
            { children }
        </ProjectContext.Provider>
    );
};

export default ProjectProvider;
