"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDBConnect = () => {
    try {
        mongoose_1.default.connect("mongodb://localhost:27017/", {});
        console.log("MongoDB - Connected");
    }
    catch (error) {
        console.log("Error - MongoDB Connection " + error);
    }
};
exports.default = mongoDBConnect;
