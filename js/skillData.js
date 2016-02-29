var skill = {
	active:{
		1:{
			1:{name:'BashⅠ', type:1, effect:'pa*1.1', mp:10, cool:1},
			2:{name:'BashⅡ', type:1, effect:'pa*1.2', mp:20, cool:1},
			3:{name:'BashⅢ', type:1, effect:'pa*1.3', mp:50, cool:1},
			4:{name:'BashⅣ', type:1, effect:'pa*1.4', mp:100, cool:1},
			5:{name:'BashⅤ', type:1, effect:'pa*1.5', mp:170, cool:1},
		},
		51:{
			1:{name:'Fire BallⅠ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
			2:{name:'Fire BallⅡ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
		},
		52:{
			1:{name:'Fire StrikeⅠ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
			2:{name:'Fire StrikeⅡ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
		},
		53:{
			1:{name:'Fire WaveⅠ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
			2:{name:'Fire WaveⅡ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
		},
		54:{
			1:{name:'EruptionⅠ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
			2:{name:'EruptionⅡ', type:2, effect:'ma*1,ma+0', mp:10, cool:1},
		},
		55:{
			1:{name:'MeteorⅠ', type:2, effect:'ma*5,ma+0', mp:10, cool:10},
			2:{name:'MeteorⅡ', type:2, effect:'ma*5,ma+0', mp:10, cool:10},
		},
	},
	passive:{
		1:{
			1:{name:'Sword TrainingⅠ', add:'pa+40', costGold:100, costExp:100, need:1},
			2:{name:'Sword TrainingⅡ', add:'pa+120', costGold:200, costExp:200, need:1},
			3:{name:'Sword TrainingⅢ', add:'pa+240', costGold:300, costExp:300, need:1},
			4:{name:'Sword TrainingⅣ', add:'pa+400', costGold:400, costExp:400, need:1},
			5:{name:'Sword TrainingⅤ', add:'pa+600', costGold:500, costExp:500, need:1},
		},
		2:{
			1:{name:'Battle TrainingⅠ', add:'pa+0', costGold:100, needSkill:1},
			2:{name:'Battle TrainingⅡ', add:'pa+0', costGold:100, need:1},
			3:{name:'Battle TrainingⅢ', add:'pa+0', costGold:100, need:1},
		},
		11:{
			1:{name:'Guard TrainingⅠ', add:'pd+40', costGold:100, costExp:100, need:1 },
			2:{name:'Guard TrainingⅡ', add:'pd+100', costGold:150, costExp:150, need:1 },
			3:{name:'Guard TrainingⅢ', add:'pd+180', costGold:200, costExp:200, need:1 },
			4:{name:'Guard TrainingⅣ', add:'pd+280', costGold:250, costExp:250, need:1 },
			5:{name:'Guard TrainingⅤ', add:'pd+400', costGold:300, costExp:300, need:1 },
		},
		12:{
			1:{name:'Amor MasteryⅠ', add:'pd+400', costGold:1000, costExp:1000, need:1 },
			2:{name:'Amor MasteryⅡ', add:'pd+1000', costGold:1500, costExp:1500, need:1 },
			3:{name:'Amor MasteryⅢ', add:'pd+1800', costGold:2000, costExp:2000, need:1 },
			4:{name:'Amor MasteryⅣ', add:'pd+2800', costGold:2500, costExp:2500, need:1 },
			5:{name:'Amor MasteryⅤ', add:'pd+4000', costGold:3000, costExp:3000, need:1 },
		},
	}
}

/*
basic sword training
트레이닝 -> (익스퍼트) -> 마스터

active
 강타bash
 분노의 일격
 magic sword
 light sword
 
 iron skin
 Enchant
 Hardening
 
 화염구fire ball
 
 쿨타임넣기 - 스턴기 등
보스 죽일 경우 정수획득
 현재 정수치는 매 턴마다 감소, 스킬사용시 정수증가, 최대정수보다 낮아야 스킬 사용가능
*/
