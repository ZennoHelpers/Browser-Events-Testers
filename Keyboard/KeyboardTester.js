'use strict';

let input = document.getElementById('input');
let table = document.getElementById('table');
let tBody = table.createTBody();

let types = ['keydown', 'keypress', 'keyup', 'textInput', 'beforeInput', 'input', 'compositionstart', 'compositionupdate', 'compositionend'];
let evProps = ['timeStamp', 'type', 'isTrusted', 'key', 'charCode', 'keyCode', 'which', 'code',/*'keyIdentifier', 'keyLocation', 'char',*/ 'shiftKey', 'ctrlKey', 'altKey', 'metaKey', 'location', 'repeat', 'eventPhase'];

init();

function init() {
  createTableHeader();
  
  types.forEach(type => {
    input.addEventListener(type, onEvent);
  });
}

function createTableHeader() {
  let tHead = table.createTHead();
  let tHeadRow = tHead.insertRow(-1);
  
  for (let prop of evProps) {
    createCellWithData(tHeadRow, prop);
  }
}

function onEvent(e) {
  let eventinfo = [];
  
  for (const type of evProps) {
    eventinfo.push({Name: type, Value: eval('e.' + type)});
  }
  showEventData(eventinfo);
}

function showEventData(eventinfo) {
  let row = tBody.insertRow(0);
  
  for (let eInfo of eventinfo) {
    let name = eInfo.Name;
    let value = eInfo.Value;
    
    if (value === undefined) {
      value = '▫';
    } else if (typeof value === 'string') {
      value = `'` + value + `'`;
    } else if (typeof value === 'boolean') {
      value = value ? '<span class="green">✓</span>' : '<span class="red">✗</span>';
    } else if (name.match('charCode|keyCode|which')) {
      value = getKeySymbol(value);
    } else if (name.match('location')){
      value = getLocationString(value);
    } /*else if (name.match('eventPhase')){
      value = getEventPhaseString(value);
    }*/
    
    createCellWithData(row, value);
  }
}

function createCellWithData(row, value) {
  let cell = row.insertCell(-1);
  cell.innerHTML = value;
}

function clearTable() {
  tBody.innerHTML = '';
  input.focus();
}

function getKeySymbol(key) {
  if (key === undefined) {
    return key;
  }
  if (key >= 32 && key < 127) {
    return key + `'` + String.fromCharCode(key) + `'`;
  }
  return key;
}

function getLocationString(num) {
  switch (num) {
    case 1:
      return 'Left';
    case 2:
      return 'Right';
    case 3:
      return 'Numpad';
    case 4:
      return 'Mobile'; // Obsolete since Gecko 38
    case 5:
      return 'Joystick'; // Obsolete since Gecko 38
  }
  return num;
}

// function getEventPhaseString(num) {
//   switch (num) {
//     case 0:
//       return 'NONE';
//     case 1:
//       return 'CAPTURING_PHASE';
//     case 2:
//       return 'AT_TARGET';
//     case 3:
//       return 'BUBBLING_PHASE';
//   }
//   return num;
// }
