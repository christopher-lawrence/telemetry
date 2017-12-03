import { IElementListener } from "../../common/interfaces/ielementListener";

export interface IParserService {
    executeParsers: () => IElementListener[];
}
