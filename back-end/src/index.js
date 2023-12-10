const express = require('express')
const app = express()
app.use(express.json())
const port = 4000

app.get('/tagsections', (req, res) => {
    res.send('Lấy danh sách các tag section')
})

app.get('/tagsections/:id', (req, res) => {
    res.send('Lấy thông tin chi tiết 1 tag section')
})

app.post('/tagsections', (req, res) => {
    res.send('Tạo mới 1 tag section')
})

app.put('/tagsections/:id', (req, res) => {
    res.send('Cập nhật thông tin 1 tag section')
})

app.delete('/tagsections/:id', (req, res) => {
    res.send('Xóa 1 tag section')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})