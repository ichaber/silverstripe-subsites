!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s="./client/src/bundles/bundle.js")}({"./client/src/boot/index.js":function(e,t,n){"use strict";var i=n("./client/src/boot/registerComponents.js"),s=function(e){return e&&e.__esModule?e:{default:e}}(i);window.document.addEventListener("DOMContentLoaded",function(){(0,s.default)()})},"./client/src/boot/registerComponents.js":function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(0),o=i(s),r=n("./client/src/components/SubsiteChangeAlert/SubsiteChangeAlert.jsx"),a=i(r);t.default=function(){o.default.component.registerMany({SubsiteChangeAlert:a.default})}},"./client/src/bundles/bundle.js":function(e,t,n){"use strict";n("./client/src/legacy/entwine/LeftAndMain_Subsites.js"),n("./client/src/legacy/entwine/SubsitesTreeDropdownField.js"),n("./client/src/boot/index.js")},"./client/src/components/SubsiteChangeAlert/SubsiteChangeAlert.jsx":function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(1),c=i(u),l=n(3),d=i(l),f=n(5),b=n(6),m=i(b),p=n("./client/src/legacy/createEvent.js"),h=(i(p),function(e){function t(e){s(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleRevert=n.handleRevert.bind(n),n}return r(t,e),a(t,[{key:"handleRevert",value:function(){var e=this.props,t=e.myTabSubsiteID,n=e.myTabSubsiteName;(0,e.revertCallback)(t,n)}},{key:"getMessage",value:function(){var e=this.props,t=e.otherTabSubsiteName,n=e.myTabSubsiteName;return m.default.inject(m.default._t("SubsiteChangeAlert.SUBSITE_CHANGED","Your current subsite has changed to {otherTabSubsiteName}, continuing to edit this content will cause problems.\n        To continue editing {myTabSubsiteName}, please change the active subsite back."),{otherTabSubsiteName:t,myTabSubsiteName:n})}},{key:"render",value:function(){return c.default.createElement(f.Modal,{isOpen:!0,backdrop:"static"},c.default.createElement(f.ModalHeader,null,m.default._t("SubsiteChangeAlert.SUBSITE_CHANGED_TITLE","Subsite changed")),c.default.createElement(f.ModalBody,null,this.getMessage()),c.default.createElement(f.ModalFooter,null,c.default.createElement(f.Button,{color:"danger",onClick:this.handleRevert},m.default._t(t.REVERT,"Change back"))))}}]),t}(u.Component));h.propTypes={otherTabSubsiteName:d.default.string,myTabSubsiteID:d.default.string,myTabSubsiteName:d.default.string,revertCallback:d.default.func},t.default=h},"./client/src/legacy/createEvent.js":function(e,t,n){"use strict";function i(e,t){var n=window,i=n.document,o=n.Event,r=void 0;return"object"===(void 0===o?"undefined":s(o))?(r=i.createEvent("Event",!0,!0),r.initEvent(e)):r=new o(e),t&&Object.keys(t).forEach(function(e){r[e]=t[e]}),r}Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=i},"./client/src/legacy/entwine/LeftAndMain_Subsites.js":function(e,t,n){"use strict";(function(e){function t(e){return e&&e.__esModule?e:{default:e}}var i=n(1),s=t(i),o=n(4),r=t(o),a=n(0),u=n("./client/src/legacy/createEvent.js"),c=t(u),l=n("./client/src/lib/changeActiveSubsite.js"),d=t(l);e.entwine("ss",function(e){e("#SubsitesSelect").entwine({ModalNode:null,onadd:function(){var t=this;window.addEventListener("storage",function(e){if("subsiteInfo"===e.key){var t=(0,c.default)("subsitechange",{subsiteInfo:e.newValue});window.dispatchEvent(t)}},!1),window.addEventListener("subsitechange",function(e){var n=t.getModalNode(),i=JSON.parse(e.subsiteInfo);n&&r.default.unmountComponentAtNode(n),i.subsiteID!==t.val()&&t.showReactiveNotice(i.subsiteName)},!1),this.on("change",function(){var n=t.val();window.location.search=e.query.set("SubsiteID",n)}),this.storeSubsiteInfo()},storeSubsiteInfo:function(){var t=this.val(),n={subsiteID:t,subsiteName:e('[value="'+t+'"]',this).text()};window.localStorage.setItem("subsiteInfo",JSON.stringify(n))},showReactiveNotice:function(e){var t=window,n=t.document,i=this.getModalNode()||n.createElement("div");n.body.appendChild(i);var o=(0,a.loadComponent)("SubsiteChangeAlert"),u=this.get(0),c=u.selectedIndex;r.default.render(s.default.createElement(o,{otherTabSubsiteName:e,myTabSubsiteName:u.options[c].text,myTabSubsiteID:this.val(),revertCallback:d.default}),i),this.setModalNode(i)}}),e(".cms-container .cms-menu-list li a").entwine({onclick:function(t){e(".cms-container").loadFragment("admin/subsite_xhr","SubsiteList"),this._super(t)}}),e(".cms-container .SubsiteAdmin .cms-edit-form fieldset.ss-gridfield").entwine({onreload:function(t){e(".cms-container").loadFragment("admin/subsite_xhr","SubsiteList"),this._super(t)}}),e(".cms-container .tab.subsite-model").entwine({onadd:function(t){e(".cms-container").loadFragment("admin/subsite_xhr","SubsiteList"),this._super(t)}}),e("#Form_ItemEditForm_AccessAllSubsites").entwine({onmatch:function(){this.showHideSubsiteList();var t=this;e("#Form_ItemEditForm_AccessAllSubsites input").change(function(){t.showHideSubsiteList()})},showHideSubsiteList:function(){e("#Form_ItemEditForm_Subsites").parent().parent().css("display",e("#Form_ItemEditForm_AccessAllSubsites_1").is(":checked")?"none":"")}}),e(".cms-edit-form").entwine({getChangeTrackerOptions:function(){var t=void 0===this.entwineData("ChangeTrackerOptions"),n=this._super();return t&&(n=e.extend({},n),n.ignoreFieldSelector+=", input[name=IsSubsite]",this.setChangeTrackerOptions(n)),n}}),e(".cms-edit-form input[name=action_copytosubsite]").entwine({onclick:function(){this.closest("form").trigger("submit",[this])}})}),e.entwine("ss.preview",function(e){e(".cms-preview").entwine({onafterIframeAdjustedForPreview:function(t,n){var i=this,s=e(n).find("meta[name=x-subsite-id]").attr("content");s&&(e(n).find("a").each(function(){var t=e(i).attr("href");void 0===t||t.match(/^http:\/\//)||e(i).attr("href",e.path.addSearchParams(t,{SubsiteID:s}))}),e(n).find("form").each(function(){var t=e(i).attr("action");void 0===t||t.match(/^http:\/\//)||e(i).append('<input type=hidden name="SubsiteID" value="'+s+'" >')}))}})})}).call(t,n(2))},"./client/src/legacy/entwine/SubsitesTreeDropdownField.js":function(e,t,n){"use strict";(function(e){e.entwine("ss",function(e){e("select.subsitestreedropdownfield-chooser").entwine({onchange:function(){var t=this.attr("name").replace("_SubsiteID",""),n=e("#Form_EditForm_"+t).first();n.setValue(0),n.refresh(),n.trigger("change")}}),e(".TreeDropdownField.SubsitesTreeDropdownField").entwine({getAttributes:function(){var t=this.attr("id").replace("Form_EditForm_",""),n=e("#Form_EditForm_"+t+"_SubsiteID option:selected").val(),i=this._super();return i.data.urlTree+="?"+t+"_SubsiteID="+n,i.data.cacheKey=i.data.cacheKey.substring(0,19)+"_"+n,i}})})}).call(t,n(2))},"./client/src/lib/changeActiveSubsite.js":function(e,t,n){"use strict";function i(e,t){var n=window,i=n.localStorage,s=new XMLHttpRequest,r={subsiteID:e,subsiteName:t};s.open("GET","?SubsiteID="+e),s.addEventListener("load",function(){var e=JSON.stringify(r);i.setItem("subsiteInfo",e),window.dispatchEvent((0,o.default)("subsitechange",{subsiteInfo:e}))}),s.send()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var s=n("./client/src/legacy/createEvent.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(s)},0:function(e,t){e.exports=Injector},1:function(e,t){e.exports=React},2:function(e,t){e.exports=jQuery},3:function(e,t){e.exports=PropTypes},4:function(e,t){e.exports=ReactDom},5:function(e,t){e.exports=Reactstrap},6:function(e,t){e.exports=i18n}});