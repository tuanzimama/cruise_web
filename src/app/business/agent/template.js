export const template = `
<ul class="agent_card">
<li class="card_building color-white">
    <div class="font18 font-b pad-14 card_name">Building</div>
    <div class="font48 card-num"></div>
    <div class="card_bg icon-cog"></div>
</li>
<li class="card_idle color-white">
    <div class="font18 font-b pad-14 card_name">Idle</div>
    <div class="font48 card-num"></div>
    <div class="card_bg icon-coffee"></div>
</li>
<li class="card_summary bg-color-white">
    <div class="card_summary_item">
        <span class="category font12">ALL</span>
        <span class="card_summary_num font20" id="card_summary_all"></span>
    </div>
    <div class="card_summary_item">
        <span class="category font12">PHYSICAL</span>
        <span class="card_summary_num font20" id="card_summary_physical"></span>
    </div>
    <div class="card_summary_item">
        <span class="category font12">VIRTUAL</span>
        <span class="card_summary_num font20" id="card_summary_virtual"></span>
    </div>
</li>
</ul>

<div class="card_summary-row bg-color-white">
<div class="card_summary_item">
    <span class="category font12">ALL</span>
    <span class="card_summary_num font20">8</span>
</div>
<div class="card_summary_item">
    <span class="category font12">PHYSICAL</span>
    <span class="card_summary_num font20">4</span>
</div>
<div class="card_summary_item">
    <span class="category font12">VIRTUAL</span>
    <span class="card_summary_num font20">4</span>
</div>
</div>


<div class="agent_toolbar">
<div class="agent_tab_wrapper bg-color-white">
    <ul class="agent_tab">
        <li class="tab_active">All</li>
        <li class="">Physical</li>
        <li class="">Virtual</li>
    </ul>
</div>
<div class="search_wrapper bg-color-white">
  
        <div class="agent_search">
            <i class="icon-lg icon-search color-9"></i>
            <input type="search" placeholder="" id="search_keywords"/>
        </div>
   
</div>
<div class="agent_operation bg-color-white">
    <i class="icon-lg icon-th-card"></i>
    <i class="icon-lg icon-th-list mar-l-20 color-active"></i>
</div>
</div>

<div class="agent_list">
    <ul></ul>
</div>
`;
