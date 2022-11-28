import{o as s,c as l,a as t,b as O,u as F,h as H,r as L,i as w,j as E,w as u,d as h,e as o,k,v as M,F as m,f as p,t as r,l as _,n as C,g as D}from"./index.5df23b1c.js";const W="/khmer-lunar/assets/buddhist-icon.d62fdc83.webp";function f(b,i){return s(),l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},[t("path",{"fill-rule":"evenodd",d:"M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z","clip-rule":"evenodd"})])}function g(b,i){return s(),l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},[t("path",{"fill-rule":"evenodd",d:"M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z","clip-rule":"evenodd"})])}const $={class:"p-5"},G={class:"mb-3 rounded-xl md:divide-x-4 border p-2 flex flex-col md:flex-row items-center justify-center text-lg font-hanuman"},T={class:"flex items-center gap-1 px-4"},q=t("label",null,"Month: ",-1),A=["onClick"],I=["value"],J=["onClick"],Q={class:"flex items-center gap-1 px-4"},R=t("label",null,"Year: ",-1),X=["onClick"],Z=["value"],ee=["onClick"],te={class:"font-nokora w-full bg-white border mx-auto p-2 rounded-xl"},ne={class:"items-center justify-between flex mb-4"},oe={class:"shrink-0 text-right text-lg font-bold"},re={class:"text-center w-full"},se={class:"text-lg md:text-xl lg:text-2xl font-bold"},le={class:"text-lg md:text-xl text-gray-600 font-bold"},ae={class:"flex gap-1 items-center justify-between shrink-0"},ce=["onClick"],de=["onClick"],ie=["onClick"],ue={class:"flex gap-2 justify-between text-center items-center mb-2 bg-white rounded-md border overflow-hidden font-bold text-base md:text-lg whitespace-nowrap"},he={class:"grid gap-2 grid-cols-7"},ve=["onClick"],me={class:"flex lg:gap-1 flex-col items-center md:flex-row md:items-start"},pe={class:"text-lg md:text-3xl font-bold shrink-0"},_e={class:"w-full flex justify-center flex-col md:justify-start items-center md:items-end font-nokora text-sm md:text-base text-center"},fe={key:0,class:"absolute inset-0 rounded-md overflow-hidden flex justify-center z-10 opacity-30 lg:static lg:opacity-100 p-1"},ge=t("img",{src:W,alt:"Buddhist",class:"h-full object-cover object-top lg:w-6 lg:h-auto lg:object-contain"},null,-1),be=[ge],xe={key:0,class:"text-blue-600 font-bold hidden md:block"},we={__name:"TheCalendar2",emits:["onPrev","onNext","onUpdatePage","onClick"],setup(b,{emit:i}){const e=O(),{khmerDate:Y}=F(),j=e.daysOfWeek,N=e.days,x=()=>{e.currentMonth--,e.currentMonth===0&&(e.currentMonth=12,e.currentYear--),i("onPrev",{month:e.currentMonth,year:e.currentYear})},y=()=>{e.currentMonth++,e.currentMonth===13&&(e.currentMonth=1,e.currentYear++),i("onNext",{month:e.currentMonth,year:e.currentYear})},K=()=>{e.currentYear--},P=()=>{e.currentYear++},B=()=>{e.currentMonth=_().month()+1,e.currentYear=_().year()},S=a=>{i("onClick",a),i("onUpdatePage",{month:e.currentMonth,year:e.currentYear})};H(()=>{e.days.length=0,e.initDay(),i("onUpdatePage",{month:e.currentMonth,year:e.currentYear})});const U=a=>{let c=Object.assign([],a);if(c.length){if(c.filter(n=>n.customData.description==="Holiday in Cambodia").length)return"text-red-600 bg-red-100";if(c.filter(n=>n.customData.description==="General Event").length)return"text-blue-600 bg-blue-100"}else return"bg-white"},V=(a,c)=>a==="\u17E8\u179A\u17C4\u1785"||a==="\u17E8\u1780\u17BE\u178F"||a==="\u17E1\u17E5\u1780\u17BE\u178F"||a==="\u17E1\u17E5\u179A\u17C4\u1785"?!0:a==="\u17E1\u17E4\u179A\u17C4\u1785"&&Y.value(c.clone().add(1,"days")).toKhDate("dN")==="\u17E1\u1780\u17BE\u178F",d=L({month:e.currentMonth,year:e.currentYear});w(d.value,()=>{e.currentYear=d.value.year,e.currentMonth=d.value.month,i("onUpdatePage",{month:e.currentMonth,year:e.currentYear})});const z=E(()=>e.initDate);return w(z,()=>{d.value.year=e.currentYear,d.value.month=e.currentMonth,e.days.length=0,e.initDay()}),(a,c)=>(s(),l("div",$,[t("div",G,[t("div",T,[q,t("button",{onClick:u(x,["prevent"]),class:"rounded-md hover:bg-gray-200 p-2",type:"button"},[h(o(f),{class:"w-5"})],8,A),k(t("select",{"onUpdate:modelValue":c[0]||(c[0]=n=>d.value.month=n),class:"border rounded-md py-2 px-3"},[(s(),l(m,null,p(12,n=>t("option",{key:n,value:n},r(o(_)({M:n-1}).format("MMMM")),9,I)),64))],512),[[M,d.value.month]]),t("button",{onClick:u(y,["prevent"]),class:"rounded-md hover:bg-gray-200 p-2",type:"button"},[h(o(g),{class:"w-5"})],8,J)]),t("div",Q,[R,t("button",{onClick:u(K,["prevent"]),class:"rounded-md hover:bg-gray-200 p-2",type:"button"},[h(o(f),{class:"w-5"})],8,X),k(t("select",{"onUpdate:modelValue":c[1]||(c[1]=n=>d.value.year=n),class:"border rounded-md py-2 px-3"},[(s(),l(m,null,p(1e3,(n,v)=>t("option",{key:n,value:1900+v},r(1900+v),9,Z)),64))],512),[[M,d.value.year]]),t("button",{onClick:u(P,["prevent"]),class:"rounded-md hover:bg-gray-200 p-2",type:"button"},[h(o(g),{class:"w-5"})],8,ee)])]),t("div",te,[t("div",ne,[t("div",oe,[t("div",null,r(o(e).initKhDate[0]),1),t("div",null,r(o(e).initKhDate[1]),1),t("div",null,r(o(e).initKhDate[2]),1)]),t("div",re,[t("h2",se,r(o(e).currentKhmerMonths.toString()),1),t("h2",le,r(o(e).initDate.format("MMMM, YYYY")),1)]),t("div",ae,[t("button",{type:"button",class:"rounded-md hover:bg-gray-200 p-2",onClick:u(x,["prevent"])},[h(o(f),{class:"w-5 h-5"})],8,ce),t("button",{type:"button",class:"rounded-full w-3 h-3 bg-gray-200 hover:bg-gray-300",onClick:u(B,["prevent"])},null,8,de),t("button",{type:"button",class:"rounded-md hover:bg-gray-200 p-2",onClick:u(y,["prevent"])},[h(o(g),{class:"w-5 h-5"})],8,ie)])]),t("div",ue,[(s(!0),l(m,null,p(o(j),(n,v)=>(s(),l("div",{key:n,class:C([v===0?"text-red-600":"","w-full py-2 md:py-3"])},[t("div",null,r(n.km.format("dddd")),1)],2))),128))]),t("div",he,[(s(!0),l(m,null,p(o(N),n=>(s(),l("div",{key:n,onClick:u(v=>S(n.date),["prevent"]),class:C(["w-full aspect-[10/8] relative shadow rounded-md border md:p-2 whitespace-nowrap cursor-pointer transform duration-150 hover:scale-105 ease-in-out",[n.prevMonth||n.nextMonth?"opacity-40":"",U(n.attributes),n.date.weekday()===6?"text-red-600":"",o(_)().isSame(n.date,"day")?"bg-blue-600 text-white":""]])},[t("div",me,[t("div",pe,r(n.day),1),t("div",_e,[t("div",null,r(n.khDate.toKhDate("dN")),1),V(n.khDate.toKhDate("dN"),n.date)?(s(),l("div",fe,be)):D("",!0)])]),(n.khDate.khDay()===0||n.day===1)&&n.nextMonth===!1?(s(),l("div",xe,r(n.khDate.toKhDate("m")),1)):D("",!0)],10,ve))),128))])])]))}};export{we as default};
