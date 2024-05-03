import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

describe('GetQuestionBySlug', () => {
  let sut: GetQuestionBySlugUseCase
  let inMemoryQuestionsRepo: InMemoryQuestionsRepository

  beforeEach(() => {
    inMemoryQuestionsRepo = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepo)
  })

  it('should be able to get a question by slug', async () => {
    const createdQuestion = makeQuestion({ slug: Slug.create('any_slug') })
    await inMemoryQuestionsRepo.create(createdQuestion)

    const { question } = await sut.execute({ slug: 'any_slug' })

    expect(question.id.equals(createdQuestion.id)).toBe(true)
  })

  it('should throw if question is not found', async () => {
    const promise = sut.execute({ slug: 'any_slug' })
    await expect(promise).rejects.toThrow()
  })
})
