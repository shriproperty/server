"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_express_middleware_1 = require("zod-express-middleware");
const tempUserController = __importStar(require("../controllers/tempUser.controller"));
const tempUser_schema_1 = require("../schemas/tempUser.schema");
const tempUserRouter = (0, express_1.Router)();
tempUserRouter.post('/temp-users/add', (0, zod_express_middleware_1.processRequestBody)(tempUser_schema_1.registerNewSchema.body), tempUserController.registerNewTempUserHandler);
tempUserRouter.get('/temp-users/all', tempUserController.getAllTempUsersHandler);
tempUserRouter.get('/temp-users/verify', tempUserController.verifyTempUserHandler);
tempUserRouter.patch('/temp-users/update-calling-status/:id', (0, zod_express_middleware_1.processRequestBody)(tempUser_schema_1.updateTempUserCallingStatusSchema.body), (0, zod_express_middleware_1.processRequestParams)(tempUser_schema_1.updateTempUserCallingStatusSchema.params), tempUserController.updateTempUserCallingStatusHandler);
tempUserRouter.delete('/temp-users/delete/:id', (0, zod_express_middleware_1.processRequestParams)(tempUser_schema_1.deleteTempUserSchema.params), tempUserController.deleteTempUserHandler);
exports.default = tempUserRouter;
