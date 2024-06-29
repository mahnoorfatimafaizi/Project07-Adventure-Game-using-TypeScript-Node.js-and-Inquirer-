#! /usr/bin/env node

import inquirer from "inquirer";

class Player {
  name: string;
  health: number = 100;

  constructor(playerName: string) {
    this.name = playerName;
  }

  attack(enemy: Enemy): void {
    const damage = Math.floor(Math.random() * 20) + 1;
    enemy.health -= damage;
    console.log(`${this.name} attacks ${enemy.name} for ${damage} damage!`)
  }
}

class Enemy {
    name: string;
    health: number = 100;

    constructor(enemyName: string){
        this.name = enemyName;
    }

    attack(player: Player): void {
        const damage = Math.floor(Math.random() * 20) + 1;
        player.health -= damage;
        console.log(`${this.name} attacks ${player.name} for ${damage} damage!`)
    }
}

async function startGame(){
const player = await inquirer.prompt ([
    {
        name: "name",
        type: "input",
        message: "Enter Player Name: ",
    }
]);

const enemy = await inquirer.prompt ([
    {
        name: "name",
        type: "list",
        message: "Select Enemy",
        choices: ["Zombie", "Skeleton", "Alien"],
    }
])

let player1 = new Player(player.name);
let enemy1 = new Enemy(enemy.name);

console.log(`${player1.name} vs ${enemy1.name}`)

while (player1.health > 0 && enemy1.health > 0){
    const action = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Choose an action",
            choices: ["Attack", "Defend", "Run"],
        }
    ]);
    if (action.action === "Attack"){
        player1.attack(enemy1);
    } else if  (action === "Defend"){
        console.log(`${player1} is defending!!`);
    } else if (action === "Run"){
        console.log(`${player1} runs away!`);
        break;
    }
    
    if (enemy1.health > 0){
        enemy1.attack(player1);
    }

    console.log(`${player1.name}: ${player1.health} HP`);
    console.log(`${enemy1.name}: ${enemy1.health} HP`);
}

if (player1.health <= 0){
    console.log(`Oops ${enemy1.name} won!`)
} else if (enemy1.health < 0){
    console.log(`Hurray!! ${player1.name} won!`)
} else {
    console.log(`${player1.name} runs away...`)
}
}

startGame();
