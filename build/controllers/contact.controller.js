"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactHandler = exports.updateContactStatus = exports.getAllContactsHandler = exports.createNewContactHandler = void 0;
const contact_model_1 = require("../models/contact.model");
const logger_helper_1 = __importDefault(require("../helpers/logger.helper"));
const http_status_codes_1 = require("http-status-codes");
/* ---------------------------------- ANCHOR create new ---------------------------------- */
const createNewContactHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get input from user
        const { subject, name, email, phone, message } = req.body;
        // check if user has already submitted a contact request
        const existingContacts = yield contact_model_1.ContactModel.find({
            $or: [{ email }, { phone }],
        });
        if (existingContacts.length > 3) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                success: false,
                message: 'You have already submitted 3 contacts request wait until they are being processed',
                data: {},
            });
        }
        // create new contact request
        const newContact = yield contact_model_1.ContactModel.create({
            subject,
            name,
            email,
            phone,
            message,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Contact request submitted successfully',
            data: newContact,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            data: {},
        });
    }
});
exports.createNewContactHandler = createNewContactHandler;
/* ---------------------------- ANCHOR get all contacts ---------------------------- */
const getAllContactsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contact_model_1.ContactModel.find();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'All contacts fetched successfully',
            data: contacts,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            data: {},
        });
    }
});
exports.getAllContactsHandler = getAllContactsHandler;
/* ------------------------------ ANCHOR update status ----------------------------- */
const updateContactStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const contact = yield contact_model_1.ContactModel.findById(id);
        if (!contact) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'contact not found',
                data: {},
            });
        }
        contact.status = status;
        // update contact status
        contact.save();
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Contact status updated successfully',
            data: contact,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        if (err.errors.status.name === 'ValidatorError') {
            return res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({
                success: false,
                message: 'Status can be one of the following: Pending, In Progress, Completed',
                data: err,
            });
        }
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Contact not found Invalid Id',
            data: {},
        });
    }
});
exports.updateContactStatus = updateContactStatus;
/* ----------------------------- ANCHOR delete contact ---------------------------- */
const deleteContactHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedContact = yield contact_model_1.ContactModel.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'contact not found',
                data: {},
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: 'Contact deleted successfully',
            data: deletedContact,
        });
    }
    catch (err) {
        logger_helper_1.default.error(err);
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: 'Contact not found Invalid Id',
            data: {},
        });
    }
});
exports.deleteContactHandler = deleteContactHandler;
