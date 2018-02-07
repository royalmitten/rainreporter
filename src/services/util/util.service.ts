import {Injectable} from "@angular/core";

@Injectable()
export class Util {
    generateId(): string {
        return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}