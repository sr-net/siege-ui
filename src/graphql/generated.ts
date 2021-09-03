/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
/* THIS IS A GENERATED FILE */
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
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
  readonly __typename: "Author"
  readonly type: AuthorType
  readonly name: Scalars["String"]
  readonly url: Maybe<Scalars["String"]>
}

export enum AuthorType {
  Name = "Name",
  YouTube = "YouTube",
  Twitch = "Twitch",
  Reddit = "Reddit",
}

export enum Gamemode {
  Bombs = "Bombs",
  Hostage = "Hostage",
  Areas = "Areas",
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
  readonly submission: Maybe<Strat>
}

export type QueryStratArgs = {
  uuid: Maybe<Scalars["ID"]>
  shortId: Maybe<Scalars["Int"]>
  atk: Maybe<Scalars["Boolean"]>
  def: Maybe<Scalars["Boolean"]>
  gamemode: Maybe<Gamemode>
  excludeShortIds: Maybe<ReadonlyArray<Scalars["Int"]>>
  random: Maybe<Scalars["Boolean"]>
}

export type QueryStratsArgs = {
  uuid: Maybe<Scalars["ID"]>
  shortId: Maybe<Scalars["Int"]>
  atk: Maybe<Scalars["Boolean"]>
  def: Maybe<Scalars["Boolean"]>
  gamemode: Maybe<Gamemode>
  excludeShortIds: Maybe<ReadonlyArray<Scalars["Int"]>>
  page?: Maybe<Scalars["Int"]>
}

export type Strat = {
  readonly __typename: "Strat"
  readonly uuid: Scalars["ID"]
  readonly shortId: Scalars["Int"]
  readonly title: Scalars["String"]
  readonly description: Scalars["String"]
  readonly author: Author
  readonly atk: Scalars["Boolean"]
  readonly def: Scalars["Boolean"]
  readonly gamemodes: ReadonlyArray<Gamemode>
  readonly score: Scalars["Int"]
  readonly submission: Scalars["Boolean"]
  readonly acceptedAt: Maybe<Scalars["DateTime"]>
  readonly liked: Scalars["Boolean"]
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
  readonly likeStrat: Maybe<{
    readonly __typename: "Strat"
    readonly uuid: string
    readonly score: number
    readonly liked: boolean
  }>
}

export type StratQueryVariables = Exact<{
  random: Scalars["Boolean"]
  atk: Scalars["Boolean"]
  def: Scalars["Boolean"]
  gamemode: Gamemode
  shortId: Maybe<Scalars["Int"]>
  exclude: Maybe<ReadonlyArray<Scalars["Int"]>>
}>

export type StratQuery = {
  readonly __typename: "Query"
  readonly strat: Maybe<{
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
      readonly url: Maybe<string>
    }
  }>
}

export type UnlikeStratMutationVariables = Exact<{
  uuid: Scalars["ID"]
}>

export type UnlikeStratMutation = {
  readonly __typename: "Mutation"
  readonly unlikeStrat: Maybe<{
    readonly __typename: "Strat"
    readonly uuid: string
    readonly score: number
    readonly liked: boolean
  }>
}
