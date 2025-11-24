"use strict"

const categoryModel = require('./category.model')
const response = require('../../../../helpers/response.helper')
const crypto = require('crypto')
const writeFileIcon = require('../../../../utils/icon.file')

module.exports.create = async (req, res, next) => {
    try {
        let { title, href, icon } = req.body

        const numberOfCategories = await categoryModel.count({raw: true})

        if (+numberOfCategories === 10) return response(res, 200, "The maximum number of categories should be 10.")

        const randomId = crypto.randomBytes(8).toString('hex');

        icon = icon.replace(/^<svg/, `<symbol id="${randomId}"`).replace(/<\/svg>$/, '</symbol>');

        const result = writeFileIcon.create(icon)

        if (result.status !== 200) return response(res, result.status, result.message)

        await categoryModel.create({
            title,
            href,
            icon: randomId,
        })

        return response(res, 201, "Created category successfully")
    }
    catch (error) {
        next(error)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const categories = await categoryModel.findAll({ raw: true })

        return response(res, 200, null, { categories })
    }
    catch (error) {
        next(error)
    }
}

module.exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params

        if (isNaN(id)) return response(res, 400, "The id is not a number")

        const category = await categoryModel.findOne({
            where: {
                id: id
            },
            raw: true,
        })

        if (!category) return response(res, 404, "The category does not exist")

        const result = writeFileIcon.delete(category.icon)

        if (result.status !== 200) return response(res, result.status, result.message)

        await categoryModel.destroy({where: {id: id}})

        return response(res, 200, 'deleted category successfully.', { category })
    }
    catch (error) {
        next(error)
    }
}