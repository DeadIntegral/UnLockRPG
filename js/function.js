var checkUnlockStat = function(){
	var num = userData.unlock.stat;
	var output = checkUnlockFunc(num,'stat');
	$('#unlockStat').html(output);
};
var checkUnlockBtn = function(){
	var num = userData.unlock.statBtn;
	var output = checkUnlockFunc(num,'statBtn');
	$('#unlockStatBtn').html(output);
};
var checkUnlockIdle = function(){
	var num = userData.unlock.idle;
	var output = checkUnlockFunc(num,'idle');
	$('#unlockIdle').html(output);
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
	if(arg=='stat'){
		var obj = upgrade.lock.stat[userData.unlock.stat];
		if(typeof obj=='undefined'){
		}else{
			if(obj.costExp<=userData.stat.exp){
				userData.stat.exp -= obj.costExp;
				if(obj.otherUnlock == 'gold'){
					var output = '<td title="">'+obj.target+'</td><td id="user'+obj.target+'"></td><td></td>';
					checkUnlockIdle();
					userData.stat.gold=0;
				}else{
					var output = '<td title="">'+obj.target+'</td><td id="user'+obj.target+'"></td><td id="u'+obj.target+'Up"></td>';
					var statName = obj.target.toLocaleLowerCase();
					userData.stat[statName]=5;
				}
				$('#uStat'+obj.place).append(output);
				
				userData.unlock.stat+=1;
				checkUnlockStat();
			}else{ printMsg('Not Enough Exp'); }
		}
	}else if(arg=='statBtn'){
		var obj = upgrade.lock.statBtn[userData.unlock.statBtn];
		if(typeof obj=='undefined'){
		}else{
			if(obj.costExp<=userData.stat.exp){
				userData.stat.exp -= obj.costExp;
				userData.unlock.statBtn+=1;
				checkUnlockBtn();
				statBtnRefresh();
			}else{printMsg('Not Enough Exp');}
		}
	}else if(arg=='idle'){
		var obj = upgrade.lock.idle[userData.unlock.idle];
		if(obj.costExp<=userData.stat.exp){
			if(obj.costGold<=userData.stat.gold){
				if(typeof obj.costExp != 'undefined'){userData.stat.exp -= obj.costExp;}
				if(typeof obj.costGold != 'undefined'){userData.stat.gold -= obj.costGold;}
				var exp = (typeof obj.addExp != 'undefined')?obj.addExp:0;
				var gold = (typeof obj.addGold != 'undefined')?obj.addGold:0;
				addAutoMake(exp,gold);
				userData.unlock.idle+=1;
				if(userData.unlock.idle==1){
					setInterval(function(){autoMake();},1000);
				}
				checkUnlockIdle();
				statBtnRefresh();
			}else{printMsg('Not Enough Gold');}
		}else{printMsg('Not Enough Exp');}
	}
	statRefresh();
};

var unlockField = function(fieldNum){
	var output = '<button class="fSize1 btn" onclick="printEnemyList('+fieldNum+')">'+field[fieldNum].name+'</button>';
	$('#fieldPlace').append(output);
/*
	if(typeof UserData.Bag != 'undefined'){
		for(var key in UserData.Bag){
			if(!UserData.Bag.hasOwnProperty(key)) continue;
			output+= '<button class="fieldsize1 btn item" code="'+key+'">'+itemData[key].name+'</button>';
		}
		$("#bag").html(output);
	}
*/
};
var printEnemyList = function(Num){
	userData.status.thisPlace=Num;
	var output='';
	for(var i=0; i<field[Num].armyList.length; i++){
		if(typeof userData.hunt[field[Num].armyList[i]] != 'undefined'){
			var eNum = field[Num].armyList[i];
			//type == boss => bgcolor change
			output += '<button class="fSize1 btn" onclick="statBattle('+eNum+')">'+enemyData[eNum].name+'<br>HP:'+enemyData[eNum].hp+'</button>';
		}
	}
	$('#fieldMonList').html(output);
};

var e = {};
var u = {};
var statBattle = function(emyNum){
	if(userData.status.battle == 0){
		userData.status.battle=1;
		//e = enemyData[emyNum];
		
		for(var key in enemyData[emyNum]){
			if(!enemyData[emyNum].hasOwnProperty(key)) continue;
			e[key]=enemyData[emyNum][key];
			
		}
		u = userData.stat;
		var output = '';
		if(typeof e.title != 'undefined'){output+=e.title;}
		output+=e.name+'<br>몹 이미지 넣을 공간<br>';
		output+='<div id="eHp">'+e.hp+' / '+e.hp+'</div>'; //fix01
		output+='<button onclick="userAtk('+emyNum+')">Attack</button><br><br>';
		output+='<button onclick="">Away</button>';
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
	o.pa=(typeof o.pa != 'undefined')?o.pa:0;
	o.pd=(typeof o.pd != 'undefined')?o.pd:0;
	o.ma=(typeof o.ma != 'undefined')?o.ma:0;
	o.md=(typeof o.md != 'undefined')?o.md:0;
	o.efa=(typeof o.efa != 'undefined')?o.efa:0;
	o.efd=(typeof o.efd != 'undefined')?o.efd:0;
	o.eia=(typeof o.eia != 'undefined')?o.eia:0;
	o.eid=(typeof o.eid != 'undefined')?o.eid:0;
	o.eea=(typeof o.eea != 'undefined')?o.eea:0;
	o.eed=(typeof o.eed != 'undefined')?o.eed:0;
	//o.gold = (typeof o.gold != 'undefined')?o.gold:0;
	return o;
};

var userAtk = function(emyNum){
	var tdmg=0;
	var pdmg = u.pa-e.pd;
	//var mdmg = u.ma-e.md;
	var mdmg = (u.ma>0)?(u.ma-e.md):0;
	var efdmg = u.efa-e.efd;
	var eidmg = u.eia-e.eid;
	var eedmg = u.eea-e.eed;
	if(pdmg>=0){tdmg+=pdmg;} if(mdmg>=0){tdmg+=mdmg;} if(efdmg>=0){tdmg+=efdmg;} if(eidmg>=0){tdmg+=eidmg;} if(eedmg>=0){tdmg+=eedmg;}
	//언락 후 양수일 경우 데미지도 뜨도록
	e.nhp-=tdmg;
	$('#eHp').html(e.nhp+' / '+e.hp);
	if(e.nhp<=0){
		var output = 'Win! Kill '+e.name+'!';
		if(typeof e.exp != 'undefined'){output+=' Exp+'+e.exp;}
		if(typeof u.gold != 'undefined' && typeof e.gold != 'undefined'){output+=' Gold+'+e.gold;}
		if(e.honor >0){output+='honor+'+e.honor;}
		printMsg(output);
		
		userData.status.battle=0;
		if(typeof e.exp != 'undefined'){userData.stat.exp+=e.exp; $('#userExp').html(userData.stat.exp);}
		if(typeof e.gold != 'undefined'){userData.stat.gold+=e.gold; $('#userGold').html(userData.stat.gold);}
		if(typeof e.unlock != 'undefined' && typeof userData.hunt[e.unlock] == 'undefined'){
			userData.hunt[e.unlock]=1; printEnemyList(userData.status.thisPlace);
			printMsg('<span class="blue">'+enemyData[e.unlock].name+' 발견!</span>');
		}
		if(typeof e.unlockField != 'undefined' && typeof userData.field[e.unlockField] == 'undefined'){
			userData.field[e.unlockField]=1; unlockField(e.unlockField);
			printMsg('<span class="blue">'+field[e.unlockField].name+' 발견!</span>');
		}
		$('#userHP').html(userData.stat.hp);
		$('#battlePlace').html('');
		e={};
	}else{
		enemyTurn();
	}
};

var enemyTurn = function(){
	enemyAtk();
	
	if(u.nhp<=0){
		userData.status.battle=0;
		$('#userHP').html(userData.stat.hp);
		$('#battlePlace').html('');
		printMsg('<span class="red">Defeated by '+e.name+'</span>');
		e={};
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
var statRefresh = function(){
	var list = ['hp','mp','pa','pd','ma','md','efa','efd','eia','eid','eea','eed'];
	for(var i=0; i<list.length; i++){
		if(typeof userData.stat[list[i]] != 'undefined'){
			$('#user'+list[i].toLocaleUpperCase()).html(userData.stat[list[i]]);
		}
	}
	/*
	if(typeof userData.stat.hp != 'undefined'){$('#userHP').html(userData.stat.hp);}
	*/
	$('#userExp').html(userData.stat.exp);
	$('#userGold').html(userData.stat.gold);
	
	if(userData.unlock.statBtn>0){ statBtnRefresh(); }
};

var statBtnRefresh = function(){
	var list1 = ['hp','mp','pa','pd','ma','md']; var list2 = ['efa','efd','eia','eid','eea','eed'];
	for(var i=0; i<list1.length; i++){
		if(typeof userData.stat[list1[i]] != 'undefined'){
			$('#u'+list1[i].toLocaleUpperCase()+'Up').html('<span class="clickAble" title="needExp: 5" onmousedown="addStat(\''+list1[i]+'\')">+</span>');
		}
	}
	for(var i=0; i<list2.length; i++){
		if(typeof userData.stat[list2[i]] != 'undefined'){
			$('#u'+list2[i].toLocaleUpperCase()+'Up').html('<span class="clickAble" title="needExp: 10" onmousedown="addStat(\''+list2[i]+'\')">+</span>');
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
	if(arg=='hp' || arg=='ma'){
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
var addAutoMake = function(exp,gold){
	if(exp>0){userData.idle.exp+=exp; $('#genExp').html(userData.idle.exp+' Exp/s');}
	if(gold>0){userData.idle.gold+=gold; $('#genGold').html(userData.idle.gold+' Gold/s');}
}
var autoMake = function(){
	userData.stat.exp+=userData.idle.exp;
	userData.stat.gold+=userData.idle.gold;
	$('#userExp').html(userData.stat.exp);
	$('#userGold').html(userData.stat.gold);
}
/*
자동생산, 스킬, 장비
*/
