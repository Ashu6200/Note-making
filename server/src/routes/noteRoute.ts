import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { createNote, deleteNote, getNotes } from '../controllers/noteController';

const noteRouter = express.Router();

noteRouter.post("/add", authMiddleware, createNote)
noteRouter.get("/all", authMiddleware, getNotes)
noteRouter.delete("/delete/:id", authMiddleware, deleteNote)

export default noteRouter
