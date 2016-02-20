var upgrade = {
	lock:{
		stat:{
			0:{name:'Unlock Physical Defense', costExp:20, target:'pd', otherUnlock:'eStat'},
			1:{name:'Unlock Magic Attack', costExp:170, target:'ma'},
			2:{name:'Unlock Magic Defense', costExp:300, target:'md'},
			3:{name:'Unlock Mana Point', costExp:5000, target:'mp', otherUnlock:'menu'},
			4:{name:'Unlock Element Fire Attack', costExp:50000, target:'efa'},
			5:{name:'Unlock Element Fire Defense', costExp:50000, target:'efd'},
			6:{name:'Unlock Element Ice Attack', costExp:50000, target:'eia'},
			7:{name:'Unlock Element Ice Defense', costExp:50000, target:'eid'},
			8:{name:'Unlock Element Eletro Attack', costExp:50000, target:'eea'},
			9:{name:'Unlock Element Eletro Defense', costExp:50000, target:'eed'},
		},
		eStat:{
			0:{name:'Unlock Gold', costExp:70, target:'gold', otherUnlock:'idle'},
			1:{name:'Unlock Honor', costExp:500, target:'honor'},
			2:{name:'Unlock Fame', costExp:2000, target:'fame'},
		},
		statBtn:{
			0:{name:'Unlock Up 1 Button', costExp:5},
			1:{name:'Unlock Up 10 Button - shift+click', costExp:100},
			2:{name:'Unlock Up 100 Button - alt+click', costExp:4000},
			3:{name:'Unlock Up 1000 Button - ctrl+click', costExp:50000}
		},
		idle:{
			0:{name:'Unlock Generate +1 Exp/s', costExp:10, costGold:20, addExp:1},
			1:{name:'Unlock Generate +1 Gold/s', costGold:50, addGold:1},
			2:{name:'Unlock Generate +2 Exp/s', costExp:100, costGold:500, addExp:2},
			3:{name:'Unlock Generate +2 Gold/s', costGold:1000, addGold:2},
		},
		menu:{
			0:{name:'Unlock Build Menu', costExp:100},
			1:{name:'Unlock Skill Menu', costExp:1000}
		}
	}
	
};
