const express = require('express')
const crypto = require('crypto')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const db = require('./db')

const app = express()
let gfs

app.use(express.json())

db.once("open", () => {

})
