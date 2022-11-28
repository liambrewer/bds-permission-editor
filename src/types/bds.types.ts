export enum PermissionLevel {
  OPERATOR = 'operator',
  MEMBER = 'member',
  VISITOR = 'visitor',
}

export type XUID = string;

export type UserPermissions = {
  permission: PermissionLevel;
  xuid: XUID;
};
