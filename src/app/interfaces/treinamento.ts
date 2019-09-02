import { Movimentos } from './movimentos';
export interface Treinamento {
id?: string;
nome?:string;
modalidade?:string;
tempo?:string;
esquema?:string;
prioridade?:string;
movimento?:Array<string>;
repeticao?:string;
criadoPor?: string;
}
