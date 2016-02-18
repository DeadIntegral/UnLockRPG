var enemyData = {
	1:{
		name:'어린 고블린',
		hp:25,
		pa:8,
		exp:5,
		unlock:2
	},
	2:{
		name:'노인 고블린',
		hp:40,
		pa:14,
		exp:8,
		unlock:3,
	},
	3:{
		name:'길잃은 고블린',
		hp:65,
		pa:22,
		pd:2,
		exp:12,
		unlock:4
	},
	4:{
		name:'고블린 병사',
		hp:100,
		pa:32,
		pd:5,
		exp:16,
		gold:1,
		unlock:5
	},
	5:{
		name:'고블린 전사',
		hp:145,
		pa:46,
		pd:10,
		exp:21,
		gold:2,
		unlock:6
	},
	6:{
		name:'고블린 족장',
		hp:240,
		pa:68,
		pd:18,
		exp:26,
		gold:5,
		unlock:7
	},
	7:{
		name:'고블린 마법사',
		hp:180,
		pd:13,
		ma:230,
		exp:30,
		gold:5,
		unlock:8,
		unlockField:1
	},
	8:{
		name:'고블린 용사',
		type:'boss',
		hp:560,
		pa:130,
		pd:20,
		md:20,
		unlock:9
	},
	9:{
		name:'분노한 고블린무리',
		hp:1700,
		pa:300,
		pd:40,
		md:-40,
		exp:50,
		gold:10
	},
	11:{
		name:'낙오된 오크',
		hp:440,
		pa:95,
		pd:30,
		exp:31,
		unlock:12
	},
	12:{
		name:'오크 병사',
		hp:580,
		pa:120,
		pd:40,
		exp:35,
		gold:1,
		unlock:13
	},
	13:{
		name:'오크 전사',
		hp:740,
		pa:140,
		pd:35,
		md:15,
		exp:40,
		gold:1,
		unlock:14
	},
	14:{
		name:'오크 투사',
		hp:1090,
		pa:180,
		pd:35,
		md:25,
		exp:48,
		gold:2,
		unlock:15
	},
	15:{
		name:'오크 족장',
		hp:1450,
		pa:260,
		pd:35,
		md:35,
		exp:53,
		gold:4,
		unlock:16,
		unlockField:2
	},
	16:{
		name:'오크 주술사',
		hp:920,
		pa:60,
		pd:30,
		ma:450,
		md:60,
		exp:60,
		gold:3,
		unlock:17
	},
	17:{
		name:'오크 타격대',
		hp:3000,
		pa:500,
		pd:60,
		md:-60,
		exp:70,
		gold:1,
		unlock:18
	},
	18:{
		name:'후르크',
		title:'[오크 영웅]',
		type:'boss',
		hp:4000,
		pa:580,
		pd:160,
		md:160,
	},
	21:{
		name:'트롤',
		hp:1800,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		gold:1,
		unlock:22
	},
	22:{
		name:'동굴 트롤',
		hp:2400,
		pa:400,
		pd:380,
		md:300,
		exp:65,
		gold:1,
		unlock:23
	},
	23:{
		name:'오우거',
		hp:4900,
		pa:900,
		pd:300,
		md:300,
		exp:65,
		gold:1,
		unlock:22
	},
	24:{
		name:'와이번',
		hp:6300,
		pa:400,
		ma:600,
		pd:300,
		md:250,
		exp:65,
		gold:1,
		unlock:22
	},
	25:{
		name:'히포그리포 무리',
		hp:9000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		gold:1,
		unlock:22
	},
	26:{
		name:'그리폰 무리',
		hp:13000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		gold:1,
		unlock:22
	},
	27:{
		name:'사이클롭스',
		hp:12000,
		pa:400,
		pd:1000,
		md:1000,
		exp:65,
		gold:1,
		unlock:22
	},
	28:{
		name:'드레이크',
		title:'[흉포한 지배자]',
		type:'boss',
		hp:19000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		gold:1,
		unlock:22
	},
	31:{
		name:'불사자 무리',
		title:'[좀비, 구울]',
		hp:6000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		honor:1,
		unlock:22
	},
	32:{
		name:'불사자 부대',
		title:'[해골전사, 해골마법사]',
		hp:6000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		honor:2,
		unlock:22
	},
	32:{
		name:'불사자 부대',
		title:'[좀비, 구울, 밴시]',
		hp:6000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		unlock:22
	},
	33:{
		name:'불사자 부대',
		title:'[해골전사, 해골마법사, 해골기사]',
		hp:6000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		unlock:22
	},
	34:{
		name:'죽음의 기사',
		hp:6000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		unlock:22
	},
	35:{
		name:'불사자 부대',
		title:'[리치, 해골전사, 해골마법사]',
		hp:6000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		unlock:22
	},
	36:{
		name:'불사자 부대',
		title:'[리치, 해골마법사]',
		hp:6000,
		pa:400,
		pd:300,
		md:250,
		exp:65,
		unlock:22
	},
};
//라미아, 쉴롭, 옹골리안트, 만티코어, 미노타우르스, 히드라, 피닉스, 
//코카트리스, 바실리스크, 스핑크스, 파라오, 아누비스, 아시르, 라
//엘프정찰대, 엘프검사대, 엘프궁수대, 엘프마법사대, 엘프장로, 엘프여왕, 세계수
//베히모스, 레비아탄, 지즈, 바알
//케르베르스, 
//우로보로스
//바포메트, 아바돈
var skill = {
	1001:{type:'heal', },
	1002:{type:'regen'}
}
