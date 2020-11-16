
var ground;
var wall_y = 4815;
var gameState = "start";
var y = 4990;
var time = 0;
var frame = 0;
var frame_Value = 0;
var score = 0;
var r = 50;
var level = 1;

function preload(){
    player_running_right = loadAnimation("png/Run__000.png","png/Run__001.png","png/Run__002.png","png/Run__003.png","png/Run__004.png","png/Run__005.png","png/Run__006.png","png/Run__007.png","png/Run__008.png","png/Run__009.png");
    player_running_left = loadAnimation("png/Run__010.png","png/Run__011.png","png/Run__012.png","png/Run__013.png","png/Run__014.png","png/Run__015.png","png/Run__016.png","png/Run__017.png","png/Run__018.png","png/Run__019.png");
    start_ScreenImg = loadImage("IMAGES/LOGO(RISE UP).jpg");
    start_ButtonImg = loadImage("IMAGES/START BUTTON.png");
    restartImg = loadImage("IMAGES/restart.png");
    pac1 = loadImage("ENEMY IMAGES/PAC1.png");
    pac2 = loadImage("ENEMY IMAGES/PAC2.png");
    pac3 = loadImage("ENEMY IMAGES/PAC3.jpg")

    jumpSound = loadSound("RISE UP SOUNDS/350904__cabled-mess__jump-c-02.wav");
    deathSound = loadSound("RISE UP SOUNDS/Fail-sound-effect.mp3");
}

function setup(){
    var canvas = createCanvas(displayWidth - 10,displayHeight - 10);

    start_Button = createSprite(725,5100);
    start_Button.addImage(start_ButtonImg);

    start_Screen = createSprite(720,4775);
    start_Screen.addImage(start_ScreenImg);
    start_Screen.scale = 0.63;
    
    restart = createSprite(690,6400);
    restart.addImage(restartImg);

    wall_left_grp = createGroup();
    wall_right_grp = createGroup();

    platform_grp = createGroup();

    player = createSprite(700,4960,20,20);
    player.addAnimation("running - right",player_running_right);
    player.addAnimation("running - left",player_running_left);
    player.scale = 0.11;

    wall1_left = createSprite(407.5,4955,15,60);
    wall1_right = createSprite(992.5,4955,15,60);

    wall2_left = createSprite(407.5,4885,15,60);
    wall2_right = createSprite(992.5,4885,15,60);

    dummyPlat = createSprite(700,4990,600,10);

    level2 = createSprite(1100,3500,110,5);
    level3 = createSprite(1100,2000,110,5);
    level4 = createSprite(1100,500,110,5);

    enemy1 = createSprite(500,0,20,20);
    enemy2 =  createSprite(500,0,20,20);
    enemy3 =  createSprite(500,0,20,20);

    inv_wall_left = createSprite(407.5,2500,15,5000);
    inv_wall_right = createSprite(992.5,2500,15,5000);

}

function draw(){
    background(0);
    camera.position.y = player.y;
    textSize(30);
    fill(random(0,255),random(0,255),random(0,255));

    dummyPlat.depth = start_Screen.depth;
    start_Screen.depth += 1;
 
    timeLimit = 0;
    frame_Value = Math.round(frame);

    inv_wall_left.visible = false;
    inv_wall_right.visible = false;

    //console.log(enemy1.y);
    //console.log(enemy2.y);
    //console.log(enemy3.y);
    console.log(enemy1.x);

    if(player.velocityX > 0){
        player.changeAnimation("running - right",player_running_right);
    }
    else if(player.velocityX < 0){
        player.changeAnimation("running - left",player_running_left);
    }

    start_Button.visible = false;
    start_Screen.visible = false;

    wall1_left.visible = true;
    wall1_right.visible = true;

    wall2_left.visible = true;
    wall2_right.visible = true;

    restart.visible = false;

    if(gameState === "start"){
        start_Screen.visible = true;
        start_Button.visible = true;

        wall1_left.visible = false;
        wall1_right.visible = false;

        wall2_left.visible = false;
        wall2_right.visible = false;

        text("RISE UP",115,4800);
        text("RISE UP",1200,4800);

        if(mousePressedOver(start_Button)){
            gameState = "go";
            r = Math.round(random(0,2));
            console.log(r);
        }
    }
    else if(gameState === "go"){
        if(r === 0){
            player.velocityX = 7;
            enemy1.addImage(pac1);
            enemy2.addImage(pac3); 
            enemy3.addImage(pac2);
            enemy1.velocityX = 7;
            enemy2.velocityX = 7;
            enemy3.velocityX = 7;
            enemy1.scale = 0.1;
            enemy2.scale = 0.1;
            enemy3.scale = 0.1;
        }
        else if(r === 1){
            player.velocityX = -7;
            enemy1.addImage(pac2);
            enemy2.addImage(pac1);
            enemy3.addImage(pac3);
            enemy1.velocityX = -7;
            enemy2.velocityX = -7;
            enemy3.velocityX = -7;
            enemy1.scale = 0.1;
            enemy2.scale = 0.1;
            enemy3.scale = 0.1;
        }
        else if(r === 2){
            player.velocityX = 7;
            enemy1.addImage(pac3);
            enemy2.addImage(pac2);
            enemy3.addImage(pac1);
            enemy1.velocityX = 7;
            enemy2.velocityX = 7;
            enemy3.velocityX = 7;
            enemy1.scale = 0.1;
            enemy2.scale = 0.1;
            enemy3.scale = 0.1;
        }

        enemy1.y = 4500;
        enemy2.y = 5000 - 70 * (Math.round(random(0,70)));
        enemy3.y = 5000 - 70 * (Math.round(random(0,70)));


        if(player.velocity != 0){
            gameState = "play";
        }

    }
    else if(gameState === "play"){

        text("SCORE: " + score,100,camera.position.y - 200);
        text("LEVEL 2",1040,3490);
        text("LEVEL 3",1040,1990);
        text("LEVEL 4",1040,490);
        text("LEVEL: " + level,100,camera.position.y - 250);

        if(player.y < 5000 && player.y > 3500){
            if(player.x > 407 && player.x < 993){
                level = 1;
            }
        }
        else if(player.y < 3500 && player.y > 2000){
            if(player.x > 407 && player.x < 993){
                level = 2;
            }
        }
        else if(player.y < 2000 && player.y > 500){
            if(player.x > 407 && player.x < 993){
                level = 3;
            }
        }
        else if(player.y < 500){
            if(player.x > 407 && player.x < 993){
                level = 4;
            }
        }

        if(player.isTouching(wall1_left) || player.isTouching(wall1_right) || player.isTouching(wall2_left) || player.isTouching(wall2_right)){
            player.velocityX *= -1;
        }
        if(wall_left_grp.isTouching(player) || wall_right_grp.isTouching(player)){
            player.velocityX *= -1;
        }

        if(enemy1.isTouching(inv_wall_left) || enemy1.isTouching(inv_wall_right)){
            enemy1.velocityX *= -1;
        }
        if(enemy2.isTouching(inv_wall_left) || enemy2.isTouching(inv_wall_right)){
            enemy2.velocityX *= -1;
        }
        if(enemy3.isTouching(inv_wall_left) || enemy3.isTouching(inv_wall_right)){
            enemy3.velocityX *= -1;
        }

        
            /*if(r < 200){
                fill("blue");
                ellipseMode(RADIUS);
                ellipse(player.x,player.y,r + 50);
            }*/
        

        if(player.y >= 5000){
            deathSound.play();
            gameState = "over";
        }

        if(player.x <= 407 || player.x >= 993){
            player.velocityY += 1;
        }
        if(player.x > 1050 || player.x < 370){
            player.velocityX = 0;
        }

        if(player.velocityY >= 0){
            player.collide(platform_grp);
        }
        else{
            player.velocityY += 1;
        } 
        
        if(keyDown("space") && player.velocityY >= -1 && player.x > 435 && player.x < 965 ){
            jumpSound.play();
            frame += 1;
            time = timeLimit  - frame_Value;
            if(time >= 0){
                player.velocityY = -11;
                score += 1;
            }   
        }
        else if(keyWentUp("space")){
            frame = 0;
        }

    }

    else if(gameState === "over"){
        player.velocityX = 0;
        player.velocityY = 0;

        restart.visible = true;

        text("YOU LOST",610,6250);
        text("RON STILL NEEDS YOU, YOU NEED TO HELP HIM",400,6280);

        player.x = 655;
        player.y = 6600;
        player.scale = 0.3;

        if(mousePressedOver(restart)){
            gameState = "start";
            player.scale = 0.12;
            
            player.x = 700;
            player.y = 4964;

        }
    }

    rand_left = Math.round(random(0,4));
    rand_right = Math.round(random(0,4));

    if(frameCount % 10 === 0){

        if(y > 20){
            y -= 70;
        }

        if(y >= 0){
            plat = createSprite(700,y,600,10); 
            plat.depth = start_Screen.depth;
            start_Screen.depth += 1;
            platform_grp.add(plat);
        }
        if(wall_y > 55){
            wall_y -= 70;     
        }
        if(player.y > 2500){
            if(rand_left === 1 || rand_left === 3 || rand_left === 4){
                closedW_left = createSprite(407.5,wall_y,15,60);
                wall_left_grp.add(closedW_left);
            }
            
            if(rand_right === 1 || rand_right === 3 || rand_right === 4){
                closedW_right = createSprite(992.5,wall_y,15,60);
                wall_right_grp.add(closedW_right);
            }
        }

        if(player.y < 2500){
            if(rand_left === 3 || rand_left === 4){
                closedW_left = createSprite(407.5,wall_y,15,60);
                wall_left_grp.add(closedW_left);
            }
            
            if(rand_right === 3 || rand_right === 4){
                closedW_right = createSprite(992.5,wall_y,15,60);
                wall_right_grp.add(closedW_right);
            }
        }
    }
    
    drawSprites();
};
