// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { <%= classify(name) %>Model } from '../_models/<%= dasherize(name) %>.model';

export enum <%= classify(name) %>ActionTypes {
    <%= classify(name) %>OnServerCreated = '[Edit <%= classify(name) %> Dialog] <%= classify(name) %> On Server Created',
    <%= classify(name) %>Created = '[Edit <%= classify(name) %> Dialog] <%= classify(name) %> Created',
    <%= classify(name) %>Updated = '[Edit <%= classify(name) %> Dialog] <%= classify(name) %> Updated',
    <%= classify(name) %>sStatusUpdated = '[<%= classify(name) %> List Page] <%= classify(name) %>s Status Updated',
    One<%= classify(name) %>Deleted = '[<%= classify(name) %>s List Page] One <%= classify(name) %> Deleted',
    Many<%= classify(name) %>sDeleted = '[<%= classify(name) %>s List Page] Many <%= classify(name) %> Deleted',
    <%= classify(name) %>sPageRequested = '[<%= classify(name) %>s List Page] <%= classify(name) %>s Page Requested',
    <%= classify(name) %>sPageLoaded = '[<%= classify(name) %>s API] <%= classify(name) %>s Page Loaded',
    <%= classify(name) %>sPageCancelled = '[<%= classify(name) %>s API] <%= classify(name) %>s Page Cancelled',
    <%= classify(name) %>sPageToggleLoading = '[<%= classify(name) %>s] <%= classify(name) %>s Page Toggle Loading',
    <%= classify(name) %>ActionToggleLoading = '[<%= classify(name) %>s] <%= classify(name) %>s Action Toggle Loading'
}

export class <%= classify(name) %>OnServerCreated implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>OnServerCreated;
    constructor(public payload: { <%= classify(name) %>: <%= classify(name) %>Model }) { }
}

export class <%= classify(name) %>Created implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>Created;
    constructor(public payload: { <%= classify(name) %>: <%= classify(name) %>Model }) { }
}

export class <%= classify(name) %>Updated implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>Updated;
    constructor(public payload: {
        partial<%= classify(name) %>: Update<<%= classify(name) %>Model>, // For State update
        <%= classify(name) %>: <%= classify(name) %>Model // For Server update (through service)
    }) { }
}

export class <%= classify(name) %>sStatusUpdated implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>sStatusUpdated;
    constructor(public payload: {
        <%= classify(name) %>s: <%= classify(name) %>Model[],
        status: number
    }) { }
}

export class One<%= classify(name) %>Deleted implements Action {
    readonly type = <%= classify(name) %>ActionTypes.One<%= classify(name) %>Deleted;
    constructor(public payload: { id: number }) {}
}

export class Many<%= classify(name) %>sDeleted implements Action {
    readonly type = <%= classify(name) %>ActionTypes.Many<%= classify(name) %>sDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class <%= classify(name) %>sPageRequested implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>sPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class <%= classify(name) %>sPageLoaded implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>sPageLoaded;
    constructor(public payload: { <%= classify(name) %>s: <%= classify(name) %>Model[], totalCount: number, page: QueryParamsModel }) { }
}

export class <%= classify(name) %>sPageCancelled implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>sPageCancelled;
}

export class <%= classify(name) %>sPageToggleLoading implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>sPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class <%= classify(name) %>ActionToggleLoading implements Action {
    readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>ActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type <%= classify(name) %>Actions = <%= classify(name) %>OnServerCreated
| <%= classify(name) %>Created
| <%= classify(name) %>Updated
| <%= classify(name) %>sStatusUpdated
| One<%= classify(name) %>Deleted
| Many<%= classify(name) %>sDeleted
| <%= classify(name) %>sPageRequested
| <%= classify(name) %>sPageLoaded
| <%= classify(name) %>sPageCancelled
| <%= classify(name) %>sPageToggleLoading
| <%= classify(name) %>ActionToggleLoading;
