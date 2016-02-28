var moveMenu = function(str){
	$('.menuTab').removeClass('select');
	$(str).addClass('select');
	$('[id*=Window]').css('display','none');
	$('#'+str.id+'Window').css('display','block');
}

var checkUnlock = function(name){
	var num = userData.unlock[name];
	var output = checkUnlockFunc(num,name);
	var newName = name.charAt(0).toUpperCase() + name.slice(1);
	$('#unlock'+newName).html(output);
}
var checkUnlockFunc = function(num,name){
	var obj = upgrade.lock[name][num];
	if(typeof obj == 'undefined'){var output = '';}
	else{
		if(typeof obj.costExp == 'undefined'){obj.costExp=0;}
		if(typeof obj.costGold == 'undefined'){obj.costGold=0;}
		
		var output = '<td>'+obj.name+'</td><td align="right">'+obj.costExp+'</td><td align="right">'+obj.costGold+'</td><td align="right"><button onclick="unlcokFunc(\''+name+'\')">Unlock</button></td>';
	}
	return output;
}
var unlcokFunc = function(arg){
	var obj = upgrade.lock[arg][userData.unlock[arg]];
	if(typeof obj=='undefined'){
		//input value 0
	}else{
		if(obj.costExp<=userData.stat.exp){
			if(typeof obj.otherUnlock != 'undefined'){checkUnlock(obj.otherUnlock);}
			//cost 계산 하나로 통합하기 - gold도 그냥 조건문에 넣어서
			if(arg=='stat'){
				userData.stat.exp -= obj.costExp;
				userData.stat[obj.target]=5;
				if(obj.target=='mp'){userData.stat[obj.target]=20;}
				userData.unlock.stat+=1;
				checkStat();
				statBtnRefresh();
			}else if(arg=='eStat'){
				if(obj.otherUnlock == 'idle'){ checkUnlock('idle'); }
				userData.stat.exp -= obj.costExp;
				userData.stat[obj.target]=0;
				userData.unlock.eStat+=1;
				checkExtraStat();
			}else if(arg=='statBtn'){
				userData.stat.exp -= obj.costExp;
				userData.unlock.statBtn+=1;
				statBtnRefresh();
			}else if(arg=='idle'){
				if(obj.costGold<=userData.stat.gold){
					if(typeof obj.costExp != 'undefined'){userData.stat.exp -= obj.costExp;}
					if(typeof obj.costGold != 'undefined'){userData.stat.gold -= obj.costGold;}
					var exp = (typeof obj.addExp != 'undefined')?obj.addExp:0;
					var gold = (typeof obj.addGold != 'undefined')?obj.addGold:0;
					userData.unlock.idle+=1;
					userData.idle.exp+=exp; userData.idle.gold+=gold;
					checkExtraStat();
					statRefresh();
				}else{printMsg('Not Enough Gold');}
			}else if(arg=='menu'){
				userData.stat.exp -= obj.costExp;
				userData.unlock.menu+=1;
				if(userData.unlock.menu==1){checkBuild();}
				checkMenu();
			}
		}else{printMsg('Not Enough Exp');}
	}
	checkUnlock(arg);
	statRefresh();
};

var unlockField = function(fieldNum){
	var output = '<button class="fSize1 btn" onclick="printEnemyList('+fieldNum+')">'+field[fieldNum].name+'</button>';
	userData.hunt[field[fieldNum].armyList[0]]=0;
	$('#fieldPlace').append(output);
};
var checkField = function(){
	var output='';
	for(var key in userData.field){
		if(!userData.field.hasOwnProperty(key)) continue;
		output += '<button class="fSize1 btn" onclick="printEnemyList('+key+')">'+field[key].name+'</button>';
	}
	$('#fieldPlace').html(output);
}
var printEnemyList = function(Num){
	userData.status.thisPlace=Num;
	var output='';
	for(var i=0; i<field[Num].armyList.length; i++){
		if(typeof userData.hunt[field[Num].armyList[i]] != 'undefined'){
			var eNum = field[Num].armyList[i];
			//type == boss => bgcolor change
			var color='';
			if(userData.hunt[eNum]==1){color=' bg-g';}
			if(enemyData[eNum].type=='boss'){
				if(userData.hunt[eNum]==1){color=' bg-y2';} else {color=' bg-y';}
			}
			output += '<button class="fSize1 btn'+color+'" onclick="startBattle('+eNum+')">'+enemyData[eNum].name+'<br>HP:'+enemyData[eNum].hp+'</button>';
		}
	}
	$('#fieldMonList').html(output);
};

var e = {};
var u = {};
var startBattle = function(emyNum){
	if(userData.status.battle == 0){
		userData.status.battle=1;
		
		for(var key in enemyData[emyNum]){
			if(!enemyData[emyNum].hasOwnProperty(key)) continue;
			e[key]=enemyData[emyNum][key];
		}
		u = userData.tStat; //링크만 걸림 나중에 수정하기
		var output = '';
		if(typeof e.title != 'undefined'){output+=e.title;}
		output+=e.name+'<br>몹 이미지 넣을 공간<br>';
		output+='<div id="eHp">'+e.hp+' / '+e.hp+'</div>'; //fix01
		output+='<button onclick="userAtk('+emyNum+')">Attack</button><br><br>';
		output+='<button onclick="battleEnd()">Away</button>';
		output+='<table><tr>';
		if(typeof e.pa != 'undefined'){output += '<td>PA</td><td>'+e.pa+'</td>';}
		if(typeof e.pd != 'undefined'){output += '<td>PD</td><td>'+e.pd+'</td>';}
		output += '</tr><tr>';
		if(typeof e.ma != 'undefined'){output += '<td>MA</td><td>'+e.ma+'</td>';}
		if(typeof e.md != 'undefined'){output += '<td>MD</td><td>'+e.md+'</td>';}
		output += '</tr><tr>';
		if(typeof e.efa != 'undefined'){output += '<td>EFA</td><td>'+e.efa+'</td>';}
		if(typeof e.efd != 'undefined'){output += '<td>EFD</td><td>'+e.efd+'</td>';}
		output += '</tr><tr>';
		if(typeof e.eia != 'undefined'){output += '<td>EIA</td><td>'+e.eia+'</td>';}
		if(typeof e.eid != 'undefined'){output += '<td>EID</td><td>'+e.eid+'</td>';}
		output += '</tr></table>';
		u=readyStat(u);
		$('#userHP').html(u.nhp+' / '+u.hp);
		e=readyStat(e);
		$('#battlePlace').html(output);
	}
};
var readyStat = function(o){
	o.nhp=o.hp;
	var list = ['hp','mp','pa','pd','ma','md','efa','efd','eia','eid','eea','eed'];
	for(var i=0; i<12; i++){
		o[list[i]]=(typeof o[list[i]] != 'undefined')?o[list[i]]:0;
	}
	return o;
};
var calStat = function(){
	var list = ['hp','mp','pa','pd','ma','md','efa','efd','eia','eid','eea','eed'];
	for(var i=0; i<12; i++){
		userData.tStat[list[i]] = userData.stat[list[i]]+userData.skill.stat[list[i]]; //+userData.equip.stat[list[i]];
	}
}
var userAtk = function(emyNum){
	var tdmg=0;
	var pdmg = u.pa-e.pd;
	var mdmg = (u.ma>0)?(u.ma-e.md):0;
	var efdmg = u.efa-e.efd;
	var eidmg = u.eia-e.eid;
	var eedmg = u.eea-e.eed;
	if(pdmg>=0){tdmg+=pdmg;} if(mdmg>=0){tdmg+=mdmg;} if(efdmg>=0){tdmg+=efdmg;} if(eidmg>=0){tdmg+=eidmg;} if(eedmg>=0){tdmg+=eedmg;}
	e.nhp-=tdmg;
	$('#eHp').html(e.nhp+' / '+e.hp);
	if(e.nhp<=0){
		var output = 'Win! Kill '+e.name+'!';
		//boss reward 1 limit
		if(e.type == 'boss' && typeof userData.hunt[emyNum]=='undefined'){
			var list = ['exp','gold','honor','fame']; var list2 = ['Exp','Gold','Honor','Fame'];
			for(var i=0; i<4; i++){
				if(typeof e[list[i]] != 'undefined' && userData.unlock.eStat>=i){
					output+=' '+list2[i]+'+'+e[list[i]];
					userData.stat[list[i]]+=e[list[i]];
					$('#user'+list2[i]).html(userData.stat[list[i]]);
				}
			}
		}
		userData.hunt[emyNum]=1; //잡은 몹
		if(e.type != 'boss'){
			var list = ['exp','gold','honor','fame']; var list2 = ['Exp','Gold','Honor','Fame'];
			for(var i=0; i<4; i++){
				if(typeof e[list[i]] != 'undefined' && userData.unlock.eStat>=i){
					output+=' '+list2[i]+'+'+e[list[i]];
					userData.stat[list[i]]+=e[list[i]];
					$('#user'+list2[i]).html(userData.stat[list[i]]);
				}
			}
		}
		printMsg(output);
		
		if(typeof e.unlock != 'undefined' && typeof userData.hunt[e.unlock] == 'undefined'){
			userData.hunt[e.unlock]=0; printEnemyList(userData.status.thisPlace);
			printMsg('<span class="blue">'+enemyData[e.unlock].name+' 발견!</span>');
		}
		if(typeof e.unlockField != 'undefined' && typeof userData.field[e.unlockField] == 'undefined'){
			userData.field[e.unlockField]=1; unlockField(e.unlockField);
			printMsg('<span class="blue">'+field[e.unlockField].name+' 발견!</span>');
		}
		
		if(e.type=='boss'){$('[onClick*="startBattle('+emyNum+')"]').addClass('bg-y2');}
		else{$('[onClick*="startBattle('+emyNum+')"]').addClass('bg-g');}
		
		battleEnd();
	}else{
		enemyTurn();
	}
};

var enemyTurn = function(){
	enemyAtk();
	if(u.nhp<=0){
		printMsg('<span class="red">Defeated by '+e.name+'</span>');
		battleEnd();
	}
};
var enemyAtk = function(){
	var tdmg=0;
	var pdmg=e.pa-u.pd;
	var mdmg=e.ma-u.md;
	var efdmg = e.efa-u.efd;
	var eidmg = e.eia-u.eid;
	var eedmg = e.eea-u.eed;
	if(pdmg>=0){tdmg+=pdmg;} if(mdmg>=0){tdmg+=mdmg;} if(efdmg>=0){tdmg+=efdmg;} if(eidmg>=0){tdmg+=eidmg;} if(eedmg>=0){tdmg+=eedmg;}
	u.nhp-=tdmg;
	$('#userHP').html(u.nhp+' / '+u.hp);
};
var battleEnd = function(){
	userData.status.battle=0;
	$('#userHP').html(userData.stat.hp);
	$('#battlePlace').html('');
	e={};
}
var statRefresh = function(){
	calStat();
	var list = ['hp','mp','pa','pd','ma','md','efa','efd','eia','eid','eea','eed'];
	for(var i=0; i<12; i++){
		if(typeof userData.tStat[list[i]] != 'undefined'){
			$('#user'+list[i].toUpperCase()).html(userData.tStat[list[i]]);
		}
	}
	var list2 = ['exp','gold','honor','fame'];
	for(var i=0; i<4; i++){
		if(typeof userData.stat[list2[i]] != 'undefined'){$('#user'+list2[i].charAt(0).toUpperCase() + list2[i].slice(1)).html(userData.stat[list2[i]]);}
	}
};
var statBtnRefresh = function(){
	var list1 = ['hp','mp','pa','pd','ma','md']; var list2 = ['efa','efd','eia','eid','eea','eed'];
	for(var i=0; i<list1.length; i++){
		if(typeof userData.stat[list1[i]] != 'undefined'){
			$('#u'+list1[i].toUpperCase()+'Up').html('<span class="clickAble" title="needExp: 5" onmousedown="addStat(\''+list1[i]+'\')">+</span>');
		}
	}
	for(var i=0; i<list2.length; i++){
		if(typeof userData.stat[list2[i]] != 'undefined'){
			$('#u'+list2[i].toUpperCase()+'Up').html('<span class="clickAble" title="needExp: 10" onmousedown="addStat(\''+list2[i]+'\')">+</span>');
		}
	}
};

var addStat = function(arg){
	if(event.shiftKey && userData.unlock.statBtn>1){addStatModul(arg,10);
	}else if(event.altKey && userData.unlock.statBtn>2){addStatModul(arg,100);
	}else if(event.ctrlKey && userData.unlock.statBtn>3){addStatModul(arg,1000);
	}else{addStatModul(arg,1);}
};
var addStatModul = function(arg,num){
	//소스 개편하기
	if(arg=='hp' || arg=='mp'){
		if(userData.stat.exp>=num*5){
			userData.stat.exp-=num*5;
			userData.stat[arg]+=num*10;
			statRefresh();
		}else{printMsg('Not Enough Exp');}
	}else if(arg.length==3){
		if(userData.stat.exp>=num*10){
			userData.stat.exp-=num*10;
			userData.stat[arg]+=num;
			statRefresh();
		}else{printMsg('Not Enough Exp');}
	}else{
		if(userData.stat.exp>=num*5){
			userData.stat.exp-=num*5;
			userData.stat[arg]+=num;
			statRefresh();
		}else{printMsg('Not Enough Exp');}
	}
};

var printMsg = function(output){
	$('#msgPlace').html('');
	if(msg.length==10){
		for(var i=0; i<9; i++){msg[i]=msg[i+1];}
		msg[9]=output;
	}
	else{
		if(typeof msg.length != 'undefined'){msg[msg.length]=output;}
		else{msg[0]=output;}
	}
	for(var i=0; i<10; i++){if(typeof msg[i] != 'undefined') $('#msgPlace').append(msg[i]+'<br>');}
}
var battleMsg = function(){
	//그냥 출력하기(append) + 클리어 버튼 만들기
}
var autoMake = function(){
	userData.stat.exp+=userData.idle.exp;
	userData.stat.gold+=userData.idle.gold;
	$('#userExp').html(userData.stat.exp);
	$('#userGold').html(userData.stat.gold);
}

var saveOut = function(){
	if(userData.status.battle==0){
		var string = JSON.stringify(userData);
		var encode = LZString.compressToBase64(string);
		$('#saveCode').val(encode);
		$('#saveCode').select();
	}else{
		$('#saveMsg').html('save error! You have to finish the battle!');
	}
}
var saveIn = function(){
	battleEnd();
	
	var encode = $('#saveCode').val();
	var decode = LZString.decompressFromBase64(encode);
	var revived = JSON.parse(decode);
	userData=revived;
	checkUnlock('stat');
	checkUnlock('statBtn');
	checkUnlock('idle');
	checkUnlock('eStat');
	checkUnlock('menu');
	checkStat();
	checkExtraStat();
	checkMenu();
	checkBuild();
	checkSkill();
	checkSkillStat();
	statRefresh();
	statBtnRefresh();
	
	checkField();
	$('#fieldMonList').html('');
	$('#saveMsg').html('import save');
}

var checkStat = function(){
	if(typeof userData.tStat == 'undefined'){userData.tStat={};}
	var list = ['hp','mp','pa','pd','ma','md','efa','efd','eia','eid','eea','eed'];
	var output = '';
	var s = userData.stat;
	for(var i=0; i<list.length; i++){
		if(i % 2 == 0){output+='<div>';}
		if(s[list[i]] === parseInt(s[list[i]], 10) && s[list[i]] != 0){
			var sUpper = list[i].toUpperCase();
			output += '<div class="sName">'+sUpper+'</div><div class="sVal"><span id="user'+sUpper+'">'+s[list[i]]+'</span><span id="u'+sUpper+'Up"></span></div>';
		}
		if(i % 2 == 1){output+='</div>';}
	}
	$('#uStat').html(output);
}
var checkExtraStat = function(){
	var output='<div><div class="sName">Exp</div><div class="sVal"><span id="userExp">'+userData.stat.exp+'</span></div>';
	var ch2 = userData.unlock;
	var check = userData.stat.gold;
	if(check === parseInt(check, 10) && ch2.eStat>0 ){ output+='<div class="sName">Gold</div><div class="sVal"><span id="userGold">'+userData.stat.gold+'</span></div>';}
	output += '</div><div>';
	check=userData.idle.exp;
	if(check === parseInt(check, 10) && ch2.idle>0){output+='<div class="sName">Exp/s</div><div class="sVal"><span id="genExp">'+userData.idle.exp+'</span></div>';}
	check=userData.idle.gold;
	if(check === parseInt(check, 10) && ch2.idle>0){output+='<div class="sName">Gold/s</div><div class="sVal"><span id="genGold">'+userData.idle.gold+'</span></div>';}
	output += '</div><div>';
	check=userData.stat.honor;
	if(check === parseInt(check, 10) && ch2.eStat>=2){output+='<div class="sName">Honor</div><div class="sVal"><span id="userHonor">'+userData.stat.honor+'</span></div>';}
	check=userData.stat.fame;
	if(check === parseInt(check, 10) && ch2.eStat>=3){output+='<div class="sName">Fame</div><div class="sVal"><span id="userFame">'+userData.stat.fame+'</span></div>';}
	output += '</div>';
	$('#uEStat').html(output);
}
var checkSkillStat = function(){
	var list = ['hp','mp','pa','pd','ma','md','efa','efd','eia','eid','eea','eed'];
	for(var i=0; i<12; i++){ userData.skill.stat[list[i]]=0; }
	for(var key in userData.skill.passive){
		if(!userData.skill.passive.hasOwnProperty(key)) continue;
		if(userData.skill.passive[key]>0){
			var nowObj = skill.passive[key][userData.skill.passive[key]];
			var add = nowObj.add.split('+');
			userData.skill.stat[add[0]]+=parseInt(add[1]);
		}
	}
}
var checkMenu = function(){
	var output = '<div id="main" class="menuTab select clickAble" onclick="moveMenu(this)">Main</div><div id="config" class="menuTab clickAble" onclick="moveMenu(this)">Config</div>';
	$('#menu').html(output);
	if(typeof userData.unlock.menu != 'undefined'){
		if(userData.unlock.menu>0){ var output = '<div id="build" class="menuTab clickAble" onclick="moveMenu(this)">Build</div>'; $('#menu').children(':eq(0)').after(output); }
		if(userData.unlock.menu>1){ var output = '<div id="skill" class="menuTab clickAble" onclick="moveMenu(this)">Skill</div>'; $('#menu').children(':eq(0)').after(output); }
		if(userData.unlock.menu>2){ var output = '<div id="bag" class="menuTab clickAble" onclick="moveMenu(this)">Bag</div>'; $('#menu').children(':eq(0)').after(output); }
		if(userData.unlock.menu>3){ var output = '<div id="shop" class="menuTab clickAble" onclick="moveMenu(this)">Shop</div>'; $('#menu').children(':eq(2)').after(output); }
	}
}
var checkBuild = function(){
	var list = ['farm','cityH','trainH'];
	var output=''
	for(var i=0; i<3; i++){
		if(typeof userData.build == 'undefined'){userData.build={};}
		if(typeof userData.build[list[i]] == 'undefined'){userData.build[list[i]]=0;}
		var obj = build[list[i]][userData.build[list[i]]];
		if(typeof obj != 'undefined'){
			if(typeof obj.costGold == 'undefined'){obj.costGold=0;}
			if(typeof obj.needHonor == 'undefined'){obj.needHonor=0;}
			if(typeof obj.needFame == 'undefined'){obj.needFame=0;}
			output += '<tr><td>'+obj.name+'</td><td>'+obj.costGold+'</td><td>'+obj.needHonor+'</td><td>'+obj.needFame+'</td><td><button onClick="addbuilt(\''+list[i]+'\')">Built</button></td></tr>';
		}
	}
	$('#buildPlace').html(output);
}
var addbuilt = function(arg){
	var obj = build[arg][userData.build[arg]];
	if(typeof obj.costExp == 'undefined'){obj.costExp=0;}
	if(typeof obj.costGold == 'undefined'){obj.costGold=0;}
	
	if(userData.stat.exp>obj.costExp){
		if(userData.stat.gold>obj.costGold){
			userData.stat.exp-=obj.costExp;
			userData.stat.gold-=obj.costGold;
			
			if(arg == 'farm'){
				if(typeof obj.addExp == 'undefined'){obj.addExp=0;}
				if(typeof obj.addGold == 'undefined'){obj.addGold=0;}
				userData.idle.exp+=obj.addExp;
				userData.idle.gold+=obj.addGold;
				userData.build[arg]+=1;
				checkExtraStat();
			}else if(arg == 'cityH'){
			}else if(arg == 'trainH'){
			}else{
				printMsg('Error!');
			}
		}else{printMsg('Not Enough Gold');}
	}else{printMsg('Not Enough Exp');}
	checkBuild();
}

var checkSkill = function(){
	if(typeof userData.skill == 'undefined'){userData.skill = {};}
	if(typeof userData.skill.active == 'undefined'){userData.skill.active = {};}
	if(typeof userData.skill.passive == 'undefined'){userData.skill.passive = {};}
	if(typeof userData.skill.stat == 'undefined'){userData.skill.stat = {};}
}
var outputSkill = function(){
	var output='';
	for(var key in skill.passive){
		if(!skill.passive.hasOwnProperty(key)) continue;
			output += '<div class="tooltip"><img src="./img/skill/'+(100+parseInt(key))+'.svg" onmouseover="outputSkillDetail(this)" onClick="learnSkill(this)"><span class="tooltext"></span></div>';
			if(typeof skill.passive[parseInt(key)+1] == 'undefined'){output+='<br>';}
	}
	$('#skillWindow').html(output);
}
var outputSkillDetail = function(arg){
	var output = '';
	var tmp = arg.src.split('skill/');
	var sNum = tmp[1].slice(0,3);
	if(parseInt(sNum)<200){ sNum = parseInt(sNum%100); }
	
	if(userData.skill.passive[sNum] > 0){
		var obj = skill.passive[sNum][userData.skill.passive[sNum]];
		output += 'Current<br>'+obj.name+'<br>'+obj.add.toUpperCase();
	}else{
		userData.skill.passive[sNum]=0;
	}
	if(userData.skill.passive[sNum]<Object.keys(skill.passive[sNum]).length){
		var obj = skill.passive[sNum][userData.skill.passive[sNum]+1];
		var costExp = (typeof obj.costExp != 'undefined')?obj.costExp:0;
		var costGold = (typeof obj.costGold != 'undefined')?obj.costGold:0;
		if(output != ''){output+='<br><br>';}
		output += 'Next<br>'+obj.name+'<br>'+obj.add.toUpperCase()+'<br>CostExp: '+costExp+'<br>CostGold: '+costGold;
	}
	output += '<br>Lv '+userData.skill.passive[sNum]+'/'+Object.keys(skill.passive[sNum]).length;
	$(arg).closest('div').find('span').html(output);
}
var learnSkill = function(arg){
	var tmp = arg.src.split('skill/');
	var sNum = tmp[1].slice(0,3);
	if(parseInt(sNum)<200){ sNum = parseInt(sNum%100); }
	
	var obj = skill.passive[sNum][userData.skill.passive[sNum]+1];
	var costExp = (typeof obj.costExp != 'undefined')?obj.costExp:0;
	var costGold = (typeof obj.costGold != 'undefined')?obj.costGold:0;
	if(userData.stat.exp>costExp){
		if(userData.stat.gold>costGold){
			if(userData.skill.passive[sNum]>0){
				//지금렙만큼 효과 감소
				var nowObj = skill.passive[sNum][userData.skill.passive[sNum]];
				var sub = nowObj.add.split('+');
				userData.skill.stat[sub[0]]-=parseInt(sub[1]);
			}
			var add = obj.add.split('+');
			userData.skill.stat[add[0]]+=parseInt(add[1]);
			userData.skill.passive[sNum]+=1;
			calStat();
			statRefresh();
		}else{printMsg('Not Enough Gold');}
	}else{printMsg('Not Enough Exp');}
}
/*
스킬렙이 2 이상이면 배울 때 지금렙만큼 효과감소 시키고 다음렙만큼 효과증가시키기
design 업글하면 icon추가해주기 - checkstat 반복문 내 ouput에 링크걸기
자동생산, 스킬, 장비
*/
