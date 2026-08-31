import { UIActionType } from '../models';

export const UI_ACTIONS = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
  VIEW: 'view',
  SAVE: 'save',
  CANCEL: 'cancel',
  REFRESH: 'refresh',
  SEARCH: 'search',
  FILTER: 'filter',
  EXPORT: 'export',
  DOWNLOAD: 'download',
  UPLOAD: 'upload',
  PRINT: 'print',
  APPROVE: 'approve',
  REJECT: 'reject',
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate'
} as const satisfies Record<string, UIActionType>;