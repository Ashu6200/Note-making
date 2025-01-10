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
exports.deleteNote = exports.getNotes = exports.createNote = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const apiError_1 = require("../utils/apiError");
const noteModel_1 = __importDefault(require("../models/noteModel"));
const apiResponse_1 = require("../utils/apiResponse");
;
const createNote = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userId = req.userId;
    if (!userId) {
        const error = new Error("User not authenticated");
        return (0, apiError_1.apiError)(next, error, req, 402);
    }
    try {
        const note = new noteModel_1.default({ title, content, userId, });
        yield note.save();
        return (0, apiResponse_1.apiResponse)(req, res, 200, "Note created successfully", {});
    }
    catch (error) {
        return (0, apiError_1.apiError)(next, error, req, 500);
    }
}));
exports.createNote = createNote;
const getNotes = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        const error = new Error("User not authenticated");
        return (0, apiError_1.apiError)(next, error, req, 402);
    }
    try {
        const notes = yield noteModel_1.default.find({ userId: userId });
        return (0, apiResponse_1.apiResponse)(req, res, 200, "All Notes", notes);
    }
    catch (error) {
        return (0, apiError_1.apiError)(next, error, req, 500);
    }
}));
exports.getNotes = getNotes;
const deleteNote = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
        const error = new Error("User not authenticated");
        return (0, apiError_1.apiError)(next, error, req, 402);
    }
    try {
        const note = yield noteModel_1.default.findOneAndDelete({ _id: id, userId });
        if (!note) {
            const error = new Error("Note not found");
            return (0, apiError_1.apiError)(next, error, req, 404);
        }
        return (0, apiResponse_1.apiResponse)(req, res, 200, "Note deleted successfully", {});
    }
    catch (error) {
        return (0, apiError_1.apiError)(next, error, req, 500);
    }
}));
exports.deleteNote = deleteNote;
