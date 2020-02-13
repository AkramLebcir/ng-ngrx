import { QueryParamsModel } from './../../_base/crud/models/query-models/query-params.model';
import { forkJoin } from 'rxjs';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, delay } from 'rxjs/operators';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryResultsModel } from '../../_base/crud';
// Services
import { <%= classify(name) %>sService } from '../_services/<%= dasherize(app) %>s.service';
// State
import { AppState } from '../../../core/reducers';
// Actions
import {
    <%= classify(name) %>ActionTypes,
    <%= classify(name) %>sPageRequested,
    <%= classify(name) %>sPageLoaded,
    Many<%= classify(name) %>sDeleted,
    One<%= classify(name) %>Deleted,
    <%= classify(name) %>ActionToggleLoading,
    <%= classify(name) %>sPageToggleLoading,
    <%= classify(name) %>Updated,
    <%= classify(name) %>sStatusUpdated,
    <%= classify(name) %>Created,
    <%= classify(name) %>OnServerCreated
} from '../_actions/<%= dasherize(name) %>.actions';
import { of } from 'rxjs';

@Injectable()
export class <%= classify(name) %>Effects {
    showPageLoadingDistpatcher = new <%= classify(name) %>sPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new <%= classify(name) %>ActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new <%= classify(name) %>ActionToggleLoading({ isLoading: false });

    @Effect()
    load<%= classify(name) %>sPage$ = this.actions$.pipe(
        ofType<<%= classify(name) %>sPageRequested>(<%= classify(name) %>ActionTypes.<%= classify(name) %>sPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.<%= classify(name) %>sService.find<%= classify(name) %>s(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: QueryResultsModel = response[0];
            const lastQuery: QueryParamsModel = response[1];
            const pageLoadedDispatch = new <%= classify(name) %>sPageLoaded({
                <%= classify(name) %>s: result.items,
                totalCount: result.totalCount,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    delete<%= classify(name) %>$ = this.actions$
        .pipe(
            ofType<One<%= classify(name) %>Deleted>(<%= classify(name) %>ActionTypes.One<%= classify(name) %>Deleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.<%= classify(name) %>sService.delete<%= classify(name) %>(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    delete<%= classify(name) %>s$ = this.actions$
        .pipe(
            ofType<Many<%= classify(name) %>sDeleted>(<%= classify(name) %>ActionTypes.Many<%= classify(name) %>sDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.<%= classify(name) %>sService.delete<%= classify(name) %>s(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    update<%= classify(name) %>$ = this.actions$
        .pipe(
            ofType<<%= classify(name) %>Updated>(<%= classify(name) %>ActionTypes.<%= classify(name) %>Updated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.<%= classify(name) %>sService.update<%= classify(name) %>(payload.<%= classify(name) %>);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    update<%= classify(name) %>sStatus$ = this.actions$
        .pipe(
            ofType<<%= classify(name) %>sStatusUpdated>(<%= classify(name) %>ActionTypes.<%= classify(name) %>sStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.<%= classify(name) %>sService.updateStatusFor<%= classify(name) %>(payload.<%= classify(name) %>s, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    create<%= classify(name) %>$ = this.actions$
        .pipe(
            ofType<<%= classify(name) %>OnServerCreated>(<%= classify(name) %>ActionTypes.<%= classify(name) %>OnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.<%= classify(name) %>sService.create<%= classify(name) %>(payload.<%= classify(name) %>).pipe(
                    tap(res => {
                        this.store.dispatch(new <%= classify(name) %>Created({ <%= dasherize(name) %>: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private <%= classify(name) %>sService: <%= classify(name) %>sService, private store: Store<AppState>) { }
}
