
import './app/styles/common/reset.scss';
import './app/styles/common/variable.scss';
import './app/styles/common/basic.scss';
import './app/styles/fonts.css';
import './app/styles/index.scss';
import './app/styles/common/media.scss';

import {HISTORY_DATA} from './assets/dummy-data/history-data.js';
import AgentModule from './app/business/agent/index.js'
import Tools from './app/utils/tools/styleTools';

init();

/**
 * 初始化界面
 */
function init(){
    fillMainView();
    getHistoryData();
    eventRegister();     
}

/**
 * 填充右侧主区域
 */
function fillMainView(){
    let agentModule = agentModule || new AgentModule();   
    agentModule.init(); // 填充 agent 模块
}

/**
 * 获取 history 数据
 */
function getHistoryData(){
    let historyTitle = document.querySelector(".nav_history h4");
    Tools.removeClass(historyTitle,"hidden"); //无历史数据，隐藏title
    if(HISTORY_DATA.length == 0 ){
        Tools.addClass(historyTitle,"hidden");
        return "";
    }

    let historyLi = HISTORY_DATA.map((historyItem,index) => {
        return `<li class="font12 color-9 text-ellipsis">${historyItem.prev_text}${index + 1}/${historyItem.next_text}</li>`;
    }).join("");

    document.getElementById("nav_history").innerHTML += historyLi;
}

/**
 * 事件注册
 */
function eventRegister(){
    let iconDown = document.querySelector(".icon-angle-down");
    let dropDownUl = document.querySelector("ul.drop-down"); 

    /** 切换显示头部右侧box */
    iconDown.onclick = () => Tools.toggleClass(dropDownUl, "hidden");  

    let menuCollapseBtn = document.querySelector(".menu_collapse");
    let navMenu = document.querySelector(".cruise_content_menu");
    let menuCloseBtn = document.getElementById("nav_close_btn");

    let dropDownItems = document.querySelectorAll("ul.drop-down li"); 
    for(let i = 0; i< dropDownItems.length; i++){        
        dropDownItems[i].addEventListener("click", hideDropDown.bind(this,dropDownUl));
    }
   
    /**
     * 头部按钮绑定事件
     */
    menuCollapseBtn.onclick = () => {       
        Tools.removeClass(navMenu, "desktop-only"); // 隐藏左侧菜单大屏class 
        Tools.removeClass(menuCloseBtn, "hidden"); // 显示左侧菜单关闭栏 
    }

    /**
     * 菜单关闭按钮绑定事件
     */
    menuCloseBtn.onclick = () => {      
        Tools.addClass(navMenu, "desktop-only");    
        Tools.addClass(this, "hidden");  
    }    
}

/**
 * 隐藏下拉框弹出面板
 * @param {*} dropDownUl 
 */
function hideDropDown(dropDownUl){
    Tools.toggleClass(dropDownUl, "hidden");
}
