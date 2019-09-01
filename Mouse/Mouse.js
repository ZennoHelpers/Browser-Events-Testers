'use strict';

const table = document.getElementById('table');
const tBody = table.createTBody();

const eTypes = ['click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
const eProps = ['timeStamp', 'type', 'isTrusted', 'button', 'clientX', 'clientY', 'pageX', 'pageY', 'movementX', 'movementY', /*'shiftKey', 'ctrlKey', 'altKey', 'metaKey',*/ 'relatedTarget', 'eventPhase'];

const target = document.getElementById('target');

init();

function init() {
  createTableHeader();
  
  eTypes.forEach(type => {
    target.addEventListener(type, onEvent);
  });
}

function createTableHeader() {
  const tHead = table.createTHead();
  const tHeadRow = tHead.insertRow(-1);
  
  for (const prop of eProps) {
    createCellWithData(tHeadRow, prop);
  }
}

function onEvent(e) {
  const eventinfo = [];
  
  for (const type of eProps) {
    eventinfo.push({Name: type, Value: eval('e.' + type)});
  }
  
  const logCheckBox = document.getElementById('logcheckbox');
  if(logCheckBox.checked) {
    showEventData(eventinfo);
  }
}

function showEventData(eventinfo) {
  const row = tBody.insertRow(0);
  
  for (const eInfo of eventinfo) {
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
  const cell = row.insertCell(-1);
  cell.innerHTML = value;
}

function clearTable() {
  tBody.innerHTML = '';
}

