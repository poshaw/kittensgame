autoHunt = setInterval(function() {
	// console.log("Hunting");
	var catpower = gamePage.resPool.get('manpower');
	if (catpower.value / catpower.maxValue > 0.95) {
		gamePage.village.huntAll();
		if (gamePage.workshop.getCraft('parchment').unlocked) {
			var qty = (gamePage.resPool.get('furs').value/2)/175
			gamePage.craft('parchment', qty);
		}
		if (gamePage.workshop.getCraft('manuscript').unlocked) {
			if ( gamePage.resPool.get('manuscript').value < gamePage.resPool.get('parchment').value ) {
				var qtyP = (gamePage.resPool.get('parchment').value/2)/25;
				var qtyQ = (gamePage.resPool.get('culture').value * 0.9 )/400;
				var qty = Math.min(qtyP, qtyQ);
				gamePage.craft('manuscript', qty);
			}
		}
		if (gamePage.workshop.getCraft('compedium').unlocked) {
			if ( gamePage.resPool.get('compedium').value < gamePage.resPool.get('manuscript').value ) {
				var qtyM = (gamePage.resPool.get('manuscript').value/2)/50;
				var qtyS = (gamePage.resPool.get('science').value*0.8)/10e3;
				var qty = Math.min(qtyM, qtyS);
				gamePage.craft('compedium', qty);
			}
		}
		if (gamePage.workshop.getCraft('blueprint').unlocked) {
			if ( gamePage.resPool.get('blueprint').value < gamePage.resPool.get('compedium').value ) {
				var qtyC = (gamePage.resPool.get('compedium').value/2)/25;
				var qtyS = (gamePage.resPool.get('science').value*0.8)/25e3;
				var qty = Math.min(qtyC, qtyS);
				gamePage.craft('blueprint', qty);
			}
		}
	}
}, 3*(1000+Math.floor(Math.random() * 20)) );

autoCraft = setInterval(function() {
    // console.log("Crafting");
  var resources = [
      ["wood",     "beam" ],
      ["minerals", "slab" ],
      ["coal",     "steel"],
      ["iron",     "plate"],
      ["steel",    "gear"],
      ["beam",     "scaffold"]
  ];
  for (var i = 0; i < resources.length; i++) {
      var makeFrom = gamePage.resPool.get(resources[i][0]);
      var resource = gamePage.resPool.get(resources[i][1]);
      if( makeFrom.maxValue != 0 ) {
        if (makeFrom.value / makeFrom.maxValue > 0.95 &&
            gamePage.workshop.getCraft(resources[i][1]).unlocked) {
                gamePage.craftAll(resources[i][1]);
        }
      }
      else if ( makeFrom.value > 2*resource.value &&
              gamePage.workshop.getCraft(resources[i][1]).unlocked ) {
                    if (resources[i][1] == "gear") {
                      var qty = (makeFrom.value/2)/15;
                    }
                    else if (resources[i][1] == "scaffold") {
                      var qty = (makeFrom.value/2)/50;
                    }
                    gamePage.craft(resources[i][1], qty);
      }
  }
},  5*(1000+Math.floor(Math.random() * 20)) );

autoPray = setInterval(function() {
  // console.log("Praying");
  var faith = gamePage.resPool.get('faith');
  if (faith.value / faith.maxValue > 0.95) {
    gamePage.religion.praise();
  }
}, 12*(1000+Math.floor(Math.random() * 20)) );

// autoObserve = setInterval(function() {
// console.log("Observing");
// 	try {
// 			observeBtn.click();
// 	} catch (err) {
// 			// ignore no click event
// 	}
// }, 3*1020);

var toggle = true;
buildLists = setInterval(function() {
  // console.log("Building");
  // var t0 = performance.now();
  if ( game.ui.activeTabId == "Bonfire" ) {
    var list1 = [];
    var list2 = [];
    function append(item) {
      if ( list1.length <= list2.length ) {
        list1.push(item);
      }
      else {
        list2.push(item);
      }
    }
    for (var i=0; i < game.bld.buildingsData.length; i++) {
      if ( game.bld.buildingsData[i].unlocked ) {
        if( game.bld.buildingsData[i].label != undefined ){
          if (game.bld.buildingsData[i].label != "Mansion" &&
              game.bld.buildingsData[i].label != "Bio Lab" &&
              game.bld.buildingsData[i].label != "Calciner" &&
              game.bld.buildingsData[i].label != "Magneto" ) {
                    append(game.bld.buildingsData[i].label);
          }
        }
        else {
          append(game.bld.buildingsData[i].stages[game.bld.buildingsData[i].stage].label);
        } // end else
      } // end if unlocked
    } // end for build lists
    if(toggle) {
      for (var i = 0; i < list1.length; i++) {
          $(".btnContent:contains(" + list1[i] + ")").click();
      }
      // console.log("list1: " + list1);
    }
    else {
      for (var i = 0; i < list2.length; i++) {
          $(".btnContent:contains(" + list2[i] + ")").click();
      }
      // console.log("list2: " + list2);
    }
    toggle = !toggle;
  } // end if "Bonfire"
  // var t1 = performance.now();
  // console.log("Call to autoBuild took " + (t1 - t0) + " milliseconds.");
}, 12*(1000+Math.floor(Math.random() * 20)) );
