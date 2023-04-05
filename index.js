let select=$(".currency");
let btn=$("#btn");
let input=$("#input");
fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayDropDown(res))
function displayDropDown(res){
    let cur=Object.entries(res)
    for(let i=0;i<cur.length;i++){
        let opt=`<option value="${cur[i][0]}">${cur[i][0]}</option>`
        select[0].innerHTML+=opt
        select[1].innerHTML+=opt
    }
}
btn.on('click',()=>{
    let cur1=select[0].value;
    let cur2=select[1].value;
    let inputVal=input.val();
    if(cur1===cur2){
      var audio=new Audio("sound/wrong.mp3")
      audio.play();
      $("h1").text("Choose Different Currency...").css("color","#fd792d");
    }
    else
     convert(cur1,cur2,inputVal)

});
function convert(cur1,cur2,inputVal){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputVal}&from=${cur1}&to=${cur2}`)
  .then(resp => resp.json())
  .then((data) => {
    // document.getElementById("result").value=Object.values(data.rates)[0]
    let res=Object.values(data.rates)[0]
    document.getElementById("result").value=res;
    $("#final").html(inputVal+" "+cur1+" Rupee equals " + res+" "+cur2);
    var audio=new Audio("sound/success.mp3")
     audio.play();
  });
}

