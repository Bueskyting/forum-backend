import express from 'express'
import { getQuestions, createQuestion, deleteQuestion } from '../controllers/question.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/', getQuestions)
router.post('/', authMiddleware, createQuestion)
router.delete('/:id', authMiddleware, deleteQuestion)

export default router