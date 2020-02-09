import {Action} from '@ngrx/store';
import {QueryParamsModel} from '../../_base/crud';
import {<%= classify(name) %>Model} from "../_models/<%= dasherize(name) %>.model";

export enum <%= classify(name) %>ActionTypes {
	<%= classify(name) %>PageRequested= '[<%= classify(name) %>] <%= classify(name) %>Page Requested',
	<%= classify(name) %>PageLoaded= '[<%= classify(name) %>] <%= classify(name) %>Page Loaded',
	<%= classify(name) %>PageError= '[<%= classify(name) %>] <%= classify(name) %>Page Error',
	<%= classify(name) %>PageToggleLoading = '[<%= classify(name) %>] <%= classify(name) %>Page Toggle Loading'
}

export class <%= classify(name) %>PageRequested implements Action {
	readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>PageRequested;
	constructor(public payload: {page: QueryParamsModel}) { }
}

export class <%= classify(name) %>PageLoaded implements Action {
	readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>PageLoaded;
	constructor(public payload: { <%= name %>s: <%= classify(name) %>Model[] , totalCount: number, page: QueryParamsModel }) { }
}

export class <%= classify(name) %>PageToggleLoading implements Action {
	readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>PageToggleLoading;
	constructor(public payload: {isLoading: boolean}) { }
}
export class <%= classify(name) %>PageError  implements Action {
	readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>PageError;
	constructor(public payload: {message: string}) { }
}

export type <%= classify(name) %>Actions =
<%= classify(name) %>PageRequested |
<%= classify(name) %>PageLoaded |
<%= classify(name) %>PageError |
<%= classify(name) %>PageToggleLoading;
