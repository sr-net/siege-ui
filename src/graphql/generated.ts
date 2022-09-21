/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* THIS IS A GENERATED FILE */
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

export type Author = {
  readonly __typename: "Author"
  readonly name: Scalars["String"]
  readonly type: AuthorType
  readonly url: Maybe<Scalars["String"]>
}

export enum AuthorType {
  Name = "NAME",
  Reddit = "REDDIT",
  Twitch = "TWITCH",
  Youtube = "YOUTUBE",
}

export enum Gamemode {
  Bombs = "BOMBS",
  CaptureAreas = "CAPTURE_AREAS",
  Hostage = "HOSTAGE",
}

export type Mutation = {
  readonly __typename: "Mutation"
  readonly likeStrat: Maybe<Strat>
  readonly unlikeStrat: Maybe<Strat>
}

export type MutationLikeStratArgs = {
  uuid: Scalars["ID"]
}

export type MutationUnlikeStratArgs = {
  uuid: Scalars["ID"]
}

export type Query = {
  readonly __typename: "Query"
  readonly strat: Maybe<Strat>
  readonly strats: StratPage
}

export type QueryStratArgs = {
  atk: InputMaybe<Scalars["Boolean"]>
  def: InputMaybe<Scalars["Boolean"]>
  excludeShortIds: InputMaybe<ReadonlyArray<Scalars["Int"]>>
  gamemode: InputMaybe<Gamemode>
  random: InputMaybe<Scalars["Boolean"]>
  shortId: InputMaybe<Scalars["Int"]>
  uuid: InputMaybe<Scalars["ID"]>
}

export type QueryStratsArgs = {
  atk: InputMaybe<Scalars["Boolean"]>
  def: InputMaybe<Scalars["Boolean"]>
  excludeShortIds: InputMaybe<ReadonlyArray<Scalars["Int"]>>
  gamemode: InputMaybe<Gamemode>
  page?: InputMaybe<Scalars["Int"]>
  shortId: InputMaybe<Scalars["Int"]>
  uuid: InputMaybe<Scalars["ID"]>
}

export type Strat = {
  readonly __typename: "Strat"
  readonly acceptedAt: Maybe<Scalars["DateTime"]>
  readonly atk: Scalars["Boolean"]
  readonly author: Author
  readonly def: Scalars["Boolean"]
  readonly description: Scalars["String"]
  readonly gamemodes: ReadonlyArray<Gamemode>
  readonly liked: Scalars["Boolean"]
  readonly score: Scalars["Int"]
  readonly shortId: Scalars["Int"]
  readonly submission: Scalars["Boolean"]
  readonly title: Scalars["String"]
  readonly uuid: Scalars["ID"]
}

export type StratPage = {
  readonly __typename: "StratPage"
  readonly items: ReadonlyArray<Strat>
  readonly lastPage: Scalars["Int"]
}

export type LikeStratMutationVariables = Exact<{
  uuid: Scalars["ID"]
}>

export type LikeStratMutation = {
  readonly __typename: "Mutation"
  readonly likeStrat: {
    readonly __typename: "Strat"
    readonly uuid: string
    readonly score: number
    readonly liked: boolean
  } | null
}

export type StratQueryVariables = Exact<{
  random: Scalars["Boolean"]
  atk: Scalars["Boolean"]
  def: Scalars["Boolean"]
  gamemode: Gamemode
  shortId: InputMaybe<Scalars["Int"]>
  exclude: InputMaybe<ReadonlyArray<Scalars["Int"]>>
}>

export type StratQuery = {
  readonly __typename: "Query"
  readonly strat: {
    readonly __typename: "Strat"
    readonly uuid: string
    readonly shortId: number
    readonly title: string
    readonly description: string
    readonly gamemodes: ReadonlyArray<Gamemode>
    readonly score: number
    readonly liked: boolean
    readonly author: {
      readonly __typename: "Author"
      readonly name: string
      readonly type: AuthorType
      readonly url: string | null
    }
  } | null
}

export type UnlikeStratMutationVariables = Exact<{
  uuid: Scalars["ID"]
}>

export type UnlikeStratMutation = {
  readonly __typename: "Mutation"
  readonly unlikeStrat: {
    readonly __typename: "Strat"
    readonly uuid: string
    readonly score: number
    readonly liked: boolean
  } | null
}
