/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Channels = "channels",
	Organizations = "organizations",
	Teams = "teams",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export enum ChannelsTypeOptions {
	"textRoom" = "textRoom",
	"voiceRoom" = "voiceRoom",
	"drawBoard" = "drawBoard",
	"document" = "document",
	"kanban" = "kanban",
}
export type ChannelsRecord = {
	name: string
	team: RecordIdString
	type: ChannelsTypeOptions
}

export type OrganizationsRecord = {
	name: string
}

export type TeamsRecord = {
	name: string
	organization: RecordIdString
}

export enum UsersAppRoleOptions {
	"admin" = "admin",
	"member" = "member",
}
export type UsersRecord = {
	name?: string
	avatar?: string
	organization?: RecordIdString
	appRole: UsersAppRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type ChannelsResponse = ChannelsRecord & BaseSystemFields
export type OrganizationsResponse = OrganizationsRecord & BaseSystemFields
export type TeamsResponse = TeamsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	channels: ChannelsRecord
	organizations: OrganizationsRecord
	teams: TeamsRecord
	users: UsersRecord
}