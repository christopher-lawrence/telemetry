import { IElementListener } from '../../domain/ielementListener';

export interface IParserService {
    executeParsers: () => IElementListener[];
}
