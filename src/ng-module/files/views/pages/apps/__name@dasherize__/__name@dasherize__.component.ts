// Angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'kt-<%= dasherize(name) %>',
	templateUrl: './<%= dasherize(name) %>.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Component implements OnInit { 
    	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 * @param router: Router
	 */
	constructor() {}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {}
}
