import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { DeleteAnswerUseCase } from './delete-answer'

describe('DeleteAnswer', () => {
  let sut: DeleteAnswerUseCase
  let inMemoryAnswersRepo: InMemoryAnswersRepository

  beforeEach(() => {
    inMemoryAnswersRepo = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepo)
  })

  it('should be able to delete a answer', async () => {
    const createdAnswer = makeAnswer()
    await inMemoryAnswersRepo.create(createdAnswer)

    await sut.execute({
      answerId: createdAnswer.id.value,
      authorId: createdAnswer.authorId.value,
    })

    expect(inMemoryAnswersRepo.answers).toHaveLength(0)
  })

  it('should throw if answer is not found', async () => {
    const promise = sut.execute({
      answerId: 'any_answer_id',
      authorId: 'any_author_id',
    })
    await expect(promise).rejects.toThrow()
  })

  it('should throw if author is not the same as the answer author', async () => {
    const createdAnswer = makeAnswer()
    await inMemoryAnswersRepo.create(createdAnswer)

    const promise = sut.execute({
      answerId: createdAnswer.id.value,
      authorId: 'any_author_id',
    })
    await expect(promise).rejects.toThrow()
  })
})
