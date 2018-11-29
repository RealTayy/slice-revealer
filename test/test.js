// Different ways to target
const idTarget = document.getElementById('target-id');
const classTarget = document.getElementsByClassName('target-class')[0]
const jQueryTarget = $('#target-jQuery')[0];

// the target-class box
const classTargetOptions = {
  numOfSlices: 10,
  
}
const classTargetInstance = sliceRevealer(classTarget, classTargetOptions);
classTarget.addEventListener('mouseenter', () => {
  classTargetInstance.doIt('end')
})

classTarget.addEventListener('mouseleave', () => {
  classTargetInstance.doIt('start')
})

// The target-jQuery box
const jQueryTargetOptions = {  
  numOfSlices: 6,
  startPosition: 'middle',
  color: '#173753',
  queueAnimation: true,
  endPosition: ['left', 'right', 'left', 'right', 'left', 'right'],  
  endOptions: { doneCB: (instance) => instance.resetPosition('bottom'), color: '#ffffff' },  
  
}
const jQueryTargetInstance = sliceRevealer(jQueryTarget, jQueryTargetOptions);
jQueryTarget.addEventListener('mouseenter', () => {
  jQueryTargetInstance.doIt('end')
})

jQueryTarget.addEventListener('mouseleave', () => {
  jQueryTargetInstance.doIt('start', {color: 'red'})
})