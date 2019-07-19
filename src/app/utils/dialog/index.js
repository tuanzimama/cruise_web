import './app.scss';
import {template} from './template';
import Tools from '../../utils/tools/styleTools';
let dialogSource = "";

class DialogComponent{   
    
    constructor(){
        this.template = template;
    }

    init(){
        this.renderView();
        this.bindEvents(); 
    }

    /**
     * 渲染模板
     */
    renderView(){
        document.getElementsByTagName("main")[0].innerHTML += this.template;
    }

    /**
     * 绑定事件
     */
    bindEvents(){    
         let closeIcon = document.querySelector("#dialog_modal_wrapper .icon-close");
         let cancelBtn = document.getElementById("cancel_btn");
         let confirmBtn = document.getElementById("confirm_btn");  
         let inputObj = document.getElementById("dialog_search");          
 
         closeIcon.onclick = this.hide.bind(this);
         cancelBtn.onclick = this.hide.bind(this);
         confirmBtn.onclick = this.addBrowser.bind(this);
         inputObj.onkeypress = (event)=>{
             event = event || window.event;
             if(event.keyCode === 13){
                this.addBrowser();
                return false; //阻止回车默认事件
             }
         }                
    }

    /**
     * 设置弹框的当前引用对象
     * @param {*} currentObj 
     */
    setCurrentObj(currentObj){
        return this.currentDialogObj = currentObj;
    }

    /**
     * 隐藏弹框，并清空输入框内容
     */
    hide(){          
        let dialog = document.getElementById("dialog_modal_wrapper");  
        let inputObj = document.getElementById("dialog_search"); //input输入框 
        Tools.addClass(dialog,"hidden");
        inputObj.value = "";
    }

    /**
     * 增加浏览器
     * @param {*} dialog 
     */
    addBrowser() { 
        let dialog = document.getElementById("dialog_modal_wrapper");   
        let inputValue = document.getElementById("dialog_search").value.trim();
        if(inputValue){
            let newBrowser = ` <li class="browser_item"><span class="browser_name">${inputValue}</span><i class="icon icon-trash" ></i></li>`;
            dialogSource.innerHTML += newBrowser;        
            let deleteBtn = document.getElementsByClassName("icon-trash");
            for(let i = 0; i < deleteBtn.length; i++){
                deleteBtn[i].addEventListener("click", this.removeBrowser.bind(this, deleteBtn[i].parentElement));
            }        
            Tools.addClass(dialog,"hidden");          
        }else{
            alert('Please enter the text first.');
        }       
    }

    /**
     * 删除浏览器
     * @param {*} browserItem 
     */
    removeBrowser(browserItem){
        browserItem && browserItem.remove();
    }

    /**
     * 显示弹框
     * @param {*} sourceEl 弹框的当前引用对象
     */
    show(sourceEl){
        dialogSource = sourceEl;
        document.getElementById("dialog_search").value = "";
        Tools.removeClass(document.getElementById("dialog_modal_wrapper"),"hidden");
    }
}
export default DialogComponent;
