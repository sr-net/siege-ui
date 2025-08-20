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
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: string; output: string }
}

export type Author = {
  readonly __typename: "Author"
  readonly name: Scalars["String"]["output"]
  readonly type: AuthorType
  readonly url: Maybe<Scalars["String"]["output"]>
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
  uuid: Scalars["ID"]["input"]
}

export type MutationUnlikeStratArgs = {
  uuid: Scalars["ID"]["input"]
}

export type Query = {
  readonly __typename: "Query"
  readonly strat: Maybe<Strat>
  readonly strats: StratPage
}

export type QueryStratArgs = {
  atk: InputMaybe<Scalars["Boolean"]["input"]>
  def: InputMaybe<Scalars["Boolean"]["input"]>
  excludeShortIds: InputMaybe<ReadonlyArray<Scalars["Int"]["input"]>>
  gamemode: InputMaybe<Gamemode>
  random: InputMaybe<Scalars["Boolean"]["input"]>
  shortId: InputMaybe<Scalars["Int"]["input"]>
  uuid: InputMaybe<Scalars["ID"]["input"]>
}

export type QueryStratsArgs = {
  atk: InputMaybe<Scalars["Boolean"]["input"]>
  def: InputMaybe<Scalars["Boolean"]["input"]>
  excludeShortIds: InputMaybe<ReadonlyArray<Scalars["Int"]["input"]>>
  gamemode: InputMaybe<Gamemode>
  page: Scalars["Int"]["input"]
  shortId: InputMaybe<Scalars["Int"]["input"]>
  uuid: InputMaybe<Scalars["ID"]["input"]>
}

export type Strat = {
  readonly __typename: "Strat"
  readonly acceptedAt: Maybe<Scalars["DateTime"]["output"]>
  readonly atk: Scalars["Boolean"]["output"]
  readonly author: Author
  readonly def: Scalars["Boolean"]["output"]
  readonly description: Scalars["String"]["output"]
  readonly gamemodes: ReadonlyArray<Gamemode>
  readonly liked: Scalars["Boolean"]["output"]
  readonly score: Scalars["Int"]["output"]
  readonly shortId: Scalars["Int"]["output"]
  readonly submission: Scalars["Boolean"]["output"]
  readonly title: Scalars["String"]["output"]
  readonly uuid: Scalars["ID"]["output"]
}

export type StratPage = {
  readonly __typename: "StratPage"
  readonly items: ReadonlyArray<Strat>
  readonly lastPage: Scalars["Int"]["output"]
}

export type LikeStratMutationVariables = Exact<{
  uuid: Scalars["ID"]["input"]
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
  random: Scalars["Boolean"]["input"]
  atk: Scalars["Boolean"]["input"]
  def: Scalars["Boolean"]["input"]
  gamemode: Gamemode
  shortId: InputMaybe<Scalars["Int"]["input"]>
  exclude: InputMaybe<ReadonlyArray<Scalars["Int"]["input"]>>
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
  uuid: Scalars["ID"]["input"]
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
