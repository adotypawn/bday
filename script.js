const screens=[...document.querySelectorAll('.screen')];
const audio=document.getElementById('audio');
const progress=document.getElementById('progress');
let current='intro';

function go(id){
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  current=id;
  if(id!=='music' && id!=='message') pulseHearts(3);
}
document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));

const envelope=document.getElementById('openEnvelope');
envelope.addEventListener('click',()=>{
  envelope.classList.add('open');
  setTimeout(()=>go('surprise'),900);
});

function toggleAudio(){
  if(audio.paused){
    audio.play().catch(()=>alert('Tambahkan assets/music.mp3 terlebih dahulu.'));
  }else audio.pause();
}
document.getElementById('musicToggle').addEventListener('click',toggleAudio);
document.getElementById('playBtn').addEventListener('click',toggleAudio);
audio.addEventListener('timeupdate',()=>{
  if(audio.duration) progress.value=(audio.currentTime/audio.duration)*100;
});
progress.addEventListener('input',()=>{
  if(audio.duration) audio.currentTime=(progress.value/100)*audio.duration;
});
audio.addEventListener('play',()=>{
  document.getElementById('playBtn').textContent='❚❚';
  document.getElementById('musicToggle').textContent='❚❚';
});
audio.addEventListener('pause',()=>{
  document.getElementById('playBtn').textContent='▶';
  document.getElementById('musicToggle').textContent='▶';
});

document.getElementById('giftBtn').addEventListener('click',()=>{
  document.getElementById('giftBtn').style.display='none';
  document.getElementById('giftMessage').classList.add('show');
  pulseHearts(18);
});

function pulseHearts(n=8){
  const box=document.getElementById('hearts');
  for(let i=0;i<n;i++){
    const h=document.createElement('span');
    h.className='heart';
    h.textContent=['♥','💗','💕','✨'][Math.floor(Math.random()*4)];
    h.style.left=Math.random()*100+'%';
    h.style.fontSize=(12+Math.random()*24)+'px';
    h.style.animationDuration=(3+Math.random()*4)+'s';
    box.appendChild(h);
    setTimeout(()=>h.remove(),7500);
  }
}
setInterval(()=>pulseHearts(1),1800);
pulseHearts(5);
