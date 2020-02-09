import {createFeatureSelector, createSelector} from "@ngrx/store";
import {<%= classify(name) %>State} from "../_reducers/<%= dasherize(name) %>.reducer";
import {<%= classify(name) %>Model} from "../_models/<%= dasherize(name) %>.model";
import {HttpExtenstionsModel, QueryResultsModel} from "../../_base/crud";
import {each} from 'lodash';

export const select<%= classify(name) %>State = createFeatureSelector<<%= classify(name) %>State>('<%= classify(name) %>');

// export const selectGroupById = (groupId: string) => createSelector(
// 	selectGroupsState,
// 	groupsState => groupsState.entities[groupId]
// );

export const select<%= classify(name) %>PageLoading = createSelector(
	select<%= classify(name) %>State,
	<%= classify(name) %>State => <%= classify(name) %>State.listLoading
);

export const select<%= classify(name) %>PageError = createSelector(
	select<%= classify(name) %>State,
	<%= classify(name) %>State => <%= classify(name) %>State.listLoadingError
);


export const select<%= classify(name) %>InStore = createSelector(
	select<%= classify(name) %>State,
	<%= classify(name) %>State => {
		const items: <%= classify(name) %>Model[] = [];
		each(<%= classify(name) %>State.entities, element => {
			items.push(element);
		});
		console.log(<%= classify(name) %>State.entities);
		const httpExtension = new HttpExtenstionsModel();
		const result: <%= classify(name) %>Model[] = httpExtension.sortArray(items, <%= classify(name) %>State.lastQuery.sortField, <%= classify(name) %>State.lastQuery.sortOrder);
		return new QueryResultsModel(result, <%= classify(name) %>State.totalCount, '');

	});
