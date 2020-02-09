// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS

// CRUD
import { HttpUtilsService, QueryParamsModel } from '../../_base/crud';
// Models

const API__URL = '/ws/public/';
// Real REST API
@Injectable()
export class <%= classify(name) %>Service {

    constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }
    

    getToken() {
		this.http
			.get<String>("/ws/public/authentificate/show-the-csrf-token")
			.subscribe(res => {
				//console.log(res);
				return res;
			});
    }
    
}
