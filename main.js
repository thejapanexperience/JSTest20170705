let airports = {}
let selectedGroups = {}
let groups = {
  'any-midlands-airport' : ['Birmingham', 'Doncaster', 'East Midlands', 'Norwich'],
  'any-northern-airport' : ['Doncaster', 'Humberside', 'Leeds/Bradford', 'Liverpool John Lennon', 'Manchester', 'Newcastle'],
  'any-north-east-airport' : ['Doncaster', 'Humberside', 'Leeds/Bradford', 'Newcastle'],
  'any-north-west-airport' : ['Liverpool John Lennon', 'Manchester'],
  'any-southern-airport' : ['Bournemouth', 'Bristol', 'Cardiff', 'Exeter', 'London Gatwick', 'London Southend', 'Southampton'],
  'any-scottish-airport' : ['Aberdeen', 'Edinburgh', 'Glasgow', 'Inverness', 'Prestwick'],
  'any-north-irish-airport' : ['Belfast City Airport', 'Belfast Intl'],
  'any-london-airport' : ['London City Airport', 'London Gatwick', 'London Heathrow', 'London Luton', 'London Southend', 'London Stansted']
}

var removeGroupAirports = function removeGroupAirports(group){
  let list = groups[group];
  for (var i = 0; i < list.length; i++) {
    let label = `${list[i]}label`;
    document.getElementById(list[i]).checked = false;
    document.getElementById(label).className = "airport-selector__label";
    delete airports[list[i]]
  }
  groupsUpdate();
  keysUpdate();
}

var groupsUpdate = function groupsUpdate() {
  let selectedGroupsKeys = Object.keys(selectedGroups)
  if (selectedGroupsKeys.length){
    for (var i = 0; i < selectedGroupsKeys.length; i++) {
      let groupArray = groups[selectedGroupsKeys[i]]
      for (var k = 0; k < groupArray.length; k++) {
        let label = `${groupArray[k]}label`;
        document.getElementById(groupArray[k]).checked = true;
        document.getElementById(label).className = "airport-selector__label airport-selector__label--checked";
        document.getElementById('any-airport').checked = false;
        document.getElementById('any-airportlabel').className = "airport-selector__label";
        airports[groupArray[k]] = groupArray[k];
      }
    }
  }
}

var groupsCheck = function groupsCheck(){
  let keys = Object.keys(airports)
  let groupKeys = Object.keys(groups)

  for (var i = 0; i < groupKeys.length; i++) {
    let counter = 0;
    groups[groupKeys[i]].forEach(airport => {
      let length = groups[groupKeys[i]].length;
      if (keys.includes(airport)){
        counter += 1;
      }
      if (counter === length) {
        let label = `${groupKeys[i]}label`
        document.getElementById(groupKeys[i]).checked = true;
        document.getElementById(label).className = "airport-selector__label airport-selector__label--checked";
      }
    })

  }
}

var keysUpdate = function keysUpdate() {
  let keys = Object.keys(airports)
  if (keys.length === 0) {
    document.getElementById('airport-caption').value = 'Any Airport';
    document.getElementById('any-airport').checked = true;
    document.getElementById('any-airportlabel').className = "airport-selector__label airport-selector__label--checked";
  }
  if (keys.length === 1) {
    document.getElementById('airport-caption').value = keys[0]
    document.getElementById('airport-count').innerHTML = `1 Airports Selected`
  }
  if (keys.length > 1) {
    document.getElementById('airport-caption').value = `${keys.length} Airports Selected`;
    document.getElementById('airport-count').innerHTML = `${keys.length} Airports Selected`
  }
}

var anyAirport = function anyAirport() {
  let any = document.getElementById('any-airport').checked
  if (!any){
    let keys = Object.keys(airports)
    if (keys.length){
      for (var i = 0; i < keys.length; i++) {
        let label = `${keys[i]}label`
        document.getElementById(keys[i]).checked = false;
        document.getElementById(label).className = "airport-selector__label";
        delete airports[keys[i]]
      }
    }
    let groupKeys = Object.keys(selectedGroups)
    if (groupKeys.length){
      for (var i = 0; i < groupKeys.length; i++) {
        let groupLabel = `${groupKeys[i]}label`
        document.getElementById(groupKeys[i]).checked = false;
        document.getElementById(groupLabel).className = "airport-selector__label";
        delete airports[groupKeys[i]]
      }
    }
    selectedGroups = {}
  }
  keysUpdate();
}

var groupAirport = function groupAirport(group) {
  let groupCheck = document.getElementById(group).checked;
  let label = `${group}label`
  if (groupCheck){
    document.getElementById(group).checked = false;
    document.getElementById(label).className = "airport-selector__label";
    delete selectedGroups[group]
    removeGroupAirports(group)
    if (group === 'any-north-east-airport' || group === 'any-north-west-airport'){
      document.getElementById('any-northern-airport').checked = false;
      document.getElementById('any-northern-airportlabel').className = "airport-selector__label";
      delete selectedGroups['any-northern-airport']
    }
    if (group === 'any-northern-airport'){
      document.getElementById('any-north-east-airport').checked = false;
      document.getElementById('any-north-east-airportlabel').className = "airport-selector__label";
      document.getElementById('any-north-west-airport').checked = false;
      document.getElementById('any-north-west-airportlabel').className = "airport-selector__label";
      delete selectedGroups['any-north-west-airport'];
      delete selectedGroups['any-north-east-airport'];
    }
  } else {
    document.getElementById(group).checked = true;
    document.getElementById(label).className = "airport-selector__label airport-selector__label--checked";
    document.getElementById('any-airport').checked = false;
    document.getElementById('any-airportlabel').className = "airport-selector__label";
    selectedGroups[group] = group;
    if (group === 'any-northern-airport'){
      document.getElementById('any-north-east-airport').checked = true;
      document.getElementById('any-north-east-airportlabel').className = "airport-selector__label airport-selector__label--checked";
      document.getElementById('any-north-west-airport').checked = true;
      document.getElementById('any-north-west-airportlabel').className = "airport-selector__label airport-selector__label--checked";
      selectedGroups['any-north-west-airport'] = 'any-north-west-airport';
      selectedGroups['any-north-east-airport'] = 'any-north-east-airport';
    }
    if (group === 'any-north-east-airport' && selectedGroups['any-north-west-airport']){
      document.getElementById('any-northern-airport-airport').checked = true;
      document.getElementById('any-northern-airportlabel').className = "airport-selector__label airport-selector__label--checked";
    }
    if (group === 'any-north-west-airport' && selectedGroups['any-north-east-airport']){
      document.getElementById('any-northern-airport').checked = true;
      document.getElementById('any-northern-airportlabel').className = "airport-selector__label airport-selector__label--checked";
    }
  }
  groupsUpdate();
  keysUpdate();
}

var oneAirport = function oneAirport(place) {
  let city = document.getElementById(place).checked;
  let label = `${place}label`
  if (city){
    document.getElementById(place).checked = false;
    document.getElementById(label).className = "airport-selector__label";
    delete airports[place]
    let keys = Object.keys(groups);
    for (var i = 0; i < keys.length; i++) {
      if (groups[keys[i]].indexOf(place) > -1){
        let label = `${keys[i]}label`
        delete selectedGroups[keys[i]]
        document.getElementById(keys[i]).checked = false;
        document.getElementById(label).className = "airport-selector__label";
      }
    }
  } else {
    document.getElementById(place).checked = true;
    document.getElementById(label).className = "airport-selector__label airport-selector__label--checked";
    document.getElementById('any-airport').checked = false;
    document.getElementById('any-airportlabel').className = "airport-selector__label";
    airports[place] = place;
    groupsCheck();
  }
  keysUpdate();
}
