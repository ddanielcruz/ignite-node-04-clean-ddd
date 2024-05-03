import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { DeleteQuestionUseCase } from './delete-question'

describe('DeleteQuestion', () => {
  let sut: DeleteQuestionUseCase
  let inMemoryQuestionsRepo: InMemoryQuestionsRepository

  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepo)
  })

  it('should be able to delete a question', async () => {
    const createdQuestion = makeQuestion()
    await inMemoryQuestionsRepo.create(createdQuestion)

    await sut.execute({
      questionId: createdQuestion.id.value,
      authorId: createdQuestion.authorId.value,
    })

    expect(inMemoryQuestionsRepo.questions).toHaveLength(0)
  })

  it('should throw if question is not found', async () => {
    const promise = sut.execute({
      questionId: 'any_question_id',
      authorId: 'any_author_id',
    })
    await expect(promise).rejects.toThrow()
  })

  it('should throw if author is not the same as the question author', async () => {
    const createdQuestion = makeQuestion()
    await inMemoryQuestionsRepo.create(createdQuestion)

    const promise = sut.execute({
      questionId: createdQuestion.id.value,
      authorId: 'any_author_id',
    })
    await expect(promise).rejects.toThrow()
  })
})
