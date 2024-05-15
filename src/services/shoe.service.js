const { StatusCodes } = require('http-status-codes');
const fs = require('fs');

const { AppError, InternalServerError } = require('../errors');
const { ShoeRepository } = require('../repositories');
const { where } = require('sequelize');




class ShoeService {

    constructor(shoeRepository) {
        this.shoeRepository = new ShoeRepository();
    }

    async createShoe(data) {

        try {

            const shoe = await this.shoeRepository.create(data);
            return shoe;

        } catch (error) {

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
            }

            throw new InternalServerError("Cannot create a new Shoe");
        }
    }

    async getAllShoes() {

        try {

            const shoes = await this.shoeRepository.getAll();
            return shoes;
        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "No shoes found", []);
            }

            throw new InternalServerError("Cannot get the shoes");
        }
    }

    async getShoe(id) {

        try {
            const shoe = await this.shoeRepository.get(id);
            return shoe;

        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot fetched the shoe", ["Shoe requested is not present"]);
            }

            throw new InternalServerError("Cannot get the shoe");
        }
    }

    async removeShoe(id) {

        try {

            const shoe = await this.shoeRepository.findByPk(id);

            fs.unlink(`uploads/${shoe.image}`, () => { });

            const response = await this.shoeRepository.destroy({
                where: {
                    id: id
                }
            });
            return response;

        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot delete the shoe", ["Shoe requested to delete is not present"]);
            }
            throw new InternalServerError("Cannot delete the shoe");
        }
    }

    async updateBook(key, data) {

        try {

            const shoe = await this.shoeRepository.update(key, data);
            return shoe;

        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                throw new AppError(error.statusCode, "Cannot update the shoe", ["Shoe requested to update is not present"]);
            }

            throw new InternalServerError("Cannot update the shoe");
        }
    }

}



module.exports = ShoeService;