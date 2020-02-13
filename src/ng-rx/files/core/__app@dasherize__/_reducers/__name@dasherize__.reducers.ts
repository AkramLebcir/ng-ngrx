// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { <%= classify(name) %>Actions, <%= classify(name) %>ActionTypes } from '../_actions/<%= dasherize(name) %>.actions';
// Models
import { <%= classify(name) %>Model } from '../_models/<%= dasherize(name) %>.model';
import { QueryParamsModel } from '../../_base/crud';

export interface <%= classify(name) %>sState extends EntityState<<%= classify(name) %>Model> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreated<%= classify(name) %>Id: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<<%= classify(name) %>Model> = createEntityAdapter<<%= classify(name) %>Model>();

export const initial<%= classify(name) %>sState: <%= classify(name) %>sState = adapter.getInitialState({
    <%= dasherize(name) %>ForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreated<%= classify(name) %>Id: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function <%= classify(name) %>sReducer(state = initial<%= classify(name) %>sState, action: <%= classify(name) %>Actions): <%= classify(name) %>sState {
    switch  (action.type) {
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>sPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreated<%= classify(name) %>Id: undefined
            };
        }
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>ActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>OnServerCreated: return {
            ...state
        };
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>Created: return adapter.addOne(action.payload.<%= classify(name) %>, {
            ...state, lastCreated<%= classify(name) %>Id: action.payload.<%= classify(name) %>.id
        });
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>Updated: return adapter.updateOne(action.payload.partial<%= classify(name) %>, state);
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>sStatusUpdated: {
            const _partial<%= classify(name) %>s: Update<<%= classify(name) %>Model>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.<%= classify(name) %>s.length; i++) {
                _partial<%= classify(name) %>s.push({
				    id: action.payload.<%= classify(name) %>s[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partial<%= classify(name) %>s, state);
        }
        case <%= classify(name) %>ActionTypes.One<%= classify(name) %>Deleted: return adapter.removeOne(action.payload.id, state);
        case <%= classify(name) %>ActionTypes.Many<%= classify(name) %>sDeleted: return adapter.removeMany(action.payload.ids, state);
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>sPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case <%= classify(name) %>ActionTypes.<%= classify(name) %>sPageLoaded: {
            return adapter.addMany(action.payload.<%= classify(name) %>s, {
                ...initial<%= classify(name) %>sState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const get<%= classify(name) %>State = createFeatureSelector<<%= classify(name) %>Model>('<%= dasherize(name) %>s');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
