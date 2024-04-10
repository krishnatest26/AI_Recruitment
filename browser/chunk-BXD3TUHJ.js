import{A as re,J as se,P as R,Q as de,h as ie,i as ne,l as oe,r as ae,y as le,z as E}from"./chunk-MIECB3JW.js";import{k as Y,l as Z,o as ee,p as te}from"./chunk-VPK6XION.js";import{$b as A,Db as v,Eb as O,Gb as T,H as L,Hb as N,Ib as a,Jb as s,Kb as f,M as U,Na as $,Nb as K,Ob as w,Wb as m,Xb as u,Za as H,cb as W,fa as B,fc as c,gc as X,hc as g,ib as d,jb as x,jc as G,kc as J,la as b,lc as y,mb as M,o as F,oa as C,p as z,rc as q,sa as V,t as P,ta as S,tc as Q,ua as D,ub as h,wb as _,yb as j}from"./chunk-DIZFMHDL.js";function ue(n,o){n&1&&K(0)}function _e(n,o){if(n&1&&(a(0,"div"),h(1,ue,1,0,"ng-container",9),s()),n&2){let l=u();d(),_("ngTemplateOutlet",l.bodyTemplate)}}function fe(n,o){if(n&1&&f(0,"div",4),n&2){let l=u();_("innerHTML",l.bodyText,H)}}function he(n,o){if(n&1){let l=w();a(0,"button",7),m("click",function(){S(l);let t=u();return D(t.activeModal.dismiss())}),a(1,"span",8),c(2),s()()}if(n&2){let l=u();d(2),g(" ",l.noLbl," ")}}var k=(()=>{let o=class o{constructor(){this.activeModal=b(E),this.yesLbl="Ok"}ngOnInit(){this.bodyTemplate=this.body instanceof A?this.body:void 0,this.bodyText=this.body instanceof A?void 0:this.body}};o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=C({type:o,selectors:[["sdwds-modal"]],standalone:!0,features:[y],decls:13,vars:5,consts:()=>{let e;return e=$localize`Close`,[[1,"modal-header"],[1,"modal-title","first-capital"],["type","button","aria-label",e,1,"btn-close","text-reset",3,"click"],[1,"modal-body"],[3,"innerHTML"],[1,"modal-footer"],["class","btn"],[1,"btn",3,"click"],[1,"first-capital"],[4,"ngTemplateOutlet"]]},template:function(t,i){t&1&&(a(0,"div",0),f(1,"i"),a(2,"h4",1),c(3),s(),a(4,"button",2),m("click",function(){return i.activeModal.dismiss()}),s()(),a(5,"div",3),h(6,_e,2,1,"div")(7,fe,1,1,"div",4),s(),a(8,"div",5),h(9,he,3,1,"button",6),a(10,"button",7),m("click",function(){return i.activeModal.close(!0)}),a(11,"span",8),c(12),s()()()),t&2&&(d(3),g(" ",i.title," "),d(3),v(6,i.bodyTemplate?6:-1),d(),v(7,i.bodyText?7:-1),d(2),v(9,i.noLbl?9:-1),d(3),g(" ",i.yesLbl," "))},dependencies:[Z],encapsulation:2});let n=o;return n})(),I=class{constructor(o,l=!0){this.Success=l,this.Data=o}},me=(()=>{let o=class o{constructor(){this._ngbModal=b(re)}showInfo(e,t){return t=t||{},t.modalDialogClass=`modal-info ${t.modalDialogClass||""}`,this.show(k,e,t)}showWarning(e,t){return t=t||{},t.modalDialogClass=`modal-warning ${t.modalDialogClass||""}`,this.show(k,e,t)}showSuccess(e,t){return t=t||{},t.modalDialogClass=`modal-success ${t.modalDialogClass||""}`,this.show(k,e,t)}showDanger(e,t){return t=t||{},t.modalDialogClass=`modal-danger ${t.modalDialogClass||""}`,this.show(k,e,t)}show(e,t,i){i=i||{},i.windowClass=i.windowClass||"",i.windowClass=`sdwds-modal ${i.windowClass}`;let r=this._ngbModal.open(e,i||{});return t&&Object.assign(r.componentInstance,t),F(r.result).pipe(U(1),P(p=>new I(p)),L(p=>z(new I(p,!1))))}};o.\u0275fac=function(t){return new(t||o)},o.\u0275prov=B({token:o,factory:o.\u0275fac,providedIn:"root"});let n=o;return n})();var pe=(()=>{let o=class o{constructor(e,t){this.modal=e,this.addService=t}cancelDelete(e){e.preventDefault(),this.addService.resetButton()}};o.\u0275fac=function(t){return new(t||o)(x(E),x(R))},o.\u0275cmp=C({type:o,selectors:[["app-ngb-modal-delete"]],standalone:!0,features:[y],decls:15,vars:0,consts:[[1,"custom-sm-modal"],[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-danger",3,"click"]],template:function(t,i){t&1&&(a(0,"div",0)(1,"div",1)(2,"h4",2),c(3,"Delete Confirmation"),s(),a(4,"button",3),m("click",function(){return i.modal.dismiss("dismissed")}),a(5,"span",4),c(6,"\xD7"),s()()(),a(7,"div",5)(8,"p"),c(9,"Are you sure you want to delete this record?"),s()(),a(10,"div",6)(11,"button",7),m("click",function(){return i.modal.dismiss("cancel")})("click",function(p){return i.cancelDelete(p)}),c(12,"Cancel"),s(),a(13,"button",8),m("click",function(){return i.modal.close("delete")}),c(14,"Delete"),s()()())}});let n=o;return n})();var be=(n,o)=>o.fieldName;function Ce(n,o){n&1&&(a(0,"span",14),c(1,"*"),s())}function Se(n,o){n&1&&f(0,"i",15)}function De(n,o){n&1&&f(0,"i",16)}function ve(n,o){if(n&1){let l=w();a(0,"th",10),m("click",function(){let i=S(l).$implicit,r=u();return D(r.sortBy(i.fieldName))}),c(1),h(2,Ce,2,0,"span",11)(3,Se,1,0,"i",12)(4,De,1,0,"i",13),s()}if(n&2){let l=o.$implicit,e=u();d(),g(" ",l.displayName," "),d(),v(2,l.required?2:-1),d(),_("ngIf",e.sortedColumn===l.fieldName&&e.isAscending),d(),_("ngIf",e.sortedColumn===l.fieldName&&!e.isAscending)}}function we(n,o){if(n&1){let l=w();a(0,"button",19),m("click",function(){S(l);let t=u(3);return D(t.openModal(t.selectedRow))}),c(1),s()}if(n&2){let l=u().$implicit;d(),X(l.buttonLabel)}}function ye(n,o){if(n&1&&(a(0,"td"),c(1),h(2,we,2,1,"button",18),s()),n&2){let l=o.$implicit,e=u().$implicit;d(),g(" ",e[l.fieldName]," "),d(),_("ngIf",l.fieldName==="actions")}}function xe(n,o){if(n&1){let l=w();a(0,"tr",17),m("click",function(){let i=S(l).$implicit,r=u();return D(r.selectRow(i))}),T(1,ye,3,2,"td",null,O),s()}if(n&2){let l=o.$implicit,e=u();j("selected-row",e.isSelectedRow(l)),d(),N(e.columnArray)}}function Me(n,o){n&1&&(a(0,"span",20),c(1,"No data available."),s())}var Qe=(()=>{let o=class o{constructor(e){this.addService=e,this.searchText="",this.filteredData=[],this.selectedRow=null,this.isRowSelected=!1,this.isRowNotSelected=!0,this.sortedColumn="",this.isAscending=!0,this.selectedPayroll="344D23C4-091F-44E1-B68C-F6C0F4FF3B40",this.pageSize=10,this.page=1,this.collectionSize=0,this.pageSizes=[5,10,15,20],this.tableData=[],this.columnArray=[],this.onEdit=new M,this.onDelete=new M,this.onAdd=new M,this.sdwsModalService=b(me),this.elementRef=b(W),this.modalRef=null}ngOnChanges(e){e.tableData&&(console.log("tabledata: ",e.tableData),this.filteredData=this.tableData,this.collectionSize=this.filteredData.length)}isSelectedRow(e){return this.selectedRow===e}selectRow(e){this.selectedRow=e,this.isRowSelected=!0,this.isRowNotSelected=!1,console.log(e)}ngOnInit(){this.filteredData=this.tableData,console.log("filteredData",this.filteredData),this.addService.onAdd.subscribe(e=>{this.onAdd.emit(e),console.log("Received data from onAdd event:",e)}),this.addService.onEdit.subscribe(e=>{this.onEdit.emit(e),console.log("Received data from onEdit event:",e)}),this.addService.resetButton$.subscribe(()=>{this.clearSelectedRow()})}editRecord(e){this.selectedRow=e,console.log("data being edited: ",e),this.onEdit.emit(e)}openDeleteConfirmationModal(e){let t={},i={size:"sm",centered:!1};this.sdwsModalService.show(pe,t,i).subscribe(r=>{r.Success==!0&&(console.log("modal res: ",r),e?this.deleteRecord(e):this.clearSelectedRow())})}deleteRecord(e){console.log("data being deleted: ",e);let t=this.tableData.findIndex(i=>i===e);t!==-1&&(this.tableData.splice(t,1),this.searchRecords()),this.onDelete.emit(e),this.clearSelectedRow()}searchRecords(){console.log("Search text is",this.searchText);let e=this.searchText.toLowerCase();this.searchText?(console.log("search filtered data: ",this.filteredData),console.log("search table data: ",this.tableData),this.filteredData=this.tableData.filter(t=>t.payrollcompanydetailS_ID.toUpperCase()===this.selectedPayroll.toUpperCase()),this.filteredData=this.filteredData.filter(t=>this.columnArray.some(i=>t[i.fieldName].toLowerCase().includes(e))),this.collectionSize=this.filteredData.length,console.log("filtered data res: ",this.filteredData)):(console.log("search filtered data: ",this.filteredData),console.log("search table data: ",this.tableData),this.filteredData=this.tableData.filter(t=>t.payrollcompanydetailS_ID.toUpperCase()===this.selectedPayroll.toUpperCase()),this.collectionSize=this.filteredData.length)}clearSelectedRow(){this.selectedRow=null,this.isRowSelected=!1,this.isRowNotSelected=!0}handleDocumentClick(e){let t=e.target,i=this.isModalButton(t),r=this.isInsideModal(t);!i&&!r&&!this.isDescendant(t,this.elementRef.nativeElement)&&this.clearSelectedRow()}isInsideModal(e){return!!e.closest(".modal")}isModalButton(e){return e.matches(".btn")&&e.closest(".modal")}isDescendant(e,t){for(;e&&e.parentNode;){if(e.parentNode===t)return!0;e=e.parentNode}return!1}openModal(e=null){console.log("Selected Row Data:",e);let t={payrollnumber:this.selectedPayroll,form:this.form,data:e},i={size:this.form?.modalSize,centered:!0,backdrop:"static"};this.sdwsModalService.show(de,t,i)}sortBy(e){this.sortedColumn==e?this.isAscending=!this.isAscending:(this.sortedColumn=e,this.isAscending=!0),this.filteredData.sort((t,i)=>{let r=t[this.sortedColumn],p=i[this.sortedColumn];return this.isAscending?r.localeCompare(p):p.localeCompare(r)})}getPageUpperLimit(){return Math.min(this.page*this.pageSize,this.collectionSize)}setPageSize(e){this.pageSize=e,this.page=1}changePayroll(){this.filteredData=this.tableData.filter(e=>e.payrollcompanydetailS_ID.toUpperCase()===this.selectedPayroll.toUpperCase()),console.log("filtered data af: ",this.filteredData),this.page=1,this.collectionSize=this.filteredData.length}};o.\u0275fac=function(t){return new(t||o)(x(R))},o.\u0275cmp=C({type:o,selectors:[["app-ngb-table"]],hostBindings:function(t,i){t&1&&m("click",function(p){return i.handleDocumentClick(p)},!1,$)},inputs:{tableData:"tableData",columnArray:"columnArray",form:"form",option:"option"},outputs:{onEdit:"onEdit",onDelete:"onDelete",onAdd:"onAdd"},standalone:!0,features:[J([o]),V,y],decls:22,vars:15,consts:[[1,"d-flex","justify-content-between"],[1,"d-flex"],["type","text","placeholder","Search...",1,"form-control",3,"ngModel","disabled","ngModelChange","keyup"],[1,"card","my-3"],[1,"card-body","d-flex"],[1,"d-flex","align-items-center","flex-row","justify-content-start","mb-3"],["id","table",1,"table","table-hover"],[1,"thead-light"],[1,"text-muted"],["aria-label","Pagination",3,"page","pageSize","maxSize","boundaryLinks","collectionSize","pageChange"],["container","body",3,"click"],["class","text-danger"],["class","icons8-o-collapse-arrow text-end ms-1",4,"ngIf"],["class","icons8-o-expand-arrow text-end ms-1",4,"ngIf"],[1,"text-danger"],[1,"icons8-o-collapse-arrow","text-end","ms-1"],[1,"icons8-o-expand-arrow","text-end","ms-1"],[3,"click"],["class","btn btn-sm btn-primary",3,"click",4,"ngIf"],[1,"btn","btn-sm","btn-primary",3,"click"],[1,"text-center"],["container","body"],[3,"selected-row"],["class","text-center"]],template:function(t,i){t&1&&(f(0,"hr"),a(1,"div",0),f(2,"div",1),a(3,"div")(4,"input",2),m("ngModelChange",function(p){return i.searchText=p})("keyup",function(){return i.searchRecords()}),s()()(),a(5,"div",3)(6,"div",4)(7,"div",5)(8,"table",6)(9,"thead",7)(10,"tr"),T(11,ve,5,4,"th",21,be),s()(),a(13,"tbody"),T(14,xe,3,2,"tr",22,O,!1,Me,2,0,"span",23),q(17,"slice"),s()()(),a(18,"div",0)(19,"span",8),c(20),s(),a(21,"ngb-pagination",9),m("pageChange",function(p){return i.page=p}),s()()()()),t&2&&(d(4),_("ngModel",i.searchText)("disabled",i.isRowSelected),d(7),N(i.columnArray),d(3),N(Q(17,11,i.filteredData,(i.page-1)*i.pageSize,i.page*i.pageSize)),d(6),G("Showing ",(i.page-1)*i.pageSize+1," - ",i.getPageUpperLimit()," of ",i.collectionSize,""),d(),_("page",i.page)("pageSize",i.pageSize)("maxSize",10)("boundaryLinks",!0)("collectionSize",i.collectionSize))},dependencies:[ae,ie,ne,oe,te,Y,ee,se,le],styles:[".selected-row[_ngcontent-%COMP%]{background-color:#e3e6ef}.sdwds-modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{border:7px solid #870B5A!important}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%], select[_ngcontent-%COMP%]:hover{cursor:pointer}.records-btn[_ngcontent-%COMP%]{border-color:var(--neutral-surface-80)!important}.records-btn[_ngcontent-%COMP%]:disabled{border-color:var(--neutral-surface-40)!important}"]});let n=o;return n})();export{Qe as a};
