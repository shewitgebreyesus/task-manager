const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/routers/user')
const taskRouter = require('./src/routers/task')

const app = express()
const port = process.env.Port || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('surver is running on port' + port );
}) 
 
// const bcrypt = require('bcryptjs')
// const myFunction = async()=> {
//     const password = 'Red12345!' 
//     const hashedPassword = await bcrypt.hash(password, 8) 
    
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('red1234!', hashedPassword)
//     console.log(isMatch)
// }
// myFunction()
const jwt = require('jsonwebtoken')
const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'},'this is my new cours')
console.log(token)
}
myFunction()