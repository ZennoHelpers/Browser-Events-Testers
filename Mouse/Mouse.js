'use strict';

let table = document.getElementById('table');
let tBody = table.createTBody();

let eTypes = ['click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
let eProps = ['timeStamp', 'type', 'isTrusted', 'button', 'clientX', 'clientY', 'pageX', 'pageY', 'movementX', 'movementY', /*'shiftKey', 'ctrlKey', 'altKey', 'metaKey',*/ 'relatedTarget', 'eventPhase'];

let target = document.getElementById('target');

init();

function init() {
  createTableHeader();
  
  eTypes.forEach(type => {
    target.addEventListener(type, onEvent);
  });
}

function createTableHeader() {
  let tHead = table.createTHead();
  let tHeadRow = tHead.insertRow(-1);
  
  for (let prop of eProps) {
    createCellWithData(tHeadRow, prop);
  }
}

function onEvent(e) {
  let eventinfo = [];
  
  for (const type of eProps) {
    eventinfo.push({Name: type, Value: eval('e.' + type)});
  }
  
  let logCheckBox = document.getElementById('logcheckbox');
  if(logCheckBox.checked) {
    showEventData(eventinfo);
  }
}

function showEventData(eventinfo) {
  let row = tBody.insertRow(0);
  
  for (let eInfo of eventinfo) {
    let name = eInfo.Name;
    let value = eInfo.Value;
    
    if (value === null) {
      value = '▫';
    } else if (typeof value === 'string') {
      value = `'` + value + `'`;
    } else if (typeof value === 'boolean') {
      value = value ? '<span class="green">✓</span>' : '<span class="red">✗</span>';
    }
    
    createCellWithData(row, value);
  }
}

function createCellWithData(row, value) {
  let cell = row.insertCell(-1);
  cell.innerHTML = value;
}

function clearTable() {
  tBody.innerHTML = '';
}

