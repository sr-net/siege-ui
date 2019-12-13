/* prettier-ignore-start */
/* eslint-disable */
/* THIS IS A GENERATED FILE */
export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string
}

export type Author = {
  __typename?: 'Author'
  type: AuthorType
  name: Scalars['String']
  url?: Maybe<Scalars['String']>
}

export enum AuthorType {
  Name = 'Name',
  YouTube = 'YouTube',
  Twitch = 'Twitch',
  Reddit = 'Reddit',
}

export enum Gamemode {
  Bombs = 'Bombs',
  Hostage = 'Hostage',
  Areas = 'Areas',
}

export type Mutation = {
  __typename?: 'Mutation'
  likeStrat?: Maybe<Strat>
  unlikeStrat?: Maybe<Strat>
}

export type MutationLikeStratArgs = {
  uuid: Scalars['ID']
}

export type MutationUnlikeStratArgs = {
  uuid: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  strat?: Maybe<Strat>
  strats: StratPage
  submission?: Maybe<Strat>
}

export type QueryStratArgs = {
  uuid?: Maybe<Scalars['ID']>
  shortId?: Maybe<Scalars['Int']>
  atk?: Maybe<Scalars['Boolean']>
  def?: Maybe<Scalars['Boolean']>
  gamemode?: Maybe<Gamemode>
  excludeShortIds?: Maybe<Array<Scalars['Int']>>
  random?: Maybe<Scalars['Boolean']>
}

export type QueryStratsArgs = {
  uuid?: Maybe<Scalars['ID']>
  shortId?: Maybe<Scalars['Int']>
  atk?: Maybe<Scalars['Boolean']>
  def?: Maybe<Scalars['Boolean']>
  gamemode?: Maybe<Gamemode>
  excludeShortIds?: Maybe<Array<Scalars['Int']>>
  page?: Maybe<Scalars['Int']>
}

export type Strat = {
  __typename?: 'Strat'
  uuid: Scalars['ID']
  shortId: Scalars['Int']
  title: Scalars['String']
  description: Scalars['String']
  author: Author
  atk: Scalars['Boolean']
  def: Scalars['Boolean']
  gamemodes: Array<Gamemode>
  score: Scalars['Int']
  submission: Scalars['Boolean']
  acceptedAt?: Maybe<Scalars['DateTime']>
  liked: Scalars['Boolean']
}

export type StratPage = {
  __typename?: 'StratPage'
  items: Array<Strat>
  lastPage: Scalars['Int']
}

export type LikeStratMutationVariables = {
  uuid: Scalars['ID']
}

export type LikeStratMutation = { __typename?: 'Mutation' } & {
  likeStrat: Maybe<
    { __typename?: 'Strat' } & Pick<Strat, 'uuid' | 'score' | 'liked'>
  >
}

export type StratQueryVariables = {
  atk: Scalars['Boolean']
  def: Scalars['Boolean']
  gamemode: Gamemode
  exclude: Array<Scalars['Int']>
}

export type StratQuery = { __typename?: 'Query' } & {
  strat: Maybe<
    { __typename?: 'Strat' } & Pick<
      Strat,
      | 'uuid'
      | 'shortId'
      | 'title'
      | 'description'
      | 'gamemodes'
      | 'score'
      | 'liked'
    > & {
        author: { __typename?: 'Author' } & Pick<
          Author,
          'name' | 'type' | 'url'
        >
      }
  >
}

export type UnlikeStratMutationVariables = {
  uuid: Scalars['ID']
}

export type UnlikeStratMutation = { __typename?: 'Mutation' } & {
  unlikeStrat: Maybe<
    { __typename?: 'Strat' } & Pick<Strat, 'uuid' | 'score' | 'liked'>
  >
}
