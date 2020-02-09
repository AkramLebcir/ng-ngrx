import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {QueryParamsModel} from "../../_base/crud";
import {<%= classify(name) %>Model} from "../_models/<%= dasherize(name) %>.model";
import {
	<%= classify(name) %>Actions,
	<%= classify(name) %>ActionTypes
} from "../_actions/<%= dasherize(name) %>.actions";


export interface <%= classify(name) %>State extends EntityState<<%= classify(name) %>Model> {
	totalCount: number;
	listLoading: boolean;
	listLoadingError: string;
	lastQuery: QueryParamsModel;
}
export function selectMissionRef(obj: <%= classify(name) %>Model): string {
	return obj.created_date_day;
}
export const adapter: EntityAdapter<<%= classify(name) %>Model> = createEntityAdapter<<%= classify(name) %>Model>({
	selectId: selectMissionRef
});

export const initialIndicatorsState: <%= classify(name) %>State = adapter.getInitialState({
	listLoading: false,
	totalCount: 0,
	lastQuery: new QueryParamsModel({}),
	listLoadingError: ''
});

export function <%= classify(name) %>Reducer(state= initialIndicatorsState, action: <%= classify(name) %>Actions ): <%= classify(name) %>State {
	switch  (action.type) {
		case <%= classify(name) %>ActionTypes.<%= classify(name) %>PageToggleLoading  : {
			return {
				...state,
				listLoading: action.payload.isLoading,
				listLoadingError : ''
			};
		}
		case <%= classify(name) %>ActionTypes.<%= classify(name) %>PageError : {
			return {
				...state,
				listLoading: false,
				listLoadingError: action.payload.message
			};
		}

		case <%= classify(name) %>ActionTypes.<%= classify(name) %>PageLoaded : {
			console.log("reducer");
			console.log(action.payload.<%= name %>s);
			return adapter.addMany(action.payload.<%= name %>s,
				{
					...initialIndicatorsState,
					listLoading: false,
					listLoadingError: '',
					lastQuery : action.payload.page,
					totalCount: action.payload.totalCount,
				});
		}
		default: {
			return state;
		}
	}
}
