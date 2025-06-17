import express from "express";
import { authMdw } from "../middleWare/authMdw";

const router = express();

// דף האתגרים שלי + דף הבית החלק בו מוצגים מעט מהאתגרים שלי
router.get('/personal', authMdw, (req,res) => {
    // req.user.id -> DB.find(id:req.user.id);
});

// 
router.put('/personal/:id')