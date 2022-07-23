"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const property_controller_1 = require("../controllers/property.controller");
const fileUpload_middleware_1 = __importDefault(require("../middlewares/fileUpload.middleware"));
const property_schema_1 = require("../schemas/property.schema");
const propertyRouter = (0, express_1.Router)();
propertyRouter.post('/properties/add', fileUpload_middleware_1.default, property_controller_1.createPropertyHandler);
propertyRouter.get('/properties/all', (0, zod_express_middleware_1.processRequestQuery)(property_schema_1.getAllPropertiesSchema.query), property_controller_1.getAllPropertiesHandler);
propertyRouter.get('/properties/single/:id', (0, zod_express_middleware_1.processRequestParams)(property_schema_1.getSinglePropertySchema.params), property_controller_1.getSinglePropertyHandler);
propertyRouter.patch('/properties/update/:id', fileUpload_middleware_1.default, property_controller_1.updatePropertyHandler);
propertyRouter.delete('/properties/delete/:id', (0, zod_express_middleware_1.processRequestParams)(property_schema_1.deletePropertySchema.params), property_controller_1.deletePropertyHandler);
propertyRouter.delete('/properties/delete-file/:id/:type/:key', (0, zod_express_middleware_1.processRequestParams)(property_schema_1.deleteSpecificFileFromPropertySchema.params), property_controller_1.deleteSpecificFileFromPropertyHandler);
propertyRouter.put('/properties/move-property-to-listings/:id', (0, zod_express_middleware_1.processRequestParams)(property_schema_1.movePropertyToListingsSchema.params), property_controller_1.movePropertyToListingsHandler);
exports.default = propertyRouter;
