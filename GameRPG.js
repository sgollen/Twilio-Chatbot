//ASSIGNMENT BY SAMAKSH GOLLEN, "TWILLIO CHATBOT RPG ADVENTURE GAME"
//Different Game States
const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    CLASS:  Symbol("class"),
    WARRIOR: Symbol("warrior"),
    WAR_SMELL: Symbol("war_smell"),
    HIDE:  Symbol("hide"),
    THROW_WEAPON: Symbol("throw weapon"),
    INVESTIGATE: Symbol("investigate"),
    RUN: Symbol("run"),
    FIGHT_OR_FLIGHT: Symbol("fight"),
    LOCATION: Symbol("location"),
    CASTLE: Symbol("castle"),
    AROUND_WALL: Symbol("around"),
    COURTYARD: Symbol("courtyard"),
    DEFENCE: Symbol("defence"),
    ENTER: Symbol("enter"),
    GIRLFRIEND: Symbol("girlfriend"),
    GOOD_ROOM: Symbol("good room"),
    GOOD_ENDING: Symbol("good ending"),
    BAD_ROOM: Symbol("bad room"),
    OK_ENDING: Symbol("ok ending"),
    ATTACK_FIRST: Symbol("attack first"),
    FLIP_BODY:  Symbol("flip"),
    HURT: Symbol("hurt"),
    AFTER_FIGHT: Symbol("after fight"),
});

// Character Attributes
var life = 12;
var morale = 8;
var gold = 0;

//GameRPG class that lists all the different cases in the story
export default class GameRPG{
    //constructor
    constructor(){
        this.stateCur = GameState.WELCOMING;
    }
    // main method
    takeAnAction(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "Welcome to the RPG Game 'A Way of Choices' Demo[PG-15]. More classes will be added in the next version. Please pick a class   [WARRIOR]";
                this.stateCur = GameState.CLASS;
                break;
            case GameState.CLASS:
                if(sInput.toLowerCase().match("warrior")){
                    sReply = `You have selected to become a Valiant Warrior seeking treasure and glory. Your Starting Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]. Please Type [PLAY] to start.`;
                    this.stateCur = GameState.WARRIOR;
                }else if (sInput.toLowerCase().match("mage")){
                    sReply = "'EASTER EGG'. You have found an Easter Egg in the game. You have selected to become a Insightful Mage seeking unparalleled knowledge. Your Starting Stats are [Life: 6  Mana: 12  Gold: 0]. Sorry following class is under development";
                    this.stateCur = GameState.MAGE;
                }else {
                    sReply = "Please select one of the valid options: [WARRIOR]."
                    this.stateCur = GameState.CLASS;
                }
                break;
            case GameState.WARRIOR:
                if(sInput.toLowerCase().match("play")){
                    sReply = "You are walking along a path in the forest, one day's journey from waterloo town. Suddenly you smell something awful. You realized you have never encountered such stench before and it is close... what do you do?   [HIDE]   [CHECK]";
                    this.stateCur = GameState.WAR_SMELL;
                } else {
                    sReply = "Please select one of the valid options: [PLAY]."
                    this.stateCur = GameState.WARRIOR;
                }
                break;
            case GameState.WAR_SMELL:
                if(sInput.toLowerCase().match("hide")){
                    morale = morale - 2;
                    sReply = "'Morale Decreases By 2'. When in doubt, hiding is a fine strategy. While trying to hide inside the nearby bush, you step on a branch. Now inside a brush, you can see green glowing eyes staring at you from behind a tree... What do you do?   [RUN]   [THROW WEAPON]";
                    this.stateCur = GameState.HIDE;
                }else if(sInput.toLowerCase().match("check")){
                    morale = morale + 2;
                    sReply = "'Morale Increases By 2'. No need to panic yet. You walk towards the smell and you see a small green body laying flat on its face... what do you do?   [FLIP BODY]   [ATTACK]";
                    this.stateCur = GameState.INVESTIGATE;
                }else{
                    sReply = "Please select one of the valid options: [HIDE] [CHECK]."
                    this.stateCur = GameState.WAR_SMELL;
                }
                break;
            case GameState.HIDE:
                if(sInput.toLowerCase().match("run")){
                    morale = morale - 2;
                    sReply = "'Morale Decreases By 2'. You feel a cold sweat run down your back as you try to run. You hear someone running behind you... What do you do?  [KEEP RUNNING]   [LOOK BACK]";
                    this.stateCur = GameState.RUN;
                }else if(sInput.toLowerCase().match("throw")){
                    morale = morale + 2;
                    sReply = "'Morale Increases By 2'. You throw your weapon towards the glowing eyes and hear a Thud... what do you do?   [CHECK]   [JUST RUN]";
                    this.stateCur = GameState.THROW_WEAPON;
                }else{
                    sReply = "Please select one of the valid options: [RUN] [THROW WEAPON]."
                    this.stateCur = GameState.HIDE;
                }
                break;
            case GameState.THROW_WEAPON:
                if(sInput.toLowerCase().match("check")){
                    morale = morale + 2;
                    sReply = "'Morale Increases By 2'. No need to panic yet. You walk forward to investigate and see 2 small green bodies laying flat on their faces. You walk near one of the bodies... what do you do?   [FLIP BODY]   [ATTACK]";
                    this.stateCur = GameState.INVESTIGATE;
                }else if(sInput.toLowerCase().match("run")){
                    morale = morale - 2;
                    sReply = "'Morale Decreases By 2'. You feel a cold sweat run down your back as you try to run. You hear someone running behind you... What do you do?   [KEEP RUNNING]   [LOOK BACK]";
                    this.stateCur = GameState.RUN;
                }else{
                    sReply = "Please select one of the valid options: [CHECK] [JUST RUN]."
                    this.stateCur = GameState.THROW_WEAPON;
                }
                break;
            case GameState.INVESTIGATE:
                if(sInput.toLowerCase().match("flip")){
                    life = life - 4;
                    sReply = "'Health Decreases By 4'. As you stab the body with your sword, you feel a sudden pain in your back. As you try to look back, you see a green goblin stabbing you with its knife. You grab your sword from you side ... who do you attack?   [FRONT BODY]    [BEHIND]";
                    this.stateCur = GameState.FLIP_BODY;  
                }else if(sInput.toLowerCase().match("attack")) {
                    sReply= "Squeeaalll.... You attack the body with a sword and see the body twisting and screaming. You notice a small pouch on the side of the body. Before you can do anything, you hear a sound behind you. What do you do?   [GRAB AND RUN]   [JUST RUN]";
                    this.stateCur = GameState.ATTACK_FIRST;        
                }else{
                    sReply = "Please select one of the valid options: [FLIP BODY] [ATTACK]."
                    this.stateCur = GameState.INVESTIGATE;
                }
                break;
            case GameState.RUN:
                if(sInput.toLowerCase().match("look")){
                    life = life - 2;
                    sReply = "'Health Decreases By 2'. You look over your shoulder and see a group of goblins with daggers running after you. As you try to think about your choices, you trip on a tree root and hurt yourself. You hear you attackers coming closer... What do you do?   [JUST RUN]   [FIGHT]";
                    this.stateCur = GameState.FIGHT_OR_FLIGHT;
                }else if(sInput.toLowerCase().match("keep")){ // might need a tweek
                    morale = morale - 2;
                    sReply = "'Morale Decreases By 2'. You keep running through forest and avoiding obstacles. After few minutes, you see a big castle ahead and hear the pursuers getting closer... What do you do?   [HIDE IN CASTLE]    [HIDE IN FOREST]";
                    this.stateCur = GameState.LOCATION;
                }else{
                    sReply = "Please select one of the valid options: [KEEP RUNNING] [LOOK BACK]."
                    this.stateCur = GameState.RUN;
                }
                break;
            case GameState.FIGHT_OR_FLIGHT:
                if(sInput.toLowerCase().match("run")){
                    morale = morale - 2;
                    sReply = "'Morale Decreases By 2'. You keep running through forest and avoiding obstacles. After few minutes, you see a big castle ahead and hear the pursuers getting closer... What do you do?   [HIDE IN CASTLE]    [HIDE IN FOREST]";
                    this.stateCur = GameState.LOCATION;
                }else if(sInput.toLowerCase().match("fight")){
                    sReply = `'GAME OVER' For Spartaaaaaa.... You pray to the God of War and try to fight the group of goblins. You put up a great fight, however, eventually the goblins overwhelm you with sheer numbers. Exhausted and out of options, you think about choices while being captured by the goblins... Thanks for Playing the Demo. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]  [RESTART]`;
                    this.stateCur = GameState.WELCOMING;
                }else{
                    sReply = "Please select one of the valid options: [JUST RUN] [FIGHT]."
                    this.stateCur = GameState.FIGHT_OR_FLIGHT;
                }
                break;
            case GameState.LOCATION:
                if(sInput.toLowerCase().match("castle")){
                    sReply = "A Fine Choice... The wall of the castle should be able to hold off any pursuers for sometime. As you get closer to the castle you see a big wall... What do you do?   [CLIMB WALL]    [FIND ENTRANCE]";
                    this.stateCur = GameState.CASTLE;
                }else if(sInput.toLowerCase().match("forest")){
                    sReply = `'GAME OVER'. You decided to hide in the forest. The group of goblins follow your scent and surround you. Exhausted and out of options, you think about choices while being captured by the goblins.... Thanks for Playing the Demo. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]  [RESTART]"`;
                    this.stateCur = GameState.WELCOMING;
                }else{
                    sReply = "Please select one of the valid options: [HIDE IN CASTLE] [HIDE IN FOREST]."
                    this.stateCur = GameState.LOCATION;
                }
                break;
            case GameState.CASTLE:
                if(sInput.toLowerCase().match("climb")){
                    sReply = "Up, up, up you go like a grasshopper. You use the strength in your legs and manage to get across the castle wall. You are currently in the castle courtyard and hear the goblins trying to climb the wall...  What do you do?   [ENTER INSIDE]    [WALL DEFENCE]";
                    this.stateCur = GameState.COURTYARD;
                }else if(sInput.toLowerCase().match("find")){
                    life = life - 2;
                    sReply = "Health Decreases By 2'. As you are trying find an easy way around the wall, an arrow grazes your arm. You hear the group of goblins getting closer... What do you do?   [CLIMB WALL]   [FIGHT]";
                    this.stateCur = GameState.AROUND_WALL;
                }else{
                    sReply = "Please select one of the valid options: [CLIMB WALL] [FIND ENTRANCE]."
                    this.stateCur = GameState.CASTLE;
                }
                break;
            case GameState.AROUND_WALL:
                if(sInput.toLowerCase().match("climb")){
                    sReply = "Up, up, up you go like a grasshopper. You use the strength in your legs and manage to get across the castle wall. You are currently in the castle courtyard and hear the goblins trying to climb the wall...  What do you do?   [ENTER INSIDE]    [WALL DEFENCE]";
                    this.stateCur = GameState.COURTYARD;
                }else if(sInput.toLowerCase().match("fight")){
                    sReply = `'GAME OVER'. For Spartaaaaaa.... You pray to the God of War and try to fight the group of goblins. You put up a great fight, however, eventually the goblins overwhelm you with sheer numbers. Exhausted and out of options, you think about choices while being captured by the goblins... Thanks for Playing the Demo. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}] [RESTART]`;
                    this.stateCur = GameState.WELCOMING;
                }else{
                    sReply = "Please select one of the valid options: [CLIMB WALL] [FIGHT]."
                    this.stateCur = GameState.AROUND_WALL;
                }
                break;
            case GameState.COURTYARD: 
                if(sInput.toLowerCase().match("enter")){
                    sReply = "As you enter main hall of the castle, you see a big ogre sleeping in the middle of the room. You also hear silent crying noise from one the rooms... What do you do?   [FIGHT OGRE]    [CHECK ROOM]";
                    this.stateCur = GameState.ENTER;
                }else if (sInput.toLowerCase().match("wall")){
                    sReply = "'Morale Increases By 2'. You decided to defend the wall and fight. You look around for any useful items and see clutter of rocks nearby. While you were looking around the goblins have started to climb the wall... What do you do?    [DROP ROCKS]    [RUN INSIDE]";
                    this.stateCur = GameState.DEFENCE;
                }else{
                    sReply = "Please select one of the valid options: [ENTER INSIDE] [WALL DEFENCE]."
                    this.stateCur = GameState.COURTYARD;
                }
                break;
            case GameState.DEFENCE:
                if(sInput.toLowerCase().match("drop")){
                    morale = morale + 2;
                    sReply = "'Morale Increases By 2'. Squeeeeaalll... You drop the rocks on the climbing goblins and see them falling from the wall. You believe that you have slowed them down and the goblins are getting ready to fire arrows... What do you do?   [KEEP FIGHTING]    [RUN INSIDE]";
                    this.stateCur = GameState.DEFENCE;
                }else if(sInput.toLowerCase().match("run")){
                    sReply = "As you enter main hall of the castle, you see a big ogre sleeping in the middle of the room. You also hear silent crying noise from one the rooms... What do you do?   [FIGHT OGRE]    [CHECK ROOM]";
                    this.stateCur = GameState.ENTER;
                }else{
                    sReply = "Please select one of the valid options: [DROP ROCKS] [RUN INSIDE]."
                    this.stateCur = GameState.DEFENCE;
                }
                break;
            case GameState.ENTER:
                if(sInput.toLowerCase().match("fight")){
                    sReply = `'GAME OVER'. There are some things you should never fight. The ogre you attacked, smashes your sword and armour with his big club... ... Thanks for Playing the Demo. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]  [RESTART]`;
                    this.stateCur = GameState.WELCOMING;
                }else if(sInput.toLowerCase().match("room")){
                    sReply = "Stealthy as a Cat... You silently sneak past the sleeping ogre and enter the room. In the room, you see a crying girl tied with chains... What do you do?  [SAVE THE GIRL]  [DO NOTHING]";
                    this.stateCur = GameState.GIRLFRIEND;
                }else{
                    sReply = "Please select one of the valid options: [FIGHT OGRE] [CHECK ROOM]."
                    this.stateCur = GameState.ENTER;
                }
                break;
            case GameState.GIRLFRIEND:
                if(sInput.toLowerCase().match("save")){
                    sReply = "A good soul... You showed the bright side of humanity. You silently free the poor girl, who is looking at you with her shining eyes. Soon both of you hear the sound of fighting outside the door... What do you do?   [PEAK OUTSIDE]    [WAIT]";
                    this.stateCur = GameState.GOOD_ROOM;
                }else if(sInput.toLowerCase().match("nothing")){
                    sReply = "Cautious as a Serpent, But Lost Something Special. You turn your back towards the poor crying girl and wait patiently. Soon both of you hear the sound of fighting outside the door... What do you do?   [PEAK OUTSIDE]    [WAIT]";
                    this.stateCur = GameState.BAD_ROOM;
                }else{
                    sReply = "Please select one of the valid options: [SAVE THE GIRL] [DO NOTHING]."
                    this.stateCur = GameState.GIRLFRIEND;
                }
                break;
            case GameState.GOOD_ROOM:
                if(sInput.toLowerCase().match("peak")){
                    morale = morale + 2;
                    sReply = "'Morale Increases By 2'. You silently take a peak outside through the keyhole. You see that the group of goblins are fighting with the ogre. After a long fight, both parties kill each other and your path is clear...  How do you continue your journey?   [WITH GIRL]  [ALONE]";
                    this.stateCur = GameState.GOOD_ENDING;
                }else if(sInput.toLowerCase().match("wait")){
                    morale = morale - 2;
                    sReply = "'Morale Decreases By 2'. You silently wait in the room. You feel anxious about the commotion outside but do no have the courage to take a peak. After the few long minutes, you hear pin drop silence outside...  How do you continue your journey?  [WITH GIRL]  [ALONE]";
                    this.stateCur = GameState.GOOD_ENDING;
                }else{
                    sReply = "Please select one of the valid options: [PEAK OUTSIDE] [WAIT]."
                    this.stateCur = GameState.GOOD_ROOM;
                }
                break;
            case GameState.GOOD_ENDING:
                if(sInput.toLowerCase().match("girl")){
                    sReply = `'SECRET ENDING'. You decided to trust the girl and continue your journey together. As you look at the girl beside you, she gives you the brightest smile you have ever seen and that makes your heart flutter for a moment. Thank You for Playing the Game. Follow the adventures of ROMEO and JULIET next time. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]`;
                    this.stateCur = GameState.WELCOMING;
                }else if(sInput.toLowerCase().match("alone")){
                    sReply = `'GOOD ENDING'. Although you freed the girl, you decided to continue your journey alone. A part of you feels that you lost something important. Thank You for Playing the Game. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]`;
                    this.stateCur = GameState.WELCOMING;
                }else{
                    sReply = "Please select one of the valid options: [WITH GIRL]  [ALONE]."
                    this.stateCur = GameState.GOOD_ENDING;
                }
                break;
            case GameState.BAD_ROOM:
                if(sInput.toLowerCase().match("peak")){
                    morale = morale + 1;
                    sReply = "'Morale Increases By 1'. You silently take a peak outside through the keyhole. You see that the group of goblins are fighting with the ogre. After a long fight, both parties kill each other, and your path is clear...  How do you continue your journey?  [ALONE]";
                    this.stateCur = GameState.OK_ENDING;
                }else if(sInput.toLowerCase().match("wait")) {
                    morale = morale - 3;
                    sReply = "'Morale Decreases By 3'. You silently wait in the room. You feel anxious about the commotion outside but do no have the courage to take a peak. After the few long minutes, you hear pin drop silence outside...  How do you continue your journey?  [ALONE]";
                    this.stateCur = GameState.OK_ENDING;
                }else{
                    sReply = "Please select one of the valid options: [PEAK OUTSIDE]  [WAIT]."
                    this.stateCur = GameState.BAD_ROOM;
                }
                break;
            case GameState.OK_ENDING:
                sReply = `'OK ENDING'. You continue your journey alone, leaving a crying girl behind. As you carry on without looking back, you feel that you have lost something important. Thank You for Playing the Game. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]`; 
                this.stateCur = GameState.WELCOMING;
                break;
            case GameState.ATTACK_FIRST:
                if(sInput.toLowerCase().match("grab")){
                    gold = gold + 5;
                    sReply = "'Gold Increases By 5'. You hastily grab the pouch beside the screaming body and start to run. As you are running, you hear someone running behind you... What do you do?   [KEEP RUNNING]   [LOOK BACK]";
                    this.stateCur = GameState.RUN;
                }else if(sInput.toLowerCase().match("just")){
                    sReply = "You leave the pouch beside the screaming body and start to run. As you are running, you hear someone running behind you... What do you do?   [KEEP RUNNING]   [LOOK BACK]";
                    this.stateCur = GameState.RUN;
                }else{
                    sReply = "Please select one of the valid options: [GRAB AND RUN]   [JUST RUN]."
                    this.stateCur = GameState.ATTACK_FIRST;
                }
                break;
            case GameState.FLIP_BODY:
                if(sInput.toLowerCase().match("front")){
                    life = life - 4;
                    sReply = "'Health Decreases By 4'. What a terrible situation. You quickly attack the laying body with a sword and see the body twisting and screaming. You feel another stab in your back. Your health is critical, and you can feel your life slipping away... What do you do?   [DRINK HP POTION]    [ATTACK BEHIND]";
                    this.stateCur = GameState.HURT;
                }else if(sInput.toLowerCase().match("behind")){
                    life = life - 4;
                    sReply = "'Health Decreases By 4'. What a terrible situation. You quickly attack the goblin behind you and hear a scream. As you try to finish of the attacker, you feel another stab in your back and see the laying stabbing you with a dagger... What do you do?   [DRINK HP POTION]    [ATTACK BEHIND]";
                    this.stateCur = GameState.HURT;
                }else{
                    sReply = "Please select one of the valid options: [FRONT BODY]  [BEHIND]."
                    this.stateCur = GameState.FLIP_BODY;
                }
                break;
            case GameState.HURT:
                if(sInput.toLowerCase().match("drink")){
                    life = life + 4;
                    sReply = "'Health Increases By 4'.You feel the vitality coursing through your body and visibly healing your wounds. You are fully healed and finish your attacker after a tough fight...  What do you do?   [REST]   [JUST RUN]";
                    this.stateCur = GameState.AFTER_FIGHT;
                }else if(sInput.toLowerCase().match("run")){
                    sReply = `'GAME OVER'. You decided to run with a bleeding wound. While running, you leave a blood trail. Eventually, A group of goblins follow your trail and surround you. Exhausted and out of options, you think about choices while being captured by the goblins.... Thanks for Playing the Demo. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}]   [RESTART]`;
                    this.stateCur = GameState.WELCOMING;
                }else if(sInput.toLowerCase().match("behind")){
                    morale = morale + 4;
                    gold = gold + 10;
                    sReply = "'Morale Increased By 4 & Gold Increased By 10'. Bravo.. What courage! You quickly turn around and finish the unexpecting goblin behind you. You take two small pouches from the bodies. Your health is critically low... What do you do?   [DRINK HP POTION]    [JUST RUN]";
                    this.stateCur = GameState.AFTER_FIGHT;
                }else{
                    sReply = "Please select one of the valid options: [DRINK HP POTION]  [JUST RUN]."
                    this.stateCur = GameState.HURT;
                }
                break;
            case GameState.AFTER_FIGHT:
                if(sInput.toLowerCase().match("drink")){
                    life = life + 6;
                    sReply = "'Health Increases By 6'.As you drink the potion, you feel the vitality coursing through your body and visibly healing your wounds. You are fully healed but there might be more goblins around...  What do you do?   [REST]   [RUN]";
                    this.stateCur = GameState.AFTER_FIGHT;
                }else if(sInput.toLowerCase().match("rest")){
                    sReply = `'GAME OVER'. You decided to count on your luck and rest in the forest. However, the lady luck did not favour you today. A group of goblins follow the scent of dead bodies and surround you. Exhausted and out of options, you think about choices while being captured by the goblins... Thanks for Playing the Demo. Your Final Stats are [Life: ${life}  Morale: ${morale}  Gold: ${gold}] [RESTART]`;
                    this.stateCur = GameState.WELCOMING;
                }else if(sInput.toLowerCase().match("run")){
                    sReply = "You feel a cold sweat run down your back as you try to run. You hear someone running behind you... What do you do?   [KEEP RUNNING]   [LOOK BACK]";
                    this.stateCur = GameState.RUN;
                }else{
                    sReply = "Please select one of the valid options: [DRINK HP POTION] [REST] [JUST RUN]."
                    this.stateCur = GameState.AFTER_FIGHT;
                }
                break;                       
        }
        return([sReply]);
    }
}