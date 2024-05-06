import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditAnswerRequest {
  authorId: string
  answerId: string
  content: string
  attachmentIds: string[]
}

type EditAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>

export class EditAnswer {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly attachmentsRepo: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentIds,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.value !== authorId) {
      return left(new NotAllowedError())
    }

    // Assign the current attachments to the question
    const currentAttachments =
      await this.attachmentsRepo.findManyByAnswerId(answerId)
    answer.attachments = new AnswerAttachmentList(currentAttachments)

    answer.content = content

    // Update the question attachments, creating new and removed attachment lists
    answer.attachments.update(
      attachmentIds.map(
        (id) =>
          new AnswerAttachment({
            answerId: answer.id,
            attachmentId: new UniqueEntityId(id),
          }),
      ),
    )

    await this.answersRepository.save(answer)

    return right({ answer })
  }
}
