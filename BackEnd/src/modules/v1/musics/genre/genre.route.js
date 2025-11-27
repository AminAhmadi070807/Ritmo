"use strict";

const express = require('express');
const authGuard = require("../../../../middlewares/guard/auth.guard");
const roleGuard = require("../../../../middlewares/guard/role.guard");
const controller = require("./genre.controller");
const multer = require("multer");
const diskStorage = require("../../../../utils/upload.util");

const router = express.Router();

const upload = multer({ storage: diskStorage('genres'), limits: { fileSize: 1024 * 1024 * 10 } });

router.route('/')
    .post(authGuard, roleGuard("ADMIN"), upload.single("covers"), controller.create)
    // .get(controller.getAll)

// router.route('/:id').delete(authGuard, roleGuard("ADMIN"), controller.remove)

module.exports = router