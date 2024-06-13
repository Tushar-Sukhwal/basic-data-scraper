"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    applicationNumber: {
        type: String,
        required: true,
    },
    allIndiaRank: {
        type: String,
        required: true,
    },
    marks: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
