"use strict"

const response = require('../../../helpers/response.helper')
const refreshModel = require('../token/token.model')
const adminModel = require('../admins/admin.model')
const userModel = require('../users/user.model')
const deleteFile = require("../../../utils/delete.file");

module.exports.getMe = async (req, res, next) => {
    try {
        const user = req.user

        const role = await adminModel.findOne({ user: user.uuid })

        return response(res, 200, null, { ...user, role : role.role })
    }
    catch (error) {
        next(error)
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const user = req.user

        await refreshModel.deleteOne({ user: user.uuid }).lean()

        return res.redirect('/')
    }
    catch (error) {
        next(error)
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const user = req.user

        const { username, fullName, email, bio } = req.body

        const profile = req.file

        const userBackInfo = await userModel.findOne({ where: { uuid: user.uuid }, raw: true})

        if (profile) {
            await userModel.update({
                username,
                fullName,
                email,
                bio,
                profile: '/uploads/profiles/' + profile.filename
            }, {where: {uuid: user.uuid}})
            if (userBackInfo.profile !== "/uploads/profiles/profile.png") await deleteFile('BackEnd/public', userBackInfo.profile)
        }
        else await userModel.update({username, fullName, email, bio : bio || ""}, {where: {uuid: user.uuid}})

        return res.redirect('/settings/setting/profile')
    }
    catch (error) {
        next(error)
    }
}