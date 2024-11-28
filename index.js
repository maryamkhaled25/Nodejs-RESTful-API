const http = require('http')
const fs = require('fs')


// let users = [{Name:"Ahmed",Email:"Ahmed@route",Password:"123",DepId:1,id:1}]
let users = JSON.parse(fs.readFileSync('./students.json'))

// let courses = [{id:1,name:"AI",content:"this is ai",departmentID:1}]
let courses = JSON.parse(fs.readFileSync('./courses.json'))

// let departments = [{id:1,name:"CS"}]
let departments = JSON.parse(fs.readFileSync('./departments.json'))
// fs.writeFileSync('./departments.json',JSON.stringify(departments))


const server = http.createServer((req,res)=>{
    const {method,url} = req

    const sendResponse= (msg,code)=>{
        res.statusCode = code
        return res.end(JSON.stringify(msg))
    }

    //================= 1- Get All Students ======================
    if( url== '/students' && method == 'GET'){
        
        sendResponse(users,200)
    } 

    //================ 2- Get Student by ID ====================
    else if (url.startsWith('/students') && method == 'GET'){
        let studentID = Number(url.split('/')[2])
        let index = users.findIndex((obj)=> obj.id == studentID)

        if (index == -1) sendResponse({message:"ID not found!"},404)
            
        sendResponse(users[index],200)
    } 
    
    //=============== 3- Get Student with his Department and Courses==========
    else if (url == '/studentCard' && method == 'GET'){

        const studentCard = users.map((ele)=> {

            const depart = departments.find((dep) => {return dep.id == ele.DepId}) //find => unique id , return 1 ele
            const cour = courses.filter((cor)=>{return cor.departmentID == ele.DepId}) //filter => return all courses
            
            delete ele.DepId
            //to add the dep and cour to each student object in array
            return {...ele,DepartmentInfo:depart,CoursesInfo:cour} 

        })
        sendResponse(studentCard,200)

    }

    //================ 4- Add Students ===========================   
    else if (url.startsWith('/students') && method == 'POST'){
        req.on('data',(chunk)=>{
           let user = JSON.parse(chunk)
           user.id = users.length + 1

           users.push(user)
           fs.writeFileSync('./students.json',JSON.stringify(users))

           sendResponse({message:"Student added Successfully"},201)
        })
    }

    //================ 5- Update Students =======================
    else if (url.startsWith('/students' ) && method == 'PUT'){
        let userID = Number(url.split('/')[2])
        let index = users.findIndex((obj)=> obj.id == userID)

        if (index == -1 ){
            sendResponse({message:'Not found'},404)
        }

        req.on('data',(chunk)=>{
            let user = JSON.parse(chunk)

            // users[index].Name = user.Name
            // users[index].id = user.id
            // users[index].Email = user.Email
            // users[index].Password = user.Password
            // users[index].DepId = user.DepId

            users[index] = {...users[index],...user}

            fs.writeFileSync('students.json',JSON.stringify(users))
            sendResponse({message:'Updated'},200)
        })

    }


    //================ 6- Delete Students ===========================
    else if (url.startsWith ('/students') && method == 'DELETE'){
        let userID = Number(url.split('/')[2]) 

        let index = users.findIndex((obj)=>obj.id == userID )
        
        if ( index == -1) 
            return sendResponse({message:"Not found"},404)

        users.splice(index,1)

        fs.writeFileSync('students.json',JSON.stringify(users))
        sendResponse({message:"Deleted Successfully"},200)


    }


 

    //================ 1- Get All Courses =========================
    else if (url == '/courses' && method == 'GET'){

        sendResponse(courses,200)

    }

    //=============== 2- Get Course By ID ========================
    else if (url.startsWith('/courses') && method == 'GET'){
        
        let courseID = url.split('/')[2]
        let index = courses.findIndex((obj)=> obj.id == courseID)

        if ( index == -1 ) sendResponse({message:"ID not found!"},404)

        sendResponse(courses[index],200)
    }

    //================ 3- Add Course =========================
    else if (url =='/courses' && method == 'POST'){
        req.on('data',(chunk)=>{
            let course = JSON.parse(chunk) //object

            course.id = courses.length + 1

            courses.push(course); // Add to the array
            fs.writeFileSync('./courses.json', JSON.stringify(courses), 'utf8') //string

            sendResponse({ message: 'Course Added Successfully' }, 201)
        })

    }

    //=============== 4- Update Course ========================
    else if (url.startsWith('/courses') && method == 'PUT'){
        let courseID = url.split('/')[2]
        let index = courses.findIndex((obj)=> obj.id == courseID)
        
        req.on('data',(chunk)=>{
            let course = JSON.parse(chunk)
            courses[index] = {...courses[index],...course}

            fs.writeFileSync('./courses.json',JSON.stringify(courses))
            sendResponse({message:"Course is Updated Successfully"},200)
        })
    }

    //=============== 5- Delete Course ========================
    else if (url.startsWith('/courses') && method == 'DELETE'){
        let courseID = url.split('/')[2]
        let index = courses.findIndex((obj)=> obj.id == courseID)

        if (index == -1) sendResponse({message:"ID not found!"})
        courses.splice(index,1)

        fs.writeFileSync('./courses.json',JSON.stringify(courses))
        sendResponse({message:"Deleted Successfully"},200)
    }

 
 
    //=============== 1- Get All Departments ========================
    else if (url === '/departments' && method == 'GET'){
        sendResponse(departments,200)
    }

    //=============== 2- Get Department By ID ========================
    else if (url.startsWith('/departments') && method == 'GET'){

       let departmentID = url.split('/')[2]
       let index = departments.findIndex((obj)=> obj.id == departmentID)

       if (index == -1) sendResponse({message:"ID not found"},404)
       sendResponse(departments[index],200) 
    }

    //=============== 3- Add Department ========================
    else if (url.startsWith('/departments') && method == 'POST'){
        req.on('data',(chunk)=>{
            let department = JSON.parse(chunk)

            department.id = departments.length +1
            departments.push(department)

            fs.writeFileSync('./departments.json',JSON.stringify(departments))
            sendResponse({message:"Added Successfully"},201)
        })
    }   

    //=============== 4- Update Department =====================
    else if (url.startsWith('/departments') && method == 'PUT'){
        let departmentID = url.split('/')[2]
        let index = departments.findIndex(obj=> obj.id == departmentID)

        if (index == -1 ) sendResponse({message:'ID not found'},404)
        req.on('data',(chunk)=>{
            let department = JSON.parse(chunk)
            
            departments[index] = {...departments[index],...department}

            fs.writeFileSync('./departments.json',JSON.stringify(departments))
            sendResponse({message:'Updated Successfully'},200)
        })
    }

    //============== 5- Delete Department =====================
    else if (url.startsWith('/departments') && method == 'DELETE'){
        let departmentID = url.split('/')[2]
        let index = departments.findIndex(obj => obj.id == departmentID)

        if (index == -1) sendResponse({message:"ID not found"},404)
        departments.splice(index,1)
        
        fs.writeFileSync('./departments.json',JSON.stringify(departments))
        sendResponse({message:"Deleted Successfully"},200)
    }

    else {
        sendResponse({message:"Invalid URL... "},404)
    }
})


server.listen(3000,(Err)=>{
    if(Err) return console.log("Error");
    console.log("Surver is Running...");
    
})