export enum PermissionLevel {
  VISITOR = 'visitor',
  MEMBER = 'member',
  OPERATOR = 'operator',
}

export type XUID = string;

export type UserPermissions = {
  permission: PermissionLevel;
  xuid: XUID;
};
