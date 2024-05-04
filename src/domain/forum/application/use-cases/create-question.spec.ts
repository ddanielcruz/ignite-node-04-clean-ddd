import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from './create-question'

describe('CreateQuestion', () => {
  let sut: CreateQuestionUseCase
  let inMemoryQuestionsRepo: InMemoryQuestionsRepository

  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepo)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      title: 'any_title',
      content: 'any_content',
      authorId: 'any_instructor_id',
    })

    expect(question.title).toBe('any_title')
    expect(question.content).toBe('any_content')
    expect(question.authorId.toString()).toBe('any_instructor_id')
    expect(inMemoryQuestionsRepo.questions[0].id.equals(question.id)).toBe(true)
  })
})
