/**
 * 处理样式工具类
 */
class Tool {

    constructor(){}

    /**
     * 切换 class
     * @param {*} targetDom 
     * @param {*} className 
     */
    static toggleClass(targetDom, className){
        if(targetDom && targetDom.classList.length > 0){
            targetDom.classList.contains(className) ? this.removeClass(targetDom, className) : this.addClass(targetDom, className);
        }
    }

    /**
     * 增加 class
     * @param {*} targetDom 
     * @param {*} className 
     */
    static addClass(targetDom, className){
        if(targetDom && targetDom.classList.length > 0){
            targetDom.classList.contains(className) ? "" : targetDom.classList.add(className);
        }
    }

    /**
     * 移除 class
     * @param {*} targetDom 
     * @param {*} className 
     */
    static removeClass(targetDom, className){
        if(targetDom && targetDom.classList.length > 0){
            targetDom.classList.contains(className) ? targetDom.classList.remove(className) : "";
        }        
    }

    /**
     * 是否含有 class
     * @param {*} obj 
     * @param {*} className 
     */
    static hasClass(obj,className){
        let reg = new RegExp("\\b"+ className +"\\b");
        return reg.test(obj);
    }

    /**
     * 删除 class
     * @param {*} obj 
     * @param {*} className 
     */
    // static removeClass(obj,className){
    //     let reg = new RegExp("\\b"+ className +"\\b");
    //     return obj.className.replace(reg, "");
    // }
   
}
export default Tool;
