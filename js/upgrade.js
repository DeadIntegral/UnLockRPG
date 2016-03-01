var upgrade = {
	lock:{
		stat:{
			1:{name:'Unlock Physical Defense', costExp:20, target:'pd', otherUnlock:'eStat'},
			2:{name:'Unlock Magic Attack', costExp:50, target:'ma'},
			3:{name:'Unlock Magic Defense', costExp:100, target:'md'},
			4:{name:'Unlock Mana Point', costExp:500, target:'mp'},
			5:{name:'Unlock Element Fire Attack', costExp:50000, target:'efa'},
			6:{name:'Unlock Element Fire Defense', costExp:50000, target:'efd'},
			7:{name:'Unlock Element Ice Attack', costExp:50000, target:'eia'},
			8:{name:'Unlock Element Ice Defense', costExp:50000, target:'eid'},
			9:{name:'Unlock Element Eletro Attack', costExp:50000, target:'eea'},
			10:{name:'Unlock Element Eletro Defense', costExp:50000, target:'eed'},
		},
		eStat:{
			1:{name:'Unlock Gold', costExp:70, target:'gold', otherUnlock:'idle'},
			2:{name:'Unlock Honor', costExp:500, target:'honor'},
			3:{name:'Unlock Fame', costExp:2000, target:'fame'},
		},
		statBtn:{
			1:{name:'Unlock Up 1 Button', costExp:5},
			2:{name:'Unlock Up 10 Button - shift+click', costExp:100},
			3:{name:'Unlock Up 100 Button - alt+click', costExp:2000},
			4:{name:'Unlock Up 1000 Button - ctrl+click', costExp:40000}
		},
		idle:{
			1:{name:'Unlock Generate +1 Exp/s', costExp:10, costGold:20, addExp:1},
			2:{name:'Unlock Generate +1 Gold/s', costGold:50, addGold:1, otherUnlock:'menu'},
			3:{name:'Unlock Generate +2 Exp/s', costExp:100, costGold:500, addExp:2},
			4:{name:'Unlock Generate +2 Gold/s', costGold:1000, addGold:2},
		},
		menu:{
			1:{name:'Unlock Build Menu', costExp:100},
			2:{name:'Unlock Skill Menu', costExp:200},
			3:{name:'Unlock Bag Menu', costExp:20000},
			4:{name:'Unlock Shop Menu', costExp:20000},
		}
	}
};
