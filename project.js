//////////////////NOTES that Tone.Js will play////////////////////////////////////
const piano = document.querySelector('#piano')
const data = ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4',
              'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5',
              'C6','C#6','D6','D#6','E6','F6','F#6','G6','G#6','A5']  
function isEven(n) {
  return n % 2 == 0;
}

///////////////////////Here you draw the piano///////////////////////////////
let html= ''

for (let i=0;i<34;i++){
  if (isEven(i)== 1){
    if (i==6||i==8||i==10||i==18||i==20||i==22||i==30||i==32) {
       html+= `<div class = 'lowerNote' data-code='${data[i]}' style="background: black"></div>`
        }
    else{
      html+= `<div class = 'lowerNote' data-code='${data[i]}' style="background: white"></div>`
    }
  }
  else{
     
    if (i==1||i==3||i==13||i==15||i==25||i==27) {
      html+= `<div class = 'upperNote' data-code='${data[i]}'style="background: black"></div>`
      }
    else{
      html+= `<div class = 'upperNote' data-code='${data[i]}'style="background: white"></div>`
    }
    }
  } 

piano.insertAdjacentHTML('beforeend',html)


////////////Playing the sound when you press the piano.///////////////////////////////////
function whichTone(){
  

if (document.getElementById("Normal").checked){
  synth = new Tone.PolySynth(Tone.Synth).toDestination()
}
        if (document.getElementById("Distortion").checked){
        const dist = new Tone.Distortion(0.8).toDestination();
        synth = new Tone.PolySynth().connect(dist);
        }
        if (document.getElementById("AutoWah").checked){
          const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
          // initialize the synth and connect to autowah
          synth = new Tone.Synth().connect(autoWah);
          autoWah.Q.value = 10;
        }
        if (document.getElementById("Reverb").checked){
          const reverb = new Tone.JCReverb(0.5).toDestination();
          const delay = new Tone.FeedbackDelay(0.2);
          // connecting the synth to reverb through delay
          synth = new Tone.DuoSynth().chain(delay, reverb);
        }


        if (document.getElementById("Phaser").checked){
        const phaser = new Tone.Phaser({
          frequency: 15,
          octaves: 5,
          baseFrequency: 1000
        }).toDestination();
        synth = new Tone.FMSynth().connect(phaser);
      }

      if (document.getElementById("Chebyshev").checked){
        const cheby = new Tone.Chebyshev(50).toDestination();
        // create a monosynth connected to our cheby
        synth = new Tone.MonoSynth().connect(cheby);
      }

      if (document.getElementById("FMSynth").checked){
        synth = new Tone.FMSynth().toDestination();
      }








  
}


const now = Tone.now()
const notes = document.querySelectorAll('.upperNote,.lowerNote')
const keys = ["Tab","1","q","2","w","3","e","4","r","5","t","6","y","7","u","8","i",
            "9","o","0","p","-","[","=","]","a","z","s","x","d","c","f","v","g"]
document.addEventListener('keydown',(e)=>{
  whichTone()
  e.preventDefault()
  if(!e.repeat){
    keys.forEach((key,index)=>{
      if(e.key==key){
          notes[index].style.background=  'orange'
          synth.triggerAttackRelease(notes[index].dataset.code,'10n')
        }
    })
    }
  })
  document.addEventListener('keyup',(e)=>{
    keys.forEach((key,index)=>{
      if(e.key==key && (index==1 || index==3|| index==6|| index==8|| index==10|| index==13|| index==15|| index==18|| index==20|| index==22
                         || index==25|| index==27|| index==30|| index==32)){
          notes[index].style.background=  'black'
        
      }
      else {
        if(e.key==key){
          notes[index].style.background= 'white'
        }

      }
    })
  })

////////////////////////////ROOTS///////////////////////////////////////////////////
//Determining which root the user has chosen
 
  function whichRoot() {
    let Raiz='0'
    whichTone()
    if (document.getElementById("RootDo").checked){
       Raiz= '0'
      return Raiz

    } else if(document.getElementById("RootDo#").checked) {
        Raiz= '1'
        return Raiz

      } else if(document.getElementById("RootRe").checked) {
        Raiz= '2'
        return Raiz

      } else if(document.getElementById("RootRe#").checked) {
        Raiz= '3'
        return Raiz

      }else if(document.getElementById("RootMi").checked) {
        Raiz= '4'
        return Raiz

      }else if(document.getElementById("RootFa").checked) {
        Raiz= '5'
        return Raiz
        
      }else if(document.getElementById("RootFa#").checked) {
        Raiz= '6'
        return Raiz
        
      }else if(document.getElementById("RootSol").checked) {
        Raiz= '7'
        return Raiz
        
      }else if(document.getElementById("RootSol#").checked) {
        Raiz= '8'
        return Raiz
        
      }else if(document.getElementById("RootLa").checked) {
        Raiz= '9'
        return Raiz
        
      }else if(document.getElementById("RootLa#").checked) {
        Raiz= '10'
        return Raiz
        
      }else if(document.getElementById("RootSi").checked) {
        Raiz= '11'
        return Raiz
        
      }
      
    
  }   
    
     
//////////////////////////////////MODES//////////////////////////////////
//Ionian mode

document.getElementById("ionian").addEventListener("click", function() {
 
  Raiz= whichRoot()  
  modeIo(Raiz);
  });

function modeIo (Raiz){
  modo=  ['0','2','4','5','7','9','11','11', '9','7','5','4','2','0']
    
  function rootins(rootins) {
    for (let i=0;i<modo.length;i++){
    var a = parseInt(modo[i]) 
    var sum= a+rootins
    modo[i] = sum.toString();
    }
  }
 
  if (Raiz=="0"){
    var modo=  ['0','2','4','5','7','9','11','11', '9','7','5','4','2','0']
 
  }
  if (Raiz=="1") {rootins(1)}
  if (Raiz=="2") {rootins(2)}
  if (Raiz=="3") {rootins(3)}
  if (Raiz=="4") {rootins(4)}
  if (Raiz=="5") {rootins(5)}
  if (Raiz=="6") {rootins(6)}
  if (Raiz=="7") {rootins(7)}
  if (Raiz=="8") {rootins(8)}
  if (Raiz=="9") {rootins(9)}
  if (Raiz=="10") {rootins(10)}
  if (Raiz=="11") {rootins(11)}
  return mode(modo)
}

//Dorian mode///////////////////////////////
document.getElementById("dorian").addEventListener("click", function() {
  Raiz= whichRoot()  
  modeDo(Raiz);
  });

function modeDo (Raiz){
  modo=  ['0','2','3','5','7','9','10','10', '9','7','5','3','2','0']
    
  function rootins(rootins) {
    for (let i=0;i<modo.length;i++){
    var a = parseInt(modo[i]) 
    var sum= a+rootins
    modo[i] = sum.toString();
    }
  }
 
  if (Raiz=="0"){
    var modo=  ['0','2','3','5','7','9','10','10', '9','7','5','3','2','0']
 
  }
  if (Raiz=="1") {rootins(1)}
  if (Raiz=="2") {rootins(2)}
  if (Raiz=="3") {rootins(3)}
  if (Raiz=="4") {rootins(4)}
  if (Raiz=="5") {rootins(5)}
  if (Raiz=="6") {rootins(6)}
  if (Raiz=="7") {rootins(7)}
  if (Raiz=="8") {rootins(8)}
  if (Raiz=="9") {rootins(9)}
  if (Raiz=="10") {rootins(10)}
  if (Raiz=="11") {rootins(11)}
  return mode(modo)
}

//Phrygian mode///////////////////////////////////

document.getElementById("phrygian").addEventListener("click", function() {
  Raiz= whichRoot()  
  modePh(Raiz);
  });

function modePh (Raiz){
  modo=  ['0','1','3','5','7','8','10','10', '8','7','5','3','1','0']
    
  function rootins(rootins) {
    for (let i=0;i<modo.length;i++){
    var a = parseInt(modo[i]) 
    var sum= a+rootins
    modo[i] = sum.toString();
    }
  }
 
  if (Raiz=="0"){
    modo=  ['0','1','3','5','7','8','10','10', '8','7','5','3','1','0']
 
  }
  if (Raiz=="1") {rootins(1)}
  if (Raiz=="2") {rootins(2)}
  if (Raiz=="3") {rootins(3)}
  if (Raiz=="4") {rootins(4)}
  if (Raiz=="5") {rootins(5)}
  if (Raiz=="6") {rootins(6)}
  if (Raiz=="7") {rootins(7)}
  if (Raiz=="8") {rootins(8)}
  if (Raiz=="9") {rootins(9)}
  if (Raiz=="10") {rootins(10)}
  if (Raiz=="11") {rootins(11)}
  return mode(modo)
}


//Lydian mode/////////////////////////////////////
document.getElementById("lydian").addEventListener("click", function() {
  Raiz= whichRoot()  
  modeLy(Raiz);
  });

function modeLy (Raiz){
  modo=  ['0','2','4','6','7','9','11','11', '9','7','6','4','2','0']
    
  function rootins(rootins) {
    for (let i=0;i<modo.length;i++){
    var a = parseInt(modo[i]) 
    var sum= a+rootins
    modo[i] = sum.toString();
    }
  }
 
  if (Raiz=="0"){
    modo=  ['0','2','4','6','7','9','11','11', '9','7','6','4','2','0']
 
  }
  if (Raiz=="1") {rootins(1)}
  if (Raiz=="2") {rootins(2)}
  if (Raiz=="3") {rootins(3)}
  if (Raiz=="4") {rootins(4)}
  if (Raiz=="5") {rootins(5)}
  if (Raiz=="6") {rootins(6)}
  if (Raiz=="7") {rootins(7)}
  if (Raiz=="8") {rootins(8)}
  if (Raiz=="9") {rootins(9)}
  if (Raiz=="10") {rootins(10)}
  if (Raiz=="11") {rootins(11)}
  return mode(modo)
}

//Myxolodian mode/////////////////////////////////////

document.getElementById("myxolydian").addEventListener("click", function() {
  Raiz= whichRoot()  
  modeMy(Raiz);
  });
  
function modeMy (Raiz){
  modo=  ['0','2','4','5','7','9','10','10', '9','7','5','4','2','0']
    
  function rootins(rootins) {
    for (let i=0;i<modo.length;i++){
    var a = parseInt(modo[i]) 
    var sum= a+rootins
    modo[i] = sum.toString();
    }
  }
 
  if (Raiz=="0"){
    modo=  ['0','2','4','5','7','9','10','10', '9','7','5','4','2','0']
 
  }
  if (Raiz=="1") {rootins(1)}
  if (Raiz=="2") {rootins(2)}
  if (Raiz=="3") {rootins(3)}
  if (Raiz=="4") {rootins(4)}
  if (Raiz=="5") {rootins(5)}
  if (Raiz=="6") {rootins(6)}
  if (Raiz=="7") {rootins(7)}
  if (Raiz=="8") {rootins(8)}
  if (Raiz=="9") {rootins(9)}
  if (Raiz=="10") {rootins(10)}
  if (Raiz=="11") {rootins(11)}
  return mode(modo)
}


//Aeloian mode/////////////////////////////////////
document.getElementById("aeolian").addEventListener("click", function() {
  Raiz= whichRoot()  
  modeAe(Raiz);
  });
 
function modeAe (Raiz){
  modo=  ['0','2','3','5','7','8','10','10', '8','7','5','3','2','0']
    
  function rootins(rootins) {
    for (let i=0;i<modo.length;i++){
    var a = parseInt(modo[i]) 
    var sum= a+rootins
    modo[i] = sum.toString();
    }
  }
 
  if (Raiz=="0"){
    modo=  ['0','2','3','5','7','8','10','10', '8','7','5','3','2','0']
 
  }
  if (Raiz=="1") {rootins(1)}
  if (Raiz=="2") {rootins(2)}
  if (Raiz=="3") {rootins(3)}
  if (Raiz=="4") {rootins(4)}
  if (Raiz=="5") {rootins(5)}
  if (Raiz=="6") {rootins(6)}
  if (Raiz=="7") {rootins(7)}
  if (Raiz=="8") {rootins(8)}
  if (Raiz=="9") {rootins(9)}
  if (Raiz=="10") {rootins(10)}
  if (Raiz=="11") {rootins(11)}
  return mode(modo)
}

//Locrian mode/////////////////////////////////////


document.getElementById("locrian").addEventListener("click", function() {
  Raiz= whichRoot()  
  modeLo(Raiz);
  });
  modo=  ['0','1','3','5','6','8','10','10', '8','6','5','3','1','0']
function modeLo (Raiz){
  modo=  ['0','1','3','5','6','8','10','10', '8','6','5','3','1','0']

    
  function rootins(rootins) {
    for (let i=0;i<modo.length;i++){
    var a = parseInt(modo[i]) 
    var sum= a+rootins
    modo[i] = sum.toString();
    }
  }
 
  if (Raiz=="0"){
    modo=  ['0','1','3','5','6','8','10','10', '8','6','5','3','1','0']
  }
  if (Raiz=="1") {rootins(1)}
  if (Raiz=="2") {rootins(2)}
  if (Raiz=="3") {rootins(3)}
  if (Raiz=="4") {rootins(4)}
  if (Raiz=="5") {rootins(5)}
  if (Raiz=="6") {rootins(6)}
  if (Raiz=="7") {rootins(7)}
  if (Raiz=="8") {rootins(8)}
  if (Raiz=="9") {rootins(9)}
  if (Raiz=="10") {rootins(10)}
  if (Raiz=="11") {rootins(11)}
  return mode(modo)
}

/////////////////////PLAY THE MODE YOU WANT //////////////////////////

function mode (modo){
  time=0
for (let i=0;i<modo.length; i++){
  
  const now = Tone.now()
  const notes = document.querySelectorAll('.upperNote,.lowerNote')
  
  synth.triggerAttackRelease(data[modo[i]],'10n',now+time)

  function tiempo () {
    
    notes[modo[i]].style.backgroundColor = 'orange'
  }
  function tiempo2 () {

    str= data[modo[i]]
    var sost = str.charAt(1); 
    
    var str2 = "#";
    var n = sost.localeCompare(str2);
  
    if (n==0){
     
      notes[modo[i]].style.backgroundColor = 'black'
    }
    else{
      notes[modo[i]].style.backgroundColor = 'white'
    }
    
  }
  if (i<7){
    myVar = setTimeout(tiempo, time*1000);
  }
  else{
    myVar2 = setTimeout(tiempo2, time*1000);
  }
  time=0.3+time
  }

}


/////////////////////CHORDS////////////////////////////////////

function estabChords (){
for (let i=1;i<14; i++){


    function maj(rootins) {
      var  C4maj=  ['0','4','7']
      for (let i=0;i<3;i++){
      var a = parseInt(C4maj[i]) 
      var sum= a+rootins
      C4maj[i] = sum.toString();     
      }
      newChord=C4maj
      return newChord 
    }

    function min(rootins) {
      var C4min= ['0','3','7']
      for (let i=0;i<3;i++){
      var a = parseInt(C4min[i]) 
      var sum= a+rootins
      C4min[i] = sum.toString();     
      }
      newChord=C4min
      return newChord 
    }
    function dim(rootins) {
      var C4dim= ['0','3','6']
      for (let i=0;i<3;i++){
      var a = parseInt(C4dim[i]) 
      var sum= a+rootins
      C4dim[i] = sum.toString();     
      }
      newChord=C4dim
      return newChord 
    }
  

    if(i=="1"){
      D4maj= maj(2)
      D4majsharp= maj(3)
      D4min= min (2)
      D4minsharp=min(3)
      D4dim= dim(2)
      D4dimsharp=dim(3)
      
    }
    if(i=="2"){
      E4maj= maj(4)
      E4majsharp= maj(5)
      E4min= min (4)
      E4minsharp= min (5)
      E4dim= dim(4)
      E4dimsharp= dim(5)
    
    }
    if(i=="3"){
      F4maj= maj(5)
      F4majsharp= maj(6)
      F4min= min (5)
      F4minsharp= min (6)
      F4dim= dim(5)
      F4dimsharp= dim(6)

  
    }
    if(i=="4"){
      G4maj= maj(7)
      G4majsharp= maj(8)
      G4min= min (7)
      G4minsharp= min (8)
      G4dim= dim(7)
      G4dimsharp= dim(8)

    }
    if(i=="5"){
      A4maj= maj(9)
      A4majsharp= maj(10)
      A4min= min (9)
      A4minsharp= min (10)
      A4dim= dim(9)
      A4dimsharp= dim(10)
    }
    if(i=="6"){
      B4maj= maj(11)
      B4majsharp= maj(12)
      B4min= min (11)
      B4minsharp= min (12)
      B4dim= dim(11)
      B4dimsharp= dim(12)
    
    }
    if(i=="7"){
      C5maj= maj(12)
      C5majsharp= maj(13)
      C5min= min (12)
      C5minsharp= min (13)
      C5dim= dim(12)
      C5dimsharp= dim(12)
    
    }
    if(i=="8"){
      D5maj= maj(14)
      D5majsharp= maj(15)
      D5min= min (14)
      D5minsharp= min (15)
      D5dim= dim(14)
      D5dimsharp= dim(15)
    
    }
    if(i=="9"){
      E5maj= maj(16)
      E5majsharp= maj(17)
      E5min= min (16)
      E5minsharp= min (17)
      E5dim= dim(16)
      E5dimsharp= dim(17)
    
    }
    if(i=="10"){
      F5maj= maj(17)
      F5majsharp= maj(18)
      F5min= min (17)
      F5minsharp= min (18)
      F5dim= dim(17)
      F5dimsharp= dim(18)
    
    }
    if(i=="11"){
      G5maj= maj(19)
      G5majsharp= maj(20)
      G5min= min (19)
      G5minsharp= min (20)
      G5dim= dim(19)
      G5dimsharp= dim(20)
    }
    if(i=="12"){
      A5maj= maj(21)
      A5majsharp= maj(22)
      A5min= min (21)
      A5minsharp= min (22)
      A5dim= dim(21)
      A5dimsharp= dim(22)
    }
    if(i=="13"){
      B5maj= maj(23)
      B5majsharp= maj(24)
      B5min= min (23)
      B5minsharp= min (24)
      B5dim= dim(23)
      B5dimsharp= dim(24)
    }

}
}




////////////////////////////Play the TRIAD you want/////////////////////////////
document.getElementById("explain").addEventListener("click", function() {
  whichTone()
  expliTriad();
 
  });

function expliTriad () {
  var  C4maj=  ['0','4','7']
  var C4majsharp = ['1','5','8']
  var C4min= ['0','3','7']
  var C4minsharp= ['1','4','8']
  var C4dim= ['0','3','6']
  var C4dimsharp= ['1','4','7']
  estabChords ()
  ////////////////////////////Major///////////////////////////////////////////
if (document.getElementById("expMajor").checked){
  if (document.getElementById("explC").checked){
  playChords(C4maj)
  }
  if (document.getElementById("explCsharp").checked){
    playChords(C4majsharp)
    }
  if (document.getElementById("explD").checked){
  playChords(D4maj)
  }
  if (document.getElementById("explDsharp").checked){
  playChords(D4majsharp)
  }
  if (document.getElementById("explE").checked){
  playChords(E4maj)
  }
  if (document.getElementById("explF").checked){
  playChords(F4maj)
  }
  if (document.getElementById("explFsharp").checked){
  playChords(F4majsharp)
  }
  if (document.getElementById("explG").checked){
  playChords(G4maj)
  }
  if (document.getElementById("explGsharp").checked){
  playChords(G4majsharp)
  }

  if (document.getElementById("explA").checked){
  playChords(A4maj)
  }
  
  if (document.getElementById("explAsharp").checked){
    playChords(A4majsharp)
    }
  if (document.getElementById("explB").checked){
  playChords(B4maj)
  }
}
/////////////////////////////////MINOR///////////////////////////////////////////
if (document.getElementById("expMinor").checked){
  if (document.getElementById("explC").checked){
  playChords(C4min)
  }
  if (document.getElementById("explCsharp").checked){
    playChords(C4minsharp)
    }
  if (document.getElementById("explD").checked){
  playChords(D4min)
  }
  if (document.getElementById("explDsharp").checked){
  playChords(D4minsharp)
  }
  if (document.getElementById("explE").checked){
  playChords(E4min)
  }
  if (document.getElementById("explF").checked){
  playChords(F4min)
  }
  if (document.getElementById("explFsharp").checked){
  playChords(F4minsharp)
  }
  if (document.getElementById("explG").checked){
  playChords(G4min)
  }
  if (document.getElementById("explGsharp").checked){
  playChords(G4minsharp)
  }

  if (document.getElementById("explA").checked){
  playChords(A4min)
  }
  
  if (document.getElementById("explAsharp").checked){
    playChords(A4minsharp)
    }
  if (document.getElementById("explB").checked){
  playChords(B4min)
  }
}
/////////////////////////////////Dim///////////////////////////////////////////
if (document.getElementById("expDim").checked){
  if (document.getElementById("explC").checked){
  playChords(C4dim)
  }
  if (document.getElementById("explCsharp").checked){
    playChords(C4dimsharp)
    }
  if (document.getElementById("explD").checked){
  playChords(D4dim)
  }
  if (document.getElementById("explDsharp").checked){
  playChords(D4dimsharp)
  }
  if (document.getElementById("explE").checked){
  playChords(E4dim)
  }
  if (document.getElementById("explF").checked){
  playChords(F4dim)
  }
  if (document.getElementById("explFsharp").checked){
  playChords(F4dimsharp)
  }
  if (document.getElementById("explG").checked){
  playChords(G4dim)
  }
  if (document.getElementById("explGsharp").checked){
  playChords(G4dimsharp)
  }

  if (document.getElementById("explA").checked){
  playChords(A4dim)
  }
  
  if (document.getElementById("explAsharp").checked){
    playChords(A4dimsharp)
    }
  if (document.getElementById("explB").checked){
  playChords(B4dim)
  }
}
}
////////////////////////////Play the PROGRESSION you want/////////////////////////////


document.getElementById("chords").addEventListener("click", function() {
  whichTone()
  Progres();
  });




function playChords (modo){
  time=0
for (let i=0;i<(modo.length)+1; i++){
 
  const now = Tone.now()
  const notes = document.querySelectorAll('.upperNote,.lowerNote')
  synth.triggerAttackRelease(data[modo[i]],'10n',now+time)

  function tiempo () {
    if (i<modo.length){
    notes[modo[i]].style.backgroundColor = 'orange'
    }
  }
  function tiempo2 () {
    if (i>0){
    str= data[modo[i-1]]
    var sost = str.charAt(1); 
    
    var str2 = "#";
    var n = sost.localeCompare(str2);
  
    if (n==0){
     
      notes[modo[i-1]].style.backgroundColor = 'black'
    }
    else{
      notes[modo[i-1]].style.backgroundColor = 'white'
    }
  }
  }

    myVar = setTimeout(tiempo, time*1000);
    myVar2 = setTimeout(tiempo2, time*1000);

  time=0.3+time
  }

}




///////////////////////////////Modal Chords Progression//////////////////////
  function Progres () {
    estabChords ()
    var  C4maj=  ['0','4','7']
    var  C4maj=  ['0','4','7']
    var C4majsharp = ['1','5','8']
    var C4min= ['0','3','7']
    var C4dim= ['0','3','6']
    var CIonian = C4maj.concat(D4min,E4min,F4maj,G4maj,A4min,B4dim,C5maj,C5maj,B4dim,A4min,G4maj,F4maj,E4min,D4min,C4maj);
    var CDorian = C4min.concat(D4min,D4majsharp,F4maj,G4min,A4dim,A4majsharp,C5min,C5min,A4majsharp,A4dim,G4min,F4maj,D4majsharp,D4min,C4min);
    var CPhrygian = C4min.concat(C4majsharp,D4majsharp,F4min,G4dim,G4majsharp,A4minsharp,C5min,C5min,A4minsharp,G4majsharp,G4dim,F4min,D4majsharp,C4majsharp,C4min);
    var CLydian = C4maj.concat(D4maj,E4min,F4dimsharp,G4maj,A4min,B4min,C5maj,C5maj,B4min,A4min,G4maj,F4dimsharp,E4min,D4maj,C4maj);
    var CMyxolydian = C4maj.concat(D4min,E4dim,F4maj,G4min,A4min,A4majsharp,C5maj,C5maj,A4majsharp,A4min,G4min,F4maj,E4dim,D4min,C4maj);
    var CAeolian = C4min.concat(D4dim,D4majsharp,F4min,G4min,G4majsharp,A4majsharp,C5min,C5min,A4majsharp,G4majsharp,G4min,F4min,D4majsharp,D4dim,C4min);
    var CLocrian = C4dim.concat(C4majsharp,D4minsharp,F4min,F4majsharp,G4majsharp,A4minsharp,C5dim,C5dim,A4minsharp,G4majsharp,F4majsharp,F4min,D4minsharp,C4majsharp,C4dim);

    function moveChr(moveChord,modeChord) {
      for (let i=0;i<modeChord.length;i++){
      var a = parseInt(modeChord[i]) 
      var sum= a+ moveChord
      modeChord[i] = sum.toString();     
      }
      newChord=modeChord
      return newChord 
    }
    
    ////////////////////////////////////TRIADS IN C/////////////////////////////////////
  if (document.getElementById("ChordC").checked){
    if (document.getElementById("ChordIonian").checked){
    playChords(CIonian)
    }
    
    if (document.getElementById("ChordDorian").checked){
    playChords(CDorian)
    }

    if (document.getElementById("ChordPhrygian").checked){
      playChords(CPhrygian)
      }
     
    if (document.getElementById("ChordLydian").checked){
      playChords(CLydian)
      }

    if (document.getElementById("ChordMyxolydian").checked){
    playChords(CMyxolydian)
    }

    if (document.getElementById("ChordAeolian").checked){
      playChords(CAeolian)
      }

    if (document.getElementById("ChordLocrian").checked){
      playChords(CLocrian)
      }
  }

   ////////////////////////////////////TRIADS IN C#/////////////////////////////////////
   if (document.getElementById("ChordCsharp").checked){
    if (document.getElementById("ChordIonian").checked){
      Csharpionian=moveChr(1,CIonian)
      playChords(Csharpionian)
    }
    
    if (document.getElementById("ChordDorian").checked){
      Csharpdorian=moveChr(1,CDorian)
      playChords(Csharpdorian)
    }

    if (document.getElementById("ChordPhrygian").checked){
      CsharpPhrygian=moveChr(1,CPhrygian)
      playChords(CsharpPhrygian)
      }
     
    if (document.getElementById("ChordLydian").checked){
      CsharpLydian=moveChr(1,CLydian)
      playChords(CsharpLydian)
      }

    if (document.getElementById("ChordMyxolydian").checked){
      CsharpMyxolydian=moveChr(1,CMyxolydian)
      playChords(CsharpMyxolydian)
    }

    if (document.getElementById("ChordAeolian").checked){
      CsharpAeolian=moveChr(1,CAeolian)
      playChords(CsharpAeolian)
      }

    if (document.getElementById("ChordLocrian").checked){
      CsharpLocrian=moveChr(1,CLocrian)
      playChords(CsharpLocrian)

      }
  }
  
    ////////////////////////////////////TRIADS IN D/////////////////////////////////////
    if (document.getElementById("ChordD").checked){
      if (document.getElementById("ChordIonian").checked){
        Dionian=moveChr(2,CIonian)
        playChords(Dionian)
      }
      
      if (document.getElementById("ChordDorian").checked){
        Ddorian=moveChr(2,CDorian)
        playChords(Ddorian)
      }
  
      if (document.getElementById("ChordPhrygian").checked){
        DPhrygian=moveChr(2,CPhrygian)
        playChords(DPhrygian)
        }
       
      if (document.getElementById("ChordLydian").checked){
        DLydian=moveChr(2,CLydian)
        playChords(DLydian)
        }
  
      if (document.getElementById("ChordMyxolydian").checked){
        DMyxolydian=moveChr(2,CMyxolydian)
        playChords(DMyxolydian)
      }
  
      if (document.getElementById("ChordAeolian").checked){
        DAeolian=moveChr(2,CAeolian)
        playChords(DAeolian)
        }
  
      if (document.getElementById("ChordLocrian").checked){
        DLocrian=moveChr(2,CLocrian)
        playChords(DLocrian)

        }
    }
 
    

///////////////////////////////////////////TRIADS IN D#/////////////////////////////////////
   if (document.getElementById("ChordDsharp").checked){
    if (document.getElementById("ChordIonian").checked){
      Dsharpionian=moveChr(3,CIonian)
      playChords(Dsharpionian)
    }
    
    if (document.getElementById("ChordDorian").checked){
      Dsharpdorian=moveChr(3,CDorian)
      playChords(Dsharpdorian)
    }

    if (document.getElementById("ChordPhrygian").checked){
      DsharpPhrygian=moveChr(3,CPhrygian)
      playChords(DsharpPhrygian)
      }
     
    if (document.getElementById("ChordLydian").checked){
      DsharpLydian=moveChr(3,CLydian)
      playChords(DsharpLydian)
      }

    if (document.getElementById("ChordMyxolydian").checked){
      DsharpMyxolydian=moveChr(3,CMyxolydian)
      playChords(DsharpMyxolydian)
    }

    if (document.getElementById("ChordAeolian").checked){
      DsharpAeolian=moveChr(3,CAeolian)
      playChords(DsharpAeolian)
      }

    if (document.getElementById("ChordLocrian").checked){
      DsharpLocrian=moveChr(3,CLocrian)
      playChords(DsharpLocrian)

      }
  }
  


////////////////////////////////////TRIADS IN E/////////////////////////////////////

if (document.getElementById("ChordE").checked){
  if (document.getElementById("ChordIonian").checked){
    Eionian=moveChr(4,CIonian)
    playChords(Eionian)
  }
  
  if (document.getElementById("ChordDorian").checked){
    Edorian=moveChr(4,CDorian)
    playChords(Edorian)
  }

  if (document.getElementById("ChordPhrygian").checked){
    EPhrygian=moveChr(4,CPhrygian)
    playChords(EPhrygian)
    }
   
  if (document.getElementById("ChordLydian").checked){
    ELydian=moveChr(4,CLydian)
    playChords(ELydian)
    }

  if (document.getElementById("ChordMyxolydian").checked){
    EMyxolydian=moveChr(4,CMyxolydian)
    playChords(EMyxolydian)
  }

  if (document.getElementById("ChordAeolian").checked){
    EAeolian=moveChr(4,CAeolian)
    playChords(EAeolian)
    }

  if (document.getElementById("ChordLocrian").checked){
    ELocrian=moveChr(4,CLocrian)
    playChords(ELocrian)

    }
}

////////////////////////////////////TRIADS IN F/////////////////////////////////////
if (document.getElementById("ChordF").checked){
  if (document.getElementById("ChordIonian").checked){
    Fionian=moveChr(5,CIonian)
    playChords(Fionian)
  }
  
  if (document.getElementById("ChordDorian").checked){
    Fdorian=moveChr(5,CDorian)
    playChords(Fdorian)
  }

  if (document.getElementById("ChordPhrygian").checked){
    FPhrygian=moveChr(5,CPhrygian)
    playChords(FPhrygian)
    }
   
  if (document.getElementById("ChordLydian").checked){
    FLydian=moveChr(5,CLydian)
    playChords(FLydian)
    }

  if (document.getElementById("ChordMyxolydian").checked){
    FMyxolydian=moveChr(5,CMyxolydian)
    playChords(FMyxolydian)
  }

  if (document.getElementById("ChordAeolian").checked){
    FAeolian=moveChr(5,CAeolian)
    playChords(FAeolian)
    }

  if (document.getElementById("ChordLocrian").checked){
    FLocrian=moveChr(5,CLocrian)
    playChords(FLocrian)

    }
}

///////////////////////////////////////////TRIADS IN F#/////////////////////////////////////
if (document.getElementById("ChordFsharp").checked){
  if (document.getElementById("ChordIonian").checked){
    Fsharpionian=moveChr(6,CIonian)
    playChords(Fsharpionian)
  }
  
  if (document.getElementById("ChordDorian").checked){
    Fsharpdorian=moveChr(6,CDorian)
    playChords(Fsharpdorian)
  }

  if (document.getElementById("ChordPhrygian").checked){
    FsharpPhrygian=moveChr(6,CPhrygian)
    playChords(FsharpPhrygian)
    }
   
  if (document.getElementById("ChordLydian").checked){
    FsharpLydian=moveChr(6,CLydian)
    playChords(FsharpLydian)
    }

  if (document.getElementById("ChordMyxolydian").checked){
    FsharpMyxolydian=moveChr(6,CMyxolydian)
    playChords(FsharpMyxolydian)
  }

  if (document.getElementById("ChordAeolian").checked){
    FsharpAeolian=moveChr(6,CAeolian)
    playChords(FsharpAeolian)
    }

  if (document.getElementById("ChordLocrian").checked){
    FsharpLocrian=moveChr(6,CLocrian)
    playChords(FsharpLocrian)

    }
}



  ////////////////////////////////////TRIADS IN G//////////////////////////////////////////////
  if (document.getElementById("ChordG").checked){
    if (document.getElementById("ChordIonian").checked){
      Gionian=moveChr(7,CIonian)
      playChords(Gionian)
    }
    
    if (document.getElementById("ChordDorian").checked){
      Gdorian=moveChr(7,CDorian)
      playChords(Gdorian)
    }
  
    if (document.getElementById("ChordPhrygian").checked){
      GPhrygian=moveChr(7,CPhrygian)
      playChords(GPhrygian)
      }
     
    if (document.getElementById("ChordLydian").checked){
      GLydian=moveChr(7,CLydian)
      playChords(GLydian)
      }
  
    if (document.getElementById("ChordMyxolydian").checked){
      GMyxolydian=moveChr(7,CMyxolydian)
      playChords(GMyxolydian)
    }
  
    if (document.getElementById("ChordAeolian").checked){
      GAeolian=moveChr(7,CAeolian)
      playChords(GAeolian)
      }
  
    if (document.getElementById("ChordLocrian").checked){
      GLocrian=moveChr(7,CLocrian)
      playChords(GLocrian)
  
      }
  }    

  ///////////////////////////////////////////TRIADS IN G#/////////////////////////////////////
if (document.getElementById("ChordGsharp").checked){
  if (document.getElementById("ChordIonian").checked){
    Gsharpionian=moveChr(8,CIonian)
    playChords(Gsharpionian)
  }
  
  if (document.getElementById("ChordDorian").checked){
    Gsharpdorian=moveChr(8,CDorian)
    playChords(Gsharpdorian)
  }

  if (document.getElementById("ChordPhrygian").checked){
    GsharpPhrygian=moveChr(8,CPhrygian)
    playChords(GsharpPhrygian)
    }
   
  if (document.getElementById("ChordLydian").checked){
    GsharpLydian=moveChr(8,CLydian)
    playChords(GsharpLydian)
    }

  if (document.getElementById("ChordMyxolydian").checked){
    GsharpMyxolydian=moveChr(8,CMyxolydian)
    playChords(GsharpMyxolydian)
  }

  if (document.getElementById("ChordAeolian").checked){
    GsharpAeolian=moveChr(8,CAeolian)
    playChords(GsharpAeolian)
    }

  if (document.getElementById("ChordLocrian").checked){
    GsharpLocrian=moveChr(8,CLocrian)
    playChords(GsharpLocrian)

    }
}


    ////////////////////////////////////TRIADS IN A//////////////////////////////////////////////
    if (document.getElementById("ChordA").checked){
      if (document.getElementById("ChordIonian").checked){
        Aionian=moveChr(9,CIonian)
        playChords(Aionian)
      }
      
      if (document.getElementById("ChordDorian").checked){
        Adorian=moveChr(9,CDorian)
        playChords(Adorian)
      }
    
      if (document.getElementById("ChordPhrygian").checked){
        APhrygian=moveChr(9,CPhrygian)
        playChords(APhrygian)
        }
       
      if (document.getElementById("ChordLydian").checked){
        ALydian=moveChr(9,CLydian)
        playChords(ALydian)
        }
    
      if (document.getElementById("ChordMyxolydian").checked){
        AMyxolydian=moveChr(9,CMyxolydian)
        playChords(AMyxolydian)
      }
    
      if (document.getElementById("ChordAeolian").checked){
        AAeolian=moveChr(9,CAeolian)
        playChords(AAeolian)
        }
    
      if (document.getElementById("ChordLocrian").checked){
        ALocrian=moveChr(9,CLocrian)
        playChords(ALocrian)
    
        }
    }    


      ///////////////////////////////////////////TRIADS IN A#/////////////////////////////////////
if (document.getElementById("ChordAsharp").checked){
  if (document.getElementById("ChordIonian").checked){
    Asharpionian=moveChr(10,CIonian)
    playChords(Asharpionian)
  }
  
  if (document.getElementById("ChordDorian").checked){
    Asharpdorian=moveChr(10,CDorian)
    playChords(Asharpdorian)
  }

  if (document.getElementById("ChordPhrygian").checked){
    AsharpPhrygian=moveChr(10,CPhrygian)
    playChords(AsharpPhrygian)
    }
   
  if (document.getElementById("ChordLydian").checked){
    AsharpLydian=moveChr(10,CLydian)
    playChords(AsharpLydian)
    }

  if (document.getElementById("ChordMyxolydian").checked){
    AsharpMyxolydian=moveChr(10,CMyxolydian)
    playChords(AsharpMyxolydian)
  }

  if (document.getElementById("ChordAeolian").checked){
    AsharpAeolian=moveChr(10,CAeolian)
    playChords(AsharpAeolian)
    }

  if (document.getElementById("ChordLocrian").checked){
    AsharpLocrian=moveChr(10,CLocrian)
    playChords(AsharpLocrian)

    }
}

////////////////////////////////////TRIADS IN B//////////////////////////////////////////////
if (document.getElementById("ChordB").checked){
  if (document.getElementById("ChordIonian").checked){
    Bionian=moveChr(11,CIonian)
    playChords(Bionian)
  }
  
  if (document.getElementById("ChordDorian").checked){
    Bdorian=moveChr(11,CDorian)
    playChords(Bdorian)
  }

  if (document.getElementById("ChordPhrygian").checked){
    BPhrygian=moveChr(11,CPhrygian)
    playChords(BPhrygian)
    }
   
  if (document.getElementById("ChordLydian").checked){
    BLydian=moveChr(11,CLydian)
    playChords(BLydian)
    }

  if (document.getElementById("ChordMyxolydian").checked){
    BMyxolydian=moveChr(11,CMyxolydian)
    playChords(BMyxolydian)
  }

  if (document.getElementById("ChordAeolian").checked){
    BAeolian=moveChr(11,CAeolian)
    playChords(BAeolian)
    }

  if (document.getElementById("ChordLocrian").checked){
    BLocrian=moveChr(11,CLocrian)
    playChords(BLocrian)

    }
}    

    //BLocrian = B4dim.concat(C5maj,D5min,E5min,F5maj,G5maj,A5min,B5dim,B5dim,A5min,G5maj,F5maj,E5min,D5min,C5maj,B4dim);
  

  }

