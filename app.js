const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

let msg=document.querySelector(".msg");
let dropdwon=document.querySelectorAll(".flag select");

for (code in countryList){   //for ... of loop is used only for arrays, not objects
    console.log(code);
}

for(let select of dropdwon){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}



const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src=newSrc;
};
let btn=document.querySelector("button");
btn.addEventListener("click", async (evt)=>{
evt.preventDefault();
let amount=document.querySelector(".money input");
let amtVal=amount.value;
if(amtVal==="0"||amtVal<0){
    amtVal=1;
    amount.value="1";

}
const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
// console.log(fromCurr.value, toCurr.value);

let response= await fetch(URL);
let data= await response.json();
 let rate=data[toCurr.value.toLowerCase()];

 let finalAmt=amtVal*rate;
 msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});