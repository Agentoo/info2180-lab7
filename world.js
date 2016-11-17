window.onload = function(){
    var ctrls = document.getElementById("controls");  
    var lbl1 = document.createElement("Label"); lbl1.innerHTML = "ALL";
    var cbx1 = document.createElement("input"); cbx1.setAttribute("type", "checkbox"); 
    cbx1.setAttribute("id", "all"); cbx1.setAttribute("name", "all"); cbx1.setAttribute("value", "all");
    ctrls.appendChild(lbl1); ctrls.appendChild(cbx1);
    
    var lbl2 = document.createElement("Label"); lbl2.innerHTML = "XML";
    var cbx2 = document.createElement("input"); cbx2.setAttribute("type", "checkbox"); 
    cbx2.setAttribute("id", "xml"); cbx2.setAttribute("name", "xml"); cbx2.setAttribute("value", "xml");
    ctrls.appendChild(lbl2); ctrls.appendChild(cbx2);
    
    document.getElementById("lookup").onclick = getData; 
 };
               
function getData(){
    var term = document.getElementById("term").value; 
    
    if (document.getElementById("all").checked){
        if(document.getElementById("xml").checked){
                new Ajax.Request('world.php?all=true&format=xml',{method: 'get',onSuccess: displayResult}); 
            } 
            else{
                new Ajax.Updater('result','world.php',{method: 'get', parameters:'?all=true'}); 
            } 
        }
    else{
        new Ajax.Updater({success:'result'},'world.php?lookup='+term,{method: 'get'}); 
    } 
}
                
function displayResult(data){ 
    var str= document.createElement('ol');
                    
    var xml_data = data.responseXML;
    console.log(xml_data);
    var countryA = xml_data.getElementsByTagName('name');
    console.log(countryA);
    var rulerA = xml_data.getElementsByTagName('ruler');

    for(var i = 0; i < countryA.length; i++){
        var lst = document.createElement('li'); 
        var lstTxt = document.createTextNode(countryA[i].innerHTML + ", ruled by " + rulerA[i].innerHTML);          
        lst.appendChild(lstTxt); 
        str.appendChild(lst); 
    } 
    
    document.getElementById('result').appendChild(str);
 }
 