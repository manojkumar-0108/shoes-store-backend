const { StatusCodes } = require('http-status-codes');
const { AppError, InternalServerError } = require('../errors/');
const { auth, enums } = require('../utils/common/');
const { UserRepository, UserRoleRepository, RoleRepository } = require('../repositories');


class UserService {

    constructor() {
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
        this.userRoleRepository = new UserRoleRepository();
    }

    async createUser(data) {

        try {
            //checking if user already present

            const findUser = await this.userRepository.getUserByEmail(data.email);

            if (findUser) {
                throw new AppError(
                    StatusCodes.NOT_FOUND,
                    'Cannot register new account',
                    [`User account already exists for given email ${data.email}`]);
            }

            const user = await this.userRepository.create(data);
            const role = await this.roleRepository.getRoleByName(enums.USER_ROLES.CUSTOMER);
            const user_role = {
                user_id: user.id,
                role_id: role.id
            }
            await this.userRoleRepository.create(user_role);
            const jwt = auth.generateToken({ id: user.id });
            return jwt;
        } catch (error) {

            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];

                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);

            }

            throw new InternalServerError("Cannot register a new user");
        }
    }

    async signIn(data) {

        try {

            /**
             * Step 1: Check if user is present or not
             * Step 2: Match Password
             * Step 3: Generate JWT Token
             */
            const user = await this.userRepository.getUserByEmail(data.email);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Unable to sing in', ['No user found for the given email.']);
            }

            const matchPassword = auth.checkPassword(data.password, user.password);
            if (!matchPassword) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Unable to sing in', ['Incorrect Password']);
            }

            const jwt = auth.generateToken({ id: user.id });
            return jwt;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'SequelizeValidationError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);

            }

            throw new InternalServerError("Cannot sign in ...");
        }
    }

    async isAuthenticated(token) {

        try {

            if (!token) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['Missing JWT token']);
            }

            const response = auth.verifyToken(token);
            const user = await this.userRepository.get(response.id);
            if (!user) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['No user found']);
            }

            const userResponse = {
                id: user.dataValues.id,
                name: user.dataValues.name,
                email: user.dataValues.email
            }
            return userResponse;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'JsonWebTokenError') {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['Invalid JWT token']);
            }

            if (error.name == 'TokenExpiredError') {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['JWT token expired']);
            }

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];

                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);

            }
            throw new InternalServerError("Authentication failed");
        }
    }

    async addRoleToUser(data) {

        try {

            const user = await this.userRepository.get(data.userId);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Cannot add role', [`No user found for the given id : ${data.userId}`]);
            }

            const role = await this.roleRepository.getRoleByName(data.role);
            console.log(role);
            if (!role) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Cannot find role', [`No role found for the given role : ${data.role}`]);
            }

            //creating user role object, in userRoles table we need user_id and role_id
            const user_role = {
                user_id: user.id,
                role_id: role.id
            }

            //If user already has the role
            const alreadyHasRole = await this.userRoleRepository.getUserRole(user.id, role.id);

            if (alreadyHasRole) {
                throw new AppError(StatusCodes.BAD_REQUEST, `Role already associated`, [`User is already ${role.name}`]);
            }
            return await this.userRoleRepository.create(user_role);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'SequelizeValidationError') {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
            }
            throw new InternalServerError("Cannot add role to user");
        }
    }

    async revokeRoleFromUser(data) {

        try {

            const user = await this.userRepository.get(data.userId);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [`No user found for the given id : ${data.id}`]);
            }

            const role = await this.roleRepository.getRoleByName(data.role);
            if (!role) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Cannot find role', [`No role found for the given role : ${data.role}`]);
            }

            if (role.name === enums.USER_ROLES.CUSTOMER) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Cannot revoke role', [`Customer role cannot be revoked`]);
            }

            //If user already has the role
            const isRolePresent = await this.userRoleRepository.getUserRole(user.id, role.id);
            if (!isRolePresent) {
                throw new AppError(StatusCodes.BAD_REQUEST, `User Role Missing`, [`User is not having ${role.name} role`]);
            }

            return await this.userRoleRepository.destroy(isRolePresent.id);

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];

                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
            }
            throw new InternalServerError("Cannot add role to user");
        }
    }

    async isAdmin(id) {

        try {
            const user = await this.userRepository.get(id);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [`No user found for the given id : ${id}`]);
            }

            const adminRole = await this.roleRepository.getRoleByName(enums.USER_ROLES.ADMIN);
            const sellerRole = await this.roleRepository.getRoleByName(enums.USER_ROLES.SELLER);

            if (!adminRole) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Cannot find role', [`No role found for the admin `]);
            }

            if (!sellerRole) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Cannot find role', [`No role found for the seller `]);
            }

            //checking if user has admin roles or not
            const userRole = await this.userRoleRepository.getUserRole(user.id, [adminRole.id, sellerRole.id]);

            if (!userRole) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'User not authorized', [`User is not authorized to perform this action, admin privilages required`]);
            }
            return userRole.user_id === user.id;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];

                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
            }
            throw new InternalServerError("No user found");
        }
    }


    async isCustomer(id) {

        try {
            const user = await this.userRepository.get(id);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [`No user found for the given id : ${id}`]);
            }

            const customerRole = await this.roleRepository.getRoleByName(enums.USER_ROLES.CUSTOMER);


            if (!customerRole) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Cannot find role', [`No role found for the customer `]);
            }


            //checking if user has customer roles or not
            const userRole = await this.userRoleRepository.getUserRole(user.id, [customerRole.id]);
            return userRole != null;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'SequelizeValidationError') {

                let explanation = [];

                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });

                throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
            }
            throw new InternalServerError("No user found");
        }
    }
}



module.exports = UserService;