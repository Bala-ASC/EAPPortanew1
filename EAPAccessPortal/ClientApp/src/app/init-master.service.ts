import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InitMasterService {

    loadAPI;
    constructor() { }
    getServiceBaseUrl(url) {
        this.loadAPI = new Promise(resolve => {
            this.loadScript(url);
        });
    }
    public loadScript(url) {
        const node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
    ScriptsRef() {
        // link-dynamic-css
        const link = document.getElementById('link-dynamic');
        if (link["src"]!="#") {
            let t = Date.now();
            link['src'] = `assets/js/app.js?t${t}`;

        }
    }
}
