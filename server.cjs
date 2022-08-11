let app = require("express")()
let cors = require("cors")
let bodyParse = require("body-parser")
let fs = require("fs")
let api = fs.readFileSync("./api/api.json")
let apiObj = JSON.parse(api)

app.use(cors())
app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

app.get("/get", (req, res) => {
  res.send(api)
  console.log("GET request !")
})

app.post("/post", (req, res) => {
  let data = req.body
  apiObj = apiObj.map(obj => obj.id === data.id ? data : obj)
  api = JSON.stringify(apiObj)
  fs.writeFile("./api/api.json", api, () => {
    console.log("file has been saved")
  })
  res.statusCode = 200
  res.send(api)
  console.log("POST request !")
})

app.listen(3001, () => console.log("server has started !"))