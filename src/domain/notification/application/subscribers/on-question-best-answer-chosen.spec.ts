import { makeAnswer } from 'tests/factories/make-answer'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { InMemoryNotificationsRepository } from 'tests/repositories/in-memory-notifications-repository'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

import { DomainEvents } from '@/core/events/domain-events'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'

import { SendNotification } from '../use-cases/send-notification'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotification: SendNotification

describe('OnQuestionBestAnswerChosen', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotification = new SendNotification(inMemoryNotificationsRepository)

    DomainEvents.clearHandlers()
    DomainEvents.clearMarkedAggregates()

    new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotification)
  })

  it('should send a notification when an answer is created', async () => {
    const sendNotificationExecuteSpy = vi.spyOn(sendNotification, 'execute')

    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    const answer = makeAnswer({ questionId: question.id })
    await inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id
    await inMemoryQuestionsRepository.save(question)

    expect(sendNotificationExecuteSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        recipientId: answer.authorId.toString(),
        title: expect.any(String),
        content: expect.stringContaining(question.abbreviatedTitle),
      }),
    )
  })
})
