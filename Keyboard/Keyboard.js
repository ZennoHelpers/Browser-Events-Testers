'use strict';

const input = document.getElementById('input');
const table = document.getElementById('table');
const tBody = table.createTBody();

const types = ['keydown', 'keypress', 'keyup', 'textInput', 'beforeInput', 'input', 'compositionstart', 'compositionupdate', 'compositionend'];
const evProps = ['timeStamp', 'type', 'isTrusted', 'key', 'charCode', 'keyCode', 'which', 'code',/*'keyIdentifier', 'keyLocation', 'char',*/ 'shiftKey', 'ctrlKey', 'altKey', 'metaKey', 'location', 'repeat', 'eventPhase'];

init();

function init() {
  createTableHeader();
  
  types.forEach(type => {
    input.addEventListener(type, onEvent);
  });
}

function createTableHeader() {
  const tHead = table.createTHead();
  const tHeadRow = tHead.insertRow(-1);
  
  for (const prop of evProps) {
    createCellWithData(tHeadRow, prop);
  }
}

function onEvent(e) {
  const eventinfo = [];
  
  for (const type of evProps) {
    eventinfo.push({Name: type, Value: eval('e.' + type)});
  }
  showEventData(eventinfo);
}

function showEventData(eventinfo) {
  const row = tBody.insertRow(0);
  
  for (const eInfo of eventinfo) {
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
  const cell = row.insertCell(-1);
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
