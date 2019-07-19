import './app.scss';
import {template} from './template.js';
import {AGENTDATA} from '../../../assets/dummy-data/agent-data.js'; 
import DialogComponent from '../../utils/dialog/index.js';

let allAgents = AGENTDATA.agents; 
let dialogComponent = null; 
class AgentModule{
    constructor(){
        this.template = template; // 模板数据暴露给主界面使用
        this.allAgentNum = 0;
        this.buildingNum = 0;
        this.idleNum = 0;
        this.virtualNum = 0;
        this.physicalNum = 0;
        this.currentDialogDom = "";
    }

    init(){        
        this.renderView();   
        this.dealData();   
        this.bindEvents(); 
    }

    /**
     * 渲染界面
     */
    renderView(){
        document.getElementById("cruise_view").innerHTML =  this.template;
        this.renderDialog();
    }
    
    /**
     *  实例化对话框组件
     */
    renderDialog(){  
        dialogComponent = dialogComponent || new DialogComponent();     
        dialogComponent.init();  
    }

    /**
     * 转换数据，处理为界面展示数据
     */
    dealData(){
       this.allAgentNum =  allAgents.length;
       this.physicalNum = allAgents.filter( item => item.type === 'physical').length; 
       this.virtualNum = this.allAgentNum - this.physicalNum;  
       this.buildingNum = allAgents.filter( item => item.status === 'building').length;
       this.idleNum = this.allAgentNum - this.buildingNum;
       this.setData(); 
       this.renderAgentData(allAgents); //初始化默认选项卡内容
       this.bindDeletebBrowser();
       this.bindAddBrowser();
    }

    /**
     *  绑定事件
     */
    bindEvents(){       
        this.switchTabActive();
        this.searchAgent();  
        window.onscroll = this.setDialogPosition.bind(this);
        document.getElementById("dialog_modal_wrapper").addEventListener("click", (event) =>{       
            dialogComponent.hide();          
        });
        document.getElementById("dialog_modal").addEventListener("click",(event)=>{
            event = event || window.event;
            if (event && event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            } 
        });        
    }

    /**
     * 设置头部agent数字
     */
    setData(){
        document.querySelector(".card_building .card-num").innerText = this.buildingNum;
        document.querySelector(".card_idle .card-num").innerText = this.idleNum;
        document.getElementById("card_summary_all").innerText = this.allAgentNum;
        document.getElementById("card_summary_physical").innerText = this.physicalNum;
        document.getElementById("card_summary_virtual").innerText = this.virtualNum;  
    }
 
    /**
     * 搜索框回车事件
     */
    searchAgent(){      
        let searchInput = document.getElementById("search_keywords");
        searchInput.onkeypress = (event) => {
            event = event || window.event;
            if(event.keyCode === 13){
               let inputValue = document.getElementById("search_keywords").value;
               let keywords = allAgents.filter( item => {
                   return item.name.indexOf(inputValue) > -1 || item.os.indexOf(inputValue) > -1 ||
                   item.status.indexOf(inputValue) > -1 ||  item.location.indexOf(inputValue) > -1 ||
                   item.ip.indexOf(inputValue) > -1
               });
               this.renderAgentData(keywords);
               this.bindDeletebBrowser();
               this.bindAddBrowser();
               return false;
            }
        }
    }

    /**
     * 选项卡选中事件
     */
    switchTabActive(){
        let agentTabs = document.querySelectorAll(".agent_tab li");       
        for(let i=0; i < agentTabs.length; i++){
            agentTabs[i].addEventListener("click", () => {
                //设置选项卡选中样式
                for(let j=0; j < agentTabs.length; j++){
                    agentTabs[j].className = "";
                }
                agentTabs[i].className="tab_active";

                //渲染显示内容
                let currentAgentList = [];
                if(agentTabs[i].innerText === "All"){                  
                    currentAgentList = allAgents;
                }else if(agentTabs[i].innerText === "Physical"){                  
                    currentAgentList = allAgents.filter( item => item.type === 'physical');
                }else if(agentTabs[i].innerText === "Virtual"){                   
                    currentAgentList = allAgents.filter( item => item.type === 'virtual');  
                }
                this.renderAgentData(currentAgentList);
                this.bindDeletebBrowser();
                this.bindAddBrowser();                
            });
        }
    }   

    /**
     * 渲染 tab选项卡 agent 列表 
     * 绑定新增、删除响应事件
     * @param {*} currentAgentList 
     */
    
    renderAgentData(currentAgentList){
        let agentItem = "";
        if(currentAgentList.length > 0){          
            agentItem = currentAgentList.map((item)=>{
                const imgSrc = require('../../../assets/images/agent/' + item.os + ".png");
                return `
                <li class="agent_item bg-color-white border_${item.status}">
                    <div class="desktop-lg-only">
                        <img class="agent_pic" src="${imgSrc}"/>
                    </div>
                    <div class="agent_content">
                        <div class="agent_content_top">
                            <div class="agent_name_wrapper text-ellipsis">
                                <i class="icon-lg icon-desktop color-9"></i>
                                <span class="agent_name text-ellipsis">${item.name}</span>
                            </div>
                            <div class="agent_status color-white"><span class="status_badges_${item.status}">${item.status}</span></div>
                            <div class="agent_address">
                                <i class="icon-lg icon-info color-9"></i><span>${item.ip}</span></div>
                            <div class="agent_dir">
                                <i class="icon-lg icon-folder color-9"></i><span>${item.location}</span></div>
                        </div>
                        <div class="agent_content_bottom">
                            <div class="add_browser">
                                <i class="icon-plus icon-md"></i>
                            </div>
                            <div class="browser_list">
                                <ul>${this.renderBrowser(item.resources)}</ul>
                            </div>
                            <div class="browser_deny font-b color-white">
                                <i class="icon-deny"><span class="pad-l-10">Deny</span></i>
                            </div>
                        </div>
        
                        <div class="browser_deny font-b color-white">
                            <i class="icon-deny"><span class="pad-l-10">Deny</span></i>
                        </div>
                    </div>
                </li>
                `;
            }).join("");
        }
        document.querySelector(".agent_list ul").innerHTML = agentItem;
    }
    
    /**
     * 新增按钮绑定事件
     */
    bindAddBrowser(){
        let addBrowserBtns = document.getElementsByClassName("add_browser");  
        for(let i = 0; i< addBrowserBtns.length; i++){
            addBrowserBtns[i].addEventListener("click", this.showDialogModal.bind(this,addBrowserBtns[i]));
        }
    }    

    /**
     * 显示弹框
     * @param {*} addBrowserBtns 
     */
    showDialogModal(addBrowserBtns){
        dialogComponent.hide();
        let browserListParent = addBrowserBtns.parentNode.children[1].children[0];       
        dialogComponent.setCurrentObj(addBrowserBtns); //设置弹框引用对象
        dialogComponent.show(browserListParent);             
        this.currentDialogDom = addBrowserBtns;
        this.setDialogPosition();                      
    }

    /**
     * 设置弹框位置
     */
    setDialogPosition(){
        let dialogModal = document.getElementById("dialog_modal");
        dialogModal.style = null;
        dialogModal.style = null;        
        //window.innerWidth 与 media 获取的宽度一致 
        if(window.innerWidth >= 1024){
            const addBtnPosition = this.currentDialogDom && this.currentDialogDom.getBoundingClientRect(),
            left = addBtnPosition.left - 24,
            top = addBtnPosition.top + 44;
            dialogModal.style.left = `${left}px`;
            dialogModal.style.top = `${top}px`;
        }
    }

    /**
     * 渲染浏览器
     * @param {*} browserList 
     */
    renderBrowser(browserList){
       return browserList.map((item)=>{
            return ` <li class="browser_item"><span class="browser_name">${item}</span><i class="icon icon-trash" ></i></li>`;
        }).join(""); 
    }  

    /**
     * 绑定删除浏览器
     */
    bindDeletebBrowser(){
        let deleteBtn = document.getElementsByClassName("icon-trash");
        for(let i = 0; i < deleteBtn.length; i++){
            deleteBtn[i].addEventListener("click", this.removeBrowser.bind(this, deleteBtn[i].parentElement));
        }
    }

    /**
     * 删除浏览器
     * @param {*} browserItem 
     */
    removeBrowser(browserItem){
        browserItem && browserItem.remove();
    }
}

export default AgentModule;
