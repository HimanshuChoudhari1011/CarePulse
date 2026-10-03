const $=id=>document.getElementById(id);
const PRODUCTS={bp:{n:"Omron HEM-7120 Smart Digital Blood Pressure Monitor with IntelliWrap",c:"Medical Devices",p:1849,m:2490,e:"🩺"},vc:{n:"Celin 500mg Vitamin C & Zinc Chewable Immunity Tablets (60 Tabs)",c:"Vitamins & Nutrition",p:249,m:340,e:"🍊"}};
let cart=[{id:"bp",q:1},{id:"vc",q:2}],pqty=1;
let inv=[["Omron HEM-7120 Smart Digital Blood Pressure Monitor",'Medical Devices',1849,2490,42,0],["Accu-Chek Instant Blood Glucose Glucometer",'Diabetes Care',1199,1599,55,0],["Celin 500mg Vitamin C & Zinc Chewable",'Vitamins & Nutrition',249,340,120,0],["Augmentin 625 Duo Antibiotic Tablets",'Prescription Rx',204,223,85,1],["Dr. Trust Professional Pulse Oximeter",'Medical Devices',899,1450,38,0]];
const docs=[["Dr. Ayesha Sharma","Interventional Cardiology","MBBS, MD (Medicine), DM (Cardiology) • 14+ Years Experience","Fortis Escorts Heart Institute","4.95 (520+ Reviews)",800,["10:30 AM","11:45 AM","04:00 PM","06:30 PM"],"Cardiology"],["Dr. Rajesh K. Varma","General Medicine & Diabetology","MBBS, MD (Internal Medicine), FACP • 18+ Years Experience","Max Super Speciality Hospital","4.88 (840+ Reviews)",600,["09:00 AM","11:00 AM","02:30 PM","05:15 PM"],"Diabetology"],["Dr. Neha Kapoor","Dermatology","MBBS, MD (Dermatology) • 10+ Years Experience","Apollo Hospitals","4.90 (610+ Reviews)",700,["10:00 AM","12:30 PM","03:45 PM"],"Dermatology"]];
const specs=["All Specialties (1,200+)","Cardiology","Diabetology","Dermatology","Orthopedics","Pediatrics","Mental Wellness"];
const syms=["🔥 High Fever","😮‍💨 Dry Cough","😣 Persistent Headache","Shortness of Breath","⚡ Chest Tightness","😵 Extreme Fatigue","🤢 Nausea / Stomach Upset","🩹 Joint / Body Aches"];
const R=n=>"₹"+n.toLocaleString("en-IN");

function go(p){document.querySelectorAll(".page").forEach(s=>s.classList.toggle("on",s.id===p));
 document.querySelectorAll("#links a[data-p]").forEach(a=>a.classList.toggle("on",a.dataset.p===p));
 if(p==="cart")renderCart();if(p==="checkout")renderCheckout();window.scrollTo(0,0)}
function toast(m){const t=$("toast");t.textContent=m;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}
function pq(d){pqty=Math.max(1,pqty+d);$("pqty").textContent=pqty}
function addCart(){const i=cart.find(x=>x.id==="bp");i?i.q+=pqty:cart.push({id:"bp",q:pqty});updCount();toast("Added to cart")}
function updCount(){$("cnt").textContent=cart.reduce((a,b)=>a+b.q,0)}
function total(){return cart.reduce((a,i)=>a+PRODUCTS[i.id].p*i.q,0)}
function renderCart(){
 $("items").innerHTML=cart.length?cart.map((i,k)=>{const p=PRODUCTS[i.id];return `<div class="ci"><input type="checkbox" checked><em>${p.e}</em><div><b>${p.n}</b><small class="sub">${p.c} • OTC</small></div><div><b>${R(p.p)}</b><s>${R(p.m)}</s></div><div class="qty"><button onclick="cq(${k},-1)">-</button><b>${i.q}</b><button onclick="cq(${k},1)">+</button></div><b>${R(p.p*i.q)}</b><a onclick="cart.splice(${k},1);renderCart()">✕</a></div>`}).join(""):`<p class="sub" style="padding:30px">Your cart is empty. Add medicines to get started.</p>`;
 $("sc").textContent=`Subtotal (${cart.reduce((a,b)=>a+b.q,0)} items)`;$("st").textContent=$("tt").textContent=R(total());updCount()}
function cq(k,d){cart[k].q=Math.max(1,cart[k].q+d);renderCart()}
function renderCheckout(){$("cks").innerHTML=cart.map(i=>`<div><span>${PRODUCTS[i.id].n.slice(0,24)}…<br><small>Qty: ${i.q}</small></span><b>${R(PRODUCTS[i.id].p*i.q)}</b></div>`).join("");$("ctt").textContent=R(total())}
document.querySelectorAll(".pay").forEach(p=>p.onclick=()=>{document.querySelectorAll(".pay").forEach(x=>x.classList.remove("sel"));p.classList.add("sel")});

function renderDocs(f="All"){
 $("fil").innerHTML=specs.map((s,i)=>`<button class="${(i==0&&f=="All")||s==f?'on':''}" onclick="renderDocs('${i?s:'All'}')">${s}</button>`).join("");
 $("docs").innerHTML=docs.filter(d=>f=="All"||d[7]==f).map(d=>`<div class="card doc"><div><h3>${d[0]} <span class="tag" style="font-size:11px">AVAILABLE TODAY</span></h3><p class="sp">${d[1]}</p><p class="sub" style="margin:4px 0">${d[2]}</p><p><b>🏥 ${d[3]}</b></p><p style="margin-top:8px">⭐ ${d[4]} &nbsp; 98% Patient Satisfaction</p></div>
 <div class="bk"><div class="row"><span class="sub" style="margin:0">Consultation Fee:</span><b style="color:var(--blue);font-size:24px">₹${d[5]}</b></div><small><b>Select Available Slot:</b></small><div class="slots">${d[6].map((s,i)=>`<span class="${i?'':'on'}" onclick="this.parentNode.querySelectorAll('span').forEach(x=>x.classList.remove('on'));this.classList.add('on')">${s}</span>`).join("")}</div><button class="btn full" style="margin:0" onclick="toast('Consultation booked with ${d[0]}')">Book Instant Consult</button></div></div>`).join("")||`<p class="sub">No doctors found for this specialty yet.</p>`}

$("sym").innerHTML=syms.map((s,i)=>`<span class="${i<2?'on':''}" onclick="this.classList.toggle('on')">${s}</span>`).join("");
function analyze(){
 const on=[...document.querySelectorAll("#sym .on")].map(x=>x.textContent.replace(/^\S+\s/,"").trim()),r=$("res");r.style.display="block";
 if(!on.length){r.innerHTML="Please select at least one symptom to analyze.";return}
 const danger=on.some(s=>/Chest|Shortness/.test(s));
 r.innerHTML=danger?`<h3>🚨 HIGH RISK: Possible cardio-respiratory emergency</h3><p style="margin:10px 0">Chest tightness or breathlessness can be serious. Call <b>108</b> or visit the nearest emergency room immediately.</p><button class="btn" onclick="go('doctors')">Consult a Cardiologist</button>`
 :`<h3>📋 Preliminary Clinical Assessment: Acute Upper Respiratory Infection <span class="tag" style="background:#fde68a;color:#92400e">${$("sev").value.split(" ")[0].toUpperCase()} RISK</span></h3><p style="margin:10px 0">Your combination of <b>${on.join("</b> and <b>")}</b> indicates a probable viral respiratory infection or early seasonal influenza. No acute cardiac emergency indicators detected.</p><p>Recommended: rest, fluids, and a General Physician consult if symptoms last beyond 3 days.</p><button class="btn" style="margin-top:14px" onclick="go('doctors')">Book General Physician</button><p style="font-size:12px;margin-top:12px">This is not a medical diagnosis. Consult a doctor.</p>`}

function renderInv(){const q=$("q").value.toLowerCase();
 $("inv").innerHTML=inv.filter(r=>r[0].toLowerCase().includes(q)).map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td><b>${R(r[2])}</b></td><td style="color:#94a3b8">${R(r[3])}</td><td style="color:${r[4]<50?'#d97706':'#15803d'};font-weight:700">${r[4]} units</td><td><span class="${r[5]?'yes':'no'}">${r[5]?'YES (RX)':'NO'}</span></td><td><span class="act">ACTIVE</span></td><td><button class="sb" onclick="upd('${r[0].replace(/'/g,"")}')">Update Stock</button></td></tr>`).join("")}
function upd(n){const r=inv.find(x=>x[0].replace(/'/g,"")==n),v=prompt("New stock units for "+n,r[4]);if(v!==null&&!isNaN(v)){r[4]=+v;renderInv()}}
function addMed(){const n=prompt("Medicine name:");if(!n)return;const p=+prompt("Selling price (₹):",100);inv.push([n,"General",p,Math.round(p*1.2),50,0]);renderInv()}

renderDocs();renderInv();renderCart();go("home");
