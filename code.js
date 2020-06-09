autoHunt = setInterval(function() {
  var catpower = gamePage.resPool.get('manpower');
  if (catpower.value / catpower.maxValue > 0.95) {
    gamePage.village.huntAll();
    if (gamePage.workshop.getCraft('parchment').unlocked) {
      var qty = (gamePage.resPool.get('furs').value/2)/175;
      gamePage.craft('parchment', qty);
    }
    if (gamePage.workshop.getCraft('manuscript').unlocked) {
      if ( gamePage.resPool.get('manuscript').value < gamePage.resPool.get('parchment').value ) {
        var qty = (gamePage.resPool.get('parchment').value/2)/25;
        gamePage.craft('manuscript', qty);
      }
    }
    if (gamePage.workshop.getCraft('compedium').unlocked) {
      if ( gamePage.resPool.get('compedium').value < gamePage.resPool.get('manuscript').value ) {
        var qty = (gamePage.resPool.get('manuscript').value/2)/50;
        gamePage.craft('compedium', qty);
      }
    }
    if (gamePage.workshop.getCraft('blueprint').unlocked) {
      if ( gamePage.resPool.get('blueprint').value < gamePage.resPool.get('compedium').value ) {
        var qty = (gamePage.resPool.get('compedium').value/2)/25;
        gamePage.craft('blueprint', qty);
      }
    }
  }
}, 3*(1000+Math.floor(Math.random() * 20)) );
