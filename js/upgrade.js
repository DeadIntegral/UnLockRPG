var upgrade = {
	lock:{
		stat:{
			0:{name:'Unlock Physical Defense', costExp:20, target:'PD', place:'20'},
			1:{name:'Unlock Gold', costExp:50, target:'Gold', place:'70', otherUnlock:'gold'},
			2:{name:'Unlock Magic Attack', costExp:100, target:'MA', place:'30'},
			3:{name:'Unlock Magic Defense', costExp:5000, target:'MD', place:'30'},
			4:{name:'Unlock Mana Point', costExp:50000, target:'MP', place:'10'},
			5:{name:'Unlock Element Fire Attack', costExp:500000, target:'EFA', place:'40'},
			6:{name:'Unlock Element Fire Defense', costExp:500000, target:'EFD', place:'40'},
			7:{name:'Unlock Element Ice Attack', costExp:500000, target:'EIA', place:'50'},
			8:{name:'Unlock Element Ice Defense', costExp:500000, target:'EID', place:'50'},
			9:{name:'Unlock Element Eletro Attack', costExp:500000, target:'EEA', place:'60'},
			10:{name:'Unlock Element Eletro Defense', costExp:500000, target:'EED', place:'60'},
		},
		statBtn:{
			0:{name:'Unlock Up 1 Button', costExp:5},
			1:{name:'Unlock Up 10 Button - shift+click', costExp:100},
			2:{name:'Unlock Up 100 Button - alt+click', costExp:4000},
			3:{name:'Unlock Up 1000 Button - ctrl+click', costExp:50000}
		},
		idle:{
			0:{name:'Unlock Generate +1 Gold/s', costGold:10, addGold:1, place:'80'},
			1:{name:'Unlock Generate +1 Exp/s', costGold:50, addExp:1, place:'80'},
			2:{name:'Unlock Generate +2 Gold/s', costGold:500, addGold:2},
			3:{name:'Unlock Generate +2 Exp/s', costGold:1000, addExp:2},
		}
	}
	
};
