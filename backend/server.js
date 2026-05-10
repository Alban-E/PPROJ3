const app = require('./app')

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server running on port ${process.env.BACKEND_PORT}`)
  console.log(`http://localhost:${process.env.BACKEND_PORT}/supify/api`)
})