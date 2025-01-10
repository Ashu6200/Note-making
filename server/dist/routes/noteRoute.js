"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const noteController_1 = require("../controllers/noteController");
const noteRouter = express_1.default.Router();
noteRouter.post("/add", authMiddleware_1.default, noteController_1.createNote);
noteRouter.get("/all", authMiddleware_1.default, noteController_1.getNotes);
noteRouter.delete("/delete/:id", authMiddleware_1.default, noteController_1.deleteNote);
exports.default = noteRouter;
