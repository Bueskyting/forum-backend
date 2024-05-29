import express from 'express'
import { getAnswers, createAnswer, deleteAnswer, updateLikes, updateDislikes } from '../controllers/answer.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/:id/answers', getAnswers)
router.post('/:id/answers', authMiddleware, createAnswer)
router.delete('/answer/:id', authMiddleware, deleteAnswer)
router.put('/answer/:id/likes', authMiddleware, updateLikes)  // Likes endpoint
router.put('/answer/:id/dislikes', authMiddleware, updateDislikes)  // Dislikes endpoint

export default router