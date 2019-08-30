window.onload = function(){
    init();
} 
function init(){
    toDoListInit(document.getElementsByClassName('wrap')[0]);
}

var toDoListInit = (function(){
    var OlistHdBtn ,
        OinputWrap,
        OinputBd,
        OlistItemBtn,
        OList,
        config,
        tartext ,/**li的第一个子元素 */
        isAdd = 1,/** 一开始是处于增加的状态*/
        isShow = 0;
       
    function getConfig(opt){
        config = JSON.parse(opt.getAttribute('data-config'));
    }

    function setConfig(opt){
        OlistHdBtn =  document.getElementsByClassName(opt.listHdBtn)[0];
        OinputBd = document.getElementsByClassName(opt.inputBd)[0];
        OlistItemBtn = document.getElementsByClassName(opt.btnBd)[0];
        OList = document.getElementsByClassName(opt.list)[0];
        OinputWrap = document.getElementsByClassName(opt.inputWrap)[0];
    }

    function bindEvent(){
        addEvent(OlistHdBtn,'click',showBorder);
        addEvent(OlistItemBtn,'click',addListItem);
        /*addEvent(List,'click',modification);*想在添加绑定事件时如何传入e */
        addEvent(OList,'click',function(e){
            modification(e);
        });
    }
    
    function modification(e){
        var e = e || window.event,
            tar = e.target || e.srcElement,
            tarClassName = tar.className,
            tarParents = findParents(tar,2),
            idx = Array.prototype.indexOf.call(findElementChildNode(OList),tarParents);/**是从一个数组中找 */
            tartext = findElementChildNode(tarParents)[0];
            
            if('fa fa-edit' == tarClassName){
                OinputBd.value = tartext.innerHTML;
                OlistItemBtn.innerHTML = '编辑第'+ (idx+1)+'项';
                isAdd = 0;
            }
            else if('fa fa-times' == tarClassName){
                tarParents.remove();
            }
        
    }
    function showBorder(){
        if(0 == isShow){
            OinputWrap.className += ' active'; 
            isShow = 1;
        }
        else{
            OinputWrap.className = 'input-wrap';
            isShow = 0;
        }
        
    }
    function addListItem(){
        if(1 == isAdd){
            addItems();
        }
        else{
            /** 编辑状态*/
            tartext.innerHTML = OinputBd.value ;
            isAdd = 1;
            OlistItemBtn.innerHTML = '增加项目';

        }
    }

    function itemTpl(text){
        return(
            '<p class="item-content">'+ text +'</p>' /**第一项：显示的文本 */
          +' <div class="btn-group">' /**第二项的父元素 */
                +'<a href="javascript:" class = "fa fa-edit">' + '</a>'/**第二项的第一个子元素 */
                +'<a href="javascript:" class = "fa fa-times">' + '</a>'/**第二项的第二个子元素 */
          +'</div>'
        );
    }
    function addItems(){
        var Oflag = document.createDocumentFragment(),
            val = OinputBd.value,/*判断输入框的值*/
            len = val.length,/*判断输入框的值的长度*/
            /**itemLen = OList.childNodes.length - 1,一开始有 一个长度（是文本节点）*/
            Oitem = findElementChildNode(OList),
            OitemLen = Oitem.length, /**ul节点的子元素的长度 */
            item,
            OLi ;
         if(0 === len){
            return ;
         }
         console.log(OitemLen);
         
         /*去重*/
         if(OitemLen > 0){
            for(var i = 0 ; i < OitemLen;i++){
                item =  findElementChildNode(Oitem[i])[0];/**每个子元素的第一个子节点（即item-content） */
                console.log(item.innerHTML);
                if(val === item.innerHTML){
                    alert('该值重复了');
                    return;
                }
             }
         }
         /**加元素 */
         OLi = document.createElement('li');
         OLi.className = 'item';
         OLi.innerHTML = itemTpl(val);/**将val传入itemTpl函数，使得Oli是三个子元素的父元素*/
         console.log(itemTpl(val));
         OList.appendChild(OLi);
         OinputBd.value = '';  /**将输入框清零 */


    }
    function init(opt){
        getConfig(opt);
        setConfig(config);
        bindEvent();
        console.log(config.btnBd);
    }
    return init;
})();