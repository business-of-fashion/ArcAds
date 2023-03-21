!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var i=n();for(var r in i)("object"==typeof exports?exports:e)[r]=i[r]}}("undefined"!=typeof self?self:this,(function(){return(()=>{var e={"./node_modules/anylogger-console/anylogger-console.cjs.js":(e,n,i)=>{function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=r(i("./node_modules/anylogger/anylogger.cjs.js"));t.default.ext=function(e){var n="undefined"!=typeof console&&console;for(var i in t.default.levels)e[i]=n&&(n[i]||n.log)||function(){};return e.enabledFor=function(){return!0},e}},"./node_modules/anylogger/anylogger.cjs.js":e=>{var n=Object.create(null),i=function(e,r){return e?n[e]||(n[e]=i.ext(i.new(e,r))):n};i.levels={error:1,warn:2,info:3,log:4,debug:5,trace:6},i.new=function(e,n){var r={};r[e]=function(){i.log(e,[].slice.call(arguments))};try{Object.defineProperty(r[e],"name",{get:function(){return e}})}catch(e){}return r[e]},i.log=function(e,r){var t=r.length>1&&i.levels[r[0]]?r.shift():"log";n[e][t].apply(n[e],r)},i.ext=function(e){for(var n in e.enabledFor=function(){},i.levels)e[n]=function(){};return e},e.exports=i},"./src/services/amazon.js":(e,n,i)=>{"use strict";function r(e,n,i,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,a=i;if(r&&void 0!==window.innerWidth&&void 0!==i[0][0][0]){for(var s=window.innerWidth,d=-1,l=r.length,c=0;c<l;c++)if(s>=r[c][0]){d=c;break}a=i[d]}t((function(){var i={slotName:n,slotID:e,sizes:a};window.apstag.fetchBids({slots:[i]},(function(){window.apstag.setDisplayBids(),o&&o()}))}))}function t(e){window.apstag&&e()}i.r(n),i.d(n,{fetchAmazonBids:()=>r,queueAmazonCommand:()=>t})},"./src/services/gpt.js":(e,n,i)=>{"use strict";i.r(n),i.d(n,{initializeGPT:()=>a,refreshSlot:()=>s,queueGoogletagCommand:()=>d,setTargeting:()=>l,dfpSettings:()=>c,determineSlotName:()=>u});var r=i("./src/util/resources.js"),t=i("./src/util/query.js"),o=i("./src/util/log.js");function a(){window.googletag=window.googletag||{},window.googletag.cmd=window.googletag.cmd||[],(0,r.appendResource)("script","//pagead2.googlesyndication.com/tag/js/gpt.js",!0,!0),(0,o.sendLog)("initializeGPT()","Appended googletag script to the head tag of the page.",null)}function s(e){var n=e.ad,i=e.correlator,r=void 0!==i&&i,t=e.prerender,a=void 0===t?null:t,s=e.info,d=void 0===s?{}:s;function l(){if(window.blockArcAdsLoad)return"blockArcAdsLoad";window.googletag&&googletag.pubadsReady?window.googletag.pubads().refresh([n],{changeCorrelator:r}):setTimeout((function(){l()}),200)}new Promise((function(e){if(a)try{a(d).then((function(){e("Prerender function has completed.")}))}catch(n){console.warn("ArcAds: Prerender function did not return a promise or there was an error.\n          Documentation: https://github.com/washingtonpost/arcads/wiki/Utilizing-a-Prerender-Hook"),e("Prerender function did not return a promise or there was an error, ignoring.")}else e("No Prerender function was provided.")})).then((function(){l()})).catch((function(e){(0,o.sendLog)("header bidding","init error",e)}))}function d(e){window.googletag.cmd.push(e)}function l(e,n){for(var i in n)n.hasOwnProperty(i)&&n[i]&&e.setTargeting(i,n[i])}function c(e){window.googletag.pubads().disableInitialLoad(),window.googletag.pubads().enableSingleRequest(),window.googletag.pubads().enableAsyncRendering(),window.googletag.pubads().setPrivacySettings({limitedAds:!0}),this.collapseEmptyDivs&&((0,o.sendLog)("dfpSettings()","This wrapper is set to collapse any empty divs.",null),window.googletag.pubads().collapseEmptyDivs()),window.googletag.enableServices(),e&&((0,o.sendLog)("dfpSettings()","This wrapper has a function to call upon the slot render ending.",null),window.googletag.pubads().addEventListener("slotRenderEnded",e))}function u(e,n){var i=(0,t.expandQueryString)("adslot");return!i||""===i&&null===i?"/".concat(e,"/").concat(n):"/".concat(e,"/").concat(i)}},"./src/services/headerbidding.js":(e,n,i)=>{"use strict";i.r(n),i.d(n,{initializeBiddingServices:()=>s,fetchBids:()=>d});var r=i("./src/services/prebid.js"),t=i("./src/services/amazon.js"),o=i("./src/services/gpt.js"),a=i("./src/util/log.js");function s(e){var n=e.prebid,i=void 0!==n&&n,r=e.amazon,o=void 0!==r&&r;if(window.arcBiddingReady)(0,a.sendLog)("initializeBiddingServices()","Header bidding has been previously initialized",null);else{window.arcBiddingReady=!1;var s=new Promise((function(e){if(i&&i.enabled){if("undefined"==typeof pbjs){var n=n||{};n.que=n.que||[]}e("Prebid has been initialized")}else(0,a.sendLog)("initializeBiddingServices()","Prebid is not enabled on this wrapper.",null),e("Prebid is not enabled on the wrapper...")})),d=new Promise((function(e){o&&o.enabled&&window.apstag?o.id&&""!==o.id?(0,t.queueAmazonCommand)((function(){window.apstag.init({pubID:o.id,adServer:"googletag"}),e("Amazon scripts have been added onto the page!")})):(console.warn("ArcAds: Missing Amazon account id. \n          Documentation: https://github.com/washingtonpost/arcads#amazon-tama9"),(0,a.sendLog)("initializeBiddingServices()","Amazon is not enabled on this wrapper.",null),e("Amazon is not enabled on the wrapper...")):e("Amazon is not enabled on the wrapper...")}));Promise.all([s,d]).then((function(){window.arcBiddingReady=!0})).catch((function(e){(0,a.sendLog)("header bidding","init error",e)}))}}function d(e){var n=this,i=e.ad,d=e.id,l=e.slotName,c=e.dimensions,u=e.wrapper,g=e.bidding,p=e.correlator,f=void 0!==p&&p,b=e.prerender,h=e.breakpoints,v={adUnit:i,adSlot:l,adDimensions:c,adId:d,bids:g},m=new Promise((function(e){if(u.prebid&&u.prebid.enabled){var t=u.prebid.timeout||700;r.queuePrebidCommand.bind(n,(0,r.fetchPrebidBids)(i,u.prebid.useSlotForAdUnit?l:d,t,v,b,(function(){e("Fetched Prebid ads!")})))}else e("Prebid is not enabled on the wrapper...")})),w=new Promise((function(e){u.amazon&&u.amazon.enabled?(0,t.fetchAmazonBids)(d,l,c,h,(function(){e("Fetched Amazon ads!")})):e("Amazon is not enabled on the wrapper...")}));window.arcBiddingReady?Promise.all([m,w]).then((function(){(0,o.refreshSlot)({ad:i,correlator:f,prerender:b,info:v})})).catch((function(e){(0,a.sendLog)("header bidding","init error",e)})):setTimeout((function(){return s()}),200)}},"./src/services/prebid.js":(e,n,i)=>{"use strict";i.r(n),i.d(n,{queuePrebidCommand:()=>s,fetchPrebidBidsArray:()=>d,fetchPrebidBids:()=>l,addUnit:()=>c});var r=i("./src/services/gpt.js");function t(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,r)}return i}function o(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?t(Object(i),!0).forEach((function(n){a(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function a(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function s(e){pbjs.que.push(e)}function d(e,n,i,t,o){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;pbjs.addAdUnits(t),window.blockArcAdsPrebid||pbjs.requestBids({timeout:i,adUnitCodes:n,bidsBackHandler:function(i){console.log("Bid Back Handler",i),pbjs.setTargetingForGPTAsync(n),a?a():(0,r.refreshSlot)({ad:e,info:t,prerender:o})}})}function l(e,n,i,r,t){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,a=r;a.bids=Array.isArray(r.bids)?r.bids:[r.bids],d(e,[n],i,a,t,o)}function c(e,n,i){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},t=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},a=o({code:e,bids:i},t);a.mediaTypes={banner:{sizes:n}};var s=r.sizeConfig,d=r.config;pbjs.addAdUnits(a),d?pbjs.setConfig(d):s&&pbjs.setConfig({sizeConfig:s})}},"./src/services/sizemapping.js":(e,n,i)=>{"use strict";i.r(n),i.d(n,{sizemapListeners:()=>s,resizeListeners:()=>d,prepareSizeMaps:()=>l,parseSizeMappings:()=>c,runResizeEvents:()=>u,setResizeListener:()=>g});var r=i("./src/util/debounce.js"),t=i("./src/services/headerbidding.js"),o=i("./src/services/gpt.js"),a=i("./src/util/log.js"),s={},d={};function l(e,n){var i=[],r=[],t=[],o=n.length?n:null;return o&&e&&o.forEach((function(n,o){i.push([n,e[o]]),-1===r.indexOf(n[0])&&(r.push(n[0]),t.push(!1))})),r.sort((function(e,n){return e-n})),{mapping:i,breakpoints:r,correlators:t}}function c(e){try{var n=[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight],i=e.filter((function(e){return e[0][0]<=n[0]&&e[0][1]<=n[1]})),r=i.length>0?i[0][1]:[];return r.length>0&&r[0].constructor!==Array&&(r=[r]),r}catch(n){return(0,a.sendLog)("parseSizeMappings()","invalid size mapping",null),e[e.length-1][1]}}function u(e){var n,i=!1;if(e.breakpoints){var r=window.innerWidth;n=e.breakpoints.filter((function(e){return e<r})).pop()||e.breakpoints[0]}return function(){for(var r,a,d=e.ad,l=e.breakpoints,u=e.id,g=e.bidding,p=e.mapping,f=e.slotName,b=e.wrapper,h=e.prerender,v=window.innerWidth,m=0;m<l.length;m++){if(r=l[m],a=l[m+1],n!==r&&(v>r&&(v<a||!a)||v===r&&!i)){n=r,i=!0;var w=c(p),y={adUnit:d,adSlot:f,adDimensions:w,adId:u};g.prebid&&g.prebid.enabled||g.amazon&&g.amazon.enabled?(0,t.fetchBids)({ad:d,id:u,slotName:f,dimensions:w,bidding:g,wrapper:b,prerender:h,correlator:s[u].correlators[m],breakpoints:l}):(0,o.refreshSlot)({ad:d,correlator:s[u].correlators[m],prerender:h,info:y})}s[u].correlators[m]=!0}}}function g(e){var n=e.id,i=e.correlators;d[n]=(0,r.debounce)(u(e),250),window.addEventListener("resize",d[n]),s[n]={listener:d[n],correlators:i}}},"./src/util/debounce.js":(e,n,i)=>{"use strict";function r(e,n){var i;return function(){for(var r=this,t=arguments.length,o=new Array(t),a=0;a<t;a++)o[a]=arguments[a];clearTimeout(i),i=setTimeout((function(){i=null,e.apply(r,o)}),n)}}i.r(n),i.d(n,{debounce:()=>r})},"./src/util/log.js":(e,n,i)=>{"use strict";i.r(n),i.d(n,{sendLog:()=>o});var r=i("./node_modules/anylogger/anylogger.cjs.js"),t=i.n(r);i("./node_modules/anylogger-console/anylogger-console.cjs.js");function o(e,n,i){try{if("true"===new URLSearchParams(window.location.search).get("debug"))t()("arcads.js")({service:"ArcAds",timestamp:"".concat(new Date),"logging from":e,description:n,slotName:i})}catch(e){console.error(e)}}},"./src/util/mobile.js":(e,n,i)=>{"use strict";function r(e,n){for(var i=0;i<n.length;i++){var r=n[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}i.r(n),i.d(n,{MobileDetection:()=>t,default:()=>o});var t=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,i,t;return n=e,t=[{key:"Android",value:function(){return!!navigator.userAgent.match(/Android/i)}},{key:"AndroidOld",value:function(){return!!navigator.userAgent.match(/Android 2.3.3/i)}},{key:"AndroidTablet",value:function(){return!(!navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Mobile/i))}},{key:"Kindle",value:function(){return!!navigator.userAgent.match(/Kindle/i)}},{key:"KindleFire",value:function(){return!!navigator.userAgent.match(/KFOT/i)}},{key:"Silk",value:function(){return!!navigator.userAgent.match(/Silk/i)}},{key:"BlackBerry",value:function(){return!!navigator.userAgent.match(/BlackBerry/i)}},{key:"iOS",value:function(){return!!navigator.userAgent.match(/iPhone|iPad|iPod/i)}},{key:"iPhone",value:function(){return!!navigator.userAgent.match(/iPhone|iPod/i)}},{key:"iPad",value:function(){return!!navigator.userAgent.match(/iPad/i)}},{key:"Windows",value:function(){return!!navigator.userAgent.match(/IEMobile/i)}},{key:"FirefoxOS",value:function(){return!!navigator.userAgent.match(/Mozilla/i)&&!!navigator.userAgent.match(/Mobile/i)}},{key:"Retina",value:function(){return window.retina||window.devicePixelRatio>1}},{key:"any",value:function(){return this.Android()||this.Kindle()||this.KindleFire()||this.Silk()||this.BlackBerry()||this.iOS()||this.Windows()||this.FirefoxOS()}}],(i=null)&&r(n.prototype,i),t&&r(n,t),e}();const o=t},"./src/util/query.js":(e,n,i)=>{"use strict";function r(e){var n=window.location.href,i=e.replace(/[[\]]/g,"\\$&"),r=new RegExp("[?&]".concat(i,"(=([^&#]*)|&|#|$)")).exec(n);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}i.r(n),i.d(n,{expandQueryString:()=>r})},"./src/util/resources.js":(e,n,i)=>{"use strict";function r(e,n,i,r,t){var o=document.createElement(e);"script"===e&&void 0===document.querySelectorAll('script[src="'.concat(n,'"]'))[0]&&(o.src=n,o.async=i||!1,o.defer=i||r||!1,(document.head||document.documentElement).appendChild(o),t&&t())}i.r(n),i.d(n,{appendResource:()=>r})}},n={};function i(r){var t=n[r];if(void 0!==t)return t.exports;var o=n[r]={exports:{}};return e[r](o,o.exports,i),o.exports}i.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return i.d(n,{a:n}),n},i.d=(e,n)=>{for(var r in n)i.o(n,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},i.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return(()=>{"use strict";i.r(r),i.d(r,{ArcAds:()=>p});var e=i("./src/util/mobile.js"),n=i("./src/util/log.js"),t=i("./src/services/headerbidding.js"),o=i("./src/services/gpt.js"),a=i("./src/services/prebid.js"),s=i("./src/services/sizemapping.js");function d(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function l(e,n){for(var i=0;i<n.length;i++){var r=n[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return u(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return u(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,n){(null==n||n>e.length)&&(n=e.length);for(var i=0,r=new Array(n);i<n;i++)r[i]=e[i];return r}function g(e){return Array.isArray(e)?1+Math.max.apply(Math,c(e.map((function(e){return g(e)})))):0}var p=function(){function i(r){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;d(this,i),this.dfpId=r.dfp.id||"",this.wrapper=r.bidding||{},this.positions=[],this.collapseEmptyDivs=r.dfp.collapseEmptyDivs,this.adsList=[],window.isMobile=e.MobileDetection,""===this.dfpId?(console.warn("ArcAds: DFP id is missing from the arcads initialization script.","\n","Documentation: https://github.com/washingtonpost/arcads#getting-started"),(0,n.sendLog)("constructor()","The DFP id missing from the arcads initialization script. ArcAds cannot proceed.",null)):((0,o.initializeGPT)(),(0,o.queueGoogletagCommand)(o.dfpSettings.bind(this,a)),(0,t.initializeBiddingServices)(this.wrapper))}var r,u,p;return r=i,p=[{key:"setAdsBlockGate",value:function(){var e=i.getWindow();void 0!==e&&(e.blockArcAdsLoad=!0)}},{key:"releaseAdsBlockGate",value:function(){var e=i.getWindow();void 0!==e&&(e.blockArcAdsLoad=!1)}},{key:"getWindow",value:function(){return window}}],(u=[{key:"registerAd",value:function(e){var i=e.id,r=e.slotName,t=e.dimensions,s=e.adType,d=void 0!==s&&s,l=e.targeting,u=void 0===l?{}:l,p=e.display,f=void 0===p?"all":p,b=e.bidding,h=void 0!==b&&b,v=e.iframeBidders,m=void 0===v?["openx"]:v,w=e.others,y=void 0===w?{}:w,A=[],j=!1,k=g(t);t&&void 0!==t&&1===k||t&&void 0!==t&&t.length>0&&2===k?A.push.apply(A,c(t)):t&&t.forEach((function(e){A.push.apply(A,c(e))}));try{if(!(u&&u.hasOwnProperty("position")||!1===d)){var S=this.positions[d]+1||1;this.positions[d]=S;var P=Object.assign(u,{position:S});Object.assign(e,{targeting:P})}var z=h.prebid&&(h.prebid.enabled&&h.prebid.bids||void 0===h.prebid.enabled&&h.prebid.bids);if(isMobile.any()&&"mobile"===f||!isMobile.any()&&"desktop"===f||"all"===f){if(z&&this.wrapper.prebid&&this.wrapper.prebid.enabled&&A){pbjs&&m.length>0&&pbjs.setConfig({userSync:{iframeEnabled:!0,filterSettings:{iframe:{bidders:m,filter:"include"}}}});var L=this.wrapper.prebid.useSlotForAdUnit?(0,o.determineSlotName)(this.dfpId,r):i;a.queuePrebidCommand.bind(this,(0,a.addUnit)(L,A,h.prebid.bids,this.wrapper.prebid,y))}(j=this.displayAd.bind(this,e))&&((0,n.sendLog)("registerAd()","Queuing Google Tag command for ad",r),(0,o.queueGoogletagCommand)(j))}}catch(e){console.error("ads error",e)}}},{key:"registerAdCollection",value:function(e){var n=this;e.forEach((function(e){n.registerAd(e)}))}},{key:"registerAdCollectionSingleCall",value:function(e){var i=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:700;(0,n.sendLog)("registerAdCollectionSingleCall()","Registering all reserved ads",null),window.blockArcAdsLoad=!0,window.blockArcAdsPrebid=!0,e.forEach((function(e){i.registerAd(e)})),window.blockArcAdsLoad=!1,window.blockArcAdsPrebid=!1,pbjs.requestBids({timeout:r,bidsBackHandler:function(e){console.log("Bid Back Handler",e),pbjs.setTargetingForGPTAsync(),window.googletag.pubads().refresh(window.adsList),window.adsList=[]}})}},{key:"displayAd",value:function(e){var i=e.id,r=e.slotName,a=e.dimensions,d=e.targeting,l=e.sizemap,c=void 0!==l&&l,u=e.bidding,g=void 0!==u&&u,p=e.prerender,f=void 0===p?null:p,b=(0,o.determineSlotName)(this.dfpId,r),h=a&&!a.length?null:a,v=a?window.googletag.defineSlot(b,h,i):window.googletag.defineOutOfPageSlot(b,i);if(c&&c.breakpoints&&a){var m=(0,s.prepareSizeMaps)(h,c.breakpoints),w=m.mapping,y=m.breakpoints,A=m.correlators;if(!v)return(0,n.sendLog)("displayAd()","No ad available to display - the div was either not defined or an ad with the same slot name already exists on the page",r),!1;v.defineSizeMapping(w),c.refresh&&((0,n.sendLog)("displayAd()","Attaching resize listener to the ad with this slot name and sizemap defined",r),(0,s.setResizeListener)({ad:v,slotName:b,breakpoints:y,id:i,mapping:w,correlators:A,bidding:g,wrapper:this.wrapper,prerender:f}))}v&&(v.addService(window.googletag.pubads()),(0,o.setTargeting)(v,d));var j=c&&c.breakpoints?c.breakpoints:[];window.adsList&&v&&adsList.push(v),a&&g&&(g.amazon&&g.amazon.enabled||g.prebid&&g.prebid.enabled)?((0,n.sendLog)("displayAd()","Fetching bids for ad with this slot name",r),(0,t.fetchBids)({ad:v,id:i,slotName:b,dimensions:h,wrapper:this.wrapper,prerender:f,bidding:g,breakpoints:j})):window.blockArcAdsPrebid||((0,n.sendLog)("displayAd()","Refreshing ad with this slot name",r),(0,o.refreshSlot)({ad:v,prerender:f,info:{adUnit:v,adSlot:b,adDimensions:h,adId:i}}))}},{key:"sendSingleCallAds",value:function(){var e=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:700;if(this.adsList&&this.adsList.length<1)return(0,n.sendLog)("sendSingleCallAds()","No ads have been reserved on the page",null),!1;window&&window.googletag&&googletag.pubadsReady?(window.googletag.pubads().disableInitialLoad(),window.googletag.pubads().enableSingleRequest(),window.googletag.pubads().enableAsyncRendering(),this.registerAdCollectionSingleCall(this.adsList,i)):setTimeout((function(){e.sendSingleCallAds()}),2e3)}},{key:"reserveAd",value:function(e){i.setAdsBlockGate(),this.adsList.push(e)}},{key:"setPageLeveTargeting",value:function(e,n){googletag.pubads().setTargeting(e,n)}}])&&l(r.prototype,u),p&&l(r,p),i}()})(),r})()}));