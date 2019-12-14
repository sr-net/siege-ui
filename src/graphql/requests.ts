import {
  LikeStratMutation,
  LikeStratMutationVariables,
  StratQuery,
  StratQueryVariables,
  UnlikeStratMutation,
  UnlikeStratMutationVariables,
} from './generated'
import stratQuery from './strat.graphql'
import unlikeQuery from './unlike-strat.graphql'
import likeQuery from './like-strat.graphql'

const postGraphql = async <R, V>(query: string, variables: V) => {
  const response = await fetch('https://siege.stratroulette.net/graphql', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  return response.json() as { data?: R }
}

export const randomStratQuery = async (variables: StratQueryVariables) => {
  const result = await postGraphql<StratQuery, StratQueryVariables>(
    stratQuery,
    variables,
  )

  return result.data?.strat
}

export const toggleLikeMutation = async <B extends boolean>(
  liked: B,
  variables: LikeStratMutationVariables | UnlikeStratMutationVariables,
) => {
  const result = await postGraphql<
    LikeStratMutation | UnlikeStratMutation,
    typeof variables
  >(liked ? unlikeQuery : likeQuery, variables)

  return (
    (result.data as LikeStratMutation)?.likeStrat ??
    (result.data as UnlikeStratMutation)?.unlikeStrat
  )
}
