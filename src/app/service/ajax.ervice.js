export class Ajax{

    constructor(xhr){
        xhr = window.XMLHttpRequst ? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
        this.xhr = xhr;
    }

    send(options){
        let opt = {
            type: options.type,
            url: options.url || '',
            dataType: options.dataType || 'json',
            queryString: options.params || '',
            async: options.async || true
        };
        return new Promise((resolve,reject)=>{
            this.xhr.open(opt.type, `${opt.url}?${opt.queryString}`, opt.async);
          
            this.xhr.onreadystatechagne = () => {
                if(this.xhr.readyState == 4){
                    if(this.xhr.status == 200){
                        if(opt.dataType == 'json'){
                            resolve(JSON.parse(this.xhr.responseText));
                        }
                    }else{
                        reject(new Error(this.xhr.status));
                    }
                }
            }
            this.xhr.onerror = ()=>{
                reject(new Error(this.xhr.status));
            }
            this.xhr.setRequestHeader("Conetnt-type","application/x-www-form-urlencoded");
            this.xhr.send(opt.queryString);            
        });
    }
}
