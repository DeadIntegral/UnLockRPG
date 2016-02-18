var upgrade = {
	lock:{
		stat:{
			0:{name:'Unlock Physical Defense', costExp:20, target:'PD', place:'20'},
			1:{name:'Unlock Gold', costExp:70, target:'Gold', place:'70', otherUnlock:'gold'},
			2:{name:'Unlock Magic Attack', costExp:170, target:'MA', place:'30'},
			3:{name:'Unlock Magic Defense', costExp:300, target:'MD', place:'30'},
			4:{name:'Unlock Honor', costExp:500, target:'HO', place:'90'},
			5:{name:'Unlock Mana Point', costExp:5000, target:'MP', place:'10', otherUnlock:'skill'},
			6:{name:'Unlock Element Fire Attack', costExp:500000, target:'EFA', place:'40'},
			7:{name:'Unlock Element Fire Defense', costExp:500000, target:'EFD', place:'40'},
			8:{name:'Unlock Element Ice Attack', costExp:500000, target:'EIA', place:'50'},
			9:{name:'Unlock Element Ice Defense', costExp:500000, target:'EID', place:'50'},
			10:{name:'Unlock Element Eletro Attack', costExp:500000, target:'EEA', place:'60'},
			11:{name:'Unlock Element Eletro Defense', costExp:500000, target:'EED', place:'60'},
		},
		statBtn:{
			0:{name:'Unlock Up 1 Button', costExp:5},
			1:{name:'Unlock Up 10 Button - shift+click', costExp:100},
			2:{name:'Unlock Up 100 Button - alt+click', costExp:4000},
			3:{name:'Unlock Up 1000 Button - ctrl+click', costExp:50000}
		},
		idle:{
			0:{name:'Unlock Generate +1 Exp/s', costGold:20, addExp:1, place:'80'},
			1:{name:'Unlock Generate +1 Gold/s', costGold:50, addGold:1, place:'80'},
			2:{name:'Unlock Generate +2 Exp/s', costGold:500, addExp:2},
			3:{name:'Unlock Generate +2 Gold/s', costGold:1000, addGold:2},
		},
		skill:{
			0:{name:'Unlock Skill Menu'}
		}
	}
	
};

var build = {
	farm:{costGold:100}
}
var skill = {
	active:{},
	passive:{
		0:{name:'', effect:'', costExp:10, maxLv:5}
	}
}
