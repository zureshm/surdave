// JavaScript Document
$(window).load(function(){
	/*$('.bricks').draggable();
	$('.mar').draggable();*/
	
	/*sounds*/
	var bgm = $('.bgm')[0];//bg sound
	bgm.pause();
	var enemysound = $('.enemysound')[0];//bg sound
	enemysound.pause();
	var coinsound = $('.coinsound')[0];//bg sound
	coinsound.pause();
	var keysound = $('.keysound')[0];//bg sound
	keysound.pause();
	var completesound = $('.completesound')[0];//bg sound
	completesound.pause();
	
	var bgm2 = $('.bgm2')[0];//bg sound
	bgm2.pause();
	var venomsound = $('.venomsound')[0];//bg sound
	venomsound.pause();
	var transformsound = $('.transformsound')[0];//bg sound
	transformsound.pause();
	
	var bgm3 = $('.bgm3')[0];//bg sound
	bgm3.pause();
	var lazersound = $('.lazersound')[0];//bg sound
	lazersound.pause();
	var doorsound = $('.doorsound')[0];//bg sound
	doorsound.pause();
	var zombiesound = $('.zombiesound')[0];//bg sound
	zombiesound.pause();
	/*sounds ends*/
	
	
	var boyHeight=$('.mar').height();
	
	var mainOffsetTop	= parseInt($('.level1_strip').offset().top);
	var mainOffsetLeft	= parseInt($('.level1_strip').offset().left);
	var marioDie=0; //to cgheck mario is alive
	var marioCup=0; //to cgheck mario captured cup
	var marioDoor=0;//to cgheck mario reached door	
	var lifeCount=3;//total lives
	var scoreCount=0;
	var currentLevel=0;
	$('#life_div').html("Lives Remaining: "+lifeCount);
	$('#score_div').html('Score: '+scoreCount);
	
		function marioDieNow(){
			marioDie=1;
			$('.green').removeClass('green');
			
			
			TweenMax.to(boy,.5,{rotationZ:'180'})
			TweenMax.to(boy,2,{top:"700px"})			
			
			setTimeout(function(){
				nextLife();
			},2500)
					
		}
	
		function nextLife(){
			if(lifeCount>=1){
				if(currentLevel==3){
					TweenMax.to($('.level3_scroll_strip'),0,{left:0});	
				}
				boy.css({'left':'10px','top':+levelBoyTop+'px'});//restoring mario to original place
				lifeCount=lifeCount-1
				$('#life_div').html("Lives Remaining: "+lifeCount);
				//$('.tiles').show();					
				TweenMax.to(boy,0,{rotationZ:'0',rotationY:'0', opacity:0});
				TweenMax.to(boy,.5,{opacity:'1'});
				someToDefaults(); // a new life begins with necesssary defaults
				/*removeing effects from lvl2*/
				//boy.removeClass('zombie');
				/*adjusting for level 3 scroll*/
				
				
			}else{
				alert('game over');
				window.location.reload();	
			}
		}
	
		function someToDefaults(){// someToDefaults()=necessary defaults for a new life
			breakEd=0; 
			onFreeFall=0;
			boyTop;
			boyLeft;		
			readyToJump=1;
			onAir=0;			
			onBrick=0;					
			legWindth;
			legHeight;
			tilesWindth;
			tilesHeight;
			legX;
			legY;
			tilesX;
			tilesY;		
			soulX;
			soulLeft;
			directionKeyPressed=0;			
			marioDie=0;		
			
			
		}// someToDefaults() ends
		
		function newLevelDefaults(){
			marioCup=0;
			marioDoor=0;
		}
		
		
		/*-----------------------Level Variables-----------------------------------------*/
		var breakEd=0; //fall blocked by a tile //breakEd this prevents looping
		var onFreeFall=0;
		var boyTop;
		var boyLeft;
			
		var readyToJump=1;
		var onAir=0;		
		
		var onBrick=0;
		
				
	
		var legWindth;
		var legHeight;
		var tilesWindth;
		var tilesHeight;
		var legX;
		var legY;
		var tilesX;
		var tilesY;
		
		var soulX;
		var soulLeft;
		var directionKeyPressed=0;
		var coinTouched=0
		var marLeftAdj=0;
		var marTopAdj=0;
		
		var marioToRight=1; //used to set  lazer generation point
		var currentLevel=0;
		var level1Cleared=0;
		var level2Cleared=0;
		var level3Cleared=0;
		var startAdj1=0;
		var startAdj2=0;
		var startAdj3=0;
		
		var directionKeyFired=0; //only purpose is to avaoid detecting contionous keypress
		
		//ENTER TO START (13 keycode)
		$(document).bind('keydown', function(e) {
			if (e.keyCode == 13) {				
				if((level1Cleared==0)&&(startAdj1==0)){
					$('.start_game').click();
					return false;
				}
				if((level1Cleared==1)&&(startAdj2==0)){
					$('.start_game2').click();
					return false;
				}
				if((level2Cleared==1)&&(startAdj3==0)){
					$('.start_game3').click();
					return false;
				}
			}	
		})
		
		$('.start_game').click(function(){
			startAdj1=1;
			$('.start_screen').hide();
			someToDefaults();//no need for first level
			newLevelDefaults();//no need for first level
			startLevel1();
			
			bgm.play();
			bgm.volume=.3;
			bgm.currentTime = 0;
			
		})
		
		$('.start_game2').click(function(){
			startAdj2=1;
			$('.start_screen2').hide();
			$('.level2_strip').show()
			someToDefaults();//no need for first level
			newLevelDefaults();//no need for first level
			startLevel2();
			
			bgm2.play();
			bgm2.volume=.3;
			bgm2.currentTime = 0;
			
		})
		
		$('.start_game3').click(function(){
			var startAdj3=1;
			$('.start_screen3').hide();
			$('.level3_strip').show()
			someToDefaults();//no need for first level
			newLevelDefaults();//no need for first level
			startLevel3();
			
			bgm3.play();
			bgm3.volume=.3;
			bgm3.currentTime = 0;
			
		})
		
		
		
		
	/*@@@@@@@@@@@@@@@@@@@@@@@@@-------------------(LEVEL 1)-----------------------@@@@@@@@@@@@@@@@@@@@@@@@@*/
		
		function startLevel1(){			
			
				currentLevel=1;
				
				
				//jQ variables				
				boy=$('.mar');
				boyHeight=parseInt(boy.height());
				floorY=$('.floor_tile').offset().top;//using for falling time duration
				soul=$('.soul');
				
				//other jquery variables
				var_enemy=$('.enemy');
				var_enemy2=$('.enemy2');
				var_spike=$('.spike');
				var_spike2=$('.spike2')
				var_spike3=$('.spike3')
				var_spike4=$('.spike4')
				var_trophy=$('.trophy');
				var_door=$('.door');
				boy_leg=$('.mar_leg');
				var_floor_tile=$('.floor_tile');
				var_tile1=$('.tile1');
				var_tile2=$('.tile2');
				var_tile3=$('.tile3');
				var_tile4=$('.tile4');
				var_tile5=$('.tile5');
				var_tile6=$('.tile6');
				
				var_coin1=$('.coin1');
				var_coin2=$('.coin2');
				var_coin3=$('.coin3');
				var_coin4=$('.coin4');
				var_coin5=$('.coin5');
				var_coin6=$('.coin6');
				var_coin7=$('.coin7');
				var_coin8=$('.coin8');
				var_coin9=$('.coin9');
				var_coin10=$('.coin10');
				
				
				
				
				//other jquery varieables ends
				$('#instruction_div').html('GET THE CUP');
				
				function marioCupNow(){		
					marioCup=1;
					var_trophy.hide();
					
					$('#instruction_div').html('GO THROUGH THE DOOR');			
					//clearInterval(cupInterval)			
				}
				
				function marioDoorNow(){		
					marioDoor=1;			
					$('#instruction_div').html('Level 1 Completed');
					$('.console2').append("door reached");
					boy.stop().animate({'opacity':'0'},500)
					setTimeout(clearLevel1,1000)														
					$('.start_screen2').delay(1000).fadeIn(0);
					bgm.volume=.1;
					setTimeout(function(){
						bgm.pause();			
					},500)
					
				}
				
				function clearLevel1(){
					level1Cleared=1;					
					clearInterval(walkTimer);
					clearInterval(enemy_sprite_timer)
					$('.level1_strip').remove();
					cancelAnimationFrame(updateChecker1);
					cancelAnimationFrame(updateWalker1);
				}
				/*to start next level(^^^^^^^^^^^^^^^^^^^^^^need to be removd^^^^^^^^^^^^^^^^^^^e)*/
				//marioDoorNow()								
			 	//clearLevel1()
				/*need to be removed ends*/
				//colition with enemy
				function chkCollition(mar,enemy){ //all -15 transparent area adjustment
					var marWindth=mar.width()-15;
					var marHeight=mar.height()-15;
					var enemyWindth=enemy.width()-15;
					var enemyHeight=enemy.height()-15;
					var marX=mar.offset().left-15;
					var marY=mar.offset().top-15;
					var enemyX=enemy.offset().left-15;
					var enemyY=enemy.offset().top-15;		
					if(((marX+marWindth>=enemyX)&&(marX<enemyX+enemyWindth))&&((marY+marHeight>=enemyY)&&(marY<enemyY+enemyHeight))){				
						if(marioDie==0){
							marioDieNow();
							levelBoyTop=360; //after death reappearing position !IMPORTANT
							scoreCount=scoreCount-50;
							$('#score_div').html('Score: '+scoreCount);
							enemysound.play();
							enemysound.currentTime = 0;
						}
					}
				}
				//colition with enemy ends
				
				//colition with trophy
				function checkCup(mar,trophy){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var trophyWindth=trophy.width();
					var trophyHeight=trophy.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var trophyX=trophy.offset().left;
					var trophyY=trophy.offset().top;		
					if(((marX+marWindth>=trophyX)&&(marX<trophyX+trophyWindth))&&((marY+marHeight>=trophyY)&&(marY<trophyY+trophyHeight))){				
						if(marioCup==0){
							marioCupNow();
							scoreCount=scoreCount+500;
							$('#score_div').html('Score: '+scoreCount);
							keysound.play();
							keysound.currentTime = 0;
						}
					}
				}
				//colition with trophy ends
				
				//colition with Coins
				function checkCoin(mar,coin){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var coinWindth=coin.width();
					var coinHeight=coin.height();
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var coinX=coin.offset().left;
					var coinY=coin.offset().top;		
					if(((marX+marWindth>=coinX)&&(marX<coinX+coinWindth))&&((marY+marHeight>=coinY)&&(marY<coinY+coinHeight))){				
						
						if(coinTouched==0){
							coinTouched=1;
							TweenMax.to(coin,.5,{top:'-=150',opacity:0, onComplete:coinTouchReset});
							setTimeout(function(){coin.hide();},100)
							scoreCount=scoreCount+100;
							$('#score_div').html('Score: '+scoreCount);
							
							coinsound.play();
							coinsound.currentTime = 0;
						}
					}
				}
				function coinTouchReset(){					
					coinTouched=0
				}
				//colition with Coins ends
				
				//collition with door
				function checkDoor(mar,door){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var doorWindth=door.width();
					var doorHeight=door.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var doorX=door.offset().left;
					var doorY=door.offset().top;		
					if(((marX+marWindth>=doorX)&&(marX<doorX+doorWindth))&&((marY+marHeight>=doorY)&&(marY<doorY+doorHeight))){				
						if((marioDoor==0)&&(marioCup==1)){
							completesound.play();
							completesound.currentTime = 0;
							marioDoorNow();							
							scoreCount=scoreCount+500;
							$('#score_div').html('Score: '+scoreCount);
						}
					}
				}
				//colition with door ends
				
				//checking leg colition with tiles
				function chkLegCollition(leg,tiles){
					legWindth=leg.width();
					legHeight=leg.height();
					tilesWindth=tiles.width();
					tilesHeight=tiles.height();
					legX=leg.offset().left;
					legY=leg.offset().top;
					tilesX=tiles.offset().left;
					tilesY=tiles.offset().top;		
					if(((legX+legWindth>=tilesX)&&(legX<tilesX+tilesWindth))&&((legY+legHeight>=tilesY)&&(legY<tilesY+tilesHeight)&&(marioDie==0))){				
						tiles.addClass('green');
						
						/*to set boys top on upward moving tile*/
						boyTop=((parseInt(tilesY))-mainOffsetTop-(boyHeight-4))//32 is actual, but to adjust some timer errors :(				
						boy.css({top:boyTop+'px'});	
						/*to set boys top on upward moving tile ENDS*/
						boyLeft=parseInt(legX)-parseInt(tilesX)// !IMPORTANT for Boys  X on Tile determination
					}else{						
						tiles.removeClass('green');	
					}
					if(($('.green').length >0)&& (marioDie==0)){ //not on base floor tile						
						if(onBrick==0){
							$('.green').children(soul).css({left:boyLeft+'px'})// !IMPORTANT for Boys  X on Tile determination	
						}else{
							if(directionKeyPressed==0){
								soulLeft=parseInt($('.tiles.green .soul').offset().left);
								soulLeftL2=soulLeft-mainOffsetLeft-5;	//adj-5					
								boy.css({left:soulLeftL2+'px'});
							}else{
								$('.green').children(soul).css({left:boyLeft+'px'})
							}															
						}				
						onBrick=1;
						if(breakEd==0){//breakEd this prevents looping					
							brickFall();
						}
					}			
					else{				
						onBrick=0;
					}
					
				}//chkLegCollition() 				
				//leg colition with tiles ends
			
				//collition with enemy and all checking timer _____________________________________LATEST COLITION LEVEL1 useing requestAnimationFrame________________________
				(function level1Update(){
					
					var surMar_left_pos=boy.offset().left-mainOffsetLeft;
					var surMar_top_pos=boy.offset().top-mainOffsetTop;
					
					if(marioDie==0){
					
						if(surMar_left_pos<70){ //tile 1, coin1
							chkLegCollition(boy_leg,var_tile1);	
							checkCoin(boy,var_coin1);					
						}
						if((surMar_left_pos>=70)&&(surMar_left_pos<145)){//enemy 1
							chkCollition(boy,var_enemy);						
						}
						if((surMar_left_pos>=80)&&(surMar_left_pos<320)){//tile 2						
							if((surMar_top_pos>290)&&(surMar_top_pos<320)){
								chkLegCollition(boy_leg,var_tile2);
							}
						}
						if((surMar_left_pos>=260)&&(surMar_left_pos<390)){//tile 3						
							if((surMar_top_pos>240)&&(surMar_top_pos<270)){
								chkLegCollition(boy_leg,var_tile3);
							}
						}
						if((surMar_left_pos>=320)&&(surMar_left_pos<820)){//enemy 2
							if((surMar_top_pos>100)&&(surMar_top_pos<280)){
								chkCollition(boy,var_enemy2);
							}
						}
						if((surMar_left_pos>=450)&&(surMar_left_pos<570)){//tile 4
							chkLegCollition(boy_leg,var_tile4);						
						}
						if((surMar_left_pos>=180)&&(surMar_left_pos<400)){//tile 5 and CUP						
							if((surMar_top_pos>60)&&(surMar_top_pos<100)){
								chkLegCollition(boy_leg,var_tile5);
								checkCup(boy,var_trophy);
							}
						}
						if((surMar_left_pos>=550)&&(surMar_left_pos<670)){//tile 6						
							if((surMar_top_pos>75)&&(surMar_top_pos<95)){
								chkLegCollition(boy_leg,var_tile6);
							}
						}
						if((surMar_top_pos>=380)&&(surMar_top_pos<450)){//coin 2,3,4,5,6					
							if((surMar_left_pos>170)&&(surMar_left_pos<700)){
								checkCoin(boy,var_coin2);
								checkCoin(boy,var_coin3);
								checkCoin(boy,var_coin4);
								checkCoin(boy,var_coin5);
								checkCoin(boy,var_coin6);
							}
						}
						if((surMar_left_pos>=550)&&(surMar_left_pos<670)){//coin 7
							if((surMar_top_pos>240)&&(surMar_top_pos<270)){
								checkCoin(boy,var_coin7);
							}
						}
						if((surMar_left_pos>=350)&&(surMar_left_pos<650)){//coin 8,9,10						
							if((surMar_top_pos>25)&&(surMar_top_pos<100)){
								checkCoin(boy,var_coin8);
								checkCoin(boy,var_coin9);
								checkCoin(boy,var_coin10);
							}
						}
						if((surMar_top_pos>=380)&&(surMar_top_pos<450)){//spike1					
							if((surMar_left_pos>350)&&(surMar_left_pos<450)){
								chkCollition(boy,var_spike);
							}
						}
						if((surMar_top_pos>=380)&&(surMar_top_pos<450)){//spike2					
							if((surMar_left_pos>480)&&(surMar_left_pos<570)){
								chkCollition(boy,var_spike2);
							}
						}
						if((surMar_top_pos>=380)&&(surMar_top_pos<450)){//spike3					
							if((surMar_left_pos>600)&&(surMar_left_pos<690)){
								chkCollition(boy,var_spike3);
							}
						}
						if((surMar_top_pos>=380)&&(surMar_top_pos<450)){//spike4					
							if((surMar_left_pos>720)&&(surMar_left_pos<810)){
								chkCollition(boy,var_spike4);
							}
						}
						if((surMar_left_pos>=910)&&(surMar_left_pos<956)){//Door					
							if((surMar_top_pos>=380)&&(surMar_top_pos<450)){
								checkDoor(boy,var_door);
							}
						}
						
						chkLegCollition(boy_leg,var_floor_tile);//detecting leg vs tile colition timer
						/*floor_tile o leg time calucation*/
						floorLegDistance=floorY-(legY+5);//+5 = the height of leg
						/*floor_tile o leg time calucation ends*/				
						startFallFromBrick();
						/*latest september ends*/
					}
					updateChecker1=requestAnimationFrame(level1Update);
				})();
				//collition with enemy  and all checking timer ends_____________________________LATEST COLITION LEVEL1 ENDS_________________
				
				
				
				function jumpMar(){	//jumping the character
					if((onAir==0)&&(readyToJump==1)){
						TweenMax.to(boy, .6, {top:"-=100px",onComplete:endOfJump});
						onAir=1;
						readyToJump=0;
						onFreeFall=0;	
					}
				}
				
				function endOfJump(){//jump reached maximum height
					onFreeFall=1;
					if(onFreeFall==1){
					freeFall()	
					}
				}
				function endOfFall(){//fall ended touching floor or brick			
					onAir=0;
					readyToJump=1;				
				}
				function brickFall(){// falling on brick			
					breakEd=1;//breakEd this prevents looping
					if(readyToJump==0){			
						TweenMax.to(boy, 0, {top:'+=0'})
						onAir=0;
						readyToJump=1;						
					}
				}
				function freeFall(){ //normal free fall from air
					fallingDuration=floorLegDistance/150;
					if(marioDie==0){ //checking mario alive			
					TweenMax.to(boy, fallingDuration, {top:floorY,ease: Power0.easeNone,onComplete:endOfFall});
					}
					
					breakEd=0;
				}
				
				function startFallFromBrick(){//falling from the brick while moving left or right but not while jumping
					if((onBrick==0)&&(onAir==0)&&(breakEd==1)){
						readyToJump=0;
						freeFall()
					}
				}
				
				//---level 1 animations--/
				
				
				TweenMax.to($('.bricks4'),2,{top:'-=200px',ease: Power0.easeNone,yoyo:true,repeat:-1})
				TweenMax.to($('.bricks2'),2.5,{left:'-=100px',ease: Power0.easeNone,yoyo:true,repeat:-1})
				TweenMax.to($('.bricks5,.trophy'),3,{left:'-=100px',delay:.5,ease: Power0.easeNone,yoyo:true,repeat:-1})
				TweenMax.to($('.enemy'),2.5,{top:'-=350px',ease: Power0.easeNone,yoyo:true,repeat:-1})
				
				function enemy2Fwd(){
					TweenMax.to($('.enemy2'),0,{rotationY:0})
					TweenMax.to($('.enemy2'),3,{left:'-=345px',ease: Power0.easeNone,onComplete:enemy2Bwd})
				}
				function enemy2Bwd(){
					TweenMax.to($('.enemy2'),0,{rotationY:180})
					TweenMax.to($('.enemy2'),3,{left:'+=345px',ease: Power0.easeNone,onComplete:enemy2Fwd})
				}
				enemy2Fwd();
				TweenMax.staggerTo([$('.spike'),$('.spike2'),$('.spike3'),$('.spike4')],.8,{top:'-=55px',ease: Power0.easeNone,yoyo:true,repeat:-1,repeatDelay:.8},.8)
				TweenMax.to($('.coin'),3,{rotationY:360,ease: Power0.easeNone,yoyo:true,repeat:-1})
				
				
				/*------------------------------------------------------------keypress events-----------------------------------------------*/
				$(document).bind('keydown', function(e) {
					if(currentLevel==1){
						left = 37,
						up = 38,
						right = 39,
						down = 40;
						if(directionKeyFired==0){//to chk keypress repeat	
							if (e.keyCode == left) {				
								left_on=1;
								directionKeyPressed=1;
								directionKeyFired=1;
							}			
							if (e.keyCode == right) {				
								right_on=1;
								directionKeyPressed=1;
								directionKeyFired=1;
							}
						}
						if (e.keyCode == up) {				
							 jumpMar()
						}
						if (e.keyCode == down) {				
							// dropMar()
						}	
					}
				});
				/*-----------------------KEydowns-------------------*/
				var left_on,right_on,up_on,down_on;		
				$(document).bind('keyup', function(e) {
						left = 37,
						up = 38,
						right = 39,
						down = 40;				
					if (e.keyCode == left) {				
						left_on=0;
						directionKeyPressed=0;
						directionKeyFired=0;
					}			
					if (e.keyCode == right) {				
						right_on=0;
						directionKeyPressed=0;
						directionKeyFired=0;
					}						
				});
				
				
				
				(function level1Walk(){
					marLeftAdj=parseInt(boy.css('left'));
					if(marioDie==0){
						if ((left_on == 1)&&(marLeftAdj>=5)) {				
							//boy.css("left", "-=2");
							TweenMax.to(boy,0,{rotationY:'180',left:'-=2'})				
						}
						if ((right_on == 1)&&(marLeftAdj<955)){
							//boy.css("left", "+=2");
							TweenMax.to(boy,0,{rotationY:'0',left:'+=2'})
						}
					}
					updateWalker1=requestAnimationFrame(level1Walk);
				})();
				
				var walking_position=0;
				var jumping_position=0;
				
				walkTimer=setInterval(function(){
					if(((left_on==1)||(right_on==1))&&(onAir==0)&&(breakEd==1)){
						if(walking_position>-440){
						walking_position=walking_position-80;
						}else{
							walking_position=-80
						}
						boy.css({"background-position":walking_position+"px -5px"});
						
						
					}else if(((left_on==1)||(right_on==1))&&(onBrick==0)&&(breakEd==1)){
						if(walking_position>-300){
						walking_position=walking_position-80;
						}else{
							walking_position=-80
						}
						boy.css({"background-position":walking_position+"px "+-140+"px"});
						
					}else if((onBrick==0)&&(breakEd==0)){
						boy.css({"background-position":-640+"px -5px"});
					}else{
						boy.css({"background-position":0+"px -5px"});
					}
					
				},120);
				
				var enemyFrame=0;
				enemy_sprite_timer=setInterval(function(){
					//if(enemyFrame==0){
					$('.enemy , .enemy2').css({"background-position":enemyFrame+"px -5px"});
					enemyFrame=enemyFrame-60;
					if(enemyFrame<-240){
						enemyFrame=0
					}
				},120)
		
		}//startLevel1() ends
		/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------------LEVEL1 ENDS-----------------------------------------*/
		

	/*@@@@@@@@@@@@@@@@@@@@@@@@@-----------------------------------------------------------(LEVEL2)-----------------------@@@@@@@@@@@@@@@@@@@@@@@@@*/
		
		function startLevel2(){			
				
				currentLevel=2;
			
				//jQ variables				
				boy=$('.mar_B');
				boyHeight=parseInt(boy.height());
				floorY=$('.floor_tile_B').offset().top;//using for falling time duration
				soul=$('.soul_B');
				
				//other jquery variables
				//var_enemy=$('.enemy_B');
				var_enemy2=$('.enemy2_B');
				var_venom=$('.venom_B');
				var_potion_green=$('.potion_green_B')
				
				var_enemy3=$('.enemy3_B');
				var_enemy4=$('.enemy4_B');
				var_spike=$('.spike_B');
				var_spike2=$('.spike2_B')
				//var_spike3=$('.spike3_B')
				//var_spike4=$('.spike4_B')
				var_trophy=$('.trophy_B');
				var_door=$('.door_B');
				boy_leg=$('.mar_leg_B');
				var_floor_tile=$('.floor_tile_B');
				var_tile1=$('.tile1_B');
				var_tile2=$('.tile2_B');
				var_tile3=$('.tile3_B');
				var_tile4=$('.tile4_B');
				var_tile5=$('.tile5_B');
				var_tile6=$('.tile6_B');
				var_tile7=$('.tile7_B');
				var_tile8=$('.tile8_B');
				var_tile_Obst=$('.obst_B');//tile over obstacle
				
				var_coin1=$('.coin1_B');
				var_coin2=$('.coin2_B');
				var_coin3=$('.coin3_B');
				var_coin4=$('.coin4_B');
				var_coin5=$('.coin5_B');
				var_coin6=$('.coin6_B');
				var_coin7=$('.coin7_B');
				var_coin8=$('.coin8_B');
				var_coin9=$('.coin9_B');
				var_coin10=$('.coin10_B');
				
				var_obstacle=$('.obstacle_B');
				
				//other jquery varieables ends
				
				//boy.css({'left':'10px','top':'360px','opacity':'1'});//restoring mario to original place (because its new level)
				$('#instruction_div').html('GET THE CUP');
				
				function marioCupNow(){
					marioCup=1;
					var_trophy.hide();
					$('.door_B').css('zIndex','10')					
					$('#instruction_div').html('GO THROUGH THE DOOR');			
					//clearInterval(cupInterval)		
				}
				
				function marioDoorNow(){		
					marioDoor=1;			
					$('#instruction_div').html('Level 2 Completed');										
					$('.console2').append("door reached");			
					setTimeout(clearLevel2,500)														
					$('.start_screen3').delay(500).fadeIn();
					
					bgm2.volume=.1;
					setTimeout(function(){
						bgm2.pause();			
					},500)
					//$('#finalScore').html(scoreCount); //final score because its last level
				}
				
				
				function clearLevel2(){
					level2Cleared=1;
					clearInterval(walkTimer);
					clearInterval(enemy_sprite_timer)
					//clearInterval(venomInterval)
					$('.level2_strip').remove();
					cancelAnimationFrame(updateChecker2);
					cancelAnimationFrame(updateWalker2);
				}
				
				/*to start next level(^^^^^^^^^^^^^^^^^^^^^^need to be removd^^^^^^^^^^^^^^^^^^^e)*/
				//marioDoorNow()								
			 	//clearLevel2()
				/*need to be removed ends*/
			
				//colition with enemy
				function chkCollition(mar,enemy){ //all -15 transparent area adjustment
					var marWindth=mar.width()-15;
					var marHeight=mar.height()-15;
					var enemyWindth=enemy.width()-15;
					var enemyHeight=enemy.height()-15;
					var marX=mar.offset().left-15;
					var marY=mar.offset().top-15;
					var enemyX=enemy.offset().left-15;
					var enemyY=enemy.offset().top-15;		
					if(((marX+marWindth>=enemyX)&&(marX<enemyX+enemyWindth))&&((marY+marHeight>=enemyY)&&(marY<enemyY+enemyHeight))){
						
						var enimHeight=parseInt(enemy.height());// enemie's min height required. used to addjust spikes over bricks				
						if((marioDie==0)&&(enimHeight>=10)){
							marioDieNow()
							levelBoyTop=440; //after death reappearing position !IMPORTANT
							scoreCount=scoreCount-50;
							$('#score_div').html('Score: '+scoreCount);
							enemysound.play();
							enemysound.currentTime = 0;
						}
					}
				}
				//colition with enemy ends
				
				//colition with Coins
				function checkCoin(mar,coin){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var coinWindth=coin.width();
					var coinHeight=coin.height();
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var coinX=coin.offset().left;
					var coinY=coin.offset().top;		
					if(((marX+marWindth>=coinX)&&(marX<coinX+coinWindth))&&((marY+marHeight>=coinY)&&(marY<coinY+coinHeight))){				
						
						if(coinTouched==0){
							coinTouched=1;
							TweenMax.to(coin,.5,{top:'-=150',opacity:0, onComplete:coinTouchReset});
							setTimeout(function(){coin.hide();},100)
							scoreCount=scoreCount+100;
							$('#score_div').html('Score: '+scoreCount);
							
							coinsound.play();
							coinsound.currentTime = 0;
						}
					}
				}
				function coinTouchReset(){					
					coinTouched=0
				}
				//colition with Coins ends
				
				//colition with trophy
				function checkCup(mar,trophy){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var trophyWindth=trophy.width();
					var trophyHeight=trophy.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var trophyX=trophy.offset().left;
					var trophyY=trophy.offset().top;		
					if(((marX+marWindth>=trophyX)&&(marX<trophyX+trophyWindth))&&((marY+marHeight>=trophyY)&&(marY<trophyY+trophyHeight))){				
						if(marioCup==0){
							marioCupNow();
							scoreCount=scoreCount+500;
							$('#score_div').html('Score: '+scoreCount);
							keysound.play();
							keysound.currentTime = 0;
						}
					}
				}
				//colition with trophy ends
				//collition with door
				function checkDoor(mar,door){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var doorWindth=door.width();
					var doorHeight=door.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var doorX=door.offset().left;
					var doorY=door.offset().top;		
					if(((marX+marWindth>=doorX)&&(marX<doorX+doorWindth))&&((marY+marHeight>=doorY)&&(marY<doorY+doorHeight))){				
						if((marioDoor==0)&&(marioCup==1)){
							completesound.play();
							completesound.currentTime = 0;
							marioDoorNow();							
							scoreCount=scoreCount+500;
							$('#score_div').html('Score: '+scoreCount);
						}
					}
				}
				//colition with door ends
				
				//colition with Venom
				function checkVenom(mar,venom){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var venomWindth=venom.width();
					var venomHeight=venom.height();
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var venomX=venom.offset().left;
					var venomY=venom.offset().top;		
					if(((marX+marWindth>=venomX)&&(marX<venomX+venomWindth))&&((marY+marHeight>=venomY)&&(marY<venomY+venomHeight))){
							venomTouched=1;
							if (boy.hasClass('zombie')){
								boy.removeClass('zombie');
								venom.hide();
								
								transformsound.play();
								transformsound.currentTime = 0;
							}else{
								boy.addClass('zombie')
								venom.hide();
								
								transformsound.play();
								transformsound.currentTime = 0;	
							}
					}
				}
				//colition with Venom ends
				//checking leg colition with tiles
				function chkLegCollition(leg,tiles){
					legWindth=leg.width();
					legHeight=leg.height();
					tilesWindth=tiles.width();
					tilesHeight=tiles.height();
					legX=leg.offset().left;
					legY=leg.offset().top;
					tilesX=tiles.offset().left;
					tilesY=tiles.offset().top;		
					if(((legX+legWindth>=tilesX)&&(legX<tilesX+tilesWindth))&&((legY+legHeight>=tilesY)&&(legY<tilesY+tilesHeight)&&(marioDie==0))){				
						tiles.addClass('green');
						
						/*to set boys top on upward moving tile*/
						boyTop=((parseInt(tilesY))-mainOffsetTop-(boyHeight-4))//32 is actual, but to adjust some timer errors :(				
						boy.css({top:boyTop+'px'});	
						/*to set boys top on upward moving tile ENDS*/
						boyLeft=parseInt(legX)-parseInt(tilesX)// !IMPORTANT for Boys  X on Tile determination
					}else{						
						tiles.removeClass('green');	
					}
					if(($('.green').length >0)&& (marioDie==0)){ //not on base floor tile
						if(onBrick==0){
						$('.green').children(soul).css({left:boyLeft+'px'})// !IMPORTANT for Boys  X on Tile determination	
						}else{
							if(directionKeyPressed==0){
								soulLeft=parseInt($('.tiles_B.green .soul_B').offset().left);
								soulLeftL2=soulLeft-mainOffsetLeft-5;	//adj-5					
								boy.css({left:soulLeftL2+'px'});
							}else{
								$('.green').children(soul).css({left:boyLeft+'px'})
							}															
						}				
						onBrick=1;
						if(breakEd==0){//breakEd this prevents looping					
							brickFall();
						}
					}			
					else{				
						onBrick=0;
					}
					
				}//chkLegCollition() ends
				//collition with obstacle
				function checkObstacle(mar,obstacle){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var obstacleWindth=obstacle.width();
					var obstacleHeight=obstacle.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var obstacleX=obstacle.offset().left;
					var obstacleY=obstacle.offset().top;		
					if(((marX+marWindth>=obstacleX)&&(marX<obstacleX+obstacleWindth))&&((marY+marHeight>=obstacleY)&&(marY<obstacleY+obstacleHeight))){				
						
						if(marX+marWindth<=obstacleX+10){
							//var_obstacle.html('left');
							boy.css('left','-=5px')
							
						}else if(marX-10<=obstacleX+obstacleWindth){
							boy.css('left','+=5px')
							
						}
						
					}
				}
				//colition with obstacle ends
			
				//collition with enemy checking timer
				(function level2Update(){
					
					var surMar_left_pos=boy.offset().left-mainOffsetLeft;
					var surMar_top_pos=boy.offset().top-mainOffsetTop;
					
					if(marioDie==0){
						if(surMar_left_pos<80){ //tile 6, coin1, trophy
							chkLegCollition(boy_leg,var_tile6);	
							checkCoin(boy,var_coin1);
							checkCup(boy,var_trophy);					
						}					
						if((surMar_left_pos>=40)&&(surMar_left_pos<170)){//obstacle (box)						
							if((surMar_top_pos>320)&&(surMar_top_pos<440)){
								chkLegCollition(boy_leg,var_tile_Obst);	
								checkObstacle(boy,var_obstacle);
							}					
						}
						if((surMar_left_pos>=180)&&(surMar_left_pos<300)){//tile 2						
							if((surMar_top_pos>270)&&(surMar_top_pos<310)){
								chkLegCollition(boy_leg,var_tile2);
							}					
						}
						if((surMar_left_pos>=280)&&(surMar_left_pos<410)){//tile 3 and spike2						
							if((surMar_top_pos>180)&&(surMar_top_pos<250)){
								chkLegCollition(boy_leg,var_tile3);
								chkCollition(boy,var_spike2);
							}					
						}
						if((surMar_left_pos>=40)&&(surMar_left_pos<690)){//moving bricks  tile 4 & 5						
							if((surMar_top_pos>90)&&(surMar_top_pos<190)){
								chkLegCollition(boy_leg,var_tile4);
								chkLegCollition(boy_leg,var_tile5);
							}					
						}
						if((surMar_left_pos>=690)&&(surMar_left_pos<840)){// tile 1 & 8 & 7	 and potion					
							if((surMar_top_pos>300)&&(surMar_top_pos<380)){
								chkLegCollition(boy_leg,var_tile1);
								chkCollition(boy,var_spike);
							}
							if((surMar_top_pos>200)&&(surMar_top_pos<290)){							
								chkLegCollition(boy_leg,var_tile8);
							}
							if((surMar_top_pos>170)&&(surMar_top_pos<210)){											
								chkLegCollition(boy_leg,var_tile7);
								if((surMar_top_pos>190)&&(surMar_top_pos<210)){	
									checkVenom(boy,var_potion_green);								
								}
							}					
						}
						if((surMar_left_pos>=10)&&(surMar_left_pos<1000)){//venom of spider and spider
							if((surMar_top_pos>=380)&&(surMar_top_pos<450)){							
								checkVenom(boy,var_venom);
								chkCollition(boy,var_enemy2);
							}
						}
						if((surMar_left_pos>=180)&&(surMar_left_pos<630)){//doublespkike enemies
							if((surMar_top_pos>=40)&&(surMar_top_pos<180)){							
								chkCollition(boy,var_enemy3);
								chkCollition(boy,var_enemy4);
							}
						}
						if((surMar_top_pos>=380)&&(surMar_top_pos<450)){//coin 2,3,4,5,6					
							if((surMar_left_pos>170)&&(surMar_left_pos<700)){
								checkCoin(boy,var_coin2);
								checkCoin(boy,var_coin3);
								checkCoin(boy,var_coin4);
								checkCoin(boy,var_coin5);
								checkCoin(boy,var_coin6);
							}
						}
						if((surMar_left_pos>=550)&&(surMar_left_pos<670)){//coin 7
							if((surMar_top_pos>240)&&(surMar_top_pos<270)){
								checkCoin(boy,var_coin7);
							}
						}
						if((surMar_left_pos>=350)&&(surMar_left_pos<650)){//coin 8,9,10						
							if((surMar_top_pos>25)&&(surMar_top_pos<100)){
								checkCoin(boy,var_coin8);
								checkCoin(boy,var_coin9);
								checkCoin(boy,var_coin10);
							}
						}
						if((surMar_left_pos>=910)&&(surMar_left_pos<956)){//Door					
							if((surMar_top_pos>=380)&&(surMar_top_pos<450)){
								checkDoor(boy,var_door);
							}
						}
						chkLegCollition(boy_leg,var_floor_tile);
						/*floor_tile o leg time calucation*/
						floorLegDistance=floorY-(legY+5);//+5 = the height of leg
						/*floor_tile o leg time calucation ends*/				
						startFallFromBrick();
					}
					
					updateChecker2=requestAnimationFrame(level2Update);
				})()
				//collition with enemy checking timer ends
								
				
				function jumpMar(){	//jumping the character
					if((onAir==0)&&(readyToJump==1)){
						TweenMax.to(boy, .6, {top:"-=100px",onComplete:endOfJump});
						onAir=1;
						readyToJump=0;
						onFreeFall=0;	
					}
				}
				
				function endOfJump(){//jump reached maximum height
					onFreeFall=1;
					if(onFreeFall==1){
					freeFall()	
					}
				}
				function endOfFall(){//fall ended touching floor or brick			
					onAir=0;
					readyToJump=1;				
				}
				function brickFall(){// falling on brick			
					breakEd=1;//breakEd this prevents looping
					if(readyToJump==0){			
						TweenMax.to(boy, 0, {top:'+=0'})
						onAir=0;
						readyToJump=1;						
					}
				}
				function freeFall(){ //normal free fall from air
					fallingDuration=floorLegDistance/150;
					if(marioDie==0){ //checking mario alive			
					TweenMax.to(boy, fallingDuration, {top:floorY,ease: Power0.easeNone,onComplete:endOfFall});
					}
					
					breakEd=0;
				}
				
				function startFallFromBrick(){//falling from the brick while moving left or right but not while jumping
					if((onBrick==0)&&(onAir==0)&&(breakEd==1)){
						readyToJump=0;
						freeFall()
					}
				}
				
				//---level 2 animations--/
				
				
				/*spider ani*/
				
				//Determining initial spider venom_position
				function venom_generate(){
					var_venom.show();
					venomLeft=parseInt(var_enemy2.css('left'))+30
					venomTop=parseInt(var_enemy2.css('top'))+35;
					var_venom.css({'left':venomLeft+'px','top':venomTop+'px',width:0})
					
					venomsound.play();
					venomsound.currentTime = 0;
				}				
				//Determining initial venom_position
				marLeftAdj=0;
				function spiderFwd(){
					if(currentLevel==2){					
						TweenMax.to($('.enemy2_B'),0,{rotationY:00})
						TweenMax.to($('.enemy2_B'),3.5,{left:'-=680px',ease: Power0.easeNone,onComplete:spiderBwd})	
						if(marLeftAdj>=150){
							setTimeout(function(){
								venom_generate();
								TweenMax.to(var_venom,.3,{width:'54px',ease: Power0.easeNone})
								TweenMax.to(var_venom,1.5,{left:'-=900px',ease: Power0.easeNone})	
							},500)
						}
					}
				}
				function spiderBwd(){
					if(currentLevel==2){										
						TweenMax.to($('.enemy2_B'),0,{rotationY:180})
						TweenMax.to($('.enemy2_B'),3.5,{left:'+=680px',ease: Power0.easeNone,onComplete:spiderFwd})
						if(marLeftAdj>=300){
							venom_generate();
							TweenMax.to(var_venom,.3,{width:'54px',ease: Power0.easeNone})
							TweenMax.to(var_venom,1.5,{left:'+=900px',ease: Power0.easeNone, onComplete:function(){
								if(marLeftAdj>=500){
									venom_generate();
									TweenMax.to(var_venom,.3,{width:'54px',ease: Power0.easeNone})
									TweenMax.to(var_venom,1.5,{left:'+=900px',ease: Power0.easeNone})
								}
							}})
						}
					}
				}
				setTimeout(spiderFwd,100)//first spidermovement
				
				
				
				TweenMax.to($('.spike_B'),.5,{top:'+=30px', height:0,ease: Power0.easeNone,yoyo:true,repeat:-1, repeatDelay:2})
				TweenMax.to($('.spike2_B'),.5,{top:'+=30px', height:0,ease: Power0.easeNone,yoyo:true,repeat:-1, repeatDelay:2})
				TweenMax.staggerTo([$('.enemy3_B'),$('.enemy4_B')],2,{top:'+=150px',ease: Power0.easeNone,yoyo:true,repeat:-1,repeatDelay:0},2)
				TweenMax.to($('.bricks4_B,.bricks5_B'),6,{left:'-=300px',ease: Power0.easeNone,yoyo:true,repeat:-1})
				TweenMax.to($('.coin_B'),3,{rotationY:360,ease: Power0.easeNone,yoyo:true,repeat:-1})
				//TweenMax.to($('.bricks6'),3,{bezier:[{left:540, top:460}, {left:840, top:360}, {left:840, top:160}],ease: Power0.easeNone,yoyo:true,repeat:-1})
				
				
				/*------------------------------------------------------------keypress events-----------------------------------------------*/
				$(document).bind('keydown', function(e) {
					if(currentLevel==2){
						left = 37,
						up = 38,
						right = 39,
						down = 40;
						if(directionKeyFired==0){//to chk keypress repeat
							if (e.keyCode == left) {				
								left_on=1;
								directionKeyPressed=1;
								directionKeyFired=1;
							}			
							if (e.keyCode == right) {				
								right_on=1;
								directionKeyPressed=1;
								directionKeyFired=1;
							}
						}
						if (e.keyCode == up) {				
							 jumpMar()
						}
						if (e.keyCode == down) {				
							// dropMar()
						}
					}
				});
				/*-----------------------KEydowns-------------------*/
				var left_on,right_on,up_on,down_on;		
				$(document).bind('keyup', function(e) {
						left = 37,
						up = 38,
						right = 39,
						down = 40;				
					if (e.keyCode == left) {				
						left_on=0;
						directionKeyPressed=0;
						directionKeyFired=0;
					}			
					if (e.keyCode == right) {				
						right_on=0;
						directionKeyPressed=0;
						directionKeyFired=0;
					}						
				});
				
				
				
				(function level2Walk(){
					marLeftAdj=parseInt(boy.css('left'));
					if(marioDie==0){
						if(!boy.hasClass('zombie')){
							if ((left_on == 1)&&(marLeftAdj>=5)) {
								TweenMax.to(boy,0,{rotationY:'180',left:'-=2'})
							}
							if ((right_on == 1)&&(marLeftAdj<955)){						
									TweenMax.to(boy,0,{rotationY:'0',left:'+=2'})
							}
						}else{//when boy  became zombie(out of controll)
							if ((left_on == 1)&&(marLeftAdj<955)) {
								TweenMax.to(boy,0,{rotationY:'0',left:'+=2'})
							}
							if ((right_on == 1)&&(marLeftAdj>=5)){						
									TweenMax.to(boy,0,{rotationY:'180',left:'-=2'})
							}
						}
					}
					updateWalker2=requestAnimationFrame(level2Walk);
				})();
				
				var walking_position=0;
				var jumping_position=0;
				
				walkTimer=setInterval(function(){
					if(((left_on==1)||(right_on==1))&&(onAir==0)&&(breakEd==1)){
						if(walking_position>-440){
						walking_position=walking_position-80;
						}else{
							walking_position=-80
						}
						boy.css({"background-position":walking_position+"px -5px"});
						
						
					}else if(((left_on==1)||(right_on==1))&&(onBrick==0)&&(breakEd==1)){
						if(walking_position>-300){
						walking_position=walking_position-80;
						}else{
							walking_position=-80
						}
						boy.css({"background-position":walking_position+"px "+-140+"px"});
						
					}else if((onBrick==0)&&(breakEd==0)){
						boy.css({"background-position":-640+"px -5px"});
					}else{
						boy.css({"background-position":0+"px -5px"});
					}
					
				},120)
				
				var enemyFrameX=0;
				var enemyFrameY=0;
				enemy_sprite_timer=setInterval(function(){
					//if(enemyFrame==0){
					$('.enemy2_B').css({"background-position":enemyFrameX+"px "+enemyFrameY+"px"});
					enemyFrameX=enemyFrameX-70;
					if(enemyFrameX<-910){
							enemyFrameX=0;
							enemyFrameY=-94;
							
					}else if((enemyFrameX<-910)&&(enemyFrameY<-94)){
						enemyFrameX=0;
							enemyFrameY=0;
					}
					
				},30)
		
		}//startLevel2() ends
		/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------------LEVEL2 ENDS-----------------------------------------*/		
		
		/*@@@@@@@@@@@@@@@@@@@@@@@@@-------------------(LEVEL3)-----------------------@@@@@@@@@@@@@@@@@@@@@@@@@*/
		
		function startLevel3(){			
				
				
				currentLevel=3;
				var enemyDie=0;
				//jQ variables				
				boy=$('.mar_C');
				boyHeight=parseInt(boy.height());
				floorY=$('.floor_tile_C').offset().top;//using for falling time duration
				soul=$('.soul_C');
				level_strip3=$('.level3_scroll_strip');
				level_mask3=$('.land_mask_C')
				
				//other jquery variables
				 
				 var_lotusball=$('.lotus_ball')
				 var_enemy1=$('.enemy2_C')
				 var_enemy2=$('.enemy3_C')
				 var_enemy3=$('.enemy4_C')
				 var_enemy4=$('.enemy5_C')
				 
				 var_potion_red=$('.potion_red_C')
				 var_lazer=$('.lazer_C')
				 
				 
				var_trophy=$('.trophy_C');
				var_door=$('.door_C');
				boy_leg=$('.mar_leg_C');
				var_floor_tile=$('.floor_tile_C');
				var_tile1=$('.tile1_C');
				var_tile2=$('.tile2_C');
				var_tile3=$('.tile3_C');
				var_tile4=$('.tile4_C');
				var_tile5=$('.tile5_C');
				var_tile6=$('.tile6_C');
				var_tile7=$('.tile7_C');
				var_tile8=$('.tile8_C');
				
				var_coin1=$('.coin1_C');
				var_coin2=$('.coin2_C');
				var_coin3=$('.coin3_C');
				var_coin4=$('.coin4_C');
				var_coin5=$('.coin5_C');
				var_coin6=$('.coin6_C');
				var_coin7=$('.coin7_C');
				var_coin8=$('.coin8_C');
				var_coin9=$('.coin9_C');
				var_coin10=$('.coin10_C');

				
				var_tile_Obst=$('.obst_C');//tile over obstacle
				var_obstacle=$('.obstacle_C');
				var_obstacle2=$('.obstacle2_C');
				
				
				
				//other jquery varieables ends
				
				//boy.css({'left':'10px','top':'360px','opacity':'1'});//restoring mario to original place (because its new level)
				$('#instruction_div').html('GET THE CUP');
				
				function marioCupNow(){
					marioCup=1;
					var_trophy.hide();
					$('.door_C').css('zIndex','10')
					
					$('#instruction_div').html('GO THROUGH THE DOOR');			
					//clearInterval(cupInterval)		
				}
				
				function marioDoorNow(){		
					marioDoor=1;			
					$('#instruction_div').html('Level 3 Completed');										
					$('.console2').append("door reached");			
					setTimeout(clearLevel3,500)														
					$('.start_screen4').delay(500).fadeIn();
					$('#finalScore').html(scoreCount); //final score because its last level
					
					bgm3.volume=.1;
					setTimeout(function(){
						bgm3.pause();			
					},500)
					
				}
				
				
				function clearLevel3(){
					level3Cleared=1;
					//clearInterval(deathInterval);	
					//clearInterval(cupInterval);
					//clearInterval(doorInterval);
					//clearInterval(tileFootInterval);
					//clearInterval(keytimer);
					clearInterval(walkTimer);
					//clearInterval(obstacleInterval)
					//clearInterval(coinInterval)
					clearInterval(enemy_sprite_timer)
					/*clearInterval(venomInterval)*/
					$('.level3_strip').remove();
					cancelAnimationFrame(updateChecker3);
					cancelAnimationFrame(updateWalker3);
				}
			
					
				//colition with enemy
				function chkCollition(mar,enemy){ //all -15 transparent area adjustment
					var marWindth=mar.width()-15;
					var marHeight=mar.height()-15;
					var enemyWindth=enemy.width()-15;
					var enemyHeight=enemy.height()-15;
					var marX=mar.offset().left-15;
					var marY=mar.offset().top-15;
					var enemyX=enemy.offset().left-15;
					var enemyY=enemy.offset().top-15;		
					if(((marX+marWindth>=enemyX)&&(marX<enemyX+enemyWindth))&&((marY+marHeight>=enemyY)&&(marY<enemyY+enemyHeight))){
						
						var enimHeight=parseInt(enemy.height());// enemie's min height required. used to addjust spikes over bricks				
						if((marioDie==0)&&(enimHeight>=10)){
							marioDieNow()
							levelBoyTop=440; //after death reappearing position !IMPORTANT
							scoreCount=scoreCount-50;
							$('#score_div').html('Score: '+scoreCount);
							enemysound.play();
							enemysound.currentTime = 0;
						}
					}
				}
				//colition with enemy ends	
				
				//colition with Coins
				function checkCoin(mar,coin){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var coinWindth=coin.width();
					var coinHeight=coin.height();
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var coinX=coin.offset().left;
					var coinY=coin.offset().top;		
					if(((marX+marWindth>=coinX)&&(marX<coinX+coinWindth))&&((marY+marHeight>=coinY)&&(marY<coinY+coinHeight))){				
						
						if(coinTouched==0){
							coinTouched=1;
							TweenMax.to(coin,.5,{top:'-=150',opacity:0, onComplete:coinTouchReset});
							setTimeout(function(){coin.hide();},100)
							scoreCount=scoreCount+100;
							$('#score_div').html('Score: '+scoreCount);
							
							coinsound.play();
							coinsound.currentTime = 0;
						}
					}
				}
				function coinTouchReset(){					
					coinTouched=0
				}
				//colition with Coins ends
							
				//colition with trophy
				function checkCup(mar,trophy){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var trophyWindth=trophy.width();
					var trophyHeight=trophy.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var trophyX=trophy.offset().left;
					var trophyY=trophy.offset().top;		
					if(((marX+marWindth>=trophyX)&&(marX<trophyX+trophyWindth))&&((marY+marHeight>=trophyY)&&(marY<trophyY+trophyHeight))){				
						if(marioCup==0){			
							marioCupNow();
							scoreCount=scoreCount+500;
							$('#score_div').html('Score: '+scoreCount);
							TweenMax.to(var_obstacle2,.05,{left:'-=5',delay:1,yoyo:true,repeat:60})
							TweenMax.to(var_obstacle2,3,{top:'-=10',delay:1})
							TweenMax.to(var_obstacle2,2,{top:'-=300',delay:4})
							
							keysound.play();
							keysound.currentTime = 0;
							setTimeout(function(){
								doorsound.play();
								doorsound.currentTime = 0;
							},1000)
							
						}
					}
				}
				//colition with trophy ends
				//colition with Potion
				function checkPotion(mar,potion){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var potionWindth=potion.width();
					var potionHeight=potion.height();
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var potionX=potion.offset().left;
					var potionY=potion.offset().top;		
					if(((marX+marWindth>=potionX)&&(marX<potionX+potionWindth))&&((marY+marHeight>=potionY)&&(marY<potionY+potionHeight))){				
						
							potionTouched=1;
							boy.addClass('cyclopse');
							potion.hide();
							scoreCount=scoreCount+200;
							$('#score_div').html('Score: '+scoreCount);
							transformsound.play();
							transformsound.currentTime = 0;	
					}
				}
				//colition with potion ends
				//colition with lazer vs enemy
				function chkEnemyLazer(lazer,enemy){ //all -15 transparent area adjustment
					var lazerWindth=var_lazer.width()-15;
					var lazerHeight=var_lazer.height()-15;
					var enemyWindth=enemy.width()-15;
					var enemyHeight=enemy.height()-15;
					var lazerX=var_lazer.offset().left-15;
					var lazerY=var_lazer.offset().top-15;
					var enemyX=enemy.offset().left-15;
					var enemyY=enemy.offset().top-15;		
					if(((lazerX+lazerWindth>=enemyX)&&(lazerX<enemyX+enemyWindth))&&((lazerY+lazerHeight>=enemyY)&&(lazerY<enemyY+enemyHeight))){
						
						var lazerWidth=parseInt(var_lazer.width());// lazers's min height required. used to addjustr bricks				
						if((marioDie==0)&&(lazerWidth>=10)&&(enemyDie==0)){
							enemyDie=1;
							TweenMax.to(enemy,.5,{rotationZ:180,onComplete:function(){enemyDie=0;}})
							TweenMax.to(enemy,3,{top:'+=1000'})
							scoreCount=scoreCount+600;
							$('#score_div').html('Score: '+scoreCount);
							zombiesound.play();
							zombiesound.currentTime = 0;
						}
					}
				}
				//colition with enemy ends
				//collition with door
				function checkDoor(mar,door){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var doorWindth=door.width();
					var doorHeight=door.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var doorX=door.offset().left;
					var doorY=door.offset().top;		
					if(((marX+marWindth>=doorX)&&(marX<doorX+doorWindth))&&((marY+marHeight>=doorY)&&(marY<doorY+doorHeight))){				
						if((marioDoor==0)&&(marioCup==1)){
							completesound.play();
							completesound.currentTime = 0;
							scoreCount=scoreCount+500;
							$('#score_div').html('Score: '+scoreCount);
							marioDoorNow();							
						}
					}
				}
				//colition with door ends
				//collition with obstacle
				function checkObstacle(mar,obstacle){
					var marWindth=mar.width();
					var marHeight=mar.height();
					var obstacleWindth=obstacle.width();
					var obstacleHeight=obstacle.height()-50;
					var marX=mar.offset().left;
					var marY=mar.offset().top;
					var obstacleX=obstacle.offset().left;

					var obstacleY=obstacle.offset().top;		
					if(((marX+marWindth>=obstacleX)&&(marX<obstacleX+obstacleWindth))&&((marY+marHeight>=obstacleY)&&(marY<obstacleY+obstacleHeight))){				
						
						if(marX+marWindth<=obstacleX+10){
							//var_obstacle.html('left');
							boy.css('left','-=5px')
							
						}else if(marX-10<=obstacleX+obstacleWindth){
							boy.css('left','+=5px')
							
						}
						
					}
				}
				//colition with obstacle ends
				//checking leg colition with tiles
				function chkLegCollition(leg,tiles){
					legWindth=leg.width();
					legHeight=leg.height();
					tilesWindth=tiles.width();
					tilesHeight=tiles.height();
					legX=leg.offset().left;
					legY=leg.offset().top;
					tilesX=tiles.offset().left;
					tilesY=tiles.offset().top;		
					if(((legX+legWindth>=tilesX)&&(legX<tilesX+tilesWindth))&&((legY+legHeight>=tilesY)&&(legY<tilesY+tilesHeight)&&(marioDie==0))){				
						tiles.addClass('green');
						
						/*to set boys top on upward moving tile*/
						boyTop=((parseInt(tilesY))-mainOffsetTop-(boyHeight-4))//32 is actual, but to adjust some timer errors :(				
						boy.css({top:boyTop+'px'});	
						/*to set boys top on upward moving tile ENDS*/
						boyLeft=parseInt(legX)-parseInt(tilesX)// !IMPORTANT for Boys  X on Tile determination
					}else{						
						tiles.removeClass('green');	
					}
					if(($('.green').length >0)&& (marioDie==0)){ //not on base floor tile
						if(onBrick==0){
							$('.green').children(soul).css({left:boyLeft+'px'})// !IMPORTANT for Boys  X on Tile determination	
						}else{
							if(directionKeyPressed==0){
								soulLeft=parseInt($('.tiles_C.green .soul_C').offset().left);
								soulLeftL2=soulLeft-mainOffsetLeft-5;	//adj-5					
								boy.css({left:soulLeftL2+'px'});
							}else{
								$('.green').children(soul).css({left:boyLeft+'px'})
							}															
						}				
						onBrick=1;
						if(breakEd==0){//breakEd this prevents looping					
							brickFall();
						}
					}			
					else{				
						onBrick=0;
					}
					
				}//chkLegCollition() ends
				
			
				//collition with enemy checking timer _____________________________________LATEST COLITION LEVEL3________________________
				(function level3Update(){
					
					var surMar_left_pos=boy.offset().left-mainOffsetLeft;
					var surMar_top_pos=boy.offset().top-mainOffsetTop;
					var surStrip_left_pos=parseInt(level_strip3.css('left'))*-1;
					//$('.surconsole1').html(surStrip_left_pos)
					//$('.surconsole2').html(surMar_top_pos)
					
					if(marioDie==0){
					
						if(surMar_left_pos<190){ //tile 1 
							chkLegCollition(boy_leg,var_tile1);
						}
						if((surMar_left_pos>=190)&&(surMar_left_pos<350)){//tile 2
							chkLegCollition(boy_leg,var_tile2);
						}
						if((surMar_left_pos>=340)&&(surStrip_left_pos<1500)){//tile 3						
							if((surMar_top_pos>180)&&(surMar_top_pos<220)){
								chkLegCollition(boy_leg,var_tile3);
							}
						}
						if((surStrip_left_pos>=230)&&(surStrip_left_pos<380)){//obstacle1						
							if((surMar_top_pos>350)&&(surMar_top_pos<450)){
								checkObstacle(boy,var_obstacle);
								chkLegCollition(boy_leg,var_tile_Obst);
							}
						}
						/*---editing---*/
						if(surMar_top_pos<150){//coins
							if((surStrip_left_pos>=200)&&(surStrip_left_pos<300)){
								checkCoin(boy,var_coin1);
							}
							if((surStrip_left_pos>=300)&&(surStrip_left_pos<400)){
								checkCoin(boy,var_coin2);
							}
							if((surStrip_left_pos>=400)&&(surStrip_left_pos<500)){
								checkCoin(boy,var_coin3);
							}
							if((surStrip_left_pos>=500)&&(surStrip_left_pos<600)){
								checkCoin(boy,var_coin4);
							}
							if((surStrip_left_pos>=600)&&(surStrip_left_pos<700)){
								checkCoin(boy,var_coin5);
							}
							if((surStrip_left_pos>=700)&&(surStrip_left_pos<800)){
								checkCoin(boy,var_coin6);
							}
							if((surStrip_left_pos>=800)&&(surStrip_left_pos<900)){
								checkCoin(boy,var_coin7);
							}
							if((surStrip_left_pos>=900)&&(surStrip_left_pos<1000)){
								checkCoin(boy,var_coin8);
							}
							if((surStrip_left_pos>=1000)&&(surStrip_left_pos<1100)){
								checkCoin(boy,var_coin9);
							}
							if((surStrip_left_pos>=1100)&&(surStrip_left_pos<1200)){
								checkCoin(boy,var_coin10);
							}
						}
						/*---editing---*/
						if((surStrip_left_pos>=1200)&&(surStrip_left_pos<1600)){//obstacle2 and trophy						
							if((surMar_top_pos>-200)&&(surMar_top_pos<220)){ /*-200 jump  adj to prevent penetration*/
								checkObstacle(boy,var_obstacle2);
								checkCup(boy,var_trophy);
							}
						}
						if((surMar_left_pos>=530)&&(surMar_left_pos<690)){//tile 4
							if((surMar_top_pos>300)&&(surMar_top_pos<390)){							
								chkLegCollition(boy_leg,var_tile4);
							}
						}
						if((surStrip_left_pos>=1940)&&(surMar_left_pos<540)){//tile 5
							if((surMar_top_pos>250)&&(surMar_top_pos<380)){							
								chkLegCollition(boy_leg,var_tile5);
							}
						}
						if((surStrip_left_pos>=1780)&&(surStrip_left_pos<1940)){//tile 6
							if((surMar_top_pos>150)&&(surMar_top_pos<260)){							
								chkLegCollition(boy_leg,var_tile6);
							}
						}
						if((surStrip_left_pos>=1640)&&(surStrip_left_pos<1780)){//tile 7
							if((surMar_top_pos>100)&&(surMar_top_pos<140)){							
								chkLegCollition(boy_leg,var_tile7);
							}
						}
						if((surStrip_left_pos>=1490)&&(surStrip_left_pos<1640)){//tile 8, potion (gun)
							if((surMar_top_pos>0)&&(surMar_top_pos<70)){							
								chkLegCollition(boy_leg,var_tile8);
								checkPotion(boy,var_potion_red);
							}
						}
						if((surStrip_left_pos>=1900)&&(surStrip_left_pos<1990)){//enemy 4c (3)
							chkCollition(boy,var_enemy3);
						}
						if((surMar_left_pos>=490)&&(surMar_left_pos<590)){//enemy 3c (2)
							chkCollition(boy,var_enemy2);
						}
						if((surStrip_left_pos>=740)&&(surStrip_left_pos<1300)){//emeny 1(zombie)
							if((surMar_top_pos>50)&&(surMar_top_pos<220)){							
								chkCollition(boy,var_enemy1);
							}
						}
						if((surMar_top_pos>300)&&(surMar_top_pos<450)){//emeny 5c(wheel)
							if((surStrip_left_pos>=360)&&(surStrip_left_pos<1450)){							
								chkCollition(boy,var_enemy4);
							}
						}
						if((surMar_left_pos>=910)&&(surMar_left_pos<956)){//Door					
							if((surMar_top_pos>=380)&&(surMar_top_pos<450)){
								checkDoor(boy,var_door);
							}
						}
						if(boy.hasClass('cyclopse')){
							chkEnemyLazer(var_lazer,var_enemy1);
							chkEnemyLazer(var_lazer,var_enemy2);
							chkEnemyLazer(var_lazer,var_enemy3);
						}
						chkCollition(boy,var_lotusball); //following enemy
						
						level_mask3.css({left:level_strip3.css('left')})
						chkLegCollition(boy_leg,var_floor_tile);
						/*floor_tile o leg time calucation*/
						floorLegDistance=floorY-(legY+5);//+5 = the height of leg
						/*floor_tile o leg time calucation ends*/				
						startFallFromBrick();
					}
					
					updateChecker3=requestAnimationFrame(level3Update);
				})()
				//collition with enemy checking timer ends		
				
				
			
				//collition with enemy checking timer
			
				//collition with enemy checking timer ends
				
				
				
				
				
				
				
				function jumpMar(){	//jumping the character
					if((onAir==0)&&(readyToJump==1)){
						TweenMax.to(boy, .6, {top:"-=100px",onComplete:endOfJump});
						onAir=1;
						readyToJump=0;
						onFreeFall=0;	
					}
				}
				
				function endOfJump(){//jump reached maximum height
					onFreeFall=1;
					if(onFreeFall==1){
					freeFall()	
					}
				}
				function endOfFall(){//fall ended touching floor or brick			
					onAir=0;
					readyToJump=1;				
				}
				function brickFall(){// falling on brick			
					breakEd=1;//breakEd this prevents looping
					if(readyToJump==0){			
						TweenMax.to(boy, 0, {top:'+=0'})
						onAir=0;
						readyToJump=1;						
					}
				}
				function freeFall(){ //normal free fall from air
					fallingDuration=floorLegDistance/150;
					if(marioDie==0){ //checking mario alive			
					TweenMax.to(boy, fallingDuration, {top:floorY,ease: Power0.easeNone,onComplete:endOfFall});
					}
					
					breakEd=0;
				}
				
				function startFallFromBrick(){//falling from the brick while moving left or right but not while jumping
					if((onBrick==0)&&(onAir==0)&&(breakEd==1)){
						readyToJump=0;
						freeFall()
					}
				}
				
				//---level 2 animations--/
				
				
				//Determining initial spider venom_position
				function lazer_generate(){
					var_lazer.show();
					lazerLeft=parseInt(boy.css('left'))+25;
					lazerTop=parseInt(boy.css('top'))+35;
					if(marioToRight==1){
					var_lazer.css({'left':lazerLeft+'px','top':lazerTop+'px',width:'0',marginLeft:'0',opacity:1}).stop().animate({width:'50px'},100,function(){
				TweenMax.to(var_lazer,.5,{left:'+=400px',ease: Power0.easeNone,onComplete:lazerRestore})	
				TweenMax.to(var_lazer,.2,{opacity:0,delay:.3})	
					})
					}else{
					var_lazer.css({'left':lazerLeft+'px','top':lazerTop+'px',width:'0',marginLeft:'0',opacity:1}).stop().animate({width:'50px',marginLeft:'-50px'},100,function(){
					TweenMax.to(var_lazer,.5,{left:'-=400px',ease: Power0.easeNone,onComplete:lazerRestore})	
					TweenMax.to(var_lazer,.2,{opacity:0,delay:.3})
					})	
					}
				}
				function lazerRestore()	{
					lazerLeft=parseInt(boy.css('left'))+25;
					lazerTop=parseInt(boy.css('top'))+35;
					var_lazer.css({'left':lazerLeft+'px','top':lazerTop+'px',width:'0',marginLeft:'0',opacity:1})
				}
				//Determining initial venom_position
				
				
				var zombieFrameX=0;
				var zombieFrameY=0;
				zombie_sprite_timer=setInterval(function(){
					//if(enemyFrame==0){
					var_enemy1.css({"background-position":zombieFrameX+"px "+zombieFrameY+"px"});
					zombieFrameX=zombieFrameX-97;
					if(zombieFrameX<-500){
						zombieFrameX=0;
					}
					
				},120)
				
				var enemyFrame=0;
				enemy_sprite_timer=setInterval(function(){
					//if(enemyFrame==0){
					var_enemy2.css({"background-position":enemyFrame+"px -5px"});
					var_enemy3.css({"background-position":enemyFrame+"px -5px"});
					enemyFrame=enemyFrame-60;
					if(enemyFrame<-240){
						enemyFrame=0
					}
				},120)				
				
				
				function zombieFwd(){					
					TweenMax.to(var_enemy1,0,{rotationY:00})
					TweenMax.to(var_enemy1,6,{left:'-=480px',ease: Power0.easeNone,onComplete:zombieBwd})	
					
				}
				function zombieBwd(){										
					TweenMax.to(var_enemy1,0,{rotationY:180})
					TweenMax.to(var_enemy1,6,{left:'+=480px',ease: Power0.easeNone,onComplete:zombieFwd})
					
				}
				setTimeout(zombieFwd,100)//first spidermovement
				
				TweenMax.to($('.coin_C'),3,{rotationY:360,ease: Power0.easeNone,yoyo:true,repeat:-1})
				TweenMax.staggerTo([var_enemy2,var_enemy3],2.5,{top:'+=250px',ease: Power0.easeNone,yoyo:true,repeat:-1,repeatDelay:0},2)
				TweenMax.to(var_enemy4,1,{rotationZ:'-=360',ease: Power0.easeNone,repeat:-1})
				function enemyWheelJump(){
					TweenMax.to(var_enemy4,3,{bezier:[{left:830, top:460}, {left:930, top:300}, {left:1030, top:460}, {left:1130, top:300}, {left:1230, top:460}, {left:1330, top:300}, {left:1430, top:460}, {left:1530, top:300}, {left:1630, top:460}, {left:1730, top:300}, {left:1830, top:460}],ease: Power0.easeNone,onComplete:enemyWheelRoll})
				}
				enemyWheelJump()
				
				function enemyWheelRoll(){
					if(!boy.hasClass('cyclopse')){
					TweenMax.to(var_enemy4,2,{left:'830',ease: Power0.easeNone,onComplete:enemyWheelJump})

					}else{
					TweenMax.to(var_enemy4,2,{left:'830',ease: Power0.easeNone,onComplete:enemyWheelRollRev})	
					}
				}
				function enemyWheelRollRev(){
					TweenMax.to(var_enemy4,2,{left:'1830',ease: Power0.easeNone,onComplete:enemyWheelRoll})
				}
				
				setTimeout(function(){
				lotusSeedMove()
				},3000)
				
				TweenMax.to(var_lotusball,2,{rotationZ:'-=360',ease: Power0.easeNone,repeat:-1})//auto rotate
				var seedSpeed=3;
				var seedDelay=6;
				function lotusSeedMove(){	
				
					if(marTopAdj<=350){
						seedSpeed=1.5;
						seedDelay=0;
					}else{
						seedSpeed=3;
						seedDelay=3;
					}
								
					if(levelStripAdj>=-1400){
					TweenMax.to(var_lotusball,seedSpeed,{left:marLeftAdj-levelStripAdj, top:marTopAdj,ease: Power0.easeNone})
					TweenMax.to(var_lotusball,3,{bezier:[{left:'+=300', top:'+=200'}, {left:635, top:10}],ease: Power0.easeNone,delay:seedSpeed,onComplete:lotusSeedRestore})
					}else{
						TweenMax.to(var_lotusball,seedSpeed,{left:200, top:500,ease: Power0.easeNone})
					TweenMax.to(var_lotusball,3,{bezier:[{left:'+=300', top:'+=200'}, {left:635, top:10}],ease: Power0.easeNone,delay:seedSpeed,onComplete:lotusSeedRestore})
					}
				}
				
				function lotusSeedRestore(){
					TweenMax.to(var_lotusball,0,{left:635, top:10,ease: Power0.easeNone})
					TweenMax.to(var_lotusball,1,{opacity:1,ease: Power0.easeNone,delay:seedDelay,onComplete:lotusSeedMove})
				}
				//alert(marLeftAdj)
				/*------------------------------------------------------------keypress events-----------------------------------------------*/
				
				$(document).bind('keydown', function(e) {
					if(currentLevel==3){
						left = 37,
						up = 38,
						right = 39,
						down = 40;
					if(directionKeyFired==0){//to chk keypress repeat
						if (e.keyCode == left) {				
							left_on=1;
							directionKeyPressed=1;
							directionKeyFired=1
							marioToRight=0;
						}			
						if (e.keyCode == right) {				
							right_on=1;
							directionKeyPressed=1;
							directionKeyFired=1;
							marioToRight=1;
						}						
					}
					if (e.keyCode == up) {				
						 jumpMar()
					}
					if (e.keyCode == down) {
						if (boy.hasClass('cyclopse')){	
							lazer_generate();
							lazersound.play();
							lazersound.currentTime = 0;
						}
						 //dropMar()
					}	
					}
				});
				/*-----------------------KEydowns-------------------*/
				var left_on,right_on,up_on,down_on;		
				$(document).bind('keyup', function(e) {
						left = 37,
						up = 38,
						right = 39,
						down = 40;				
					if (e.keyCode == left) {				
						left_on=0;
						directionKeyPressed=0;
						directionKeyFired=0;
					}			
					if (e.keyCode == right) {				
						right_on=0;
						directionKeyPressed=0;
						directionKeyFired=0;
					}						
				});
				
				
				
				(function level3Walk(){
					marLeftAdj=parseInt(boy.css('left'));
					marTopAdj=parseInt(boy.css('top'));
					levelStripAdj=parseInt(level_strip3.css('left'));
					
					if(marioDie==0){
						if (left_on == 1){
							if ((marLeftAdj>=5)&&(levelStripAdj>=0)) {//walk till the left end without moving bg
								TweenMax.to(boy,0,{rotationY:'180',left:'-=2'})
							}
							if ((marLeftAdj>450)&&(levelStripAdj<=-2000)) {//walk towards the left middle without moving bg
								TweenMax.to(boy,0,{rotationY:'180',left:'-=2'})
							}
							if((marLeftAdj<=450)&&(levelStripAdj<0)){							
								TweenMax.to(level_strip3,0,{left:'+=2.5'})
								TweenMax.to(level_strip3,0,{backgroundPosition:'-=1px'})
								TweenMax.to(boy,0,{rotationY:'180',left:'450px'})
							}
							if((marLeftAdj>=450)&&(levelStripAdj>-2000)&&(levelStripAdj<0)){//adjustment because of "Obstacle" bug	
								TweenMax.to(boy,0,{rotationY:'180',left:'450px'})
							}
							
						}
						if (right_on == 1){
							if ((marLeftAdj<450)&&(levelStripAdj>-2000)){						
								TweenMax.to(boy,0,{rotationY:'0',left:'+=2'})
							}
							if ((marLeftAdj<950)&&(levelStripAdj<=-2000)){						
									TweenMax.to(boy,0,{rotationY:'0',left:'+=2'})
							}
							//level scroll
							if((marLeftAdj>=450)&&(levelStripAdj>-2000)){							
								TweenMax.to(level_strip3,0,{left:'-=2.5'})
								TweenMax.to(level_strip3,0,{backgroundPosition:'+=1px'})
								TweenMax.to(boy,0,{rotationY:'0',left:'450px'})
							}
						}
					}
					updateWalker3=requestAnimationFrame(level3Walk);
				})();
				
				var walking_position=0;
				var jumping_position=0;
				
				walkTimer=setInterval(function(){
					if(((left_on==1)||(right_on==1))&&(onAir==0)&&(breakEd==1)){
						if(walking_position>-440){
						walking_position=walking_position-80;
						}else{
							walking_position=-80
						}
						boy.css({"background-position":walking_position+"px -5px"});
						
						
					}else if(((left_on==1)||(right_on==1))&&(onBrick==0)&&(breakEd==1)){
						if(walking_position>-300){
						walking_position=walking_position-80;
						}else{
							walking_position=-80
						}
						boy.css({"background-position":walking_position+"px "+-140+"px"});
						
					}else if((onBrick==0)&&(breakEd==0)){
						boy.css({"background-position":-640+"px -5px"});
					}else{
						boy.css({"background-position":0+"px -5px"});
					}
					
				},120)
				
				
		
		}//startLevel3() ends
		/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------------LEVEL3 ENDS-----------------------------------------*/	
	
		
});