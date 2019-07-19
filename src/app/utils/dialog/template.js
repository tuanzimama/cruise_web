export const template = `
    <div class="dialog_modal_wrapper hidden" id="dialog_modal_wrapper">
        <div class="dialog_modal bg-color-white" id="dialog_modal">
            <div class="dialog_header">
                <p>Separate multiple resource name with commas</p>
                <i class="icon-close"></i>
            </div>
            <div class="dialog_main">
                <form>
                    <input type="search" id="dialog_search" placeholder="Ubuntu,Chrome"/>
                </form>
            </div>
            <div class="dialog_footer">
                <button id="confirm_btn" class="mar-r-10">Add Resources</button>
                <button id="cancel_btn">Cancel</button>
            </div>
        </div>
    </div>
`;