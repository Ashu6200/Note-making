import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { apiError } from "../utils/apiError";
import { CustomRequest } from "../types/types";
import NoteModel from "../models/noteModel";
import { apiResponse } from "../utils/apiResponse";
;

const createNote = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const userId = req.userId;
    if (!userId) {
        const error = new Error("User not authenticated")
        return apiError(next, error, req, 402);
    }
    try {
        const note = new NoteModel({ title, content, userId, });
        await note.save();
        return apiResponse(req, res, 200, "Note created successfully", {});
    } catch (error) {
        return apiError(next, error, req, 500);
    }
});


const getNotes = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    if (!userId) {
        const error = new Error("User not authenticated")
        return apiError(next, error, req, 402);
    }
    try {
        const notes = await NoteModel.find({ userId: userId })
        return apiResponse(req, res, 200, "All Notes", notes)
    } catch (error) {
        return apiError(next, error, req, 500);
    }
});

const deleteNote = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
        const error = new Error("User not authenticated")
        return apiError(next, error, req, 402);
    }
    try {
        const note = await NoteModel.findOneAndDelete({ _id: id, userId });
        if (!note) {
            const error = new Error("Note not found")
            return apiError(next, error, req, 404);
        }
        return apiResponse(req, res, 200, "Note deleted successfully", {})
    } catch (error) {
        return apiError(next, error, req, 500);
    }
});

export { createNote, getNotes, deleteNote };
