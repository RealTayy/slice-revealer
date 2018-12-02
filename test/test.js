// I am the first box
const targetOne = document.getElementById('box-one');
const targetOneOptions = {
  endOptions: {
  
}
};
const targetOneInstance = sliceRevealer(targetOne, targetOneOptions);
targetOne.addEventListener('mouseenter', () => {
  targetOneInstance.goPhase('end', {
    startCB: () => {
      document.getElementById('state').innerHTML = 'Going to End Phase'
      document.getElementById('end-start').innerHTML = timer;
      document.getElementById('end-start').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('end-start').classList.remove('fade');
      }, 200);
      document.getElementById('state').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('state').classList.remove('fade');
      }, 200);
    },
    doneCB: () => {
      document.getElementById('state').innerHTML = 'Arrived at End Phase'
      document.getElementById('end-done').innerHTML = timer;
      document.getElementById('end-done').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('end-done').classList.remove('fade');
      }, 200);
      document.getElementById('state').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('state').classList.remove('fade');
      }, 200);
    }
    });
});

targetOne.addEventListener('mouseleave', () => {
  targetOneInstance.goPhase('start',{
    startCB: () => {      
      document.getElementById('state').innerHTML = 'Going to Start Phase'
      document.getElementById('start-start').innerHTML = timer;
      document.getElementById('start-start').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('start-start').classList.remove('fade');
      }, 200);
      document.getElementById('state').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('state').classList.remove('fade');
      }, 200);
    },
    doneCB: () => {
      document.getElementById('state').innerHTML = 'Arrived at Start Phase'
      document.getElementById('start-done').innerHTML = timer;
      document.getElementById('start-done').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('start-done').classList.remove('fade');
      }, 200);
      document.getElementById('state').classList.add('fade');
      setTimeout(()=>{
        document.getElementById('state').classList.remove('fade');
      }, 200);
    },
    queueAnimation: true
  });
});

// I'm a timer
	let time = 0;
	let timer = 0;
	setInterval(() => {    
    timer = Number(time++ / 100).toFixed(2) + 's';
    document.getElementById('cur-time').innerHTML = timer;
  }, 10);