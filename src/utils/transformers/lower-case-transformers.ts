import { TransformFnParams } from 'class-transformer/types/interfaces'
import { MaybeType } from '../type/maybe.type'

export const lowerCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toLowerCase().trim()
