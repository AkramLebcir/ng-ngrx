// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { <%= classify(name) %>sState } from '../_reducers/<%= dasherize(name) %>.reducers';
import { <%= classify(name) %>Model } from '../_models/<%= dasherize(name) %>.model';

export const select<%= classify(name) %>sState = createFeatureSelector<<%= classify(name) %>sState>('<%= dasherize(name) %>s');

export const select<%= classify(name) %>ById = (<%= classify(name) %>Id: number) => createSelector(
    select<%= classify(name) %>sState,
    <%= classify(name) %>sState => <%= classify(name) %>sState.entities[<%= classify(name) %>Id]
);

export const select<%= classify(name) %>sPageLoading = createSelector(
    select<%= classify(name) %>sState,
    <%= classify(name) %>sState => <%= classify(name) %>sState.listLoading
);

export const select<%= classify(name) %>sActionLoading = createSelector(
    select<%= classify(name) %>sState,
    <%= classify(name) %>sState => <%= classify(name) %>sState.actionsloading
);

export const selectLastCreated<%= classify(name) %>Id = createSelector(
    select<%= classify(name) %>sState,
    <%= classify(name) %>sState => <%= classify(name) %>sState.lastCreated<%= classify(name) %>Id
);

export const select<%= classify(name) %>sShowInitWaitingMessage = createSelector(
    select<%= classify(name) %>sState,
    <%= classify(name) %>sState => <%= classify(name) %>sState.showInitWaitingMessage
);

export const select<%= classify(name) %>sInStore = createSelector(
    select<%= classify(name) %>sState,
    <%= classify(name) %>sState => {
        const items: <%= classify(name) %>Model[] = [];
        each(<%= classify(name) %>sState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: <%= classify(name) %>Model[] = httpExtension.sortArray(items, <%= classify(name) %>sState.lastQuery.sortField, <%= classify(name) %>sState.lastQuery.sortOrder);
        return new QueryResultsModel(result, <%= classify(name) %>sState.totalCount, '');
    }
);
