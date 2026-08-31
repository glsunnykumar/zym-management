export type UIActionType =
  | 'add'
  | 'edit'
  | 'delete'
  | 'view'
  | 'save'
  | 'cancel'
  | 'refresh'
  | 'search'
  | 'filter'
  | 'export'
  | 'download'
  | 'upload'
  | 'print'
  | 'approve'
  | 'reject'
  | 'activate'
  | 'deactivate'
  | 'custom';

export interface UIActionEvent<T = any> {
  type: UIActionType;
  payload?: T;
}