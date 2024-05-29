import Answer from '../models/Answer.js'

export const getAnswers = async (req, res) => {
    const { id } = req.params
    try {
        const answers = await Answer.find({ question_id: id }).populate('user_id', 'name')
        res.status(200).json(answers)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createAnswer = async (req, res) => {
    const { answer_text } = req.body
    const { id } = req.params
    const user_id = req.userId
    const newAnswer = new Answer({ answer_text, question_id: id, user_id })
    try {
        await newAnswer.save()
        res.status(201).json(newAnswer)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteAnswer = async (req, res) => {
    const { id } = req.params
    try {
        const answer = await Answer.findById(id)
        if (!answer) return res.status(404).json({ message: 'Answer not found' })
        if (answer.user_id.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' })

        await Answer.findByIdAndRemove(id)
        res.status(200).json({ message: 'Answer deleted successfully' })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// Added gained_likes_number
export const updateLikes = async (req, res) => {
    const { id } = req.params
    const { likes } = req.body

    if (typeof likes !== 'number') {
        return res.status(400).json({ error: 'Invalid input' })
    }

    try {
        const answer = await Answer.findByIdAndUpdate(
            id,
            { gained_likes_number: likes },
            { new: true }
        )

        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' })
        }

        res.json(answer)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Added gained_dislikes_number
export const updateDislikes = async (req, res) => {
    const { id } = req.params
    const { dislikes } = req.body

    if (typeof dislikes !== 'number') {
        return res.status(400).json({ error: 'Invalid input' })
    }

    try {
        const answer = await Answer.findByIdAndUpdate(
            id,
            { gained_dislikes_number: dislikes },
            { new: true }
        )

        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' })
        }

        res.json(answer)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}