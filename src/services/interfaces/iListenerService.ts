import { IElementListener } from '../../common/interfaces/ielementListener';

export interface IListenerService {
    AddListeners: (element: IElementListener) => void;
}
