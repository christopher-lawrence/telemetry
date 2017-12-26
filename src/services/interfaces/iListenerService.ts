import { IElementListener } from '../../domain/ielementListener';

export interface IListenerService {
    AddListeners: (element: IElementListener) => void;
}
