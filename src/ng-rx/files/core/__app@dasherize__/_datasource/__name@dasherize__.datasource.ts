// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import { select<%= classify(name) %>sInStore, select<%= classify(name) %>sPageLoading, select<%= classify(name) %>sShowInitWaitingMessage } from '../_selectors/<%= dasherize(name) %>.selectors';

export class <%= classify(name) %>sDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(select<%= classify(name) %>sPageLoading),
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(select<%= classify(name) %>sShowInitWaitingMessage)
		);

		this.store.pipe(
			select(select<%= classify(name) %>sInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
