(this["webpackJsonpvrai-debat-app"]=this["webpackJsonpvrai-debat-app"]||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},22:function(e,t,n){},23:function(e,t,n){},3:function(e){e.exports=JSON.parse('{"root":[{"id":"root","name":"Le Vrai D\xe9bat","votesCount":679938,"votesCountOk":523266,"keywords":[]}],"nodes":[{"id":0,"name":"D\xe9mocratie, institutions, RIC","votesCount":132063,"votesCountOk":104900,"keywords":[{"id":0,"name":"faim"},{"id":1,"name":"mourir"},{"id":2,"name":"SDF"},{"id":3,"name":"Google"},{"id":4,"name":"pr\xe9caire"},{"id":5,"name":"entreprise"},{"id":6,"name":"r\xe9ferendum"},{"id":7,"name":"racket"}]},{"id":1,"name":"Economie, finances, travail, comptes-publics","votesCount":154551,"votesCountOk":129428,"keywords":[{"id":0,"name":"discipline"},{"id":1,"name":"public"},{"id":2,"name":"d\xe9veloppement"},{"id":3,"name":"pr\xe9caire"},{"id":4,"name":"choix"},{"id":5,"name":"d\xe9couvert"},{"id":6,"name":"patrimoine"},{"id":7,"name":"pr\xe9f\xe9rence"}]},{"id":2,"name":"Education, jeunesse, enseignement-sup\xe9rieur, recherche, innovation","votesCount":58864,"votesCountOk":42265,"keywords":[{"id":0,"name":"constitutionnel"},{"id":1,"name":"etat"},{"id":2,"name":"enfant"},{"id":3,"name":"effectif"},{"id":4,"name":"justice"},{"id":5,"name":"pratique"},{"id":6,"name":"vocation"},{"id":7,"name":"priv\xe9"}]},{"id":3,"name":"Europe, affaires-\xe9trang\xe8res, outre-mer","votesCount":48031,"votesCountOk":33354,"keywords":[{"id":0,"name":"avantage"},{"id":1,"name":"\xe9conomie"},{"id":2,"name":"construction"},{"id":3,"name":"entreprise"},{"id":4,"name":"budget"},{"id":5,"name":"citoyennet\xe9"},{"id":6,"name":"budget"},{"id":7,"name":"r\xe9voquer"}]},{"id":4,"name":"Justice, police, arm\xe9e","votesCount":28707,"votesCountOk":21075,"keywords":[{"id":0,"name":"r\xe9sultat"},{"id":1,"name":"corps"},{"id":2,"name":"nombre"},{"id":3,"name":"pr\xe9sident"},{"id":4,"name":"ch\xf4meurs"},{"id":5,"name":"criminel"},{"id":6,"name":"d\xe9ontologie"},{"id":7,"name":"interm\xe9diaires"}]},{"id":5,"name":"Sant\xe9, solidarit\xe9, handicap","votesCount":40866,"votesCountOk":31166,"keywords":[{"id":0,"name":"avis"},{"id":1,"name":"pluralit\xe9"},{"id":2,"name":"r\xe9el"},{"id":3,"name":"\xe9conomie"},{"id":4,"name":"cr\xe9ation"},{"id":5,"name":"domaine"},{"id":6,"name":"observatoire"},{"id":7,"name":"prestation"}]},{"id":6,"name":"Sport, culture","votesCount":27291,"votesCountOk":18367,"keywords":[{"id":0,"name":"professionnel"},{"id":1,"name":"salaires"},{"id":2,"name":"contr\xf4le"},{"id":3,"name":"chasse"},{"id":4,"name":"populisme"},{"id":5,"name":"t\xe9l\xe9vision"},{"id":6,"name":"mandats"},{"id":7,"name":"charte"}]},{"id":7,"name":"Expression Libre","votesCount":165090,"votesCountOk":123143,"keywords":[{"id":0,"name":"r\xe9alit\xe9"},{"id":1,"name":"si\xe8ge"},{"id":2,"name":"tour"},{"id":3,"name":"adulte"},{"id":4,"name":"r\xe9forme"},{"id":5,"name":"2017"},{"id":6,"name":"fondamental"},{"id":7,"name":"libert\xe9"}]},{"id":8,"name":"Transition \xe9cologique et solidaire, agriculture, alimentation","votesCount":24475,"votesCountOk":19568,"keywords":[{"id":0,"name":"professionnel"},{"id":1,"name":"soci\xe9t\xe9"},{"id":2,"name":"consultation"},{"id":3,"name":"journal"},{"id":4,"name":"r\xe9alit\xe9"},{"id":5,"name":"\xe9l\xe9ment"},{"id":6,"name":"argent"},{"id":7,"name":"universel"}]}]}')},41:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(15),r=n.n(o),s=(n(22),n(2)),c=(n(23),n(3)),l=n(14),d=function(e){var t=i.a.useRef(""),n=i.a.useRef("");i.a.useEffect((function(){var a=l.select(t.current),i=l.select(n.current);e.zoomtool&&a.call(l.zoom().extent([[0,0],[e.width,e.height]]).scaleExtent([1,2]).on("zoom",(function(){i.attr("transform",l.event.transform)})))}));var a="0 0 "+e.width+" "+e.height;return i.a.createElement("div",null,i.a.createElement("svg",{id:e.chartId,viewBox:a,ref:t},i.a.createElement("g",{ref:n},e.children)))},u=n(14),m=function(e){var t=e.data,n=e.width/2,a=e.height/2,o=2*Math.PI/t.nodes.length,r=2*Math.PI/8,s=i.a.useRef("");function c(e){return"root"===e.id?120:e.votesCount?.26*Math.sqrt(e.votesCount):60}function l(e){return"root"===e.id?100:e.votesCount?.22*Math.sqrt(e.votesCount):50}function d(e){return"root"===e.id?36:e.votesCount?.35*Math.sqrt(e.votesCount/Math.max(30,e.name.length)):14}function m(t){return"root"===t.id?"#fafafe":e.colors[t.id%e.colors.length]}function f(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("root"===e.id)return n;var a=250+(!0===t?130:0);return n+a*Math.cos(o*e.id)}function v(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("root"===e.id)return a;var n=250+(!0===t?130:0);return a+n*Math.sin(o*e.id)}return i.a.useEffect((function(){var i=u.select(s.current).selectAll(".ring1").data(t.nodes).enter().append("g");i.append("line").classed("link",!0).attr("x1",n).attr("y1",a).attr("x2",f).attr("y2",v),i.append("g").classed("ring1",!0).attr("transform",(function(e){return"translate("+f(e)+","+v(e)+")"})).append("g").classed("node",!0),i.selectAll(".root").data(t.root).enter().append("g").classed("root",!0).classed("node",!0).classed("selected",!0).attr("transform","translate("+n+","+a+")");var o=i.selectAll(".node");o.append("ellipse").classed("node-shape",!0).attr("rx",c).attr("ry",l).style("fill",m),o.append("foreignObject").attr("width",(function(e){return 2*c(e)})).attr("height",(function(e){return 2*l(e)})).attr("x",(function(e){return-c(e)})).attr("y",(function(e){return-l(e)})).append("xhtml:div").classed("label",!0).style("line-height",(function(e){return 2*l(e)+"px"})).style("font-size",(function(e){return d(e)+"px"})).html((function(e){return"<span>"+e.name+"</span>"})),o.on("click",(function(t){var i=m(t),p=Math.min(Math.max(.8*d(t),9),12),h=c(t),g=l(t);o.classed("selected",(function(e){return e.id===t.id})),u.select(s.current).transition().attr("transform",(function(e){return"translate("+(n-f(t,!0))+","+(a-v(t,!0))+")"})).duration(2e3);var b=u.selectAll(".ring1");b.transition().attr("transform",(function(e){return"translate("+f(e,e.id===t.id)+","+v(e,e.id===t.id)+")"})).duration(2e3),b.filter((function(e){return e.id!==t.id})).selectAll(".ring2").remove(),o.filter((function(e){return e.id===t.id})).selectAll("g").raise();var k=b.filter((function(e){return e.id===t.id})).selectAll(".ring2").classed("selected",!1).data((function(e){return e.keywords})).enter().append("g").classed("ring2",!0).attr("transform",(function(e){return"translate("+function(e,t){return(t+40)*Math.cos(r*e.id)}(e,h)+","+function(e,t){return(t+20)*Math.sin(r*e.id)}(e,g)+")"})).append("g").classed("node",!0);k.append("ellipse").classed("node-shape",!0).attr("rx",40).attr("ry",20).style("fill",i).style("opacity",0).transition().style("opacity",1).duration(2e3),k.append("foreignObject").attr("width",80).attr("height",40).attr("x",-40).attr("y",-20).append("xhtml:div").classed("label",!0).style("line-height","40px").style("font-size",p+"px").html((function(e){return"<span>"+e.name+"</span>"})),k.on("click",(function(n){k.classed("selected",(function(e){return e.id===n.id})),e.onClick(t.id,t.name,n.id,n.name)})).on("mouseover",(function(e){u.select(s.current).selectAll(".ring2 > .node").classed("hover",(function(t){return t.id===e.id}))})).on("mouseout",(function(e){u.select(s.current).selectAll(".ring2 > .node").classed("hover",!1)})),e.onClick(t.id,t.name,null)})).on("mouseover",(function(e){u.select(s.current).selectAll(".ring1 > .node").classed("hover",(function(t){return t.id===e.id}))})).on("mouseout",(function(e){u.select(s.current).selectAll(".ring1 > .node").classed("hover",!1)}))})),i.a.createElement("g",{className:"network-graph"},i.a.createElement("g",{ref:s}))},f=function(e){for(var t=8*e.radius+25,n=2*e.radius+10,a=[],o=0;o<4;o++){var r=e.radius/Math.sqrt(4-o);a[o]={radius:r,centerX:5*(1+o)+(1+2*o)*e.radius,centerY:n/2,id:e.id+"_"+o,filled:e.quantiles[o]<e.score}}var s=a.map((function(t){return i.a.createElement("circle",{r:t.radius,cx:t.centerX,cy:t.centerY,key:t.id,stroke:e.color,fill:t.filled?e.color:"transparent"})}));return i.a.createElement("svg",{width:t,height:n},i.a.createElement("g",null,s))};function v(e){return Intl.NumberFormat().format(e)}var p=function(e){var t=i.a.useRef(),n=i.a.useState(""),a=Object(s.a)(n,2),o=a[0],r=a[1],c=i.a.useState("+"),l=Object(s.a)(c,2),d=l[0],u=l[1],m=i.a.useState(!1),p=Object(s.a)(m,2),h=p[0],g=p[1];i.a.useEffect((function(){setTimeout((function(){var e=t.current;e.scrollHeight-e.clientHeight<15?r("expanded"):g(!0)}),100)}),[t]);var b={color:e.color,borderColor:e.color};return i.a.createElement("li",{key:e.id,className:"contribution-list-item"},i.a.createElement("h1",null,e.contrib.contribution_versions_title),i.a.createElement("div",{className:"contribution-body"},i.a.createElement("div",{className:"text "+o,ref:t},e.contrib.contribution_versions_bodyText),""===o&&i.a.createElement("div",{className:"mask"})),i.a.createElement("div",{className:"bottom"},i.a.createElement("div",{className:"buttons"},h&&i.a.createElement("button",{onClick:function(){o?(r(""),u("+")):(r("expanded"),u("-"))}},d)),i.a.createElement("div",{className:"vote-count",style:b},i.a.createElement("div",{className:"scale"},i.a.createElement(f,{radius:8,color:e.color,score:e.contrib.contributions_votesCountOk,quantiles:e.quantiles})),i.a.createElement("div",{className:"count"},v(e.contrib.contributions_votesCountOk)," votes favorables / ",v(e.contrib.contributions_votesCount)," exprim\xe9s"))))},h=function(e){var t=i.a.useRef(null);function n(t){return e.colorPalette[t%e.colorPalette.length]}var a=null;void 0!==e.contributions&&(a=e.contributions.map((function(t,a){return i.a.createElement(p,{key:e.id+"_"+a,id:e.id+"_"+a,contrib:t,color:n(t.topic_id),quantiles:e.quantiles})})));var o="",r="",s={};if(e.title&&(o+=e.title.topic,e.title.keyword&&(o+=" > "+e.title.keyword),r=v(e.title.votesCountOk)+" votes favorables / "+v(e.title.votesCountOk)+" exprim\xe9s",void 0!==e.title.topic_id)){var c=n(e.title.topic_id);s={color:c,borderColor:c}}return i.a.useEffect((function(){t.current.scrollTo(0,0)}),[a]),i.a.createElement("div",{ref:t,className:"contribution-list"},i.a.createElement("h1",null,o),i.a.createElement("h2",{style:s},r),i.a.createElement("ul",{className:"contribution-list-list"},a))},g=n(16),b=n(4),k=n.n(b);Object(g.a)({basename:"/le-vrai-debat"});var E=function(){var e=i.a.useState(!1),t=Object(s.a)(e,2),n=t[0],a=t[1],o=i.a.useState({topic:null,keyword:null}),r=Object(s.a)(o,2),l=r[0],u=r[1],f=i.a.useState([]),v=Object(s.a)(f,2),p=v[0],g=v[1],b=i.a.useState("root_unknown"),E=Object(s.a)(b,2),C=E[0],y=E[1];function w(e,t,n,a){var i;console.log("Topic clicked: topic='"+t+"', keyword="+a),i="root"===e?c.root[0]:c.nodes[e],u({topic:t,keyword:a,votesCount:i.votesCount,votesCountOk:i.votesCountOk,topic_id:e}),function(e,t){if(void 0===t||null===t){var n="./data/topic_"+e+"_main_contributions.json";k.a.get(n).then((function(e){g(e.data)})).catch((function(e){console.log(e)}))}else{var a="./data/topic_"+e+"_keyword_"+t+"_main_contributions.json";k.a.get(a).then((function(e){g(e.data)})).catch((function(e){console.log(e)}))}}(e,n),y(e+"_"+(null!==n?n:"unknown"))}return i.a.useEffect((function(){n||(w("root","Le Vrai D\xe9bat",null),a(!0))}),[n]),i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"app-wrap"},i.a.createElement("div",{className:"chart-wrap"},i.a.createElement(d,{chartId:"first",width:700,height:700,zoomtool:!1},i.a.createElement(m,{width:700,height:700,data:c,onClick:w,colors:["#E6B0AA","#D7BDE2","#A9CCE3","#A3E4D7","#FAD7A0","#F5B7B1","#D2B4DE","#A9DFBF","#F9E79F"]}))),i.a.createElement("div",{className:"contributions-wrap"},i.a.createElement(h,{title:l,contributions:p,id:C,colorPalette:["#CD6155","#9B59B6","#2980B9","#1ABC9C","#F39C12","#E74C3C","#8E44AD","#27AE60","#F1C40F"],quantiles:[500,1e3,2500,4e3]}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.92468810.chunk.js.map